const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dish_management",
});

app.get("/api/dishes", (req, res) => {
  db.query("SELECT * FROM dishes", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.patch("/api/dishes/:id", (req, res) => {
  const { id } = req.params;
  const newStatus = req.body.is_published;

  db.query(
    "UPDATE dishes SET is_published = ? WHERE dish_id = ?",
    [newStatus, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      io.emit("dishUpdated", { id, is_published: newStatus });
      res.sendStatus(204);
    }
  );
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});
