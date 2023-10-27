import React from "react";
import {
  VideoCameraSlashIcon,
  MicrophoneIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";

function CallController() {
  return (
    <div className="bg-white-prymary bg-opacity-20  w-fit fixed left-1/2 bottom-5 -translate-x-1/2 rounded-full px-2 py-2 flex gap-10 items-center justify-between">
      <button className="rounded-full p-2 hover:bg-black-dark hover:bg-opacity-75 transition-colors">
        <VideoCameraSlashIcon height={20} color="#FEFEFD" />
      </button>
      <button className="rounded-full p-2 hover:bg-black-dark hover:bg-opacity-75 transition-colors">
        <MicrophoneIcon height={20} color="#FEFEFD" />
      </button>
      <button className="bg-red-prymary hover:bg-opacity-60 rounded-full p-2">
        <PhoneIcon height={20} color="#FEFEFD" />
      </button>
    </div>
  );
}

export default CallController;
