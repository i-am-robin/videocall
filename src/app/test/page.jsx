"use client";

import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";

function Chattest() {
  const [videoStream, setVideoStream] = useState();
  const [peerId, setPeerId] = useState();
  const [otherPeerId, setOtherPeerId] = useState();

  const userVideoRef = useRef();
  const callerVideoRef = useRef();

  const peerRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setVideoStream(stream);
        userVideoRef.current.srcObject = stream;
      });

    return () => {};
  }, []);

  function makeNewCall() {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: videoStream,
    });

    peer.on("signal", (data) => {
      setPeerId(JSON.stringify(data));
    });

    peer.on("stream", (data) => {
      callerVideoRef.current.srcObject = data;
    });

    peerRef.current = peer;
  }

  function connectAns() {
    peerRef.current.signal(otherPeerId);
  }

  function ansPeer() {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: videoStream,
    });
    peer.on("signal", (data) => {
      setPeerId(JSON.stringify(data));
    });

    peer.on("stream", (data) => {
      callerVideoRef.current.srcObject = data;
    });

    peer.signal(otherPeerId);
  }

  return (
    <div>
      <textarea
        cols="30"
        rows="10"
        value={peerId}
        className="border-red-prymary text-black-dark border-2 block m-2 rounded-md px-2"></textarea>
      <button onClick={makeNewCall}>Make call</button>
      <textarea
        cols="30"
        rows="10"
        value={otherPeerId}
        onChange={(e) => setOtherPeerId(e.target.value)}
        className="border-red-prymary text-black-dark border-2 block m-2 rounded-md px-2"></textarea>
      <button onClick={ansPeer}>AnsCall</button>
      <br />
      <button onClick={connectAns}>Conect for caller</button>

      <video autoPlay muted ref={userVideoRef}></video>
      <video autoPlay ref={callerVideoRef}></video>
    </div>
  );
}

export default Chattest;
