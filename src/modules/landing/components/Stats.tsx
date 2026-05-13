"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Active Buses", value: "2,500+" },
  { label: "Happy Clients", value: "450+" },
  { label: "Routes Optimized", value: "12,000+" },
  { label: "System Uptime", value: "99.99%" },
];

export function Stats() {
  return (
    <section className="relative z-10 py-20 border-y border-border/50 bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center space-y-2"
            >
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-primary">
                {stat.value}
              </h3>
              <p className="text-xs md:text-sm font-black uppercase tracking-widest text-foreground/60">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
