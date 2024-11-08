"use client";
import React, { useRef, Dispatch, SetStateAction } from "react";

export default function AngleSelector({
  angle,
  setAngle,
}: {
  angle: number;
  setAngle: Dispatch<SetStateAction<number>>;
}) {
  const circleRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (circleRef.current) {
      const rect = circleRef.current.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      const newAngle = Math.round((Math.atan2(y, x) * 180) / Math.PI + 90);
      setAngle((newAngle + 360) % 360);
    }
  };

  const startDragging = () => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);
  };

  const stopDragging = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", stopDragging);
  };

  return (
    <div
      ref={circleRef}
      onMouseDown={startDragging}
      className="relative w-[200px] h-[200px] rounded-full bg-gray-900 flex items-center justify-center"
      // className="relative w-[200px] h-[200px] rounded-full bg-gray-900 flex items-center justify-center"
    >
      <div
        style={{ transform: `rotate(${angle}deg)` }}
        className="absolute inset-0 flex justify-center"
      >
        <div className="w-1 rounded h-[5.5rem] bg-white"></div>
      </div>
    </div>
  );
}
