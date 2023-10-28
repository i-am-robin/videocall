"use client";
import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";

// const socket = io("https://videochat2-s7zy.onrender.com");
const socket = io("http://localhost:5000/");

function Chattest() {
  const [videoStream, setVideoStream] = useState();
  const [socketId, setSocketId] = useState();
  const [geatingCall, setGeatingCall] = useState(false);
  const [caller, setCaller] = useState();
  const [users, setUsers] = useState([]);

  const userVideoRef = useRef();
  const callerVideoRef = useRef();

  const peerRef = useRef();

  useEffect(() => {
    // Request user media here
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setVideoStream(stream);
        userVideoRef.current.srcObject = stream;
      } catch (error) {
        console.log(error);
      }
    };

    getMedia();

    socket.on("me", (id) => {
      setSocketId(id);
    });

    socket.on("allUsers", (users) => {
      console.log(users);
      setUsers(users);
    });

    socket.on("call-received", (data) => {
      setGeatingCall(true);
      setCaller(data.from);
      // Create a new Peer object to answer the call
      const peer = new Peer({
        initiator: false, // The peer is not the initiator
        stream: videoStream,
      });
      peer.signal(data.signal);
      peerRef.current = peer;
    });
  }, []);

  const callPeer = (id) => {
    // Create a new Peer object to initiate a call
    const peer = new Peer({
      initiator: true,
      stream: videoStream,
    });

    peer.on("signal", (data) => {
      socket.emit("call-user", {
        signalData: data,
        userToCall: id,
        from: socketId,
      });
    });

    peer.on("stream", (data) => {
      callerVideoRef.current.srcObject = data;
    });

    socket.on("call-accepted", (signal) => {
      peer.signal(signal);
    });

    peerRef.current = peer; // Store the peer object
  };

  const hangUp = () => {
    if (peerRef.current) {
      peerRef.current.destroy();
      window.location.reload(); // Reload the page to reset the connection
    }
  };

  return (
    <div>
      {/* Add UI components for video display and call controls */}
      {users.map((user, i) => (
        <button key={i} onClick={callPeer(user)}>
          Call:{user}
        </button>
      ))}
      {geatingCall && (
        <div>
          <p>Incoming call from {caller}</p>
          <button onClick={hangUp}>Hang Up</button>
        </div>
      )}
      <video ref={userVideoRef} autoPlay playsInline />
      <video ref={callerVideoRef} autoPlay playsInline />
    </div>
  );
}

export default Chattest;
