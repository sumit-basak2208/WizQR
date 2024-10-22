"use client";
import ColorPicker from "@/components/ColorPicker";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { QRCode } from "react-qrcode-logo";

export default function Home() {
  const [bgColor1, setBgColor1] = useState("hsl(350, 73%, 44%)");
  const [bgColor2, setBgColor2] = useState("hsl(274, 65%, 12%)");

  const [qrValue, setQrValue] = useState("");

  const [qrBgColor, setQrBgColor] = useState("hsl(0, 0%, 100%)");
  const [qrFgColor, setQrFgColor] = useState("hsl(9, 0%, 0%)");

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

    return colors.join(",");
  }, [bgColor1, bgColor2]);

  // Helper function to parse HSL string into [hue, saturation, lightness]
  function parseHSL(hslString: string) {
    const match = hslString.match(/\d+/g);
    if (!match) return [];
    const [hue, saturation, lightness] = match.map(Number);
    return [hue, saturation, lightness];
  }

  // useEffect(() => {
  //   console.log(colors);
  // }, [colors]);

  return (
    <main className="grid grid-cols-2 gap-4 h-full">
      <section className="flex justify-center items-center h-full">
        <div
          className="w-full border px-7 pt-7 border-[inset] max-w-[270px] min-h-[420px] rounded-lg shadow"
          style={{
            backgroundImage: `linear-gradient(
    45deg,
    ${colors}
  )
`,
          }}
        >
          <div className="rounded-lg overflow-hidden">
            <QRCode value={qrValue} eyeRadius={10} qrStyle="fluid" bgColor={qrBgColor} fgColor={qrFgColor} />
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
          <p className="pb-2">Colors:</p>
          <div className="flex gap-6">
            <ColorPicker color={bgColor1} setColor={setBgColor1} />
            <ColorPicker color={bgColor2} setColor={setBgColor2} />
          </div>
        </section>
      </section>
    </main>
  );
}
