"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                Let&apos;s Start a <br />
                <span className="text-primary italic">Conversation.</span>
              </h2>
              <p className="text-muted-foreground text-lg font-medium">
                Ready to optimize your fleet? Our experts are here to help you scale your operations with BUSME.
              </p>
            </motion.div>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email Us</h4>
                  <p className="text-lg font-bold">hello@busme.app</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Call Us</h4>
                  <p className="text-lg font-bold">+1 (555) 000-BUSME</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Global HQ</h4>
                  <p className="text-lg font-bold">Logistics District, Metro Manila</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 bg-card/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl relative"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Full Name</label>
                  <Input placeholder="John Doe" className="h-14 bg-muted/20 border-white/5 rounded-2xl font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Work Email</label>
                  <Input placeholder="john@company.com" className="h-14 bg-muted/20 border-white/5 rounded-2xl font-bold" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Company</label>
                <Input placeholder="Acme Logistics" className="h-14 bg-muted/20 border-white/5 rounded-2xl font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Message</label>
                <Textarea placeholder="How can we help you?" className="min-h-[150px] bg-muted/20 border-white/5 rounded-3xl font-bold p-6" />
              </div>
              <Button className="w-full h-16 rounded-[2rem] bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-4">
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
