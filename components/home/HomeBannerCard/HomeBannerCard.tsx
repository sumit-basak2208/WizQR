"use client";
import { QRCode } from "react-qrcode-logo";
import "./HomeBannerCard.css";

const HomeBannerCard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div
        style={{
          transform: "translateY(-60px)",
        }}
        className="relative w-[320px] h-[450px]"
      >
        <div
          className="top-[51px] left-[56px] bg-white border px-7 pt-7 border-[inset] w-[160px] h-[220px] absolute overflow-hidden rounded-lg shadow"
          style={{
            boxShadow: "0px 3px 9px rgba(0, 0, 0, 0.3)",
            background: "linear-gradient(to right,#d567b0,#a04a8f)",
            transform: "rotate(-10deg) translateY(-30px)",
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full shine-effect"></div>
          <QRCode
            value={"https://heaven-hell-ai.vercel.app/"}
            eyeRadius={10}
            // qrStyle="fluid"
            bgColor={"#ffffff00"}
            fgColor={"#ffffff"}
          />
        </div>
        <div
          className="top-[123px] left-[105px] bg-white border px-7 pt-7 border-[inset] w-[160px] h-[220px] absolute overflow-hidden rounded-lg shadow"
          style={{
            boxShadow: "0px 3px 9px rgba(0, 0, 0, 0.3)",
            background: "linear-gradient(to right,#82f7ab,#f3c281)",
            transform: "translateY(0px) rotate(9deg)",
            zIndex: 2,
          }}
        >
          <div
            style={{ animationDelay: ".3s" }}
            className="absolute top-0 left-0 w-full h-full shine-effect"
          ></div>
          <QRCode
            value={"https://heaven-hell-ai.vercel.app/"}
            eyeRadius={10}
            // qrStyle="fluid"
            bgColor={"#ffffff00"}
            fgColor={"#ffffff"}
          />
        </div>
        <div
          className="top-[256px] left-[80px] bg-white border px-7 pt-7 border-[inset] w-[160px] h-[220px] absolute overflow-hidden rounded-lg shadow"
          style={{
            boxShadow: "0px 3px 9px rgba(0, 0, 0, 0.3)",
            background: "linear-gradient(to right,#4226bf,#bb53e0)",
            transform: "translate(30px, -25px) rotate(34deg)",
            zIndex: 2,
          }}
        >
          <div
            style={{ animationDelay: ".6s" }}
            className="absolute top-0 left-0 w-full h-full shine-effect"
          ></div>
          <QRCode
            value={"https://heaven-hell-ai.vercel.app/"}
            eyeRadius={10}
            // qrStyle="fluid"
            bgColor={"#ffffff00"}
            fgColor={"#ffffff"}
          />
        </div>
      </div>
      <h1 className="text-4xl font-bold relative z-10 text-white">
        Design. Scan. Connect.
      </h1>
    </div>
  );
};

export default HomeBannerCard;
