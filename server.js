import { createServer } from "http"; // Correct import for HTTP server
import next from "next";
import { getSession } from "next-auth/react";
import { Server as SocketIOServer } from "socket.io";

// Custom server setup for Next.js with Socket.IO
const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const hostname = 'localhost'; // Default hostname, can be overridden by process.env.HOSTNAME

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = new SocketIOServer(server);

  // check if the user has been loged in
  io.use(async (socket, next) => {
    const session = await getSession({ req: socket.request });

    if (session) {
      socket.session = session;
      next()
    } else {
      return;
    }
  })

  io.on("connection", (socket) => {
    socket.on("join", (roomId) => {
      socket.join(roomId)
    })
    socket.on("send-message", (message) => {
      io.to(socket.id).emit("recive-message", message);
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
