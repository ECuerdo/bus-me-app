"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, CloudRain, Wind, Thermometer } from "lucide-react";

// Weather-themed icons
const createWeatherIcon = (color: string, iconHtml: string) => L.divIcon({
  className: "bg-transparent border-none",
  html: `<div class="relative flex items-center justify-center w-10 h-10">
           <div class="absolute inset-0 bg-${color}/20 rounded-full animate-pulse scale-150"></div>
           <div class="relative z-10 flex items-center justify-center w-6 h-6 bg-${color} text-white rounded-full shadow-lg">
             ${iconHtml}
           </div>
         </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const busIcon = L.divIcon({
  className: "bg-transparent border-none",
  html: `<div class="relative flex items-center justify-center w-8 h-8">
           <div class="absolute inset-0 bg-primary/30 rounded-full animate-ping"></div>
           <div class="relative z-10 w-4 h-4 bg-primary border-[3px] border-white rounded-full shadow-md"></div>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const mockBuses = [
  { id: "401", area: "Arterial C", pos: [14.5995, 120.9842] as [number, number], temp: "29°C", status: "Active" },
  { id: "228", area: "Coastal B", pos: [14.5826, 120.9787] as [number, number], temp: "28°C", status: "Active" },
  { id: "112", area: "Express G", pos: [14.6091, 120.9920] as [number, number], temp: "30°C", status: "Active" },
];

const mockWeatherHotspots = [
  { id: "h1", name: "Quezon Hub", pos: [14.6500, 121.0300] as [number, number], temp: "31°C", cond: "Sunny", color: "orange-500" },
  { id: "h2", name: "Makati Terminal", pos: [14.5547, 121.0244] as [number, number], temp: "29°C", cond: "Cloudy", color: "blue-400" },
  { id: "h3", name: "Manila Port Area", pos: [14.5900, 120.9700] as [number, number], temp: "28°C", cond: "Windy", color: "slate-400" },
];

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

interface WeatherMapProps {
  activeOverlay?: "wind" | "rain" | "clouds" | "radar" | "temp";
}

const SyncWindy = ({ activeOverlay }: { activeOverlay: string }) => {
  const map = useMap();
  
  useEffect(() => {
    const handleMove = () => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      const iframe = document.getElementById("windy-iframe") as HTMLIFrameElement;
      if (iframe) {
        // Windy Embed URL format: https://embed.windy.com/embed2.html?lat={lat}&lon={lon}&zoom={zoom}&overlay={overlay}
        const newUrl = `https://embed.windy.com/embed2.html?lat=${center.lat}&lon=${center.lng}&detailLat=${center.lat}&detailLon=${center.lng}&zoom=${zoom}&level=surface&overlay=${activeOverlay}&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`;
        
        // Use a slight delay or check if URL actually changed to prevent excessive reloading
        if (iframe.src !== newUrl) {
           // Windy handles dynamic updates reasonably well if we just update the src, 
           // though it might flicker. A better way would be postMessage if they supported it for standard embeds.
           // For now, src update is the most reliable way to sync coordinates.
           iframe.src = newUrl;
        }
      }
    };

    map.on("moveend", handleMove);
    map.on("zoomend", handleMove);
    
    return () => {
      map.off("moveend", handleMove);
      map.off("zoomend", handleMove);
    };
  }, [map, activeOverlay]);

  return null;
};

export default function WeatherMap({ activeOverlay = "wind" }: WeatherMapProps) {
  const initialLat = 14.5995;
  const initialLon = 120.9842;
  const initialZoom = 12;

  return (
    <div className="h-[70vh] w-full relative overflow-hidden rounded-[2rem]">
      {/* Windy Iframe Background */}
      <iframe
        id="windy-iframe"
        src={`https://embed.windy.com/embed2.html?lat=${initialLat}&lon=${initialLon}&detailLat=${initialLat}&detailLon=${initialLon}&zoom=${initialZoom}&level=surface&overlay=${activeOverlay}&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`}
        className="absolute inset-0 w-full h-full border-none z-0"
        title="Windy Weather Map"
      />

      <div className="absolute inset-0 z-10 pointer-events-none">
        <MapContainer 
          center={[initialLat, initialLon]} 
          zoom={initialZoom} 
          style={{ height: "100%", width: "100%", background: "transparent" }}
          zoomControl={false}
          className="pointer-events-auto"
        >
          <ResizeMap />
          <SyncWindy activeOverlay={activeOverlay} />
          
          {/* We don't need TileLayer here anymore because Windy is the background */}
          {/* <TileLayer ... /> */}

          {/* Bus Markers */}
          {mockBuses.map((bus) => (
            <Marker key={bus.id} position={bus.pos} icon={busIcon}>
              <Popup className="rounded-xl overflow-hidden shadow-2xl border-none">
                <div className="p-1 min-w-[120px]">
                   <div className="flex justify-between items-center mb-1">
                      <span className="font-black text-[10px] text-foreground uppercase tracking-wider">Unit {bus.id}</span>
                      <Badge variant="outline" className="text-[8px] uppercase font-black px-1.5 py-0">
                         {bus.status}
                      </Badge>
                   </div>
                   <div className="flex items-center gap-2">
                      <Thermometer className="h-3 w-3 text-orange-500" />
                      <span className="text-xs font-black text-primary">{bus.temp}</span>
                   </div>
                   <p className="text-[9px] font-bold text-muted-foreground uppercase mt-1">Loc: {bus.area}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Optional: Weather Hotspots (Custom Markers on top of Windy) */}
          {mockWeatherHotspots.map((spot) => (
            <Marker 
              key={spot.id} 
              position={spot.pos} 
              icon={createWeatherIcon(spot.color, spot.cond === "Sunny" ? "☀️" : spot.cond === "Cloudy" ? "☁️" : "💨")}
            >
              <Popup className="rounded-xl overflow-hidden shadow-2xl border-none">
                <div className="p-2 min-w-[140px]">
                   <p className="font-black text-xs text-foreground mb-1">{spot.name}</p>
                   <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{spot.cond}</span>
                      <span className="text-lg font-black text-primary">{spot.temp}</span>
                   </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      {/* Weather Legend (Overlay) */}
      <div className="absolute bottom-6 left-6 z-[20] flex flex-col gap-2 p-3 bg-card/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl pointer-events-none">
         <h5 className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Live Conditions</h5>
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-foreground">Sunny / High Heat</span>
         </div>
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            <span className="text-[10px] font-bold text-foreground">Cloudy / Optimized</span>
         </div>
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-[10px] font-bold text-foreground">Active Fleet Unit</span>
         </div>
      </div>
    </div>
  );
}
