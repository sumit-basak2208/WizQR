import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Toast from "@/components/Toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const Lobster = localFont({
  src: "./fonts/Lobster-Regular.ttf",
  variable: "--Lobster",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WizQR - Create Your Custom QR-Linked Cards with WizQR",
  description: "Design unique, eye-catching cards that seamlessly connect your audience to your website with a simple QR scan. Customize every detail, add your personalized link, and watch your brand come to life on a card that’s just as unique as you are.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${Lobster.variable} antialiased`}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <Toast/>
        {children}
      </body>
    </html>
  );
}
