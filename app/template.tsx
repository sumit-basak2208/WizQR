"use client";
import SideNavbar from "@/component/SideNavbar";
import Image from "next/image";
import { QRCode } from "react-qrcode-logo";
import logo from "./assets/logo.png";

export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-stone-200/90 grid grid-cols-[220px,_1fr] h-screen gap-4 p-4">
      <SideNavbar />
      <div className="bg-white rounded-lg pb-4 shadow"></div>
    </div>
  );
}
