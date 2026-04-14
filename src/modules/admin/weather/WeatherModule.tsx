"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Cloud, 
  CloudRain, 
  CloudSun, 
  Droplets, 
  Thermometer, 
  Wind, 
  Eye, 
  Siren,
  Banknote,
  RadioTower,
  CloudLightning,
  Sun
} from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import for Leaflet map to avoid SSR issues
const WeatherMap = dynamic(() => import("./components/WeatherMap"), { 
  ssr: false,
  loading: () => (
    <div className="h-[70vh] w-full bg-muted animate-pulse rounded-[2rem] flex items-center justify-center">
      <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">Initializing Satellite Feed...</p>
    </div>
  )
});

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  lastUpdated: string;
}

export default function WeatherModule() {
  const [weather, setWeather] = useState<WeatherData>({
    temp: 29,
    condition: "Partly Cloudy",
    humidity: 72,
    windSpeed: 12,
    visibility: 10,
    lastUpdated: new Date().toLocaleTimeString(),
  });

  const [activeLayer, setActiveLayer] = useState<"wind" | "rain" | "clouds" | "radar" | "temp">("wind");

  // Mock "live" updates
  useEffect(() => {
    const timer = setInterval(() => {
      setWeather(prev => ({
        ...prev,
        temp: prev.temp + (Math.random() > 0.5 ? 0.1 : -0.1),
        lastUpdated: new Date().toLocaleTimeString(),
      }));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const weatherStats = [
    { label: "Temperature", value: `${weather.temp.toFixed(1)}°C`, icon: Thermometer, color: "text-orange-500" },
    { label: "Humidity", value: `${weather.humidity}%`, icon: Droplets, color: "text-blue-500" },
    { label: "Wind Speed", value: `${weather.windSpeed} km/h`, icon: Wind, color: "text-slate-400" },
    { label: "Visibility", value: `${weather.visibility} km`, icon: Eye, color: "text-emerald-500" },
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny": return <Sun className="h-8 w-8 text-yellow-500 animate-pulse" />;
      case "rainy": return <CloudRain className="h-8 w-8 text-blue-400 animate-bounce" />;
      case "stormy": return <CloudLightning className="h-8 w-8 text-indigo-600 animate-pulse" />;
      default: return <CloudSun className="h-8 w-8 text-orange-400 animate-pulse" />;
    }
  };

  const layers = [
    { id: "wind", label: "Wind Animation", icon: Wind },
    { id: "radar", label: "Weather Radar", icon: RadioTower },
    { id: "rain", label: "Rain / Thunder", icon: CloudRain },
    { id: "clouds", label: "Cloud Cover", icon: Cloud },
    { id: "temp", label: "Air Temperature", icon: Thermometer },
  ] as const;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {weatherStats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-xl bg-card/40 backdrop-blur-xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
              <stat.icon className="h-12 w-12" />
            </div>
            <CardHeader className="pb-2">
              <CardDescription className="text-[10px] font-black uppercase tracking-widest">{stat.label}</CardDescription>
              <CardTitle className="text-3xl font-black flex items-center gap-2">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                {stat.value}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-none shadow-2xl bg-card/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
             <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                   <div>
                      <CardTitle className="text-xl font-black">Windy Hybrid Dashboard</CardTitle>
                      <CardDescription className="text-[10px] uppercase font-bold tracking-widest">Real-time Environmental Monitoring</CardDescription>
                   </div>
                   <div className="hidden sm:flex gap-1 ml-4 p-1 bg-black/20 rounded-xl border border-white/5">
                      {layers.map((layer) => (
                         <button
                           key={layer.id}
                           onClick={() => setActiveLayer(layer.id)}
                           className={cn(
                             "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black tracking-widest uppercase transition-all duration-300",
                             activeLayer === layer.id 
                               ? "bg-primary text-white shadow-lg shadow-primary/30" 
                               : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
                           )}
                         >
                            <layer.icon className="h-3 w-3" />
                            {layer.id}
                         </button>
                      ))}
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <Badge variant="outline" className="animate-pulse bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-3 py-1 font-black text-[10px] uppercase">
                      Live Windy Feed
                   </Badge>
                </div>
             </CardHeader>
             <CardContent className="p-0 relative">
                <WeatherMap activeOverlay={activeLayer} />
             </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="border-none shadow-xl bg-card/40 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg font-black">Current Status</CardTitle>
              <CardDescription className="text-[10px] uppercase font-bold tracking-widest">Manila Metropolitan Area</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                {getWeatherIcon(weather.condition)}
                <div>
                  <p className="text-2xl font-black text-foreground">{weather.condition}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Last updated: {weather.lastUpdated}</p>
                </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Regional Forecast</h4>
                 {[
                   { area: "Quezon City", temp: "30°C", condition: "Sunny" },
                   { area: "Makati District", temp: "29°C", condition: "Cloudy" },
                   { area: "Manila Port", temp: "28°C", condition: "Windy" },
                 ].map((reg) => (
                   <div key={reg.area} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                      <span className="text-xs font-bold text-foreground">{reg.area}</span>
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] font-black text-muted-foreground uppercase">{reg.condition}</span>
                         <span className="text-sm font-black text-primary">{reg.temp}</span>
                      </div>
                   </div>
                 ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl bg-gradient-to-br from-primary/20 via-transparent to-transparent backdrop-blur-xl">
             <CardHeader>
                <CardTitle className="text-lg font-black">Alerts</CardTitle>
                <Badge className="w-fit bg-rose-500/20 text-rose-500 border-none px-2 py-0.5 text-[8px] font-black uppercase">None Active</Badge>
             </CardHeader>
             <CardContent>
                <p className="text-[11px] font-bold text-muted-foreground leading-relaxed">
                   Atmospheric conditions are currently stable. No significant weather-related disruptions reported for the fleet routes.
                </p>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
