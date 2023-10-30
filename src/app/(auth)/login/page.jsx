"use client";
import { LoginInUser, chackIfCookieExist } from "@/serverActions/auth/Auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

function LoginPage() {
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

    const res = await LoginInUser(name, pass);
    console.log(res);
    if (res === "name or pass required") {
      toast.error("Name or Pass required");
      setLoading(false);
    }

    if (res === "error") {
      toast.error("error");
      return setLoading(false);
    }

    if (res === "success") {
      toast.success("Login success");
      setTimeout(() => {
        router.push("/");
      }, 100 * 3);
      return setLoading(false);
    }
    // if nothing come back from responce
    toast.error("error");
    return setLoading(false);
  };
  return (
    <div className="bg-black-dark h-screen flex items-center justify-center">
      <div className="flex text-center flex-col bg-grey-100 rounded-md p-3 ">
        <h1>Hello again</h1>
        <p className="opacity-70">Log In to Your account</p>
        <Toaster position="top-right" richColors />
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5">
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
            Log in
          </button>
          <p className="text-sm text-left">
            Don`&apos;`t have a account?
            <Link className="text-prymary ml-1" href={"/singup"}>
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
