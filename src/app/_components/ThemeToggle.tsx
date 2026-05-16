"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeChange = (newTheme: string) => {
    // Dispatch custom event for the premium overlay
    window.dispatchEvent(new CustomEvent('theme-transition', { detail: newTheme }));

    // Delay the actual theme swap to happen during the overlay mid-point
    setTimeout(() => {
      if (document.documentElement) {
        document.documentElement.classList.add('theme-switching');
        setTheme(newTheme);
        setTimeout(() => {
          document.documentElement.classList.remove('theme-switching');
        }, 400); 
      } else {
        setTheme(newTheme);
      }
    }, 600); // Wait for panels to cover the screen
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-xl h-10 w-10 hover:bg-primary/5 transition-all"
      onClick={() => handleThemeChange(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
