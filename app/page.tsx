"use client";
import ColorPicker from "@/components/ColorPicker";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [color1, setColor1] = useState("hsl(350, 73%, 44%)");
  const [color2, setColor2] = useState("hsl(274, 65%, 12%)");

  const colors = useMemo(() => {
    const steps = 10;
    const colors = [];

    // Convert HSL strings to arrays [hue, saturation, lightness]
    const start = parseHSL(color1);
    const end = parseHSL(color2);

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
  }, [color1, color2]);

  // Helper function to parse HSL string into [hue, saturation, lightness]
  function parseHSL(hslString: string) {
    const match = hslString.match(/\d+/g);
    if (!match) return [];
    const [hue, saturation, lightness] = match.map(Number);
    return [hue, saturation, lightness];
  }

  useEffect(() => {
    console.log(colors);
  }, [colors]);

  return (
    <main className="grid grid-cols-2 gap-4 h-full">
      <section className="flex justify-center items-center h-full">
        <div
          className="w-full border border-[inset] max-w-[300px] min-h-[400px] rounded-lg shadow"
          style={{
            backgroundImage: `linear-gradient(
    45deg,
    ${colors}
  )
`,
          }}
        ></div>
      </section>
      <section>
        <p className="pb-2">Colors:</p>
        <div className="flex gap-6">
          <ColorPicker color={color1} setColor={setColor1} />
          <ColorPicker color={color2} setColor={setColor2} />
        </div>
      </section>
    </main>
  );
}
