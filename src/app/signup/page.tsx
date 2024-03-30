"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isDisable, setIsDisable] = useState(true);
  const onSignup = async () => {
    try {
      const data = await axios.post("/api/signup", user);
      router.push("/login");
    } catch (error: any) {
      console.log("Error in Sign Up", error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [user]);

  return (
    <div
      className="flex flex-col item-center justify-center  py-2
         w-1/5 ml-[40%] my-32"
    >
      <h1 className="my-4 text-2xl font-bold">Sign Up</h1>
      <hr />
      <label htmlFor="userName" className="py-1">
        Username
      </label>
      <input
        type="text"
        id="userName"
        placeholder="Enter User Name"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="text-black p-2 rounded bg-slate-100"
      />
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
        onClick={onSignup}
        className={`my-4 bg-[#759649] h-10 rounded hover:bg-[#7cb136] ${
          isDisable ? `` : `disabled:opacity-75`
        }`}
      >
        SignUp
      </button>
      <Link href={"/login/"} className=" hover:underline underline-offset-4 ">
        visit login page
      </Link>
    </div>
  );
}
