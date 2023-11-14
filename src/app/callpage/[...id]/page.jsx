"use client";
import { UserContext } from "@/Context/UserContext";
import CallController from "@/components/CallController";
import {
  MicrophoneIcon,
  PhoneIcon,
  VideoCameraSlashIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000/");

function CallScreenPage({ params }) {
  const { makeCall, ansCall, callerVideo, userVideo, setCurrentChatUser } =
    useContext(UserContext);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("getPeerId", params.id[0]);
      socket.on("toPeerId", (user) => {
        console.log(user);
        if (user === "not found") {
          return console.log("active false");
        }
        makeCall(user[0].peerId);
      });
    });
  }, []);

  return (
    <div className="bg-black-dark h-screen ">
      <div className="h-screen w-screen absolute">
        <video ref={callerVideo} autoPlay className="h-screen w-screen"></video>
      </div>

      {/* user video */}
      <div className="absolute top-3 right-3 bg-grey-300 h-fit w-44 border-2 shadow-lg border-prymary rounded-md overflow-hidden ">
        <video ref={userVideo} autoPlay className="w-full"></video>
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

      {/* <div className="bg-white-prymary bg-opacity-20  w-fit fixed left-1/2 bottom-5 -translate-x-1/2 rounded-full px-2 py-2 flex gap-10 items-center justify-between">
        <button
          onClick={() => {
            null;
          }}
          className="bg-red-prymary hover:bg-opacity-60 rounded-full p-2">
          <PhoneIcon height={20} color="#FEFEFD" />
        </button>
        <button
          onClick={() => {
            ansCall();
          }}
          className="bg-prymary hover:bg-opacity-60 rounded-full p-2">
          <PhoneIcon height={20} color="#FEFEFD" />
        </button>
      </div> */}
      <CallController />
    </div>
  );
}

export default CallScreenPage;
