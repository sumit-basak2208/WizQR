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
      <Navbar/>
      <div className="bg-stone-200/90 grid grid-cols-[220px,_1fr] h-[calc(100dvh-46px)] gap-4 p-4">
        <SideNavbar/>
        <div className="bg-white rounded-lg pb-4 shadow"></div>
      </div>
    </>
  );
}
