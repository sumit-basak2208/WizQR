import { getTokenData } from "./token";

export function getUserId(
  tokenCookie: { name: string; value: string } | undefined
): string | boolean {
  if (!tokenCookie) return false;
  const dt = getTokenData(tokenCookie.value);
  const data = dt as { userId: string } | boolean;
  if (!data || typeof data != "object") return false;
  return data.userId;
}

// Helper function to parse HSL string into [hue, saturation, lightness]
function parseHSL(hslString: string) {
  const match = hslString.match(/\d+/g);
  if (!match) return [];
  const [hue, saturation, lightness] = match.map(Number);
  return [hue, saturation, lightness];
}

export function getColors(
  bgColor1: string,
  bgColor2: string,
  points: number[]
): string {
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
}

export function getGradient(
  gradientType: string,
  angle: number,
  x: number,
  y: number,
  colors: string
) {
  return `${
    gradientType === "linear" ? "linear-gradient" : "radial-gradient"
  }(${
    gradientType === "linear"
      ? angle + "deg"
      : "circle at " + x + "% " + y + "%"
  },${colors})`;
}
