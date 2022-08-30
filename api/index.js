const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
var cookieParser = require("cookie-parser");
const socketio = require("socket.io");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const cors = require("cors");
const { findRoom, count_increment, count_decrement } = require("./rooms");

dotenv.config();

mongoose
  .connect(
    "mongodb+srv://WatchParty:zprNmClV5Zes3yqw@cluster0.xm1dd.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

// app.use(cors());
app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);
  // console.log(req.body);
  next();
});

app.use(express.json());
app.use(cookieParser());

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// app.get('/', ()=>{"server is up and running"})
app.use("/api/auth", authRoute);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("made socket connection", socket.id);

  socket.on("join", ({ username, room_credentials }, callback) => {
    console.log("recieved join request");
    const { error1, room_id } = findRoom({
      room_id: room_credentials.room_id,
      room_pass: room_credentials.room_pass,
    });
    if (error1) {
      console.log("line no 68", error1);
      return callback(error1);
    }

    const { error, user } = addUser({
      socket_id: socket.id,
      username,
      room_id,
    });

    if (error) {
      return callback(error);
    }

    count_increment(room_id);
    socket.join(user.room_id);
    console.log(
      `${user.username} having socket id ${user.socket_id} joined in ${user.room_id}`
    );

    socket.emit("message", {
      user: "admin",
      text: `Hi ${user.username} ! Welcome to the room "${user.room_id}"`,
    });
    socket.broadcast
      .to(user.room_id)
      .emit("message", { user: "admin", text: `${user.username} has joined` });

    io.to(user.room_id).emit("roomData", {
      room_id: user.room_id,
      users: getUsersInRoom(user.room_id),
    });
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room_id).emit("message", { user: user.username, text: message });
    callback();
  });
  socket.on("videoURL", (URL) => {
    const user = getUser(socket.id);
    console.log("URL recieved");
    socket.broadcast.to(user.room_id).emit("videoURLRecieved", URL);
    console.log("URL broadcasted");
  });
  socket.on("play", (t) => {
    console.log(t);
    const user = getUser(socket.id);
    console.log("play recieved");
    socket.broadcast.to(user.room_id).emit("play", t);
    console.log("play broadcasted");
  });
  socket.on("pause", (t) => {
    console.log(t);
    const user = getUser(socket.id);
    console.log("pause recieved");
    socket.broadcast.to(user.room_id).emit("pause", t);
    console.log("pause broadcasted");
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (!user) {
      return;
    }
    count_decrement(user.room_id);
    console.log(`${socket.id} disconnected`);

    if (user) {
      io.to(user.room_id).emit("message", {
        user: "admin",
        text: `${user.username} has left.`,
      }); //When the user will leave a message will be sent to all the other users in that room that this person left
      io.to(user.room_id).emit("roomData", {
        room: user.room_id,
        users: getUsersInRoom(user.room_id),
      }); //room data should be updated. So room data has to be sent.
    }
  });
});
