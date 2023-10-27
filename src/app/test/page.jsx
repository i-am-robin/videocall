"use client";

import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";

const socket = io("https://videochat2-s7zy.onrender.com");

function Chattest() {
  const [videoStream, setVideoStream] = useState();
  const [peerId, setPeerId] = useState();
  const [otherPeerId, setOtherPeerId] = useState();
  const [socketId, setSocketId] = useState();
  const [geatingCall, setGeatingCall] = useState(false);

  const [caller, setCaller] = useState();

  const [users, setUsers] = useState([]);

  const userVideoRef = useRef();
  const callerVideoRef = useRef();

  const peerRef = useRef();

  useEffect(() => {
    try {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          setVideoStream(stream);
          userVideoRef.current.srcObject = stream;
        });
      4;

      socket.on("connect", () => {
        console.log("hi");
        socket.on("me", (id) => {
          console.log(id);
          setSocketId(id);
        });
      });
      4;

      socket.on("allUsers", (users) => {
        setUsers(users);
        console.log(users);
      });

      socket.on("hey", (data) => {
        setGeatingCall(true);
        setCaller(data.from);
        setOtherPeerId(data.signal);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: videoStream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        signalData: data,
        userToCall: id,
        from: socketId,
      });
    });

    peer.on("stream", (data) => {
      callerVideoRef.current.srcObject = data;
    });

    socket.on("callAccepted", (signal) => {
      peer.signal(signal);
    });
  }

  function ansPeer() {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: videoStream,
    });
    peer.on("signal", (data) => {
      socket.emit("acceptCall", { signal: data, to: caller });
    });

    peer.on("stream", (data) => {
      callerVideoRef.current.srcObject = data;
    });

    peer.signal(otherPeerId);
  }

  return (
    <div>
      <p>Socket id : {socketId}</p>
      {geatingCall ? <button onClick={ansPeer}>Answe call</button> : null}
      <br />
      <video autoPlay muted ref={userVideoRef}></video>
      <video autoPlay ref={callerVideoRef}></video>

      {users.map((user, i) => {
        return (
          <button className="block" onClick={() => callPeer(user)} key={i}>
            call: {user}
          </button>
        );
      })}
    </div>
  );
}

export default Chattest;
