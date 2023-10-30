"use client";
import React, { createContext, useEffect, useRef, useState } from "react";

export const CallContext = createContext();

function CallContextProvider({ children }) {
  const [peerId, setPeerId] = useState();
  const [userMedia, setUserMedia] = useState();

  const [callerMedia, setCallerMedia] = useState();

  const peerInstance = useRef(null);

  const callerVideo = useRef();
  const userVideo = useRef();

  useEffect(() => {
    import("peerjs").then(({ default: Peer }) => {
      const peer = new Peer();

      peer.on("open", (id) => {
        setPeerId(id);
      });

      peer.on("call", (call) => {
        navigator.mediaDevices
          .getUserMedia({ audio: true, video: true })
          .then((stream) => {
            call.answer(stream);
            call.on("stream", function (remoteStream) {
              if (callerVideo.current) {
                callerVideo.current.srcObject = remoteStream;
              }
            });
          });
      });

      peerInstance.current = peer;
    });
  }, []);

  const getMedia = async () => {
    const media = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    return media;
  };

  async function makeCall(id) {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        setUserMedia(stream);
        const call = peerInstance.current.call(id, stream);

        call.on("stream", (remoteStream) => {
          if (callerVideo.current) {
            callerVideo.current.srcObject = remoteStream;
          }
        });
      });
  }

  function ansCall() {
    //
  }
  return (
    <CallContext.Provider
      value={{
        peerId,
        makeCall,
        callerMedia,
        userMedia,
        callerVideo,
        userVideo,
      }}>
      {children}
    </CallContext.Provider>
  );
}

export default CallContextProvider;
