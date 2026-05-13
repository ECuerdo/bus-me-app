"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "@/modules/landing/components/Navbar";
import { Hero } from "@/modules/landing/components/Hero";
import { Services } from "@/modules/landing/components/Services";
import { About } from "@/modules/landing/components/About";
import { Contact } from "@/modules/landing/components/Contact";
import { Stats } from "@/modules/landing/components/Stats";
import { CTA } from "@/modules/landing/components/CTA";
import { Footer } from "@/modules/landing/components/Footer";
import { TrustedBy } from "@/modules/landing/components/TrustedBy";
import { Testimonials } from "@/modules/landing/components/Testimonials";
import { AccessSection } from "@/modules/landing/components/AccessSection";

export default function LandingModule() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-background font-sans selection:bg-primary/30 selection:text-primary-foreground overflow-x-hidden">
      {/* Elite Premium Background: Animated Mesh Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* The Base Background Image */}
        <Image 
          src="/landing-bg.png" 
          alt="Logistics Background" 
          fill
          className="object-cover opacity-40 scale-110"
          priority
        />
        
        {/* Moving Mesh Orbs */}
        <motion.div 
            animate={{ 
                x: [0, 100, 0], 
                y: [0, 50, 0],
                scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full" 
        />
        <motion.div 
            animate={{ 
                x: [0, -100, 0], 
                y: [0, -50, 0],
                scale: [1.2, 1, 1.2] 
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/20 blur-[150px] rounded-full" 
        />
        <motion.div 
            animate={{ 
                rotate: 360,
                scale: [1, 1.5, 1] 
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" 
        />

        {/* Scrim Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(var(--background),0.95)_100%)]" />
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <TrustedBy />
        <Stats />
        <About />
        <Services />
        <AccessSection />
        <Testimonials />
        <Contact />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
