import { io } from "socket.io-client";

const url = "https://videochat2-s7zy.onrender.com";

export const socket = io(url);
