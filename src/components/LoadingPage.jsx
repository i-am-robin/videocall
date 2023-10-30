"use client";
import Image from "next/image";
import React, { useState } from "react";

function LoadingPage() {
  const [dots, setDots] = useState("");
  const [loop, setLoop] = useState(true);

  return (
    <div className="bg-black-dark h-screen flex items-center justify-center text-left">
      <Image
        src={"/svg/rooling.svg"}
        className="h-24 w-24 bg-transparent"
        height={100}
        width={100}
        alt="loading.svg"
      />
    </div>
  );
}

export default LoadingPage;
