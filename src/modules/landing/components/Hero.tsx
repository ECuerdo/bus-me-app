"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-400/10 blur-[100px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/20">
              <Zap className="h-3.5 w-3.5 fill-current" />
              The Easiest Way to Manage Your Fleet
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-black tracking-tight leading-[0.85] text-foreground drop-shadow-2xl"
          >
            Smart Logistics <br />
            <span className="text-primary drop-shadow-[0_0_30px_rgba(var(--primary),0.5)] relative">
                Simplified.
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-4 -right-4 h-3 w-3 bg-primary rounded-full blur-sm" 
                />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-foreground/80 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed drop-shadow-md"
          >
            Monitor your buses, track routes live, and keep everything running smoothly with our all-in-one platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Link href="/signup">
              <Button size="lg" className="h-14 px-8 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                Try it for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl font-black text-sm uppercase tracking-widest border-2 hover:bg-muted/50">
              <Play className="mr-2 h-4 w-4 fill-current" />
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center justify-center lg:justify-start gap-6 text-muted-foreground/60 pt-4"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              No Credit Card
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
              <Shield className="h-4 w-4 text-primary" />
              GDPR Compliant
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          {/* Mockup Frame - Represents a Dashboard Preview */}
          <div className="relative z-10 bg-card/40 backdrop-blur-3xl border border-border rounded-[2.5rem] p-4 shadow-[0_0_100px_rgba(var(--primary),0.1)]">
             <div className="bg-background/80 rounded-[2rem] overflow-hidden aspect-[4/3] relative border border-border shadow-inner flex flex-col">
                {/* Simulated Dashboard Header */}
                <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="h-6 w-32 bg-muted/40 rounded-md" />
                </div>

                {/* Simulated UI Content */}
                <div className="p-6 flex flex-col gap-6 flex-1">
                    <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-16 bg-muted/20 rounded-xl border border-border/50 p-3 flex flex-col justify-between">
                                <div className="h-2 w-8 bg-primary/20 rounded-full" />
                                <div className="h-3 w-12 bg-foreground/10 rounded-full" />
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex-1 bg-muted/5 rounded-2xl border border-border/50 relative overflow-hidden">
                        {/* Simulated Map Background */}
                        <div className="absolute inset-0 opacity-10" style={{ 
                            backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)", 
                            backgroundSize: "24px 24px" 
                        }} />
                        
                        {/* Route Lines */}
                        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M10,50 Q30,20 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                            <path d="M20,80 Q50,40 80,80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                        </svg>

                        {/* Map dots representation - Hardcoded to avoid hydration mismatch */}
                        {[
                          { top: "25%", left: "30%", pulse: true },
                          { top: "60%", left: "15%", pulse: false },
                          { top: "45%", left: "70%", pulse: true },
                          { top: "80%", left: "40%", pulse: false },
                          { top: "20%", left: "80%", pulse: true },
                          { top: "70%", left: "85%", pulse: false },
                        ].map((pos, i) => (
                            <div 
                                key={i}
                                className={cn(
                                    "absolute h-2.5 w-2.5 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]",
                                    pos.pulse && "animate-pulse"
                                )}
                                style={{
                                    top: pos.top,
                                    left: pos.left,
                                }}
                            >
                                <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
                            </div>
                        ))}
                    </div>
                </div>
             </div>
          </div>

          {/* Floating UI Elements */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 z-20 bg-background/90 backdrop-blur p-4 rounded-2xl border border-border shadow-xl w-48"
          >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-green-500 h-5 w-5" />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase text-muted-foreground">Fleet Status</p>
                    <p className="text-sm font-bold">98.2% Active</p>
                </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-10 -left-10 z-20 bg-background/90 backdrop-blur p-4 rounded-2xl border border-border shadow-xl w-56"
          >
            <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase text-muted-foreground">Revenue Overview</p>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 2, delay: 1 }}
                        className="h-full bg-primary"
                    />
                </div>
                <p className="text-xs font-bold">+12.5% this month</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
