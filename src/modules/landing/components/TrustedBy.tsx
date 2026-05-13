"use client";

import React from "react";
import { motion } from "framer-motion";

const companies = [
  "METRO TRANSIT", "GLOBAL LOGISTICS", "CITY EXPRESS", "NEXUS FLEET", "ORBIT TRAVEL"
];

export function TrustedBy() {
  return (
    <section className="py-12 border-b border-border/50 bg-background/50 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-center text-muted-foreground/60 mb-8">
          Trusted by Industry Leaders Worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {companies.map((company, index) => (
            <motion.span
              key={company}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-lg md:text-xl font-black tracking-tighter"
            >
              {company}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
