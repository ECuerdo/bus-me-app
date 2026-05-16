"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bus, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function AccessSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
              Secure Access for <br />
              <span className="text-primary">Your Business.</span>
            </h2>
            <p className="text-lg text-muted-foreground font-medium max-w-lg">
              Experience top-level security built for transport management. Fast, safe, and protected.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              "Fingerprint and Face ID login",
              "Secure data protection",
              "Manage multiple sessions",
              "Live security monitoring"
            ].map((feature, i) => (
              <motion.div 
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-xs font-black uppercase tracking-widest text-foreground/60">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
            {/* Decorative Glow behind the card */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full -z-10 animate-pulse" />
            
            <Card className="border-white/10 bg-card/60 backdrop-blur-3xl shadow-2xl rounded-[3rem] overflow-hidden">
                <CardHeader className="pt-12 pb-8 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40">
                        <Bus className="text-primary-foreground h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-4xl font-black tracking-tighter text-foreground">
                            Sign In
                        </CardTitle>
                        <CardDescription className="text-xs uppercase font-black tracking-[0.2em] text-primary">
                            Logistics Management
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground"> Email Address </Label>
                            <Input
                                disabled
                                placeholder="name@enterprise.com"
                                className="h-14 bg-muted/20 border-white/5 rounded-2xl font-bold opacity-50 cursor-not-allowed"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground"> Password </Label>
                            <Input
                                disabled
                                type="password"
                                placeholder="••••••••"
                                className="h-14 bg-muted/20 border-white/5 rounded-2xl font-bold opacity-50 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <Link href="/login">
                        <Button className="h-14 w-full rounded-2xl font-black text-sm uppercase tracking-widest bg-primary text-primary-foreground hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 mt-4">
                            Go to Dashboard
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </Link>

                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 text-center">
                        Terminal: PREVIEW_MODE // NODE_SECURE
                    </p>
                </CardContent>
            </Card>
        </motion.div>
      </div>
    </section>
  );
}
