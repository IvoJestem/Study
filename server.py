import os
import re 
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import oracledb

os.environ["NLS_LANG"] = ".AL32UTF8"

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

def parse_price(price_str):
    if not price_str:
        return 0
    price_str = str(price_str).replace(',', '.')
    numeric_part = re.sub(r'[^\d.]', '', price_str)
    
    if not numeric_part:
        return 0
        
    numeric_value = float(numeric_part)
    price_lower = price_str.lower()
    
    if 'mln' in price_lower:
        return numeric_value * 1000000
    elif 'tys' in price_lower or 'tyś' in price_lower:
        return numeric_value * 1000
        
    return numeric_value


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
    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT ID, NAME, POSITION, AGE, NATION, CLUB, PRICE FROM SYS.PLAYERS WHERE CLUB = :clubName", clubName=clubName)
                columns = [col[0] for col in cursor.description]
                rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
                return jsonify(rows), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/transferlist/<clubName>", methods=["GET"])
def get_transferlist_by_club(clubName):
    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT ID, NAME, POSITION, AGE, NATION, CLUB, PRICE FROM SYS.TRANSFERLIST WHERE CLUB = :clubName", clubName=clubName)
                columns = [col[0] for col in cursor.description]
                rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
                return jsonify(rows), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/shortlist", methods=["GET"])
def get_shortlist():
    phone = request.args.get('phone')
    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("""
                    SELECT ID, NAME, POSITION, AGE, NATION, CLUB, PRICE FROM SYS.TRANSFERLIST WHERE ID IN (SELECT PLAYER_ID FROM SYS.SHORTLIST WHERE PHONE = :phone)
                    UNION
                    SELECT ID, NAME, POSITION, AGE, NATION, CLUB, PRICE FROM SYS.PLAYERS WHERE ID IN (SELECT PLAYER_ID FROM SYS.SHORTLIST WHERE PHONE = :phone)
                """, phone=phone)
                columns = [col[0] for col in cursor.description]
                rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
                return jsonify(rows)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/shortlist/ids", methods=["GET"])
def get_shortlist_ids():
    phone = request.args.get('phone')
    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT PLAYER_ID FROM SYS.SHORTLIST WHERE PHONE = :phone", phone=phone)
                rows = [row[0] for row in cursor.fetchall()]
                return jsonify(rows)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/shortlist", methods=["POST"])
def add_to_shortlist():
    data = request.json
    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT 1 FROM SYS.SHORTLIST WHERE PHONE = :phone AND PLAYER_ID = :id", phone=data.get('phone'), id=data.get('id'))
                if cursor.fetchone():
                    return jsonify({"error": "Już jest na liście"}), 400
                
                cursor.execute("INSERT INTO SYS.SHORTLIST (PHONE, PLAYER_ID) VALUES (:phone, :id)", phone=data.get('phone'), id=data.get('id'))
                conn.commit()
                return jsonify({"success": True}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/shortlist", methods=["DELETE"])
def remove_from_shortlist():
    phone = request.args.get('phone')
    player_id = request.args.get('id')
    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("DELETE FROM SYS.SHORTLIST WHERE PHONE = :phone AND PLAYER_ID = :id", phone=phone, id=player_id)
                conn.commit()
                return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/users/unverified", methods=["GET"])
def get_unverified_users():
    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT phone, name, email, role, club FROM SYS.USERS WHERE verify = 0")
                columns = [col[0] for col in cursor.description]
                rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
                return jsonify(rows)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/users/verify/<phone>", methods=["POST"])
def verify_user(phone):
    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("UPDATE SYS.USERS SET verify = 1 WHERE phone = :phone", phone=phone)
                conn.commit()
                return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
# DO IMPLEMENTACJI W FRONT
@app.route('/api/buy-player', methods=['POST'])
def buy_player():
    data = request.json
    user_phone = data.get('userPhone')
    player_id = data.get('playerId')
    player_price_string = data.get('playerPriceString')
    new_club = data.get('newClub')

    player_price = parse_price(player_price_string)

    connection = None
    cursor = None
    try:
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT BUDGET FROM SYS.USERS WHERE PHONE = :phone", phone=user_phone)
        row = cursor.fetchone()

        if not row:
            return jsonify({"success": False, "error": "Nie znaleziono konta użytkownika w bazie."}), 404

        current_budget = row[0]
        if current_budget is None:
            current_budget = 0 

        if current_budget < player_price:
            return jsonify({"success": False, "error": f"Odmowa: Brak środków! Masz {current_budget:,.0f}, a potrzebujesz {player_price:,.0f}."}), 400

        new_budget = current_budget - player_price

        cursor.execute("""
            UPDATE SYS.USERS 
            SET BUDGET = :new_budget 
            WHERE PHONE = :phone
        """, new_budget=new_budget, phone=user_phone)

        cursor.execute("""
            INSERT INTO SYS.PLAYERS (ID, NAME, POSITION, AGE, NATION, CLUB)
            SELECT ID, NAME, POSITION, AGE, NATION, :new_club
            FROM SYS.TRANSFERLIST
            WHERE ID = :player_id
        """, new_club=new_club, player_id=player_id)
        cursor.execute("""
            DELETE FROM SYS.TRANSFERLIST 
            WHERE ID = :player_id
        """, player_id=player_id)
        connection.commit()

        return jsonify({
            "success": True, 
            "message": "Transfer zakończony sukcesem! Zawodnik dołącza do Twojej drużyny.",
            "remainingBudget": new_budget
        }), 200

    except Exception as e:
        if connection:
            connection.rollback()
        print("Błąd podczas kupowania zawodnika:", e)
        return jsonify({"success": False, "error": "Wystąpił błąd serwera podczas finalizacji transferu.", "details": str(e)}), 500
        
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

@app.route("/api/users/all", methods=["GET"])
def get_all_users():
    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT phone, name, email, role, club, verify FROM SYS.USERS")
                columns = [col[0] for col in cursor.description]
                rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
                return jsonify(rows)
    except Exception as e:
        return jsonify({"error": str(e)}), 500           
     
if __name__ == "__main__":
    app.run(port=5000, debug=True)