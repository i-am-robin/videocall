"use client";
import VontextProvider from "@/Context/UserContext";
import HomePage from "@/app/homePage/page";
import { getAllUsers } from "@/serverActions/GetAllUsers";
import React, { useEffect } from "react";

function App() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;
