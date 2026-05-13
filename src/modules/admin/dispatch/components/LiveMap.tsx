import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import { Badge } from "@/components/ui/badge";

// Fix Leaflet icons in Next.js by using DivIcons
const activeBusIcon = L.divIcon({
  className: "bg-transparent border-none",
  html: `<div class="relative flex items-center justify-center w-8 h-8">
           <div class="absolute inset-0 bg-primary/30 rounded-full animate-ping"></div>
           <div class="relative z-10 w-4 h-4 bg-primary border-[3px] border-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.3)]"></div>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const delayedBusIcon = L.divIcon({
  className: "bg-transparent border-none",
  html: `<div class="relative flex items-center justify-center w-8 h-8">
           <div class="absolute inset-0 bg-amber-500/30 rounded-full animate-ping"></div>
           <div class="relative z-10 w-4 h-4 bg-amber-500 border-[3px] border-white rounded-full shadow-md"></div>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const emergencyBusIcon = L.divIcon({
  className: "bg-transparent border-none",
  html: `<div class="relative flex items-center justify-center w-8 h-8">
           <div class="absolute inset-0 bg-rose-600/50 rounded-full animate-ping" style="animation-duration: 0.8s;"></div>
           <div class="relative z-10 w-5 h-5 bg-rose-600 border-[3px] border-white rounded-full shadow-[0_0_15px_rgba(225,29,72,0.8)]"></div>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const mockBuses = [
  { id: "401", route: "Arterial Route C", pos: [14.5995, 120.9842] as [number, number], status: "Active", icon: activeBusIcon, speed: "42 km/h" },
  { id: "228", route: "Coastal Run Beta", pos: [14.5826, 120.9787] as [number, number], status: "Delayed", icon: delayedBusIcon, speed: "18 km/h" },
  { id: "112", route: "Express Gamma", pos: [14.6091, 120.9920] as [number, number], status: "Emergency", icon: emergencyBusIcon, speed: "0 km/h" },
  { id: "553", route: "Metro Loop Z", pos: [14.5547, 121.0244] as [number, number], status: "Active", icon: activeBusIcon, speed: "55 km/h" },
  { id: "319", route: "Northern Pass", pos: [14.6500, 121.0300] as [number, number], status: "Active", icon: activeBusIcon, speed: "60 km/h" },
];

const mockRouteLine = [
  [14.5995, 120.9842] as [number, number],
  [14.5826, 120.9787] as [number, number],
  [14.5547, 121.0244] as [number, number],
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

export default function LiveMap() {
  return (
    <div className="h-[70vh] w-full bg-card relative">
      <MapContainer 
        center={[14.5995, 120.9842]} 
        zoom={12} 
        style={{ height: "100%", width: "100%", zIndex: 10, borderRadius: "2rem" }}
        zoomControl={false}
      >
        <ResizeMap />
        <ZoomControl position="bottomright" />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <Polyline positions={mockRouteLine} pathOptions={{ color: "hsl(var(--primary))", weight: 4, opacity: 0.6, dashArray: "10, 10" }} />

        {mockBuses.map((bus) => (
          <Marker key={bus.id} position={bus.pos} icon={bus.icon}>
            <Popup className="rounded-xl overflow-hidden shadow-2xl border-none">
              <div className="p-1 min-w-[150px]">
                 <div className="flex justify-between items-center mb-2">
                    <span className="font-black text-sm text-foreground">Unit {bus.id}</span>
                    <Badge variant="outline" className="text-[9px] uppercase font-black px-2 py-0">
                       {bus.status}
                    </Badge>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{bus.route}</p>
                    <p className="text-xs font-black text-primary">{bus.speed}</p>
                 </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
