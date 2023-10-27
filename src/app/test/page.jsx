"use client";

import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";

function Page() {
  const [steam, setSteam] = useState();
  const [peerId, setPeerId] = useState();
  const [otherPeerId, setOtherPeerId] = useState();

  const userVideoRef = useRef();
  const peerVideoRef = useRef();
  const peerInstance = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((steam) => {
        setSteam(steam);
        userVideoRef.current.srcObject = steam;
      });
  }, []);

  function callPeer() {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: steam,
    });

    peer.on("signal", (data) => {
      setPeerId(JSON.stringify(data));
    });

    peer.on("stream", (stream) => {
      peerVideoRef.current.srcObject = steam;
    });

    peerInstance.current = peer;
  }

  function connectPeer() {
    peerInstance.current.signal(otherPeerId);
  }

  function acceptCall() {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: steam,
    });

    peer.on("signal", (data) => {
      setPeerId(JSON.stringify(data));
    });

    peer.on("stream", (steam) => {
      peerVideoRef.current.srcObject = steam;
    });

    peer.signal(otherPeerId);
  }

  return (
    <div>
      <button onClick={callPeer} className="bg-grey-300">
        make Call
      </button>
      <button onClick={acceptCall} className="bg-grey-300">
        accept call
      </button>
      <button onClick={connectPeer} className="bg-prymary">
        ConnectPeer other id
      </button>
      <p className="text-red-prymary ">{peerId}</p>

      <textarea
        cols="30"
        rows="10"
        onChange={(e) => setOtherPeerId(e.target.value)}
        value={otherPeerId}
        className="bg-transparent text-red-prymary m-2 rounded-md bg-white-prymary border border-red-prymary"></textarea>

      <video
        autoPlay
        muted
        ref={userVideoRef}
        className="bg-grey-300 rounded-md m-2"></video>
      <video
        autoPlay
        ref={peerVideoRef}
        className="bg-grey-300 rounded-md m-2"></video>
    </div>
  );
}

export default Page;
