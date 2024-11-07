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
import { getColors } from "@/utils/utility";
import Card from "@/components/Card";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

export default function CardCreate() {
  const [isLoading, setIsLoading] = useState(false);

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

  const colors = useMemo(
    () => getColors(bgColor1, bgColor2, points),
    [bgColor1, bgColor2, points]
  );

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

  const createCard = async (ev: React.FormEvent) => {
    try {
      ev.preventDefault();
      setIsLoading(true);
      const data = {
        url: qrValue,
        gradientType: gradientType,
        position: [0, 0],
        backgroundColors: [bgColor1, bgColor2],
        QRColors: [qrBgColor, qrFgColor],
        points: points,
      };
      const res = await fetch("/api/v1/card", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData.error) {
        toast.error(resData.error);
        setIsLoading(false);
        return;
      }
      toast.success("Card created!");
    } catch (error: unknown) {
      const err = error as Error;
      console.log(err);
      toast.error(err.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={createCard}
        className="grid grid-cols-12 gap-4 h-full max-w-6xl mx-auto"
      >
        <section className="col-span-6 flex justify-center items-start h-full">
          <Card
            ref={cardRef}
            className="w-full sticky top-[70px] border-4 border-black px-7 pt-7 max-w-[270px] min-h-[420px] shadow"
            gradient={gradient}
            qrValue={qrValue}
            qrBgColor={qrBgColor}
            qrFgColor={qrFgColor}
          />
        </section>
        <section className="col-span-6">
          <section className="py-2">
            <h2 className="text-lg pb-1 font-bold">QR Code</h2>
            <div className="py-2">
              <p className="pb-2">Business URL:</p>
              <Input
                type="url"
                placeholder="https://www.example.com"
                value={qrValue}
                onChange={(ev) => setQrValue(ev.target.value)}
                required
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
        <div className="sticky bottom-[55px] mt-10 col-span-12">
          <div className="mx-auto w-fit shadow-lg p-7 rounded-lg bg-white">
            <button
              disabled={isLoading}
              type="submit"
              className="border-2 border-black w-96 px-4 z-30 py-2 bg-white-400 rounded-md text-black hover:text-white after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 disabled:text-white after:disabled:scale-[300] after:disabled:transition-all after:disabled:duration-700 relative after:-z-20 after:absolute after:h-1 after:w-1 after:bg-black after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:transition-all after:duration-700 transition-all duration-700 font-semibold text-2xl"
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto my-0.5" strokeWidth={2.5} />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
