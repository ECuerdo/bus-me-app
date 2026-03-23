import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useTheme } from "next-themes";
import { Plus, Minus, Layers, Globe, Trees } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Fixing Leaflet default icon issues in Next.js
const createBusIcon = (theme: string | undefined) => {
  return L.divIcon({
    className: "custom-bus-icon",
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute inset-0 h-6 w-6 bg-primary/40 rounded-full animate-ping"></div>
        <div class="h-5 w-5 bg-primary rounded-full border-2 border-white dark:border-slate-900 shadow-[0_0_15px_rgba(var(--primary),0.8)] relative z-10 flex items-center justify-center">
           <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><path d="m9 18 6-6-6-6"/></svg>
        </div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const busLocations = [
  { id: "B-101", position: [14.5995, 120.9842] as [number, number], name: "Manila Terminal" },
  { id: "B-102", position: [14.5547, 121.0244] as [number, number], name: "Makati Central" },
  { id: "B-103", position: [14.6760, 121.0437] as [number, number], name: "Quezon City Hub" },
  { id: "B-104", position: [14.5378, 121.0014] as [number, number], name: "Pasay Station" },
];

// Helper components for custom controls
const MapControls = ({ onZoomIn, onZoomOut }: { onZoomIn: () => void, onZoomOut: () => void }) => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-6 z-[400] flex flex-col gap-3">
       <Button 
         variant="outline" 
         size="icon" 
         onClick={onZoomIn}
         className="h-10 w-10 rounded-xl bg-card/80 backdrop-blur-md border-border shadow-lg hover:bg-primary hover:text-primary-foreground transition-all"
       >
         <Plus className="h-4 w-4" />
       </Button>
       <Button 
         variant="outline" 
         size="icon" 
         onClick={onZoomOut}
         className="h-10 w-10 rounded-xl bg-card/80 backdrop-blur-md border-border shadow-lg hover:bg-primary hover:text-primary-foreground transition-all"
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
    <div className="absolute top-6 right-6 z-[400] flex bg-card/80 backdrop-blur-md border border-border rounded-2xl p-1.5 shadow-2xl">
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

// Internal map logic to handle programmatic zooms
const MapActions = ({ zoomIn, zoomOut }: { zoomIn: boolean, zoomOut: boolean, onDone: () => void }) => {
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
    }, 100);
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
    // Default thematic (Light/Dark)
    return {
      url: theme === "dark" 
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    };
  };

  const tile = getTileConfig();

  return (
    <div className="h-full w-full relative group/map">
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
          onDone={() => setZoomTrigger({ in: false, out: false })} 
        />
        
        {busLocations.map((bus) => (
          <Marker 
            key={bus.id} 
            position={bus.position} 
            icon={createBusIcon(theme)}
          >
            <Popup className="custom-popup">
              <div className="p-2">
                <p className="font-black text-[10px] uppercase tracking-widest text-primary mb-1">Unit {bus.id}</p>
                <p className="font-bold text-xs text-foreground">{bus.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[9px] font-black uppercase text-muted-foreground">Live Telemetry</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <MapControls 
        onZoomIn={() => { setZoomTrigger({ in: true, out: false }); setTimeout(() => setZoomTrigger({ in: false, out: false }), 100); }} 
        onZoomOut={() => { setZoomTrigger({ in: false, out: true }); setTimeout(() => setZoomTrigger({ in: false, out: false }), 100); }} 
      />

      <TerrainSwitcher current={terrain} onChange={setTerrain} />

      {/* Attribution Legend */}
      <div className="absolute bottom-4 right-4 z-[400] px-4 py-2 bg-card/60 backdrop-blur-md border border-border rounded-xl shadow-xl pointer-events-none transition-opacity opacity-0 group-hover/map:opacity-100">
         <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Cartographic Node: NCR-01</p>
      </div>
    </div>
  );
}
