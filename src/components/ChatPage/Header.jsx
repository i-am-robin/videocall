"use client";
import {
  ArrowLeftIcon,
  ExclamationCircleIcon,
  PhoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useContext, useState } from "react";
import ProfilePic from "../ProfilePic";
import { useRouter } from "next/navigation";
import { UserContext } from "@/Context/UserContext";

function HeaderSection({ userData }) {
  const router = useRouter();

  const handleAudioCall = () => {
    console.log("audio call");
  };
  const handleVideoCall = () => {
    router.push(`/callpage/${userData.id}`);
  };

  return (
    <div className="flex p-2 items-center gap-2">
      <button
        onClick={() => router.push("/")}
        className="h-10 w-10 rounded-full items-center flex bg-opacity-0 hover:bg-opacity-20 ">
        <ArrowLeftIcon
          height={24}
          width={24}
          className="mx-auto text-prymary"
        />
      </button>
      <ProfilePic h={10} w={10}>
        <Image
          src={userData.userProfilePic}
          height={100}
          width={100}
          alt="a"
          className="object-cover"
        />
      </ProfilePic>
      <h2 className="text-base">{userData.userName}</h2>
      <div className="flex ml-auto gap-1">
        <button
          onClick={handleAudioCall}
          className="h-10 w-10 rounded-full items-center flex bg-opacity-0 hover:bg-opacity-20">
          <PhoneIcon height={24} width={24} className="mx-auto text-prymary" />
        </button>

        <button
          onClick={handleVideoCall}
          className="h-10 w-10 rounded-full items-center flex bg-opacity-0 hover:bg-opacity-20">
          <VideoCameraIcon
            height={24}
            width={24}
            className="mx-auto text-prymary"
          />
        </button>

        <button className="h-10 w-10 rounded-full items-center flex bg-opacity-0 hover:bg-opacity-20">
          <ExclamationCircleIcon
            height={24}
            width={24}
            className="mx-auto text-prymary"
          />
        </button>
      </div>
    </div>
  );
}

export default HeaderSection;
