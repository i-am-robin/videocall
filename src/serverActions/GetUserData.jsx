"use server";

import connectMongoDB from "@/lib/mongodb/mongodb";
import UsersDB from "@/models/usersModel";
import { cookies } from "next/headers";
export const currentUserData = async () => {
  //
  const id = cookies().get("auth").value;

  await connectMongoDB();
  const reqUser = await UsersDB.findOne({ _id: id });

  const user = {
    userId: reqUser._id.toString(),
    name: reqUser.name,
  };

  console.log(user);

  return user;
};
