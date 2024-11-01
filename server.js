import { createServer } from "http";
import next from "next";
import { getSession } from "next-auth/react";
import { Server as SocketIOServer } from "socket.io";
import { DB } from "tspace-mysql";
import Messages from "./DB/models/Message.js";
// Custom server setup for Next.js with Socket.IO
const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const hostname = "localhost";

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = new SocketIOServer(server);

  let session;
  const users = [];

  // check if the user has been loged in
  io.use(async (socket, next) => {
    session = await getSession({ req: socket.request });

    // Check if the user have the session else prevent the server to start
    if (session) {
      socket.session = session;
      next()
    } else {
      // Return if not logged in
      return;
    }
  })

  io.on("connection", async (socket) => {
    // Check event join
    socket.on("join", (roomId) => {
      socket.join(roomId)
    })

    socket.on("user_connected", (username) => {
      users[username] = socket.id;
    })

    socket.on("send-message", async (data) => {

      const username = data.username;
      const { msg, sender } = data;

      const user = await new DB("users")
        .where("username", "=", username)
        .first();

      if (!user) return;

      const message = {
        message: msg,
        username,
        type: 1,
        sender
      }

      console.log(message);
      console.log(Messages);
      
      // Import messages to database.

      io.to(users[username]).emit("receive-message", message);
    })

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  server.listen(port, hostname, (err) => {
    if (err) {
      process.exit(1);
    }
    console.log(`> Ready on http://${hostname}:${port}`);
  });
}).catch((err) => {
  console.error("Error preparing app:", err);
  process.exit(1);
});
