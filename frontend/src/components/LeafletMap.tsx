import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
  type: 'vehicle' | 'society' | 'collection';
  status?: string;
}

interface LeafletMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  height?: string;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  center = [28.6083, 77.2942], // Default Mayur Vihar Phase 1, East Delhi
  zoom = 14,
  markers = [],
  height = '420px',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | EcoSetu Municipal GIS',
        maxZoom: 19,
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update center when changed
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom);
    }
  }, [center, zoom]);

  // Update markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    markers.forEach((m) => {
      let iconColor = '#2d6a4f';
      let iconSymbol = '📍';

      if (m.type === 'vehicle') {
        iconColor = '#2563eb';
        iconSymbol = '🚛';
      } else if (m.type === 'society') {
        iconColor = '#7c3aed';
        iconSymbol = '🏢';
      } else if (m.type === 'collection') {
        iconColor = '#059669';
        iconSymbol = '♻️';
      }

      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div style="background-color: ${iconColor}; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); border: 2px solid white;">
            ${iconSymbol}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([m.lat, m.lng], { icon: customIcon });

      const popupContent = `
        <div style="font-family: inherit; padding: 4px;">
          <h4 style="margin: 0; font-size: 14px; font-weight: 700; color: #111827;">${m.title}</h4>
          ${m.subtitle ? `<p style="margin: 4px 0 0; font-size: 12px; color: #4b5563;">${m.subtitle}</p>` : ''}
          ${m.status ? `<div style="margin-top: 6px; font-size: 11px; font-weight: 600; color: #047857;">Status: ${m.status}</div>` : ''}
        </div>
      `;

      marker.bindPopup(popupContent);
      markersLayerRef.current?.addLayer(marker);
    });
  }, [markers]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm" style={{ height }}>
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm border border-gray-200 text-gray-700 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        Live GPS Telemetry
      </div>
    </div>
  );
};

