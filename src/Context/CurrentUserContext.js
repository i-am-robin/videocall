"use client";

import { createContext, useEffect } from "react";

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      socket.on("yourId", (id) => {
        setSocketId(id);
      });
    });
    import("peerjs").then(({ default: Peer }) => {
      // normal synchronous code
      const peer = new Peer();
      peer.on("open", (id) => {
        setPeerId(id);
        socket.emit("newId", {
          name: usreName,
          peerId: id,
          socketId: socket.id,
        });
      });

      peer.on("call", (call) => {
        var getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia;

        getUserMedia({ video: true, audio: true }, (mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
          call.answer(mediaStream);
          call.on("stream", function (remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        });
      });

      peerInstance.current = peer;
    });

    socket.on("allUsers", (users) => {
      setallUsers(users);
      console.log(users);
    });
  }, []);

  return <SocketContext.Provider value={""}>{children}</SocketContext.Provider>;
};
