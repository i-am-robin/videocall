"use server";

import connectMongoDB from "@/lib/mongodb/mongodb";
import UsersDB from "@/models/usersModel";

export const ChackUserExist = async (name) => {
  //
  await connectMongoDB();
  const user = await UsersDB.findOne({ name: name });
  if (user) {
    return "user exist";
  }
  return "no user exist";
};
