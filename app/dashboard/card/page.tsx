"use client";
import AngleSelector from "@/components/AngleSelector";
import ColorPicker from "@/components/ColorPicker";
import EasingCurve from "@/components/EasingCurve";
import PositionSelector from "@/components/PositionSelector";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

export default function CardCreate() {
  const [bgColor1, setBgColor1] = useState("hsl(350, 73%, 44%)");
  const [bgColor2, setBgColor2] = useState("hsl(274, 65%, 12%)");

  const [qrValue, setQrValue] = useState("");

  const [qrBgColor, setQrBgColor] = useState("hsl(0, 0%, 100%)");
  const [qrFgColor, setQrFgColor] = useState("hsl(9, 0%, 0%)");

  const [angle, setAngle] = useState(0);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [gradientType, setGradientType] = useState("linear");

  const [points, setPoints] = useState<number[]>([
    0, 10, 20, 30, 40, 50, 60, 70, 80, 100,
  ]);

  const cardRef = useRef<HTMLDivElement>(null);

  const colors = useMemo(() => {
    const steps = 10;
    const colors = [];

    // Convert HSL strings to arrays [hue, saturation, lightness]
    const start = parseHSL(bgColor1);
    const end = parseHSL(bgColor2);

    // Calculate the step difference for hue, saturation, and lightness
    const hueStep = (end[0] - start[0]) / steps;
    const saturationStep = (end[1] - start[1]) / steps;
    const lightnessStep = (end[2] - start[2]) / steps;

    for (let i = 0; i <= steps; i++) {
      // Calculate current hue, saturation, lightness
      const hue = start[0] + hueStep * i;
      const saturation = start[1] + saturationStep * i;
      const lightness = start[2] + lightnessStep * i;

      // Push the generated HSL string into the colors array
      colors.push(
        `hsl(${hue.toFixed(0)}deg ${saturation.toFixed(0)}% ${lightness.toFixed(
          0
        )}%)`
      );
    }
    // return colors.join(",");
    return colors
      .map((ele, i) => ele + ` ${points[i]?.toFixed?.(0) || i * 10}%`)
      .join(",");
  }, [bgColor1, bgColor2, points]);

  // Helper function to parse HSL string into [hue, saturation, lightness]
  function parseHSL(hslString: string) {
    const match = hslString.match(/\d+/g);
    if (!match) return [];
    const [hue, saturation, lightness] = match.map(Number);
    return [hue, saturation, lightness];
  }

  const gradient = useMemo(
    () =>
      `${gradientType === "linear" ? "linear-gradient" : "radial-gradient"}(${
        gradientType === "linear"
          ? angle + "deg"
          : "circle at " + x + "% " + y + "%"
      },${colors})`,
    [gradientType, angle, x, y, colors]
  );

  const handleCaptureClick = useCallback(async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, "download.png", "image/png");
  }, []);

  const createCard = async () => {
    try {
      const res = await fetch("");
    } catch (error: unknown) {
      const err = error as Error;
      console.log(err.message);
    }
  };

  return (
    <main className="grid grid-cols-2 gap-4 h-full max-w-6xl mx-auto">
      <section className="flex justify-center items-start h-full">
        <div
          ref={cardRef}
          className="w-full sticky top-[70px] border-4 border-black px-7 pt-7 max-w-[270px] min-h-[420px] shadow"
          style={{
            backgroundImage: gradient,
          }}
        >
          <div className="rounded-lg overflow-hidden">
            <QRCode
              value={qrValue}
              eyeRadius={10}
              qrStyle="fluid"
              bgColor={qrBgColor}
              fgColor={qrFgColor}
            />
          </div>
        </div>
      </section>
      <section>
        <section className="py-2">
          <h2 className="text-lg pb-1 font-bold">QR Code</h2>
          <div className="py-2">
            <p className="pb-2">Business URL:</p>
            <Input
              type="link"
              placeholder="https://www.example.com"
              value={qrValue}
              onChange={(ev) => setQrValue(ev.target.value)}
            />
          </div>
          <div className="py-2">
            <p className="pb-2 font-semibold">QR code colors:</p>
            <div className="flex gap-12 ml-3">
              <div>
                <p className="pb-2">Foreground color</p>
                <ColorPicker color={qrBgColor} setColor={setQrBgColor} />
              </div>
              <div>
                <p className="pb-2">Background color</p>
                <ColorPicker color={qrFgColor} setColor={setQrFgColor} />
              </div>
            </div>
          </div>
        </section>
        <section className="py-2">
          <h2 className="text-lg pb-3 font-bold">Gradient</h2>
          <div className="py-3">
            <p className="pb-2">Type:</p>
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => setGradientType("linear")}
                className={`${
                  gradientType === "linear" ? "bg-black text-white" : ""
                } transition-all px-4 py-1 border text-xl font-semibold rounded`}
              >
                Linear
              </button>
              <button
                onClick={() => setGradientType("radial")}
                className={`${
                  gradientType === "radial" ? "bg-black text-white" : ""
                } transition-all px-4 py-1 border text-xl font-semibold rounded`}
              >
                Radical
              </button>
            </div>
          </div>
          <div className="py-3 grid grid-cols-2 gap-6">
            <div>
              <p className="pb-2">Colors:</p>
              <div className="flex gap-6">
                <ColorPicker color={bgColor1} setColor={setBgColor1} />
                <ColorPicker color={bgColor2} setColor={setBgColor2} />
              </div>
            </div>
            <div>
              {gradientType == "radial" && (
                <>
                  <p className="pb-2">Position:</p>
                  <div className="flex gap-6">
                    <PositionSelector {...{ setX, setY, y, x }} />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="py-3 grid grid-cols-2 gap-6">
            <div>
              <p className="pb-2">Curve:</p>
              <EasingCurve setPoints={setPoints} />
            </div>
            <div>
              {gradientType == "linear" && (
                <>
                  <p className="pb-2">Angle:</p>
                  <AngleSelector angle={angle} setAngle={setAngle} />
                </>
              )}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
