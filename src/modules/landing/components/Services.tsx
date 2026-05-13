"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Shield, Zap, BarChart, Smartphone, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Real-time Tracking",
    description: "Enterprise-grade GPS tracking with millisecond latency for precise fleet monitoring.",
    icon: MapPin,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Secure Payments",
    description: "Next-gen cryptographic payment processing for secure and fast transactions.",
    icon: Shield,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Route Optimization",
    description: "AI-powered algorithms to find the most efficient routes and reduce fuel consumption.",
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    title: "Advanced Analytics",
    description: "Deep-dive data insights with customizable dashboards and automated reporting.",
    icon: BarChart,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Driver Companion",
    description: "A dedicated mobile experience for drivers to manage their shifts and routes.",
    icon: Smartphone,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    title: "Fleet Management",
    description: "Complete lifecycle management for your vehicles, from maintenance to disposal.",
    icon: Users,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-muted/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
            Our Elite <span className="text-primary italic">Services.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            Discover how our advanced technology can transform your logistics operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-card/60 backdrop-blur-xl border border-white/5 hover:border-primary/20 transition-all duration-500 group"
            >
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3",
                service.bg,
                service.color
              )}>
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-black mb-3">{service.title}</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
