"use client";
import { UserContext } from "@/Context/UserContext";
import SingleUser from "@/components/homePage/SingleUser";
import { getAllUsers } from "@/serverActions/GetAllUsers";
import { useContext, useEffect, useState } from "react";

function HomePage() {
  const [friends, setFriends] = useState([]);

  const { user } = useContext(UserContext);
  useEffect(() => {
    async function run() {
      const f = await getAllUsers();
      setFriends(f);
    }
    run();
  }, []);

  return (
    <div className="bg-black-dark h-screen p-2">
      <p>Hi {user?.name} 😄😀</p>
      <h2 className="ml-2 opacity-70">Messeging</h2>

      {friends.length > 0 &&
        friends.map((friend, i) => {
          return <SingleUser key={i} user={friend} />;
        })}
    </div>
  );
}

export default HomePage;
