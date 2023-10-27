import CallController from "@/components/CallController";
import Image from "next/image";
import React from "react";

function CallScreenPage() {
  return (
    <div className="bg-black-dark h-screen">
      <div className="absolute top-5 right-5 h-52 w-36 rounded-md bg-grey-400 overflow-hidden shadow-xl">
        <video src=""></video>
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
      <CallController />
    </div>
  );
}

export default CallScreenPage;
