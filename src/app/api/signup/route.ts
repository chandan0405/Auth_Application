import { connect } from "@/dbConfig/dbCofiguration";
import { NextResponse } from "next/server";
import UserSchema from "@/models/userModel.js";
connect();
export async function POST(request: NextResponse) {
  const bcrypt = require('bcryptjs');
  try {
    const reqBody = await request.json();
    //  destructering user details
    const { username, email, password } = reqBody;
    //   check if already exist
    const user = await UserSchema.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "user is already registered" },
        { status: 400 }
      );
    }
    // Hash Password
    const saltedPass = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, saltedPass);
    const newUser = new UserSchema({
      username,
      email,
      password: hashedPass,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    return NextResponse.json(
      {
        savedUser,
        SUCCESS: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
