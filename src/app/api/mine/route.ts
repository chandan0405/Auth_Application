import { connect } from "@/dbConfig/dbCofiguration";
import { getDataFromToken } from "@/helper/getDataFromToken";
import UserSchema from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const users = await UserSchema.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "userFound",
      data: users,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
