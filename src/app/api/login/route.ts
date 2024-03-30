import { connect } from "@/dbConfig/dbCofiguration";
import { NextResponse } from "next/server";
import UserSchema from "@/models/userModel.js";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextResponse) {
  const bcrypt = require("bcryptjs");
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    // validate password
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    // Create Tokens
    const tokenData = {
      id: user._id,
      email: user.email,
      password: user.password,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });
    response.cookies.set("token", token, { 
        httpOnly: true 
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  //   return NextResponse.json("Hello", {status:201})
}
