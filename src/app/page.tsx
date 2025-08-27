"use client";
import NotesUI from "@/components/NotesUI";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState<string | null>();
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return (
    <>
      <div className=" bg-blue-400 flex justify-end gap-5 text-black font-semibold text-xl p-4">
        {!token ? (
          <>
            <Link href={"/signin"} className="">
              Sign In
            </Link>
            <Link href={"/signup"} className="">
              Sign Up
            </Link>
            
          </>
        ) : (
          <>
            <button
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              LogOut
            </button>
          </>
        )}
      </div>
      {token ? (
        <>
          <NotesUI />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
