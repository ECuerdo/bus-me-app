"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bus } from "lucide-react";

export function ThemeTransition() {
  const [isActive, setIsActive] = useState(false);
  const [targetTheme, setTargetTheme] = useState<"light" | "dark">("dark");
  const [variant, setVariant] = useState(0);

  useEffect(() => {
    const handleTransition = (e: Event) => {
      const customEvent = e as CustomEvent<"light" | "dark">;
      setTargetTheme(customEvent.detail);
      setVariant(Math.floor(Math.random() * 3)); // Pick one of 3 variants
      setIsActive(true);
      setTimeout(() => {
        setIsActive(false);
      }, 1600);
    };

    window.addEventListener("theme-transition", handleTransition);
    return () => window.removeEventListener("theme-transition", handleTransition);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          {/* BACKGROUND VARIANTS */}
          
          {/* Variant 0: Vertical Panels */}
          {variant === 0 && (
            <div className="absolute inset-0 flex">
                {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    transition={{ 
                        duration: 0.7, 
                        ease: [0.76, 0, 0.24, 1],
                        delay: i * 0.04 
                    }}
                    className={`flex-1 h-full origin-top ${
                    targetTheme === "dark" ? "bg-[#0a0a0a]" : "bg-[#ffffff]"
                    }`}
                />
                ))}
            </div>
          )}

          {/* Variant 1: Circular Expansion */}
          {variant === 1 && (
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className={`absolute w-[100vmax] h-[100vmax] rounded-full ${
                    targetTheme === "dark" ? "bg-[#0a0a0a]" : "bg-[#ffffff]"
                }`}
            />
          )}

          {/* Variant 2: Diagonal Slide */}
          {variant === 2 && (
            <div className="absolute inset-0">
                <motion.div
                    initial={{ x: "-100%", y: "-100%" }}
                    animate={{ x: "0%", y: "0%" }}
                    exit={{ x: "100%", y: "100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className={`absolute inset-0 ${
                        targetTheme === "dark" ? "bg-[#0a0a0a]" : "bg-[#ffffff]"
                    }`}
                />
            </div>
          )}

          {/* Content Overlay (Shared) */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="space-y-8"
            >
              <div className="relative inline-block">
                <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className={`absolute -inset-8 border border-dashed rounded-full opacity-20 ${
                        targetTheme === "dark" ? "border-white" : "border-black"
                    }`}
                />
                <div className={`relative mx-auto w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-2xl ${
                    targetTheme === "dark" 
                        ? "bg-primary text-white shadow-primary/40" 
                        : "bg-primary text-white shadow-primary/20"
                }`}>
                    <Bus className="w-10 h-10" />
                </div>
              </div>

              <div className="space-y-3">
                <motion.div
                  initial={{ letterSpacing: "1em", opacity: 0 }}
                  animate={{ letterSpacing: "0.5em", opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className={`text-[10px] font-black uppercase tracking-[0.5em] ${
                    targetTheme === "dark" ? "text-primary" : "text-primary/70"
                  }`}
                >
                  {variant === 0 ? "MATRIX SHIFT" : variant === 1 ? "CORE RADIANCE" : "VECTOR ALIGNMENT"}
                </motion.div>
                <div className="relative">
                    <h2 className={`text-5xl md:text-8xl font-black tracking-tighter ${
                        targetTheme === "dark" ? "text-white" : "text-black"
                    }`}>
                        {targetTheme === "dark" ? "DARK" : "LIGHT"} <span className="italic font-light opacity-30 text-primary">CORE</span>
                    </h2>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                  <div className={`w-64 h-1 rounded-full overflow-hidden bg-primary/10 relative`}>
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
                    />
                  </div>
              </div>
            </motion.div>
          </div>

          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
