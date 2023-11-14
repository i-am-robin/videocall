"user client";
import { UserContext } from "@/Context/UserContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

function SingleUser({ user }) {
  console.log(user);
  const { setCurrentChatUser } = useContext(UserContext);

  const router = useRouter();

  return (
    <button
      onClick={() => {
        setCurrentChatUser(user.id);
        router.push(`/chatpage/${user.id}`);
      }}
      className="w-full bg-opacity-0 rounded-md transition-all duration-300 hover:bg-opacity-20 ">
      <div className="flex gap-3 w-full px-1 py-1 text-left">
        <div className="relative">
          <div className="h-14 w-14 rounded-full overflow-hidden relative">
            <Image
              src={"/images/profile.jpg"}
              height={100}
              width={100}
              alt="a"
              className="object-cover"
            />
          </div>
          {user.active ? (
            <div
              className={`h-4 w-4 -bottom-0 -right-0 rounded-full bg-prymary border-2  absolute z-20`}></div>
          ) : null}
        </div>
        <div>
          <h2 className="text-base">{user.name || "no name"}</h2>
          <span className="text-sm">What going?</span>
        </div>
        <span className="ml-auto">3.6</span>
      </div>
    </button>
  );
}

export default SingleUser;
