"use client";
import App from "@/components/App";
import LoadingPage from "@/components/LoadingPage";
import { validateUser } from "@/serverActions/auth/Auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [authed, setAuthed] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const run = async () => {
      const res = await validateUser();
      // const res = "a";
      if (res === "no user") {
        router.push("/login");
      }
      setAuthed(true);
    };

    run();

    return () => {};
  }, []);
  if (!authed) return <LoadingPage />;

  if (authed) return <App />;
}
