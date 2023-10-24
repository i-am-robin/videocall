"use client";
import { socket } from "@/lib/socket.io/socket";
import React, { useEffect, useState, useRef } from "react";
import Peer from "simple-peer";

function App() {
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();

  const getStream = async () => {
    const videoStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    userVideo.current.srcObject = videoStream;

    setStream(videoStream);

    return videoStream;
  };

  useEffect(() => {
    getStream();

    socket.on("yourID", (id) => {
      setYourID(id);
    });

    socket.on("allUsers", (users) => {
      setUsers(users);
    });

    socket.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: yourID,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("acceptCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  return (
    <div>
      <p>YOur id: {yourID}</p>
      <div>
        <video autoPlay ref={userVideo}></video>
        <video autoPlay ref={partnerVideo}></video>
      </div>
      <div>
        {Object.keys(users).map((key, i) => {
          if (key === yourID) {
            return <p>{"you: " + yourID}</p>;
          }
          return (
            <button key={i} className="block" onClick={() => callPeer(key)}>
              Call {key}
            </button>
          );
        })}
      </div>
      {receivingCall && (
        <div>
          <h1>{caller} is calling you</h1>
          <button onClick={acceptCall}>Accept</button>
        </div>
      )}
    </div>
  );
}

export default App;
