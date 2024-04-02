"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const [data, setData] = useState("");
  const router = useRouter();
  const onLogout = () => {
    try {
      const result = axios.get("/api/logout/");
      toast.success("Logout Successfully");
      router.push("/signup");
    } catch (error: any) {
      console.log("Erro found", error.message);
      toast.error(error.message);
    }
  };
  const getUserDetail = async () => {
    const res = await axios.get("/api/mine/");
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col w-[300px] self-center">
      <h1>User Profile Page </h1>
      <span>welcome to Profile page</span>
      <h2 className="p-1 rounded bg-gray-400">
        {data === "" ? (
          "No data Found"
        ) : (
          <Link href={`/profile/${data}`} className="">
            {data}
          </Link>
        )}
      </h2>
      <button
        onClick={getUserDetail}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        fetch Data
      </button>
      <button
        onClick={onLogout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
