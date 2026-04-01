from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import oracledb
import os

app = Flask(__name__)
CORS(app)

# Konfiguracja bazy danych
db_config = {
    "user": "sys as sysdba",
    "password": "admin",
    "dsn": "localhost:1521/FREE",
    "privilege": oracledb.SYSDBA
}

# Obsługa plików statycznych (odpowiednik express.static)
@app.route('/<path:path>')
def send_static(path):
    return send_from_directory('public', path)

# Helper do pobierania połączenia
def get_connection():
    return oracledb.connect(**db_config)

@app.route("/transferlist", methods=["GET"])
def get_transferlist():
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM TRANSFERLIST")
        # Zamiana krotek na listę dla formatu JSON
        rows = cursor.fetchall()
        return jsonify(rows)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Error connecting to database", "details": str(e)}), 500
    finally:
        if conn: conn.close()

@app.route("/players", methods=["POST"])
def move_to_players():
    data = request.json
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        # W Pythonie bindy robi się przez słownik lub listę
        cursor.execute(
            "INSERT INTO PLAYERS (ID, NAME, POSITION, AGE, NATION, CLUB) "
            "VALUES (player_seq.NEXTVAL, :name, :pos, :age, :nat, :club)",
            name=data['name'], pos=data['position'], age=data['age'], nat=data['nation'], club=data['club']
        )
        
        cursor.execute("DELETE FROM TRANSFERLIST WHERE ID = :id", id=data['id'])
        
        conn.commit()
        return jsonify({"message": "Zawodnik został przeniesiony do klubu"}), 201
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Błąd podczas przenoszenia", "details": str(e)}), 500
    finally:
        if conn: conn.close()

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    name = data.get("name")
    password = data.get("password")

    if not name or not password:
        return jsonify({"error": "Nazwa użytkownika i hasło są wymagane"}), 400

    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM USERS WHERE name = :n AND password = :p AND verify = 1",
            n=name, p=password
        )
        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "Niepoprawne dane lub brak weryfikacji"}), 401

        return jsonify({
            "success": True,
            "message": "Zalogowano pomyślnie!",
            "user": {
                "phone": user[0], "name": user[1], "password": user[2],
                "club": user[3], "role": user[4], "email": user[5],
                "verify": user[6] == 1, "avatar": user[7] or ""
            }
        })
    except Exception as e:
        return jsonify({"error": "Database error", "details": str(e)}), 500
    finally:
        if conn: conn.close()

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        # Sprawdzenie czy istnieje
        cursor.execute("SELECT * FROM USERS WHERE email = :e OR phone = :p", e=data['email'], p=data['phone'])
        if cursor.fetchone():
            return jsonify({"error": "Użytkownik już istnieje"}), 400

        cursor.execute(
            "INSERT INTO USERS (name, password, club, email, phone, role, verify) "
            "VALUES (:name, :pw, :club, :email, :phone, :role, :ver)",
            name=data['name'], pw=data['password'], club=data['club'], 
            email=data['email'], phone=data['phone'], role=data['role'], 
            ver=1 if data.get('verify') else 0
        )
        conn.commit()
        return jsonify({"success": True, "message": "Zarejestrowano pomyślnie"}), 201
    except Exception as e:
        return jsonify({"error": "Błąd rejestracji", "details": str(e)}), 500
    finally:
        if conn: conn.close()

@app.route("/api/delete-user/<phone>", methods=["DELETE"])
def delete_user(phone):
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM USERS WHERE phone = :p", p=phone)
        
        if cursor.rowcount == 0:
            return jsonify({"error": "Nie znaleziono użytkownika"}), 404
            
        conn.commit()
        return jsonify({"success": True, "message": "Usunięto użytkownika"})
    except Exception as e:
        return jsonify({"error": "Błąd usuwania", "details": str(e)}), 500
    finally:
        if conn: conn.close()

# Start serwera
if __name__ == "__main__":
    app.run(port=5000, debug=True)