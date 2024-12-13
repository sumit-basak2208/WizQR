import nodemailer from "nodemailer";

export async function sendEmail(
  to: string,
  subject: string,
  textVersion: string,
  htmlVersion: string,
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_EMAIL, // Ensure EMAIL_USER is set in the .env file
      pass: process.env.GMAIL_PASSWORD, // Ensure EMAIL_PASSWORD is set in the .env file
    },
  });

  const mailOptions = {
    from: "wizqr@gmail.com",
    to: to,
    subject: subject,
    text: textVersion,
    html: htmlVersion,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info; // Return info in case further processing is needed
  } catch (error) {
    console.error("Error sending email:", error);
    // Add context to the error message for better debugging
    throw new Error(`Failed to send email to ${to}. Error: ${error}`);
  }
}
