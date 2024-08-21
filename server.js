import express from "express";
import oracledb from "oracledb";
import cors from "cors";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

const dbConfig = {
  user: "sys",
  password: "admin",
  connectString: "localhost:1521/FREE",
  privilege: oracledb.SYSDBA,
};

// Endpoint do pobierania graczy
app.get("/players", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute("SELECT * FROM PLAYERS");
    console.log("Query Result:", result.rows);
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

// Endpoint do logowania
app.post("/api/login", async (req, res) => {
  const { name, password } = req.body;
  let connection;

  console.log("Received login request:", { name, password });

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
        email: user[5],
        role: user[4],
        phone: user[6],
        club: user[3],
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
// Endpoint do rejestracji użytkownika
// Endpoint do rejestracji użytkownika
// Endpoint do rejestracji użytkownika
app.post("/api/register", async (req, res) => {
  const { name, password, club, email, phone, role, verify } = req.body;
  let connection;

  if (!name || !password || !email) {
    return res.status(400).json({ error: "Imię, hasło i email są wymagane" });
  }

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Sprawdź, czy użytkownik o danym emailu już istnieje
    const existingUser = await connection.execute(
      `SELECT * FROM USERS WHERE email = :email`,
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Użytkownik o tym emailu już istnieje" });
    }

    // Dodaj nowego użytkownika do bazy danych
    await connection.execute(
      `INSERT INTO USERS (name, password, club, email, phone, role, verify) 
       VALUES (:name, :password, :club, :email, :phone, :role, :verify)`,
      [name, password, club, email, phone, role, verify ? 1 : 0]
    );

    // Zatwierdź transakcję
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
// Endpoint do aktualizacji danych użytkownika
app.post("/api/update-profile", async (req, res) => {
  const { name, password, club, email, phone, role, avatar } = req.body;
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Aktualizuj dane użytkownika w bazie danych
    await connection.execute(
      `UPDATE USERS
       SET name = :name, password = :password, club = :club, email = :email,
           phone = :phone, role = :role, avatar = :avatar
       WHERE email = :email`,
      [name, password, club, email, phone, role, avatar, email]
    );

    // Zatwierdź transakcję
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
// Endpoint do pobierania danych użytkownika
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
      return res.status(404).json({
        error: "Użytkownik nie znaleziony",
      });
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
