"uuse client";

import { Point } from "@/type/card";
import { RefreshCw } from "lucide-react";
import React, {
  useCallback,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

export default function EasingCurve({
  setPoints,
  controlPoints,
  setControlPoints,
}: {
  setPoints: Dispatch<SetStateAction<number[]>>;
  controlPoints: { p1: Point; p2: Point };
  setControlPoints: Dispatch<SetStateAction<{ p1: Point; p2: Point }>>;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  const width = 200;
  const height = 200;

  const handleDrag = useCallback(
    (point: "p1" | "p2", e: MouseEvent) => {
      const svgElement = svgRef.current;
      if (!svgElement) return;

      const rect = svgElement.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      // Clamp the values to ensure control points stay within the bounds of the SVG
      setControlPoints((prev) => ({
        ...prev,
        [point]: {
          x: Math.min(Math.max(offsetX, 0), width),
          y: Math.min(Math.max(offsetY, 0), height),
        },
      }));
    },
    [width, height]
  );

  const calculateBezierPoint = (t: number): Point => {
    const { p1, p2 } = controlPoints;
    const x =
      (1 - t) * (1 - t) * (1 - t) * 0 +
      3 * (1 - t) * (1 - t) * t * p1.x +
      3 * (1 - t) * t * t * p2.x +
      t * t * t * width;
    const y =
      (1 - t) * (1 - t) * (1 - t) * height +
      3 * (1 - t) * (1 - t) * t * p1.y +
      3 * (1 - t) * t * t * p2.y +
      t * t * t * 0;
    return { x, y };
  };

  // const calculateBezierPoint = (t: number): Point => {
  //   const { p1, p2 } = controlPoints;
  //   const x =
  //     (1 - t) * (1 - t) * (1 - t) * 0 +
  //     3 * (1 - t) * (1 - t) * t * p1.x +
  //     3 * (1 - t) * t * t * p2.x +
  //     t * t * t * width;
  //   const y =
  //     (1 - t) * (1 - t) * (1 - t) * height +
  //     3 * (1 - t) * (1 - t) * t * p1.y +
  //     3 * (1 - t) * t * t * p2.y +
  //     t * t * t * 0;
  //   return { x, y };
  // };

  const getEqualDistancePoints = (): Point[] => {
    const points: Point[] = [];
    for (let i = 0; i < 10; i++) {
      points.push(calculateBezierPoint(i / 10));
    }
    return points;
  };
  
  // const getEqualDistancePoints = (): Point[] => {
  //   const points: Point[] = [];
  //   for (let i = 0; i < 10; i++) {
  //     points.push(calculateBezierPoint(i / 10));
  //   }
  //   return points;
  // };

  const calculatePercentagePoints = (): number[] => {
    return getEqualDistancePoints().map((pt) => (pt.x / width) * 100);
  };

  // Update parent component whenever the control points or curve points change
  useEffect(() => {
    const percentagePoints = calculatePercentagePoints();
    setPoints(percentagePoints);
  }, [controlPoints]);

  return (
    <div className="relative group w-fit">
      <button
        type="button"
        className="absolute group-hover:block hidden left-2 top-2"
      >
        <RefreshCw
          onClick={() =>
            setControlPoints({
              p1: { x: 50, y: 150 },
              p2: { x: 150, y: 50 },
            })
          }
          className="text-white"
          width={20}
          height={20}
        />
      </button>
      {/* SVG for curve */}
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="bg-gray-900 rounded-lg"
      >
        <line
          stroke="white"
          strokeDasharray="0,6"
          strokeWidth="3px"
          strokeLinecap="round"
          x1="200"
          y1="0"
          x2={controlPoints.p2.x}
          y2={controlPoints.p2.y}
        ></line>
        <line
          stroke="white"
          strokeDasharray="0,6"
          strokeWidth="3px"
          strokeLinecap="round"
          x1="0"
          y1="200"
          x2={controlPoints.p1.x}
          y2={controlPoints.p1.y}
        ></line>
        <path
          d={`M 0 ${height} C ${controlPoints.p1.x} ${controlPoints.p1.y}, ${controlPoints.p2.x} ${controlPoints.p2.y}, ${width} 0`}
          stroke="white"
          fill="transparent"
          strokeWidth="2"
        />
      </svg>

      {/* Control buttons */}
      <button
        type="button"
        className="absolute bg-white rounded-full w-6 h-6 shadow-lg border"
        style={{
          left: `${controlPoints.p1.x - 12}px`,
          top: `${controlPoints.p1.y - 12}px`,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          const onMouseMove = (ev: MouseEvent) => handleDrag("p1", ev);
          const onMouseUp = () => {
            globalThis.removeEventListener("mousemove", onMouseMove);
            globalThis.removeEventListener("mouseup", onMouseUp);
          };
          globalThis.addEventListener("mousemove", onMouseMove);
          globalThis.addEventListener("mouseup", onMouseUp);
        }}
      ></button>

      <button
        type="button"
        className="absolute bg-white rounded-full w-6 h-6 shadow-lg border"
        style={{
          left: `${controlPoints.p2.x - 12}px`,
          top: `${controlPoints.p2.y - 12}px`,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          const onMouseMove = (ev: MouseEvent) => handleDrag("p2", ev);
          const onMouseUp = () => {
            globalThis.removeEventListener("mousemove", onMouseMove);
            globalThis.removeEventListener("mouseup", onMouseUp);
          };
          globalThis.addEventListener("mousemove", onMouseMove);
          globalThis.addEventListener("mouseup", onMouseUp);
        }}
      ></button>
    </div>
  );
}
