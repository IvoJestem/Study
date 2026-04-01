from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import oracledb
import os

app = Flask(__name__)
CORS(app)

db_config = {
    "user": "sys",
    "password": "ADMIN",
    "dsn": "localhost:1521/FREE",
    "mode": oracledb.SYSDBA
}

def get_connection():
    return oracledb.connect(**db_config)

@app.route('/<path:path>')
def send_static(path):
    return send_from_directory('public', path)

@app.route("/transferlist", methods=["GET"])
def get_transferlist():
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM SYS.TRANSFERLIST")
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
        
        cursor.execute(
            """INSERT INTO SYS.PLAYERS (ID, NAME, POSITION, AGE, NATION, CLUB) 
               VALUES (player_seq.NEXTVAL, :name, :position, :age, :nation, :club)""",
            name=data.get('name'), position=data.get('position'), 
            age=data.get('age'), nation=data.get('nation'), club=data.get('club')
        )
        
        cursor.execute("DELETE FROM SYS.TRANSFERLIST WHERE ID = :id", id=data.get('id'))
        
        conn.commit()
        return jsonify({"message": "Zawodnik został przeniesiony do klubu i usunięty z listy transferowej"}), 201
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Błąd podczas przenoszenia zawodnika", "details": str(e)}), 500
    finally:
        if conn: conn.close()

@app.route("/transferlist", methods=["POST"])
def move_to_transferlist():
    data = request.json
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        cursor.execute(
            """INSERT INTO SYS.TRANSFERLIST (ID, NAME, POSITION, AGE, NATION, CLUB, PRICE) 
               VALUES (player_seq.NEXTVAL, :name, :position, :age, :nation, :club, :price)""",
            name=data.get('name'), position=data.get('position'), age=data.get('age'), 
            nation=data.get('nation'), club=data.get('club'), price=data.get('price')
        )
        
        cursor.execute("DELETE FROM SYS.PLAYERS WHERE ID = :id", id=data.get('id'))
        
        conn.commit()
        return jsonify({"message": "Zawodnik został przeniesiony do listy transferowej i usunięty z klubu"}), 201
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Błąd podczas przenoszenia zawodnika", "details": str(e)}), 500
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
            "SELECT * FROM SYS.USERS WHERE name = :name AND password = :password AND verify = 1",
            name=name, password=password
        )
        
        rows = cursor.fetchall()
        if len(rows) == 0:
            return jsonify({"error": "Niepoprawne dane logowania lub konto nie zostało zweryfikowane"}), 401

        user = rows[0]
        return jsonify({
            "success": True,
            "message": "Zalogowano pomyślnie!",
            "user": {
                "phone": user[0],
                "name": user[1],
                "password": user[2],
                "club": user[3],
                "role": user[4],
                "email": user[5],
                "verify": user[6] == 1,
                "avatar": user[7] or "",
            }
        })
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Error connecting to database", "details": str(e)}), 500
    finally:
        if conn: conn.close()

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    name = data.get('name')
    password = data.get('password')
    email = data.get('email')
    phone = data.get('phone')
    
    if not name or not password or not email or not phone:
        return jsonify({"error": "Imię, hasło, email i numer telefonu są wymagane"}), 400

    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM SYS.USERS WHERE email = :email OR phone = :phone", email=email, phone=phone)
        if len(cursor.fetchall()) > 0:
            return jsonify({"error": "Użytkownik o tym emailu lub numerze telefonu już istnieje"}), 400

        cursor.execute(
            """INSERT INTO SYS.USERS (name, password, club, email, phone, role, verify) 
               VALUES (:name, :password, :club, :email, :phone, :role, :verify)""",
            name=name, password=password, club=data.get('club'), 
            email=email, phone=phone, role=data.get('role'), verify=1 if data.get('verify') else 0
        )
        conn.commit()
        return jsonify({"success": True, "message": "Użytkownik został zarejestrowany pomyślnie"}), 201
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Błąd podczas rejestracji użytkownika", "details": str(e)}), 500
    finally:
        if conn: conn.close()

@app.route("/api/update-profile", methods=["POST"])
def update_profile():
    data = request.json
    phone = data.get('phone')

    if not phone:
        return jsonify({"error": "Numer telefonu jest wymagany"}), 400

    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        cursor.execute(
            """UPDATE SYS.USERS
               SET name = :name, password = :password, club = :club, email = :email, role = :role, avatar = :avatar
               WHERE phone = :phone""",
            name=data.get('name'), password=data.get('password'), club=data.get('club'), 
            email=data.get('email'), role=data.get('role'), avatar=data.get('avatar'), phone=phone
        )
        conn.commit()
        return jsonify({"success": True, "message": "Dane użytkownika zostały zaktualizowane"}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Błąd podczas aktualizacji danych użytkownika", "details": str(e)}), 500
    finally:
        if conn: conn.close()

@app.route("/api/user/<email>", methods=["GET"])
def get_user(email):
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM SYS.USERS WHERE email = :email", email=email)
        
        rows = cursor.fetchall()
        if len(rows) == 0:
            return jsonify({"error": "Użytkownik nie znaleziony"}), 404

        user = rows[0]
        return jsonify({
            "success": True,
            "user": {
                "phone": user[0],
                "name": user[1],
                "email": user[5],
                "role": user[4],
                "club": user[3],
                "avatar": user[7] or "",
                "verify": user[6] == 1,
            }
        })
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Błąd podczas pobierania danych użytkownika", "details": str(e)}), 500
    finally:
        if conn: conn.close()

@app.route("/api/delete-user/<phone>", methods=["DELETE"])
def delete_user(phone):
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM SYS.USERS WHERE phone = :phone", phone=phone)
        
        if cursor.rowcount == 0:
            return jsonify({"error": "Nie znaleziono użytkownika do usunięcia"}), 404

        conn.commit()
        return jsonify({"success": True, "message": "Użytkownik został pomyślnie usunięty"}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Błąd podczas usuwania użytkownika", "details": str(e)}), 500
    finally:
        if conn: conn.close()

@app.route("/players/<clubName>", methods=["GET"])
def get_players_by_club(clubName):
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM SYS.PLAYERS WHERE CLUB = :clubName", clubName=clubName)
        rows = cursor.fetchall()
        
        if len(rows) == 0:
            return jsonify({"error": "Nie znaleziono zawodników dla tego klubu"}), 404

        return jsonify(rows)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Błąd podczas pobierania zawodników", "details": str(e)}), 500
    finally:
        if conn: conn.close()

@app.route("/transferlist/<clubName>", methods=["GET"])
def get_transferlist_by_club(clubName):
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM SYS.TRANSFERLIST WHERE CLUB = :clubName", clubName=clubName)
        rows = cursor.fetchall()
        
        if len(rows) == 0:
            return jsonify({"error": "Nie znaleziono zawodników dla tego klubu"}), 404

        return jsonify(rows)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Błąd podczas pobierania zawodników", "details": str(e)}), 500
    finally:
        if conn: conn.close()

if __name__ == "__main__":
    app.run(port=5000, debug=True)