"use client";
import { CallContext } from "@/Context/CallContext";
import CallController from "@/components/CallController";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";

function CallScreenPage() {
  const [callId, setCallId] = useState();
  const { peerId, makeCall, callerMedia, userMedia, callerVideo, userVideo } =
    useContext(CallContext);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="bg-black-dark h-screen ">
      <video
        ref={callerVideo}
        autoPlay
        className="h-screen w-screen p-10 rounded-md overflow-hidden absolute bg-grey-100"></video>
      <div className="absolute top-5 right-5 border-2 border-prymary w-52 rounded-md bg-grey-400 overflow-hidden shadow-xl h-fit">
        <video ref={userVideo} autoPlay></video>
      </div>
      <div className="my-10 absolute left-1/2 -translate-x-1/2 text-center flex flex-col items-center gap-1">
        <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-prumary">
          <Image
            src={"/images/profile.jpg"}
            height={100}
            width={100}
            className="object-cover"
            alt="a"
          />
        </div>
        <h2>Robin Mia</h2>
        <span>Calling</span>
      </div>
      <div className="absolute top-2 left-2">
        <p>{peerId}</p>
        <input type="text" onChange={(e) => setCallId(e.target.value)} />
        <button onClick={() => makeCall(callId)}>Call</button>
      </div>
      <CallController />
    </div>
  );
}

export default CallScreenPage;
