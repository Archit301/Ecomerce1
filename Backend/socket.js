import { Server } from "socket.io";

let io; // Declare a variable to store the Socket.IO instance

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Allow all origins for development
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New Client Connected", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });
  });

  return io;  // Return the io instance
};