"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Mail, Lock, ArrowRight, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      toast.success("Login successful! Redirecting...");
      router.push("/admin");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-[450px] px-4"
      >
        <Card className="border-primary/5 bg-background/60 backdrop-blur-2xl shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="pt-12 pb-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20 animate-bounce-slow">
              <Bus className="text-primary-foreground h-8 w-8" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-4xl font-black tracking-tighter text-foreground">
                Authorize Access
              </CardTitle>
              <CardDescription className="text-xs uppercase font-black tracking-[0.2em] text-muted-foreground/60">
                Enterprise Logistics Management
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground"> Email Identity </Label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                      <Mail className="h-4 w-4" />
                    </div>
                    <Input
                      type="email"
                      placeholder="name@enterprise.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 pl-12 bg-muted/30 border-primary/5 focus-visible:ring-primary/20 rounded-2xl font-bold transition-all text-foreground"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground"> Cryptographic Key </Label>
                    <button type="button" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"> Recover </button>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 pl-12 bg-muted/30 border-primary/5 focus-visible:ring-primary/20 rounded-2xl font-bold transition-all text-foreground"
                    />
                  </div>
                </div>
              </div>

              <Button
                disabled={loading}
                className="h-14 w-full rounded-2xl font-black text-xs uppercase tracking-widest bg-primary text-primary-foreground hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 border-none group"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <>
                    Initialize Session
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="pb-12 pt-4 justify-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
              Terminal: NCR-01 // Secure Node
            </p>
          </CardFooter>
        </Card>

        <div className="mt-8 flex justify-center gap-6 text-muted-foreground/40">
            <div className="h-px w-8 bg-current" />
            <p className="text-[10px] font-black uppercase tracking-widest"> Version 2.0.4-Stable </p>
            <div className="h-px w-8 bg-current" />
        </div>
      </motion.div>
    </div>
  );
}
