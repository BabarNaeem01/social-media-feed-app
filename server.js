const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 4102;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "assignment3_app2"
});

app.get("/posts", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, user_id, title, body FROM posts ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`App 2 server running on http://localhost:${PORT}`);
});
