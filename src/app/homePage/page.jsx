"use client";
import SingleUser from "@/components/homePage/SingleUser";
import { getAllUsers } from "@/serverActions/GetAllUsers";
import { useEffect, useState } from "react";

function HomePage() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    async function run() {
      const reqFriends = await getAllUsers();
      setFriends(reqFriends);
      console.log(friends);
    }

    run();
    return () => {};
  }, []);

  return (
    <div className="bg-black-dark h-screen p-2">
      <h2 className="ml-2">Messeging</h2>
      {friends &&
        friends.length > 0 &&
        friends.map((friend, i) => {
          return <SingleUser key={i} user={friend} />;
        })}
    </div>
  );
}

export default HomePage;
