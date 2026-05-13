"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Operations Director, MetroLink",
    content: "BUSME transformed our dispatch workflow. We've seen a 30% reduction in fuel costs since implementation.",
    avatar: "AR",
  },
  {
    name: "Sarah Chen",
    role: "Fleet Manager, CityConnect",
    content: "The real-time tracking is second to none. Our drivers and passengers have never been more synchronized.",
    avatar: "SC",
  },
  {
    name: "Marcus Thorne",
    role: "CEO, Thorne Logistics",
    content: "Enterprise-grade security and a user experience that my team actually loves. Highly recommended.",
    avatar: "MT",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
            Loved by <span className="text-primary italic">Fleet Managers.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-card/40 backdrop-blur-xl border border-border relative group hover:bg-card/60 transition-all duration-500"
            >
              <Quote className="absolute top-6 right-8 h-12 w-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
              <div className="space-y-6 relative z-10">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg font-medium leading-relaxed italic">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarFallback className="font-black bg-primary/10 text-primary">
                      {t.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-black text-sm">{t.name}</h4>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
