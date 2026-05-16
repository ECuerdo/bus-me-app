"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-primary rounded-[3rem] p-12 md:p-24 text-center space-y-10 shadow-2xl shadow-primary/40"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
            <motion.div 
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 blur-[120px] rounded-full" 
            />
          </div>

          <div className="relative z-10 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <Sparkles className="h-3 w-3" />
                Limited Time Offer
              </div>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-black tracking-tight text-white leading-none"
            >
              Ready to grow <br />
              your business?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto font-medium"
            >
              Join over 500 transport companies that use BUSME to run their business every day.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/signup">
              <Button size="lg" className="h-16 px-10 rounded-2xl bg-white text-primary hover:bg-white/90 font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95">
                Start for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 font-black text-sm uppercase tracking-widest transition-all">
              Talk to Us
            </Button>
          </motion.div>

          {/* Bottom tag */}
          <div className="relative z-10 pt-4">
             <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">
                No credit card needed • Cancel anytime • 14-day free trial
             </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
