"use server";

import connectMongoDB from "@/lib/mongodb/mongodb";
import UsersDB from "@/models/usersModel";

export const getAllUsers = async () => {
  //
  try {
    await connectMongoDB();
    const req = await UsersDB.find();

    const users = req.map((user) => {
      return {
        id: user._id.toString(),
        name: user.name,
        active: false,
      };
    });

    return users;
  } catch (error) {
    console.log(error);
    return "error";
  }
};
