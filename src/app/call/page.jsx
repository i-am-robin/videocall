"use client";
import { socket } from "@/lib/socket.io/socket";
import { data } from "autoprefixer";
import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";

function CallPage() {
  const [userStrem, setUserStrim] = useState();
  const [callToId, setCallToId] = useState();
  const [userId, setUserId] = useState();
  const [allUsers, setAllUsers] = useState();
  const [callerSignal, setCallerSignal] = useState();
  const [caller, setCaller] = useState();

  const userVideoRef = useRef();
  const callerVideoRef = useRef();

  useEffect(() => {
    socket.on("yourId", (id) => {
      setUserId(id);
    });

    socket.on("allUsers", (users) => {
      console.log(users);
      setAllUsers(users);
    });

    socket.on("call", (data) => {
      console.log("get a call");
      setCallerSignal(data.signal);
      setCaller(data.from);
    });

    return () => {};
  }, []);

  const callPeer = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    userVideoRef.current.srcObject = stream;

    setUserStrim(stream);

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: userStrem,
    });

    peer.on("signal", (data) => {
      setUserId(data);
      socket.emit("callUser", {
        userTocall: callToId,
        signal: data,
        from: userId,
      });
    });

    peer.on("stream", (stream) => {
      console.log("acept:" + data);
      callerVideoRef.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      peer.signal(signal);
      console.log("accepted");
    });
  };

  const acceptCall = () => {
    return;
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: userStrem,
    });

    peer.on("signal", (data) => {
      console.log(data);
      socket.emit("acceptCall", { signal: data, to: data.from });
    });

    peer.on("stream", (stream) => {
      callerVideoRef.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  };

  return (
    <div>
      <p>your id is : {userId}</p>
      <input
        type="text"
        className=""
        value={callToId}
        onChange={(e) => setCallToId(e.target.value)}
      />
      <video
        ref={userVideoRef}
        autoPlay
        className="h-96 w-96 border border-red-600"></video>

      <video
        ref={callerVideoRef}
        autoPlay
        className="h-96 w-96 my-1 border border-green-600"></video>

      <button onClick={callPeer}>Click</button>
      <p>{caller} is calling you</p>
      <button onClick={acceptCall}>Accept call</button>

      {/* {allUsers.keys(users).map((key) => {
        console.log(key);
      })} */}
    </div>
  );
}

export default CallPage;
