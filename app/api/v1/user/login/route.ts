import connnect from "@/db/db";
import Users from "@/models/user.model";
import { checkPassword } from "@/utils/encryption";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connnect();

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const user = await Users.findOne({
      $or: [{ username: username }, { email: username }],
    });
    if (!user) {
      return NextResponse.json(
        {
          error: "User not found, please try again later!",
        },
        {
          status: 404,
        }
      );
    }
    if (!checkPassword(password, user.password)) {
      return NextResponse.json(
        {
          error: "Wrong password!!",
        },
        {
          status: 401,
        }
      );
    }
    cookies().set(
      "token",
      jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_TOKEN ?? ""
      )
    );
    return NextResponse.json({
      message: "Login successfull!",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(err);
    return NextResponse.json(
      {
        error: err?.message || "Login failed, please try again later!",
      },
      {
        status: 500,
      }
    );
  }
}
