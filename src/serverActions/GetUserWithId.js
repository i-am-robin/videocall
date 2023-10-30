"use server";

import connectMongoDB from "@/lib/mongodb/mongodb";
import UsersDB from "@/models/usersModel";

export const getUserWithId = async (id) => {
  //
  if (!id) return "no id";
  await connectMongoDB();
  const req = await UsersDB.findOne({ _id: id });

  const user = {
    name: req.name,
  };
  console.log(user);
  return user;
  //   console.log(user);
};
