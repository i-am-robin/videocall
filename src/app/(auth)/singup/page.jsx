"use client";
import { CreateUser, chackIfCookieExist } from "@/serverActions/auth/Auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

function SingUpPage() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [pass, setPass] = useState();

  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const res = await chackIfCookieExist();
      if (res === "cookie exist") router.push("/");
    };

    run();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const res = await CreateUser(name, pass);

    if (res === "error") {
      toast.error("error");
      return setLoading(false);
    }

    if (res === "user exist") {
      toast.error("User already exist");
      return setLoading(false);
    }

    if (res === "name or pass required") {
      toast.error("Name or Pass required");
      setLoading(false);
    }

    if (res === "user created") {
      toast.success("User created");
      setLoading(false);
      setTimeout(() => {
        router.push("/login");
      }, 100 * 2);
    }

    //
  };

  return (
    <div className="bg-black-dark h-screen flex items-center justify-center">
      <div className="flex text-center flex-col bg-grey-100 rounded-md p-3 ">
        <h1>Hi!</h1>
        <p className="opacity-70">Create Your account</p>
        <Toaster position="top-right" richColors />
        <form className="flex flex-col gap-3 mt-5" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="User name"
            className="rounded-md "
          />
          <input
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            name="pass"
            type="text"
            placeholder="Password"
            className="rounded-md "
          />
          <button
            type="submit"
            className={`rounded-md py-2 ${
              loading ? "bg-grey-300" : "bg-prymary"
            }`}>
            Create Account
          </button>
          <p className="text-sm text-left">
            Have account?
            <Link className="text-prymary ml-1" href={"/login"}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SingUpPage;
