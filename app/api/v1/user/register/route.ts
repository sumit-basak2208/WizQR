import connnect from "@/db/db";
import Users from "@/models/user.model";
import { generateHash } from "@/utils/encryption";
import { NextRequest, NextResponse } from "next/server";

connnect();

export async function POST(req: NextRequest) {
  try {
    const {
      username,
      email,
      password,
    }: { username: string; email: string; password: string } = await req.json();

    const newUser = new Users({
      username,
      email,
      password: generateHash(password),
    });

    
    // const newUser = new Users({
    //   username,
    //   email,
    //   password: generateHash(password),
    // });

    await newUser.save();
    return NextResponse.json({
      message: "Registration successfull",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(err);
    return NextResponse.json(
      {
        error: err?.message || "Registration failed, please try again later!",
      },
      {
        status: 500,
      }
    );
  }
}
