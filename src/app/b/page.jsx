"use client";

import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";

function P() {
  const offerSdp = useRef();
  const ansSdp = useRef();

  const [localStrim, setLocaStream] = useState();
  const [remotelstrim, setRemoteStream] = useState();

  const userStream = useRef();
  const remoteStream = useRef();

  const peerInstance = useRef();

  const remoteVIdeo = useRef();

  let servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.1.google.com:19302",
          "stun:stun2.1.google.com:19302",
        ],
      },
    ],
  };

  // useEffect(() => {
  //   async function run() {
  //     const st = await navigator.mediaDevices.getUserMedia({
  //       video: true,
  //       audio: true,
  //     });

  //     setLocaStream(st);
  //     userStream.current.srcObject = st;
  //   }

  //   run();
  // }, []);

  const createPeerOffer = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    userStream.current.srcObject = stream;
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: [
              "stun:stun1.1.google.com:19302",
              "stun:stun2.1.google.com:19302",
            ],
          },
        ],
      },
      // wrtc: {},
      stream: stream,
    });

    peer.on("signal", (data) => {
      offerSdp.current.value = JSON.stringify(data);
    });

    peer.on("stream", (stream) => {
      remoteStream.current.srcObject = stream;
    });

    peerInstance.current = peer;
  };

  const addAns = async () => {
    peerInstance.current.signal(ansSdp.current.value);
  };

  const createAns = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    userStream.current.srcObject = stream;
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      ansSdp.current.value = JSON.stringify(data);
    });

    peer.on("stream", (stream) => {
      remoteStream.current.srcObject = stream;
    });

    peer.signal(offerSdp.current.value);
  };

  return (
    <div className="bg-black-dark h-screen">
      <video
        autoPlay
        ref={userStream}
        className="border border-prymary inline-flex m-2 h-60"></video>
      <video
        autoPlay
        ref={remoteStream}
        className="border border-prymary inline-flex m-2 h-60"></video>
      <br />
      <button onClick={createPeerOffer}>Create offer</button>

      <br />
      <br />
      <br />

      <p>SDP Offer</p>
      <textarea ref={offerSdp} className="w-full mx-2 rounded-sm"></textarea>

      <br />
      <br />
      <br />

      <button onClick={addAns}>Add Ans</button>
      <p>ans offer</p>
      <textarea ref={ansSdp} className="w-full mx-2 rounded-sm"></textarea>
      <button onClick={createAns}>Create Ans</button>
    </div>
  );
}

export default P;
