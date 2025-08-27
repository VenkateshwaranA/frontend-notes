"use client"
import Forms from "@/components/forms";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const router=useRouter();
  useEffect(()=>{
    if(localStorage.getItem("token")){
      router.push("/")
    }
  },[router])
  return (
    <div>
      <Forms cardName="Sign In" buttonName="Sign In" />
    </div>
  );
}

export default page;
