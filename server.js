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
        id: user[0],
        name: user[1],
        password: user[2],
        club: user[3],
        role: user[4],
        email: user[5],
        phone: user[6],
        verify: user[7] === 1,
        avatar: user[8] || "",
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

  if (!name || !password || !email) {
    return res.status(400).json({ error: "Imię, hasło i email są wymagane" });
  }

  try {
    connection = await oracledb.getConnection(dbConfig);

    const existingUser = await connection.execute(
      `SELECT * FROM USERS WHERE email = :email`,
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Użytkownik o tym emailu już istnieje" });
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
  const { id, name, password, club, email, phone, role, avatar } = req.body;
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `UPDATE USERS
       SET name = :name, password = :password, club = :club, email = :email,
           phone = :phone, role = :role, avatar = :avatar
       WHERE id = :id`,
      [name, password, club, email, phone, role, avatar, id]
    );
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
        id: user[0],
        name: user[1],
        email: user[5],
        role: user[4],
        phone: user[6],
        club: user[3],
        avatar: user[7] || "",
        verify: user[8] || true,
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

app.listen(port, () => {});
