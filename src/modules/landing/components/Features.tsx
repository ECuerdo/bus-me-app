"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Navigation, 
  ShieldCheck, 
  BarChart3, 
  Smartphone, 
  Clock,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Real-time Tracking",
    description: "Monitor your entire fleet with GPS precision and instant status updates.",
    icon: Navigation,
    color: "bg-blue-500/10 text-blue-500",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Secure Payments",
    description: "Enterprise-grade security for all ticketing transactions.",
    icon: ShieldCheck,
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "Analytics Dashboard",
    description: "Deep insights into performance and revenue metrics.",
    icon: BarChart3,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Multi-Region Support",
    description: "Seamlessly manage routes across multiple cities or countries.",
    icon: Globe,
    color: "bg-orange-500/10 text-orange-500",
    className: "md:col-span-2",
  },
  {
    title: "Smart Scheduling",
    description: "AI-driven route optimization and schedule management.",
    icon: Clock,
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    title: "Cross-Platform",
    description: "Access from mobile, tablet, or desktop with ease.",
    icon: Smartphone,
    color: "bg-indigo-500/10 text-indigo-500",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-6 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10"
          >
            Our Ecosystem
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]"
          >
            Powerful Features for <br />
            <span className="text-primary italic">Modern Logistics.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium"
          >
            Everything you need to run a high-performance transportation business in one unified platform.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotateX: -2, rotateY: 2 }}
              className={cn(
                "group relative p-10 rounded-[3.5rem] bg-card/80 backdrop-blur-3xl border border-white/10 overflow-hidden hover:shadow-2xl hover:shadow-primary/30 transition-all duration-700 hover:border-primary/20",
                feature.className
              )}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
                e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Spotlight Effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(var(--primary),0.15),transparent_80%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Technical Jargon in background */}
              <div className="absolute top-10 right-10 text-[8px] font-black uppercase tracking-[0.4em] opacity-[0.03] select-none group-hover:opacity-10 transition-opacity">
                0x3F2 // SYS_STABLE // NODE_{index + 1}
              </div>

              <div className="relative z-10 space-y-8" style={{ transform: "translateZ(30px)" }}>
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 shadow-2xl relative",
                  feature.color
                )}>
                  {/* Icon Glow */}
                  <div className="absolute inset-0 blur-2xl bg-current opacity-0 group-hover:opacity-50 transition-all duration-700 scale-150" />
                  <feature.icon className="h-8 w-8 relative z-10" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-500">
                        {feature.title}
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                  </div>
                  <p className="text-foreground/70 font-medium leading-relaxed group-hover:text-foreground transition-colors duration-500">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Explore Feature</span>
                    <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

