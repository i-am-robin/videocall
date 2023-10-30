"use server";
import connectMongoDB from "@/lib/mongodb/mongodb";
import { ChackUserExist } from "../ChackUserExist";
import UsersDB from "@/models/usersModel";
import { cookies } from "next/headers";

// create user
export const CreateUser = async (name, pass) => {
  if (!name || !pass) return "name or pass required";

  if (name.trim === "" || pass.trim === "") {
    return "name or pass required";
  }
  try {
    const res = await ChackUserExist(name);
    console.log(res);
    if (res === "user exist") return "user exist";

    await connectMongoDB();
    await UsersDB.create({ name: name, pass: pass });
    console.log("created");
    return "user created";
  } catch (error) {
    console.log(error);
    // return error;
    // return "error";
  }
};

// login user
export const LoginInUser = async (name, pass) => {
  if (!name || !pass) return "name or pass required";
  if (name.trim === "" || pass.trim === "") {
    return "name or pass required";
  }

  try {
    await connectMongoDB();
    const user = await UsersDB.findOne({ name: name, pass: pass });
    // return userArry;
    const userId = user._id.toString();

    const expDate = 10 * 24 * 60 * 60 * 100;

    cookies().set("auth", userId, {
      maxAge: expDate,
      httpOnly: true,
      path: "/",
      secure: true,
    });

    return "success";
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export const validateUser = async () => {
  try {
    if (!cookies().get("auth") || !cookies().get("auth").value)
      return "no user";

    const id = cookies().get("auth").value;

    await connectMongoDB();

    const user = await UsersDB.findOne({ _id: id });

    if (!user) {
      cookies().delete("auth");
      return "no user";
    }
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export const chackIfCookieExist = () => {
  if (!cookies().get("auth") || !cookies().get("auth").value) return "no user";

  return "cookie exist";
};
