import express from "express";
import oracledb from "oracledb";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

const dbConfig = {
  user: "sys",
  password: "admin",
  connectString: "localhost:1521/FREE",
  privilege: oracledb.SYSDBA,
};

app.get("/players", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute("SELECT * FROM PLAYERS");
    res.json(result.rows);
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ error: "Error connecting to database", details: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the connection", err);
      }
    }
  }
});

app.post("/api/login", async (req, res) => {
  const { name, password } = req.body;
  let connection;

  if (!name || !password) {
    return res
      .status(400)
      .json({ error: "Nazwa użytkownika i hasło są wymagane" });
  }

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM USERS WHERE name = :name AND password = :password AND verify = 1`,
      [name, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Niepoprawne dane logowania lub konto nie zostało zweryfikowane",
      });
    }

    const user = result.rows[0];
    res.json({
      success: true,
      message: "Zalogowano pomyślnie!",
      user: {
        phone: user[0],
        name: user[1],
        password: user[2],
        club: user[3],
        role: user[4],
        email: user[5],
        verify: user[6] === 1,
        avatar: user[7] || "",
      },
    });
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ error: "Error connecting to database", details: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the connection", err);
      }
    }
  }
});

app.post("/api/register", async (req, res) => {
  const { name, password, club, email, phone, role, verify } = req.body;
  let connection;

  if (!name || !password || !email || !phone) {
    return res
      .status(400)
      .json({ error: "Imię, hasło, email i numer telefonu są wymagane" });
  }

  try {
    connection = await oracledb.getConnection(dbConfig);

    const existingUser = await connection.execute(
      `SELECT * FROM USERS WHERE email = :email OR phone = :phone`,
      [email, phone]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        error: "Użytkownik o tym emailu lub numerze telefonu już istnieje",
      });
    }

    await connection.execute(
      `INSERT INTO USERS (name, password, club, email, phone, role, verify) 
        VALUES (:name, :password, :club, :email, :phone, :role, :verify)`,
      [name, password, club, email, phone, role, verify ? 1 : 0]
    );

    await connection.commit();

    res.status(201).json({
      success: true,
      message: "Użytkownik został zarejestrowany pomyślnie",
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      error: "Błąd podczas rejestracji użytkownika",
      details: err.message,
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the connection", err);
      }
    }
  }
});

app.post("/api/update-profile", async (req, res) => {
  const { phone, name, password, club, email, role, avatar } = req.body;
  let connection;

  if (!phone) {
    return res.status(400).json({ error: "Numer telefonu jest wymagany" });
  }

  try {
    connection = await oracledb.getConnection(dbConfig);

    console.log("Updating user with phone:", phone); // Dodaj ten wiersz do debugowania

    await connection.execute(
      `UPDATE USERS
        SET name = :name, password = :password, club = :club, email = :email,
            role = :role, avatar = :avatar
        WHERE phone = :phone`,
      [name, password, club, email, role, avatar, phone]
    );

    console.log("User updated"); // Dodaj ten wiersz do debugowania

    await connection.commit();
    res.status(200).json({
      success: true,
      message: "Dane użytkownika zostały zaktualizowane",
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      error: "Błąd podczas aktualizacji danych użytkownika",
      details: err.message,
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the connection", err);
      }
    }
  }
});

app.get("/api/user/:email", async (req, res) => {
  const { email } = req.params;
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM USERS WHERE email = :email`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Użytkownik nie znaleziony" });
    }

    const user = result.rows[0];
    res.json({
      success: true,
      user: {
        phone: user[0],
        name: user[1],
        email: user[5],
        role: user[4],
        club: user[3],
        avatar: user[7] || "",
        verify: user[6] === 1,
      },
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      error: "Błąd podczas pobierania danych użytkownika",
      details: err.message,
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the connection", err);
      }
    }
  }
});

app.delete("/api/delete-user/:phone", async (req, res) => {
  const { phone } = req.params;
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `DELETE FROM USERS WHERE phone = :phone`,
      [phone]
    );

    if (result.rowsAffected === 0) {
      return res
        .status(404)
        .json({ error: "Nie znaleziono użytkownika do usunięcia" });
    }

    await connection.commit();
    res
      .status(200)
      .json({ success: true, message: "Użytkownik został pomyślnie usunięty" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      error: "Błąd podczas usuwania użytkownika",
      details: err.message,
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the connection", err);
      }
    }
  }
});

app.listen(port, () => {
  console.log("Działa");
});
