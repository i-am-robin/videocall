"use client";
import { UserContext } from "@/Context/UserContext";
import FooterChat from "@/components/ChatPage/FooterChat";
import HeaderSection from "@/components/ChatPage/Header";
import { getUserWithId } from "@/serverActions/GetUserWithId";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

function ChatPage({ params }) {
  const [name, setName] = useState();

  const router = useRouter();

  useEffect(() => {
    console.log("wait");
    async function run() {
      const user = await getUserWithId(params.id);
      console.log(user);
      if (user === "no id") {
        router.push("/");
      }
      setName(user.name);
      console.log(user);
    }

    run();
  }, []);

  const users = {
    userName: name,
    id: params.id,
    userProfilePic: "/images/profile.jpg",
  };

  return (
    <div className="max-h-screen flex flex-col h-screen bg-black-dark">
      <HeaderSection userData={users} />;
      <FooterChat />
    </div>
  );
}

export default ChatPage;
