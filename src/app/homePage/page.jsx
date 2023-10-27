import SingleUser from "@/components/homePage/SingleUser";
import React from "react";

function HomePage() {
  return (
    <div className="bg-black-dark h-screen p-2">
      <h2 className="ml-2">Messeging</h2>
      <button className="w-full bg-opacity-0 rounded-md transition-all duration-300 hover:bg-opacity-20 ">
        <SingleUser />
      </button>
      <button className="w-full bg-opacity-0 rounded-md transition-all duration-300 hover:bg-opacity-20 ">
        <SingleUser />
      </button>
      <button className="w-full bg-opacity-0 rounded-md transition-all duration-300 hover:bg-opacity-20 ">
        <SingleUser />
      </button>
      <button className="w-full bg-opacity-0 rounded-md transition-all duration-300 hover:bg-opacity-20 ">
        <SingleUser />
      </button>
    </div>
  );
}

export default HomePage;
