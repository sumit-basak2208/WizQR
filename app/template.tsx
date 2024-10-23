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
      <Navbar />
      {/* <div className="bg-stone-200/90 grid grid-cols-[220px,_1fr] h-[calc(100dvh-52px)] gap-4 p-4"> */}
      <div className="bg-stone-200/90 h-[calc(100dvh-52px)] gap-4 p-4">
        {/* <SideNavbar/> */}
        <div className="bg-white rounded-lg p-3 pb-4 shadow min-h-[calc(100dvh-90px)]">
          <div className="max-w-6xl mx-auto">{children}</div>
        </div>
      </div>
    </>
  );
}
