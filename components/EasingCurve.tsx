import React, { useState, useCallback, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

const EasingCurve: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [controlPoints, setControlPoints] = useState<{ p1: Point; p2: Point }>({
    p1: { x: 50, y: 150 }, // Control point 1
    p2: { x: 150, y: 50 }, // Control point 2
  });

  const width = 200;
  const height = 200;

  const handleDrag = useCallback(
    (
      point: "p1" | "p2",
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
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

  const getEqualDistancePoints = (): Point[] => {
    const points: Point[] = [];
    for (let i = 0; i <= 5; i++) {
      points.push(calculateBezierPoint(i / 5));
    }
    return points;
  };

  const curvePoints = getEqualDistancePoints();

  return (
    <div className="relative">
      {/* SVG for curve */}
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="bg-gray-900 rounded-lg"
      >
        {/* Cubic Bézier Curve */}
        <path
          d={`M 0 ${height} C ${controlPoints.p1.x} ${controlPoints.p1.y}, ${controlPoints.p2.x} ${controlPoints.p2.y}, ${width} 0`}
          stroke="white"
          fill="transparent"
          strokeWidth="2"
        />
        {/* Equally spaced points on the curve */}
        {curvePoints.map((pt, index) => (
          <circle key={index} cx={pt.x} cy={pt.y} r="4" fill="red" />
        ))}
      </svg>

      {/* Control buttons */}
      <button
        className="absolute bg-white rounded-full w-6 h-6"
        style={{
          left: `${controlPoints.p1.x - 12}px`,
          top: `${controlPoints.p1.y - 12}px`,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          const onMouseMove = (ev: MouseEvent) => handleDrag("p1", ev as any);
          const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
          };
          window.addEventListener("mousemove", onMouseMove);
          window.addEventListener("mouseup", onMouseUp);
        }}
      ></button>

      <button
        className="absolute bg-white rounded-full w-6 h-6"
        style={{
          left: `${controlPoints.p2.x - 12}px`,
          top: `${controlPoints.p2.y - 12}px`,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          const onMouseMove = (ev: MouseEvent) => handleDrag("p2", ev as any);
          const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
          };
          window.addEventListener("mousemove", onMouseMove);
          window.addEventListener("mouseup", onMouseUp);
        }}
      ></button>

      {/* Display the equally spaced points */}
      <div className="mt-4">
        {curvePoints.map((pt, index) => (
          <div key={index}>
            Point {index + 1}: (x: {Math.round(pt.x)}, y: {Math.round(pt.y)})
          </div>
        ))}
      </div>
    </div>
  );
};

export default EasingCurve;
