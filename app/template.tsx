"use client";
import SideNavbar from "@/components/SideNavbar";
import Image from "next/image";
import { QRCode } from "react-qrcode-logo";
import logo from "./assets/logo.png";
import Navbar from "@/components/Navbar/Navbar";

export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-[calc(100dvh-52px)]">{children}</div>
    </>
  );
}
