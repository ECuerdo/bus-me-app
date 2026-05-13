"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/modules/landing/components/Navbar";
import { Footer } from "@/modules/landing/components/Footer";
import { About } from "@/modules/landing/components/About";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background font-sans selection:bg-primary/30 selection:text-primary-foreground overflow-x-hidden">
      {/* Elite Premium Background: Animated Mesh Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/about-bg.png" 
          alt="About Background" 
          className="w-full h-full object-cover opacity-40 scale-110"
        />
        <motion.div 
            animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/20 blur-[150px] rounded-full" 
        />
        <motion.div 
            animate={{ x: [0, -100, 0], y: [0, -50, 0], scale: [1.2, 1, 1.2] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-rose-500/20 blur-[150px] rounded-full" 
        />
        <motion.div 
            animate={{ rotate: 360, scale: [1, 1.5, 1] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-violet-500/10 blur-[120px] rounded-full" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(var(--background),0.95)_100%)]" />
      </div>

      <Navbar />

      <main className="flex-1 relative z-10 pt-32">
        <About />
      </main>

      <Footer />
    </div>
  );
}
