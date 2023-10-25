import { io } from "socket.io-client";

// const url = "https://videochat2-s7zy.onrender.com";
const url = "http://localhost:5000";

export const socket = io(url);
