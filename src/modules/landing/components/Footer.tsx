"use client";

import React from "react";
import Link from "next/link";
import { Bus, Twitter, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "API Reference", href: "#" },
        { name: "Community", href: "#" },
        { name: "Status", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
        { name: "Cookie Policy", href: "#" },
      ],
    },
  ];

  return (
    <footer className="relative z-10 bg-background/95 backdrop-blur-md pt-24 pb-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Bus className="text-primary-foreground h-6 w-6" />
              </div>
              <span className="text-xl font-black tracking-tighter text-foreground">
                BUS<span className="text-primary">ME</span>
              </span>
            </Link>
            <p className="text-foreground/70 font-medium max-w-xs leading-relaxed">
              Smart fleet management for everyone. Helping transportation businesses run better every day.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all border border-border/50">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all border border-border/50">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all border border-border/50">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                {group.title}
              </h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">
            © {currentYear} BUSME. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/40">
            <Mail className="h-3 w-3" />
            SUPPORT@BUSME.APP
          </div>
        </div>
      </div>
    </footer>
  );
}
