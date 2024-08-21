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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
