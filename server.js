const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require("dotenv").config({ path: "./.env" });
const connectDb = require("./utilsServer/connectDb");
connectDb();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const {
  addUser,
  deleteUser,
  findConnection,
} = require("./utilsServer/findUser");
const {
  loadMessages,
  sendMsg,
  setMsgToUnread,
  deleteMsg,
} = require("./utilsServer/messageUtils");

const { likeOrUnlike } = require("./utilsServer/likeOrUnlike");

io.on("connection", (socket) => {
  socket.on("join", async ({ userId }) => {
    const users = await addUser(userId, socket.id);
    console.log(users);

    setInterval(() => {
      socket.emit("activeChats", {
        users: users.filter((user) => user.userId !== userId),
      });
    }, 10000);
  });

  socket.on("likePost", async ({ postId, userId, like }) => {
    const { success, name, dpLink, username, postByUserId, error } =
      await likeOrUnlike(postId, userId, like);

    if (success) {
      socket.emit("postLiked");

      if (postByUserId !== userId) {
        const receiverSocket = findConnection(postByUserId);


        