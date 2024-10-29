"use client";
import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function FloatingCard() {
  return (
    <div className="relative min-w-[1024px] h-screen">
      {/* Each thread and card pair */}
      <div
        className="z-30 absolute inset-0 pointer-events-none drop-shadow-lg flex justify-center flex-col"
        style={{
          backdropFilter: "blur(10px)", // Adjust the blur for the frosted effect
          backgroundColor: "rgba(255, 255, 255, 0.1)", // Light semi-transparent overlay
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Soft shadow for depth
          borderRadius: "10px",
          fontFamily: "var(--Lobster)",
        }}
      >
        <div className="text-white text-9xl font-bold ml-20">
          Elevate your{" "}
          <TypeAnimation
            sequence={["business.", 1000, "career.", 1000, "website.", 1000]}
            repeat={Infinity}
            speed={50}
          ></TypeAnimation>
        </div>
        <p className="text-white text-3xl font-bold ml-20 mt-4">
          With custom cards, designed for your need.
        </p>
      </div>
      <motion.div
        className="thread-with-card absolute flex flex-col items-center"
        style={{ left: "3%", zIndex: 10, top: 0 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0.2,
          }}
          className="w-[1px] h-[265px] bg-black/50 shadow"
          style={{
            transformOrigin: "top", // Ensures growth happens from the top down
          }}
        />
        <motion.div
          initial={{ y: -700 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0.2,
          }}
        >
          <motion.div
            className="bg-white border px-7 pt-7 border-[inset] w-[200px] h-[310px] rounded-lg shadow"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            style={{
              boxShadow: "0px 3px 9px rgba(0, 0, 0, 0.3)",
              background: "linear-gradient(to right,#d567b0,#a04a8f)",
            }}
          />
        </motion.div>
      </motion.div>
      <motion.div
        className="thread-with-card absolute flex flex-col items-center"
        style={{ left: "15%", zIndex: 10, top: 0 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0.1,
          }}
          className="w-[1px] h-[320px] bg-black/50 shadow"
          style={{
            transformOrigin: "top", // Ensures growth happens from the top down
          }}
        />
        <motion.div
          initial={{ y: -700 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0.1,
          }}
        >
          <motion.div
            className="bg-white border px-7 pt-7 border-[inset] w-[200px] h-[310px] rounded-lg shadow"
            initial={{ y: 0 }}
            animate={{ y: [0, -12, 0], rotate: [0, 2.5, -2, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            style={{
              boxShadow: "0px 3px 9px rgba(0, 0, 0, 0.3)",
              background: "linear-gradient(to right,#22139c,#3cb37c)",
            }}
          />
        </motion.div>
      </motion.div>
      <motion.div
        className="thread-with-card absolute flex flex-col items-center"
        style={{ left: "30%", zIndex: 10, top: 0 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0,
          }}
          className="w-[1px] h-[240px] bg-black/50 shadow"
          style={{
            transformOrigin: "top", // Ensures growth happens from the top down
          }}
        />
        <motion.div
          initial={{ y: -700 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0,
          }}
        >
          <motion.div
            className="bg-white border px-7 pt-7 border-[inset] w-[200px] h-[310px] rounded-lg shadow"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0], rotate: [0, 2, -3, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            style={{
              boxShadow: "0px 3px 9px rgba(0, 0, 0, 0.3)",
              background: "linear-gradient(to right,#5e87c5,#14b596)",
            }}
          />
        </motion.div>
      </motion.div>
      <motion.div
        className="thread-with-card absolute flex flex-col items-center"
        style={{ left: "45%", zIndex: 20, top: 0 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0.3,
          }}
          className="w-[1px] h-[300px] bg-black/50 shadow"
          style={{
            transformOrigin: "top", // Ensures growth happens from the top down
          }}
        />
        <motion.div
          initial={{ y: -700 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0.3,
          }}
        >
          <motion.div
            className="bg-white border px-7 pt-7 border-[inset] w-[200px] h-[310px] rounded-lg shadow"
            initial={{ y: 0 }}
            animate={{ y: [0, -12, 0], rotate: [0, 2.5, -2, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            style={{
              boxShadow: "0px 3px 9px rgba(0, 0, 0, 0.3)",
              background: "linear-gradient(to right,#5c09a4,#86321a)",
            }}
          />
        </motion.div>
      </motion.div>
      <motion.div
        className="thread-with-card absolute flex flex-col items-center"
        style={{ left: "55%", zIndex: 10, top: 0 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0.45,
          }}
          className="w-[1px] h-[190px] bg-black/50 shadow"
          style={{
            transformOrigin: "top", // Ensures growth happens from the top down
          }}
        />
        <motion.div
          initial={{ y: -700 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0.45,
          }}
        >
          <motion.div
            className="bg-white border px-7 pt-7 border-[inset] w-[200px] h-[310px] rounded-lg shadow"
            initial={{ y: 0 }}
            animate={{ y: [0, -12, 0], rotate: [0, 2.5, -2, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            style={{
              boxShadow: "0px 3px 9px rgba(0, 0, 0, 0.3)",
              background: "linear-gradient(to right,#c9ae2c,#14b285)",
            }}
          />
        </motion.div>
      </motion.div>
      <motion.div
        className="thread-with-card absolute flex flex-col items-center"
        style={{ left: "70%", zIndex: 10, top: 0 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0.32,
          }}
          className="w-[1px] h-[330px] bg-black/50 shadow"
          style={{
            transformOrigin: "top", // Ensures growth happens from the top down
          }}
        />
        <motion.div
          initial={{ y: -700 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0.32,
          }}
        >
          <motion.div
            className="bg-white border px-7 pt-7 border-[inset] w-[200px] h-[310px] rounded-lg shadow"
            initial={{ y: 0 }}
            animate={{ y: [0, -12, 0], rotate: [0, 2.5, -2, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            style={{
              boxShadow: "0px 3px 9px rgba(0, 0, 0, 0.3)",
              background: "linear-gradient(to right,#82f7ab,#f3c281)",
            }}
          />
        </motion.div>
      </motion.div>
      <motion.div
        className="thread-with-card absolute flex flex-col items-center"
        style={{ left: "85%", zIndex: 10, top: 0 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0.14,
          }}
          className="w-[1px] h-[260px] bg-black/50 shadow"
          style={{
            transformOrigin: "top", // Ensures growth happens from the top down
          }}
        />
        <motion.div
          initial={{ y: -700 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0.14,
          }}
        >
          <motion.div
            className="bg-white border px-7 pt-7 border-[inset] w-[200px] h-[310px] rounded-lg shadow"
            initial={{ y: 0 }}
            animate={{ y: [0, -12, 0], rotate: [0, 2.5, -2, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            style={{
              boxShadow: "0px 3px 9px rgba(0, 0, 0, 0.3)",
              background: "linear-gradient(to right,#4226bf,#bb53e0)",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
