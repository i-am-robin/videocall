"use client";
import { UserContext } from "@/Context/UserContext";
import FooterChat from "@/components/ChatPage/FooterChat";
import HeaderSection from "@/components/ChatPage/Header";
import { getUserWithId } from "@/serverActions/GetUserWithId";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

function ChatPage() {
  const { chatUserId } = useContext(UserContext);

  const [name, setName] = useState();

  const router = useRouter();

  useEffect(() => {
    console.log("wait");
    async function run() {
      const user = await getUserWithId(chatUserId);
      if (user === "no id") {
        router.push("/");
      }
      setName(user.name);
      console.log(user);
    }

    run();

    return () => {};
  }, []);

  const users = {
    userName: name,
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
