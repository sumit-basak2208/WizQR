import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/user.model";
import { sendEmail } from "@/utils/email";
import connnect from "@/db/db";

connnect();

export async function POST(req: NextRequest) {
  try {
    // Establish database connection

    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Set token and expiration in user record
    user.passwordResetToken = resetToken; // Directly store the raw token
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Construct reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/forgot-password?token=${resetToken}`;

    // Prepare the plain text version
    const textVersion = `You requested a password reset. Use the link below to reset your password:

    ${resetLink}

    This link will expire in 1 hour. If you did not request this, please ignore this email.`;

    // Prepare the HTML version
    const htmlVersion = `
    <html>
      <body>
        <p>You requested a password reset. Use the link below to reset your password:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <p>This link will expire in 1 hour. If you did not request this, please ignore this email.</p>
      </body>
    </html>
    `;

    // Send email with both plain text and HTML versions
    await sendEmail(email, "Password Reset Request", textVersion, htmlVersion);

    return NextResponse.json(
      { message: "Password reset link sent to your email" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in Forgot Password API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
