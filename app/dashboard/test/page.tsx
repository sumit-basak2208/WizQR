"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { MouseEventHandler } from "react";

// Interaction hyperparameters
const sheenSize = 500;
const cardRotation = 15;
const cardScale = 1.07;

export default function Home() {
  // Raw motion values
  const xPcnt = useSpring(0, { bounce: 0 });
  const yPcnt = useSpring(0, { bounce: 0 });
  const mouseX = useSpring(0, { bounce: 0 });
  const mouseY = useSpring(0, { bounce: 0 });
  const scale = useSpring(1, { bounce: 0 });

  // Calculated rotation values for styling
  const rotateX = useTransform(
    yPcnt,
    [-0.5, 0.5],
    [`-${cardRotation}deg`, `${cardRotation}deg`]
  );
  const rotateY = useTransform(
    xPcnt,
    [-0.5, 0.5],
    [`${cardRotation}deg`, `-${cardRotation}deg`]
  );

  // Calculated sheen values for styling
  const sheenX = useTransform(() => mouseX.get() - sheenSize / 2);
  const sheenY = useTransform(() => mouseY.get() - sheenSize / 2);

  // Helper function for getting mouse position
  const getMousePosition = (e: React.MouseEvent<Element, MouseEvent>) => {
    const { width, height, left, top } =
      e.currentTarget.getBoundingClientRect();

    const currentMouseX = e.clientX - left;
    const currentMouseY = e.clientY - top;

    return {
      currentMouseX,
      currentMouseY,
      containerWidth: width,
      containerHeight: height,
    };
  };

  // Mouse event handlers
  const handleMouseMove: MouseEventHandler = (e) => {
    const { currentMouseX, currentMouseY, containerWidth, containerHeight } =
      getMousePosition(e);

    xPcnt.set(currentMouseX / containerWidth - 0.5);
    yPcnt.set(currentMouseY / containerHeight - 0.5);

    mouseX.set(currentMouseX);
    mouseY.set(currentMouseY);
  };

  const handleMouseEnter: MouseEventHandler = (e) => {
    const { currentMouseX, currentMouseY } = getMousePosition(e);

    mouseX.jump(currentMouseX);
    mouseY.jump(currentMouseY);
    scale.set(cardScale);
  };

  const handleMouseLeave: MouseEventHandler = (e) => {
    xPcnt.set(0);
    yPcnt.set(0);
    scale.set(1);
  };

  return (
    <main
      style={{
        background: "url(/bg.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
      className="flex flex-col items-center justify-center absolute inset-0 z-50"
    >
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex flex-col h-96 w-64 rounded-xl bg-red-400 shadow-lg overflow-hidden group"
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          scale,
        }}
      >
        <motion.div
          className="absolute z-10 opacity-0 group-hover:opacity-30 transition-opacity duration-200 rounded-full blur-md"
          style={{
            height: sheenSize,
            width: sheenSize,
            background: "radial-gradient(white, #3984ff00 80%)",
            left: sheenX,
            top: sheenY,
          }}
        />
        <CardContent />
      </motion.div>
    </main>
  );
}

const CardContent = () => {
  return <div className="bg-black"></div>;
};
