"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import { useTheme } from "next-themes";
import { Plus, Minus, Layers, Globe, Trees } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Premium Bus Icon Creator
const createBusIcon = (theme: string | undefined) => {
  return L.divIcon({
    className: "custom-bus-icon",
    html: `
      <div class="relative flex items-center justify-center p-4">
        <!-- Glow Effect -->
        <div class="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 animate-pulse"></div>
        
        <!-- The Pin Structure -->
        <div class="relative flex flex-col items-center">
          <!-- Bubble Container -->
          <div class="h-11 w-11 rounded-[1.25rem] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-2 border-primary shadow-[0_15px_35px_rgba(var(--primary),0.4)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-primary dark:text-white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
               <path d="M4 11V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"/>
               <path d="M4 18V9"/>
               <path d="M20 18V9"/>
               <rect width="16" height="8" x="4" y="10" rx="2"/>
               <path d="M8 18v2"/>
               <path d="M16 18v2"/>
               <circle cx="7" cy="15" r="1"/>
               <circle cx="17" cy="15" r="1"/>
             </svg>
          </div>
          <!-- Pin Tail -->
          <div class="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-primary -mt-0.5"></div>
        </div>
      </div>
    `,
    iconSize: [60, 60],
    iconAnchor: [30, 48],
  });
};

const busLocations = [
  { id: "B-101", position: [14.5995, 120.9842] as [number, number], name: "Manila Terminal", capacity: "84%" },
  { id: "B-102", position: [14.5547, 121.0244] as [number, number], name: "Makati Central", capacity: "92%" },
  { id: "B-103", position: [14.6760, 121.0437] as [number, number], name: "Quezon City Hub", capacity: "45%" },
  { id: "B-104", position: [14.5378, 121.0014] as [number, number], name: "Pasay Station", capacity: "100%" },
];

// Helper components for custom controls
const MapControls = ({ onZoomIn, onZoomOut }: { onZoomIn: () => void, onZoomOut: () => void }) => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-6 z-[400] flex flex-col gap-3">
       <Button 
         variant="outline" 
         size="icon" 
         onClick={onZoomIn}
         className="h-10 w-10 rounded-xl bg-card/80 backdrop-blur-md border-primary/5 text-card-foreground shadow-lg hover:bg-primary hover:text-primary-foreground transition-all"
       >
         <Plus className="h-4 w-4" />
       </Button>
       <Button 
         variant="outline" 
         size="icon" 
         onClick={onZoomOut}
         className="h-10 w-10 rounded-xl bg-card/80 backdrop-blur-md border-primary/5 text-card-foreground shadow-lg hover:bg-primary hover:text-primary-foreground transition-all"
       >
         <Minus className="h-4 w-4" />
       </Button>
    </div>
  );
};

const TerrainSwitcher = ({ current, onChange }: { current: string, onChange: (v: string) => void }) => {
  const modes = [
    { id: "thematic", icon: Globe, label: "Thematic" },
    { id: "satellite", icon: Layers, label: "Satellite" },
    { id: "terrain", icon: Trees, label: "Terrain" },
  ];

  return (
    <div className="absolute top-6 right-6 z-[400] flex bg-card/80 backdrop-blur-md border border-primary/5 text-card-foreground rounded-2xl p-1.5 shadow-2xl">
       {modes.map((m) => (
         <Button
           key={m.id}
           variant="ghost"
           size="sm"
           onClick={() => onChange(m.id)}
           className={cn(
             "h-8 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
             current === m.id ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:bg-primary/10"
           )}
         >
           <m.icon className="h-3.5 w-3.5 mr-2" />
           {m.label}
         </Button>
       ))}
    </div>
  );
};

const MapActions = ({ zoomIn, zoomOut }: { zoomIn: boolean, zoomOut: boolean }) => {
  const map = useMap();
  useEffect(() => {
    if (zoomIn) map.setZoom(map.getZoom() + 1);
  }, [zoomIn, map]);
  useEffect(() => {
    if (zoomOut) map.setZoom(map.getZoom() - 1);
  }, [zoomOut, map]);
  return null;
};

const ResizeMap = () => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 500);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

export default function MapComponent() {
  const { theme } = useTheme();
  const [terrain, setTerrain] = useState("thematic");
  const [zoomTrigger, setZoomTrigger] = useState<{ in: boolean, out: boolean }>({ in: false, out: false });
  
  const getTileConfig = () => {
    if (terrain === "satellite") {
      return {
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community'
      };
    }
    if (terrain === "terrain") {
      return {
        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      };
    }
    return {
      url: theme === "dark" 
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    };
  };

  const tile = getTileConfig();

  return (
    <div className="h-full w-full relative group/map overflow-hidden">
      <MapContainer
        center={[14.5995, 120.9842]}
        zoom={12}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <TileLayer attribution={tile.attribution} url={tile.url} />
        <ResizeMap />
        <MapActions 
          zoomIn={zoomTrigger.in} 
          zoomOut={zoomTrigger.out} 
        />
        
        {busLocations.map((bus) => (
          <Marker 
            key={bus.id} 
            position={bus.position} 
            icon={createBusIcon(theme)}
            eventHandlers={{
              mouseover: (e) => {
                e.target.openTooltip();
              },
              mouseout: (e) => {
                e.target.closeTooltip();
              }
            }}
          >
            <Tooltip 
              direction="top" 
              offset={[0, -20]} 
              opacity={1}
              className="custom-tooltip !bg-transparent !border-none !shadow-none"
            >
              <div className="p-4 rounded-[2rem] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-black/10 dark:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-w-[180px] overflow-hidden relative group">
                {/* Decorative Accent */}
                <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/80">Unit {bus.id}</p>
                    <Badge variant="outline" className="h-4 px-1.5 text-[8px] font-black border-primary/30 text-primary uppercase tracking-widest bg-primary/5">LIVE</Badge>
                  </div>
                  
                  <div>
                    <p className="font-black text-sm text-slate-900 dark:text-white tracking-tight leading-none mb-1">{bus.name}</p>
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Active Dispatch Node</p>
                  </div>

                  <div className="h-px w-full bg-black/5 dark:bg-white/10"></div>

                  <div className="flex items-center justify-between gap-4">
                     <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-tighter text-slate-900 dark:text-white">In-Transit</span>
                     </div>
                     <div className="flex flex-col items-end">
                        <span className="text-[11px] font-black text-primary tabular-nums">{bus.capacity}</span>
                        <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">Load Factor</span>
                     </div>
                  </div>
                </div>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
      
      <MapControls 
        onZoomIn={() => { setZoomTrigger({ in: true, out: false }); setTimeout(() => setZoomTrigger({ in: false, out: false }), 50); }} 
        onZoomOut={() => { setZoomTrigger({ in: false, out: true }); setTimeout(() => setZoomTrigger({ in: false, out: false }), 50); }} 
      />

      <TerrainSwitcher current={terrain} onChange={setTerrain} />

      <div className="absolute bottom-4 right-4 z-[400] px-4 py-2 bg-card/60 backdrop-blur-md border border-primary/5 text-card-foreground rounded-xl shadow-xl pointer-events-none transition-opacity opacity-0 group-hover/map:opacity-100">
         <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Cartographic Node: NCR-01</p>
      </div>
    </div>
  );
}
