const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "roshan@123",
  database: "music_event"
};

let db;

async function connectDatabase() {
  const temp = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password
  });

  await temp.query("CREATE DATABASE IF NOT EXISTS music_event");
  await temp.end();

  db = await mysql.createPool(dbConfig);

  await db.query(`
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      event_name VARCHAR(100) NOT NULL,
      artist VARCHAR(100) NOT NULL,
      genre VARCHAR(50) NOT NULL,
      venue VARCHAR(100) NOT NULL,
      event_date DATE NOT NULL,
      status VARCHAR(30) NOT NULL
    )
  `);

  console.log("MySQL connected and events table is ready.");
}

app.get("/api/events", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM events ORDER BY id DESC"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Could not load events."
    });
  }
});

app.post("/api/events", async (req, res) => {
  try {
    const {
      event_name,
      artist,
      genre,
      venue,
      event_date,
      status
    } = req.body;

    if (
      !event_name ||
      !artist ||
      !genre ||
      !venue ||
      !event_date ||
      !status
    ) {
      return res.status(400).json({
        message: "Please fill in all fields."
      });
    }

    const [result] = await db.query(
      `INSERT INTO events
       (event_name, artist, genre, venue, event_date, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        event_name,
        artist,
        genre,
        venue,
        event_date,
        status
      ]
    );

    const [rows] = await db.query(
      "SELECT * FROM events WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Could not add event."
    });
  }
});

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running at http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "Database connection failed:",
      error.message
    );
  });