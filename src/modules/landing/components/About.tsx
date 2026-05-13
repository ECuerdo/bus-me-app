"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Target, Rocket } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                Pioneering the Future of <br />
                <span className="text-primary italic">Mobility.</span>
              </h2>
              <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-xl">
                Founded with a vision to streamline complex logistics, BUSME has evolved into a global leader in fleet management technology. We empower transportation companies to operate with unprecedented efficiency and security.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                     <Target className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-black">Our Mission</h4>
                  <p className="text-sm text-muted-foreground font-medium">To deliver world-class automation for the logistics industry.</p>
               </div>
               <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                     <Users className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-black">Our Community</h4>
                  <p className="text-sm text-muted-foreground font-medium">Supporting thousands of drivers and operators worldwide.</p>
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
             {/* Decorative Image/Graphic Placeholder */}
             <div className="aspect-square rounded-[4rem] overflow-hidden border border-white/10 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent z-10" />
                <Image 
                    src="/landing-bg.png" 
                    alt="About BUSME" 
                    fill
                    className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="p-8 bg-background/80 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl text-center">
                        <Rocket className="h-12 w-12 text-primary mx-auto mb-4 animate-bounce" />
                        <h3 className="text-2xl font-black">Est. 2024</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary">Innovating Daily</p>
                    </div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
