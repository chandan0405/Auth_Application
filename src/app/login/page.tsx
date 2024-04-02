"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";


export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onLogin = async () => {
    try {
      const response= await axios.post("/api/login/", user);
      console.log("Login Successful", response.data);
      toast.success("Login Successful")
      router.push("/profile")
    } catch (error:any) {
      console.log("Login Error :", error.message);
      toast.error("Login Error")
    }
  };
  return (
    <div
      className="flex flex-col item-center justify-center  py-2
         w-1/5 ml-[40%] my-32"
    >
      <h1 className="my-4 text-2xl font-bold">Login</h1>
      <hr />
      <label htmlFor="email" className="py-1">
        Email
      </label>
      <input
        type="email"
        id="email"
        placeholder="Enter email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="text-black p-2 rounded"
      />
      <label htmlFor="password" className="py-1">
        Password
      </label>
      <input
        type="password"
        id="password"
        placeholder="Enter password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="text-black p-2 rounded"
      />
      <button
        onClick={onLogin}
        className="my-4 bg-[#759649] h-10 rounded hover:bg-[#7cb136]"
      >
        Login
      </button>
      <Link href={"/signup/"} className=" hover:underline underline-offset-4 ">
        visit signup page
      </Link>
    </div>
  );
}
