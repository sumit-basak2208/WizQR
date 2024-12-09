"use client";
import AngleSelector from "@/components/AngleSelector";
import ColorPicker from "@/components/ColorPicker";
import EasingCurve from "@/components/EasingCurve";
import PositionSelector from "@/components/PositionSelector";
import { Input } from "@/components/ui/input";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Card as crd, Point } from "@/type/card";
import { Loader, Save } from "lucide-react";
import Card from "@/components/Card";

export default function CardId() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [bgColor1, setBgColor1] = useState("hsl(350, 73%, 44%)");
  const [bgColor2, setBgColor2] = useState("hsl(274, 65%, 12%)");

  const [qrValue, setQrValue] = useState("");

  const [qrBgColor, setQrBgColor] = useState("hsl(0, 0%, 100%)");
  const [qrFgColor, setQrFgColor] = useState("hsl(9, 0%, 0%)");

  const [angle, setAngle] = useState(0);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [gradientType, setGradientType] = useState("linear");

  const [isLoading, setIsLoading] = useState(true);

  const [points, setPoints] = useState<number[]>([
    0, 10, 20, 30, 40, 50, 60, 70, 80, 100,
  ]);

  const [controlPoints, setControlPoints] = useState<{
    p1: Point;
    p2: Point;
  }>({
    p1: { x: 50, y: 150 }, // Control point 1
    p2: { x: 150, y: 50 }, // Control point 2
  });

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

  useEffect(() => {
    getCard();
  }, []);

  const getCard = async () => {
    try {
      const res = await fetch(`/api/v1/card/${params.id}`);
      const dt = await res.json();
      setIsLoading(false);
      if (dt.error) {
        toast.error(dt.error);
        router.push("/dashboard");
        return;
      }
      const {
        gradientType,
        url,
        points,
        position,
        backgroundColors,
        QRColors,
        angle,
        controlPoints,
      }: crd = dt.card;

      console.log(controlPoints);
      setGradientType(gradientType);
      setQrValue(url);
      setPoints(points);
      setX(position[0]);
      setY(position[1]);
      setBgColor1(backgroundColors[0]);
      setBgColor2(backgroundColors[1]);
      setQrBgColor(QRColors[0]);
      setQrFgColor(QRColors[1]);
      setAngle(angle);
      if(controlPoints) setControlPoints(controlPoints);
    } catch (error: unknown) {
      const err = error as Error;
      console.log(error);
      toast.error(err.message);
    }
  };

  const saveCard = async (ev: React.FormEvent) => {
    try {
      ev.preventDefault();
      setIsLoading(true);
      const data = {
        url: qrValue,
        gradientType: gradientType,
        position: [0, 0],
        angle: angle,
        backgroundColors: [bgColor1, bgColor2],
        QRColors: [qrBgColor, qrFgColor],
        points: points,
        controlPoints
      };
      const res = await fetch(`/api/v1/card/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData.error) {
        toast.error(resData.error);
        setIsLoading(false);
        return;
      }
      toast.success("Card updated!");
      router.push("/dashboard");
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
      {isLoading ? (
        <div className="mt-32">
          <Loader className="animate-spin mx-auto" strokeWidth={2.5} />
        </div>
      ) : (
        <form
          onSubmit={saveCard}
          className="grid md:grid-cols-12 grid-cols-6 gap-4 h-full max-w-6xl mx-auto"
        >
          <section className="col-span-6 flex justify-center items-start h-full">
            <Card
              ref={cardRef}
              className="w-full sticky top-[90px] border-4 border-black px-7 pt-7 max-w-[270px] min-h-[420px] shadow-lg"
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
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                  <button
                    type="button"
                    onClick={(ev: MouseEvent<HTMLButtonElement>) => {
                      ev.stopPropagation();
                      setGradientType("linear");
                    }}
                    className={`${
                      gradientType === "linear" ? "bg-black text-white" : ""
                    } transition-all px-4 py-1 border text-xl font-semibold rounded`}
                  >
                    Linear
                  </button>
                  <button
                    type="button"
                    onClick={(ev: MouseEvent<HTMLButtonElement>) => {
                      ev.stopPropagation();
                      setGradientType("radial");
                    }}
                    className={`${
                      gradientType === "radial" ? "bg-black text-white" : ""
                    } transition-all px-4 py-1 border text-xl font-semibold rounded`}
                  >
                    Radical
                  </button>
                </div>
              </div>
              <div className="py-3 grid lg:grid-cols-2 grid-cols-1 gap-6">
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
              <div className="py-3 grid lg:grid-cols-2 grid-cols-1 gap-6">
                <div>
                  <p className="pb-2">Curve:</p>
                  <EasingCurve
                    controlPoints={controlPoints}
                    setControlPoints={setControlPoints}
                    setPoints={setPoints}
                  />
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
          <div className="fixed top-[55px] right-10 mt-10 col-span-12">
            <div className="w-fit rounded-lg">
              <button
                disabled={isLoading}
                type="submit"
                className="flex flex-col items-center bg-white border-2 border-black px-4 z-30 py-1 bg-white-400 rounded-md text-black hover:text-white after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 disabled:text-white after:disabled:scale-[300] after:disabled:transition-all after:disabled:duration-700 relative after:-z-20 after:absolute after:h-1 after:w-1 after:bg-black after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:transition-all after:duration-700 transition-all duration-700 font-semibold shadow"
              >
                {isLoading ? (
                  <Loader
                    className="animate-spin mx-auto my-0.5"
                    strokeWidth={2.5}
                  />
                ) : (
                  <>
                    <Save />
                    Save
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
