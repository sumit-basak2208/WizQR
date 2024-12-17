import { NextRequest, NextResponse } from "next/server";

import User from "@/models/user.model";
import connectDB from "@/db/db";
import { generateHash } from "@/utils/encryption";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { token, password } = await req.json();

    // Find the user with the matching token and ensure it is not expired
    const user = await User.findOne({
      passwordResetToken: token, // Use raw token directly
      passwordResetExpires: { $gt: Date.now() }, // Token expiration check
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    user.password = generateHash(password);

    // Clear the password reset fields
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save(); // Save the updated user to the database

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in Reset Password API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
