import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Expand, Layers, Sparkles, MapPin, DollarSign, ArrowUpRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { Apartment, ApartmentStatus } from '../types';
import { APARTMENTS } from '../data';

interface TowerElevationViewProps {
  towerId: string; // e.g. 'Bloque A', 'Bloque B', 'Bloque C'
  onBackToMap: () => void;
  onSelectApartment: (apt: Apartment) => void;
}

export default function TowerElevationView({ towerId, onBackToMap, onSelectApartment }: TowerElevationViewProps) {
  const [hoveredAptId, setHoveredAptId] = useState<string | null>(null);

  // Filter apartments belonging to this tower
  const towerApartments = APARTMENTS.filter((apt) => apt.name.includes(towerId));

  // Determine displayName
  const towerName = towerId === 'Bloque A' ? 'Torre A' : towerId === 'Bloque B' ? 'Torre B' : 'Torre C';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: ApartmentStatus) => {
    switch (status) {
      case 'disponible':
        return 'bg-emerald-500 border-emerald-200';
      case 'reservado':
        return 'bg-amber-500 border-amber-200';
      case 'vendido':
        return 'bg-stone-400 border-stone-200';
    }
  };

  const getStatusText = (status: ApartmentStatus) => {
    switch (status) {
      case 'disponible':
        return 'Disponible';
      case 'reservado':
        return 'Reservado';
      case 'vendido':
        return 'No disponible';
    }
  };

  const hoveredApt = towerApartments.find(a => a.id === hoveredAptId);

  // Render the SVG architectural elevation based on the tower
  const renderTowerSVG = () => {
    // Shared elements like gradients
    const defs = (
      <defs>
        <linearGradient id="glass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.4" />
          <stop offset="40%" stopColor="#bae6fd" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="glass-grad-hover" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="wall-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
      </defs>
    );

    if (towerId === 'Bloque A' || towerId === 'Bloque C') {
      // 2 levels
      const apt1 = towerApartments.find(a => a.floor === 1);
      const apt2 = towerApartments.find(a => a.floor === 2);

      const isApt1Hovered = hoveredAptId === apt1?.id;
      const isApt2Hovered = hoveredAptId === apt2?.id;

      const apt1StatusColor = apt1 ? (apt1.status === 'disponible' ? '#10b981' : apt1.status === 'reservado' ? '#f59e0b' : '#a8a29e') : '#e2e8f0';
      const apt2StatusColor = apt2 ? (apt2.status === 'disponible' ? '#10b981' : apt2.status === 'reservado' ? '#f59e0b' : '#a8a29e') : '#e2e8f0';

      return (
        <svg viewBox="0 0 200 160" className="w-full h-full text-slate-300 stroke-current stroke-[0.8] fill-none">
          {defs}

          {/* Grid lines & heights */}
          <g className="stroke-slate-200/50 stroke-[0.5] font-mono text-[5px] fill-slate-400">
            {/* Grid Line levels */}
            <line x1="15" y1="135" x2="190" y2="135" strokeDasharray="2,2" />
            <text x="195" y="137" textAnchor="start">N.PT. +0.00</text>

            <line x1="15" y1="90" x2="190" y2="90" strokeDasharray="2,2" />
            <text x="195" y="92" textAnchor="start">N.2   +3.50</text>

            <line x1="15" y1="45" x2="190" y2="45" strokeDasharray="2,2" />
            <text x="195" y="47" textAnchor="start">N.3   +7.00</text>

            <line x1="15" y1="20" x2="190" y2="20" strokeDasharray="2,2" />
            <text x="195" y="22" textAnchor="start">N.TE  +9.50</text>

            {/* Vertical grid axes */}
            <line x1="30" y1="15" x2="30" y2="145" strokeDasharray="2,2" />
            <circle cx="30" cy="148" r="3" className="fill-white stroke-slate-300" />
            <text x="30" y="150" textAnchor="middle" className="text-[4px] font-bold">A</text>

            <line x1="170" y1="15" x2="170" y2="145" strokeDasharray="2,2" />
            <circle cx="170" cy="148" r="3" className="fill-white stroke-slate-300" />
            <text x="170" y="150" textAnchor="middle" className="text-[4px] font-bold">B</text>
          </g>

          {/* Ground and landscape */}
          <line x1="10" y1="135" x2="190" y2="135" stroke="#334155" strokeWidth="2" />
          <path d="M10,135 Q18,133 25,135 T40,135 T55,133 T70,135" stroke="#10b981" strokeWidth="1" />
          
          {/* Small trees on the ground */}
          <g className="fill-emerald-100 stroke-emerald-600 stroke-[0.5]">
            <path d="M 15 135 L 18 128 L 21 135 Z" />
            <path d="M 178 135 L 181 125 L 184 135 Z" />
            <circle cx="186" cy="131" r="3" />
          </g>

          {/* Core Concrete Building Structure Frame */}
          {/* Left Main Column */}
          <rect x="27" y="20" width="6" height="115" className="fill-slate-100 stroke-slate-500" strokeWidth="1.2" />
          {/* Right Main Column */}
          <rect x="167" y="20" width="6" height="115" className="fill-slate-100 stroke-slate-500" strokeWidth="1.2" />

          {/* Floor slabs */}
          <rect x="25" y="133" width="150" height="4" className="fill-slate-300 stroke-slate-600" />
          <rect x="25" y="88" width="150" height="4" className="fill-slate-300 stroke-slate-600" />
          <rect x="25" y="43" width="150" height="4" className="fill-slate-300 stroke-slate-600" />

          {/* Roof/Pergola details */}
          <path d="M 33 20 L 167 20 M 33 20 L 33 43 M 167 20 L 167 43" stroke="#475569" strokeWidth="1.5" />
          {/* Wooden pergola beams */}
          <g stroke="#64748b" strokeWidth="1">
            <line x1="45" y1="20" x2="45" y2="43" />
            <line x1="60" y1="20" x2="60" y2="43" />
            <line x1="75" y1="20" x2="75" y2="43" />
            <line x1="90" y1="20" x2="90" y2="43" />
            <line x1="105" y1="20" x2="105" y2="43" />
            <line x1="120" y1="20" x2="120" y2="43" />
            <line x1="135" y1="20" x2="135" y2="43" />
            <line x1="150" y1="20" x2="150" y2="43" />
          </g>

          {/* ---------------- LEVEL 1 (Floor 1) INTERACTIVE AREA ---------------- */}
          {apt1 && (
            <g 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredAptId(apt1.id)}
              onMouseLeave={() => setHoveredAptId(null)}
              onClick={() => onSelectApartment(apt1)}
            >
              {/* Floor highlight backdrop on hover */}
              <rect 
                x="33" 
                y="92" 
                width="134" 
                height="41" 
                fill={isApt1Hovered ? 'url(#glass-grad-hover)' : 'url(#glass-grad)'} 
                stroke={isApt1Hovered ? '#0ea5e9' : 'transparent'}
                strokeWidth={1.5}
                className="transition-all duration-300"
              />

              {/* Glass windows */}
              <rect x="40" y="96" width="30" height="32" className="stroke-slate-400" />
              <line x1="55" y1="96" x2="55" y2="128" className="stroke-slate-350" />
              <rect x="80" y="96" width="40" height="32" className="stroke-slate-400" />
              <line x1="100" y1="96" x2="100" y2="128" className="stroke-slate-350" />
              <rect x="130" y="96" width="30" height="32" className="stroke-slate-400" />

              {/* Balcony handrail if any */}
              <rect x="33" y="115" width="42" height="18" fill="#38bdf8" fillOpacity="0.05" className="stroke-slate-400" />
              <line x1="33" y1="115" x2="75" y2="115" stroke="#475569" strokeWidth="1" />
              {/* Balcony plants */}
              <circle cx="36" cy="116" r="2.5" className="fill-emerald-400/80 stroke-emerald-600/50" />
              <circle cx="39" cy="118" r="2" className="fill-emerald-400/80 stroke-emerald-600/50" />

              {/* Garden elements on the side (since it's a Garden model) */}
              <rect x="8" y="125" width="20" height="10" className="fill-emerald-500/20 stroke-emerald-600/40" />
              <circle cx="12" cy="122" r="3" className="fill-emerald-500/40 stroke-emerald-600/60" />
              <circle cx="20" cy="123" r="2.5" className="fill-emerald-500/40 stroke-emerald-600/60" />
              <text x="18" y="132" className="fill-emerald-800 font-sans text-[4px] font-semibold">Jardín</text>

              {/* Status point center indicator */}
              <circle cx="100" cy="112.5" r="5" className="fill-white stroke-slate-200" strokeWidth="1" />
              <circle cx="100" cy="112.5" r="3" fill={apt1StatusColor} />
            </g>
          )}

          {/* ---------------- LEVEL 2 (Floor 2) INTERACTIVE AREA ---------------- */}
          {apt2 && (
            <g 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredAptId(apt2.id)}
              onMouseLeave={() => setHoveredAptId(null)}
              onClick={() => onSelectApartment(apt2)}
            >
              {/* Floor highlight backdrop on hover */}
              <rect 
                x="33" 
                y="47" 
                width="134" 
                height="41" 
                fill={isApt2Hovered ? 'url(#glass-grad-hover)' : 'url(#glass-grad)'} 
                stroke={isApt2Hovered ? '#0ea5e9' : 'transparent'}
                strokeWidth={1.5}
                className="transition-all duration-300"
              />

              {/* Architecture details */}
              {/* Glass windows */}
              <rect x="40" y="52" width="25" height="31" className="stroke-slate-400" />
              <rect x="75" y="52" width="45" height="31" className="stroke-slate-400" />
              <line x1="97" y1="52" x2="97" y2="83" className="stroke-slate-350" />
              <rect x="130" y="52" width="30" height="31" className="stroke-slate-400" />

              {/* Balcony handrail */}
              <rect x="125" y="70" width="42" height="18" fill="#38bdf8" fillOpacity="0.05" className="stroke-slate-400" />
              <line x1="125" y1="70" x2="167" y2="70" stroke="#475569" strokeWidth="1" />
              {/* Balcony plants */}
              <circle cx="160" cy="71" r="2.5" className="fill-emerald-400/80 stroke-emerald-600/50" />
              <path d="M 160 73 Q 163 78 162 82" stroke="#059669" strokeWidth="0.6" />

              {/* Status point center indicator */}
              <circle cx="100" cy="67.5" r="5" className="fill-white stroke-slate-200" strokeWidth="1" />
              <circle cx="100" cy="67.5" r="3" fill={apt2StatusColor} />
            </g>
          )}
        </svg>
      );
    } else {
      // Torre B (Bloque B)
      // Contains a Loft (double-height) on Floor 1, and Penthouse on Floor 3
      const apt1 = towerApartments.find(a => a.id === 'apt-102'); // Vista Loft (Floor 1)
      const apt3 = towerApartments.find(a => a.id === 'apt-302'); // Penthouse (Floor 3)

      const isApt1Hovered = hoveredAptId === apt1?.id;
      const isApt3Hovered = hoveredAptId === apt3?.id;

      const apt1StatusColor = apt1 ? (apt1.status === 'disponible' ? '#10b981' : apt1.status === 'reservado' ? '#f59e0b' : '#a8a29e') : '#e2e8f0';
      const apt3StatusColor = apt3 ? (apt3.status === 'disponible' ? '#10b981' : apt3.status === 'reservado' ? '#f59e0b' : '#a8a29e') : '#e2e8f0';

      return (
        <svg viewBox="0 0 200 160" className="w-full h-full text-slate-300 stroke-current stroke-[0.8] fill-none">
          {defs}

          {/* Grid lines & heights */}
          <g className="stroke-slate-200/50 stroke-[0.5] font-mono text-[5px] fill-slate-400">
            {/* Grid Line levels */}
            <line x1="15" y1="135" x2="190" y2="135" strokeDasharray="2,2" />
            <text x="195" y="137" textAnchor="start">N.PT. +0.00</text>

            {/* Loft is double height, spans to level 2 (+3.50) */}
            <line x1="15" y1="90" x2="190" y2="90" strokeDasharray="2,2" />
            <text x="195" y="92" textAnchor="start">N.2   +3.50 (Loft Mezz.)</text>

            <line x1="15" y1="50" x2="190" y2="50" strokeDasharray="2,2" />
            <text x="195" y="52" textAnchor="start">N.3   +6.80</text>

            <line x1="15" y1="20" x2="190" y2="20" strokeDasharray="2,2" />
            <text x="195" y="22" textAnchor="start">N.ROOF +9.10</text>

            {/* Vertical grid axes */}
            <line x1="35" y1="15" x2="35" y2="145" strokeDasharray="2,2" />
            <circle cx="35" cy="148" r="3" className="fill-white stroke-slate-300" />
            <text x="35" y="150" textAnchor="middle" className="text-[4px] font-bold">A</text>

            <line x1="165" y1="15" x2="165" y2="145" strokeDasharray="2,2" />
            <circle cx="165" cy="148" r="3" className="fill-white stroke-slate-300" />
            <text x="165" y="150" textAnchor="middle" className="text-[4px] font-bold">B</text>
          </g>

          {/* Ground line */}
          <line x1="10" y1="135" x2="190" y2="135" stroke="#334155" strokeWidth="2" />
          
          {/* Structural Concrete Frames */}
          <rect x="32" y="20" width="6" height="115" className="fill-slate-100 stroke-slate-500" strokeWidth="1.2" />
          <rect x="162" y="20" width="6" height="115" className="fill-slate-100 stroke-slate-500" strokeWidth="1.2" />

          {/* Slabs */}
          <rect x="30" y="133" width="140" height="4" className="fill-slate-300 stroke-slate-600" />
          {/* Note: Loft doesn't have a full slab in the middle because it's double-height, but let's show structural outline */}
          <rect x="30" y="88" width="140" height="4" className="fill-slate-200 stroke-slate-400 stroke-dasharray-1,1" strokeDasharray="2,2" />
          <rect x="30" y="48" width="140" height="4" className="fill-slate-300 stroke-slate-600" />
          <rect x="30" y="18" width="140" height="4" className="fill-slate-300 stroke-slate-600" />

          {/* ---------------- LEVEL 1-2 (Double Height Loft) INTERACTIVE AREA ---------------- */}
          {apt1 && (
            <g 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredAptId(apt1.id)}
              onMouseLeave={() => setHoveredAptId(null)}
              onClick={() => onSelectApartment(apt1)}
            >
              {/* Floor highlight backdrop on hover */}
              <rect 
                x="38" 
                y="52" 
                width="124" 
                height="81" 
                fill={isApt1Hovered ? 'url(#glass-grad-hover)' : 'url(#glass-grad)'} 
                stroke={isApt1Hovered ? '#0ea5e9' : 'transparent'}
                strokeWidth={1.5}
                className="transition-all duration-300"
              />

              {/* Impressive Double-Height Glass Panes */}
              <rect x="45" y="60" width="30" height="65" className="stroke-slate-400" />
              <line x1="60" y1="60" x2="60" y2="125" className="stroke-slate-350" />
              <line x1="45" y1="88" x2="75" y2="88" className="stroke-slate-350" />

              <rect x="85" y="60" width="30" height="65" className="stroke-slate-400" />
              <line x1="100" y1="60" x2="100" y2="125" className="stroke-slate-350" />
              <line x1="85" y1="88" x2="115" y2="88" className="stroke-slate-350" />

              <rect x="125" y="60" width="30" height="65" className="stroke-slate-400" />
              <line x1="125" y1="88" x2="155" y2="88" className="stroke-slate-350" />

              {/* Mezzanine floor indicator line drawn inside */}
              <line x1="38" y1="90" x2="162" y2="90" stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="3,3" strokeOpacity="0.7" />
              <text x="120" y="87" className="fill-rose-500 font-mono text-[3.5px] uppercase">Entrepiso Mezzanine</text>

              {/* Status point center indicator */}
              <circle cx="100" cy="100" r="5" className="fill-white stroke-slate-200" strokeWidth="1" />
              <circle cx="100" cy="100" r="3" fill={apt1StatusColor} />
            </g>
          )}

          {/* ---------------- LEVEL 3 (Penthouse Celestial) INTERACTIVE AREA ---------------- */}
          {apt3 && (
            <g 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredAptId(apt3.id)}
              onMouseLeave={() => setHoveredAptId(null)}
              onClick={() => onSelectApartment(apt3)}
            >
              {/* Floor highlight backdrop on hover */}
              <rect 
                x="38" 
                y="22" 
                width="124" 
                height="26" 
                fill={isApt3Hovered ? 'url(#glass-grad-hover)' : 'url(#glass-grad)'} 
                stroke={isApt3Hovered ? '#0ea5e9' : 'transparent'}
                strokeWidth={1.5}
                className="transition-all duration-300"
              />

              {/* Penthouse glass facade and doors */}
              <rect x="45" y="26" width="110" height="18" className="stroke-slate-400" />
              <line x1="72" y1="26" x2="72" y2="44" className="stroke-slate-350" />
              <line x1="100" y1="26" x2="100" y2="44" className="stroke-slate-350" />
              <line x1="128" y1="26" x2="128" y2="44" className="stroke-slate-350" />

              {/* Rooftop Celestial Luxury Features (above y=18) */}
              {/* Rooftop Glass railing */}
              <rect x="38" y="6" width="124" height="12" fill="#38bdf8" fillOpacity="0.05" className="stroke-slate-400" />
              <line x1="38" y1="6" x2="162" y2="6" stroke="#475569" strokeWidth="0.8" />
              
              {/* Plunge pool representation on Rooftop */}
              <rect x="42" y="8" width="22" height="10" className="fill-sky-100 stroke-sky-400" />
              <path d="M 44 13 Q 50 11 53 13 T 62 13" stroke="#0ea5e9" strokeWidth="0.5" />
              <text x="53" y="14" className="fill-sky-600 font-sans text-[3px] font-bold text-center" textAnchor="middle">Pool</text>

              {/* Lounge chairs / Pergola */}
              <path d="M 125 18 L 135 15 L 140 18" stroke="#475569" strokeWidth="1" /> {/* lounge chair */}
              <rect x="145" y="2" width="12" height="16" className="fill-slate-100/50 stroke-slate-500" /> {/* mini pergola */}

              {/* Status point center indicator */}
              <circle cx="100" cy="35" r="5" className="fill-white stroke-slate-200" strokeWidth="1" />
              <circle cx="100" cy="35" r="3" fill={apt3StatusColor} />
            </g>
          )}
        </svg>
      );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in" id="tower-elevation-dashboard">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <button
          onClick={onBackToMap}
          className="group flex items-center gap-2.5 px-3 py-1.5 border border-slate-250 hover:border-slate-900 bg-white hover:bg-slate-50 text-slate-850 hover:text-slate-950 text-xs font-mono font-semibold uppercase tracking-wider transition-all rounded-none cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Volver al Mapa</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-400">Desarrollo:</span>
          <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-none uppercase">
            Portal del Bosque • {towerName}
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Elevation Canvas (Left 7 cols on desktop) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-none p-6 shadow-lg shadow-slate-100/40 space-y-4">
          <div className="space-y-1">
            <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase font-bold">
              Elevación Arquitectónica 2D
            </span>
            <h3 className="font-sans text-xl font-light text-slate-950">
              Vista de Fachada - {towerName}
            </h3>
            <p className="font-sans text-xs text-slate-500 leading-relaxed">
              Explora los apartamentos por niveles. Pasa el cursor para ver detalles rápidos y haz clic en un nivel para cargar su plano de distribución.
            </p>
          </div>

          {/* SVG Container */}
          <div className="relative overflow-hidden bg-slate-50/50 border border-slate-150 p-4 aspect-[4/3] flex items-center justify-center">
            {renderTowerSVG()}
          </div>

          <div className="flex justify-center gap-6 font-mono text-[10px] text-slate-500 pt-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Disponible</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span>Reservado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              <span>No disponible</span>
            </div>
          </div>
        </div>

        {/* Sidebar Info & List (Right 5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Selected/Hovered Floor Detail Panel */}
          <div className="bg-slate-900 text-slate-50 rounded-none p-6 shadow-xl border border-slate-800 space-y-4 min-h-[220px] flex flex-col justify-between">
            {hoveredApt ? (
              <div className="space-y-4">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-none font-mono text-[9px] font-bold tracking-widest bg-slate-800 text-slate-300 mb-2 uppercase">
                    Previsualización • Nivel {hoveredApt.floor}
                  </span>
                  <h4 className="font-sans text-lg font-bold text-white leading-snug">
                    {hoveredApt.name}
                  </h4>
                  <p className="mt-1 font-sans text-xs text-slate-400 font-light">
                    Modelo {hoveredApt.model}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-slate-800 py-3 font-sans text-xs">
                  <div className="space-y-1">
                    <span className="block text-slate-500 text-[10px] uppercase font-semibold">Área total</span>
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Expand className="h-3.5 w-3.5 text-slate-400" />
                      {hoveredApt.area} m²
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-slate-500 text-[10px] uppercase font-semibold">Distribución</span>
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-slate-400" />
                      {hoveredApt.bedrooms} Hab • {hoveredApt.bathrooms} Baños
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] font-mono text-slate-500 uppercase">Precio</span>
                    <span className="font-sans text-xl font-bold text-emerald-400">{formatPrice(hoveredApt.price)} USD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${getStatusColor(hoveredApt.status).split(' ')[0]}`} />
                    <span className="font-mono text-xs text-slate-300 uppercase tracking-wider font-semibold">
                      {getStatusText(hoveredApt.status)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-3">
                <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700/50">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans text-sm font-bold text-white">Selecciona o Pasa el Cursor</h4>
                  <p className="font-sans text-xs text-slate-400 font-light max-w-xs">
                    Coloca el mouse sobre los niveles de la fachada para ver la información técnica de cada apartamento.
                  </p>
                </div>
              </div>
            )}

            {hoveredApt && (
              <button
                onClick={() => onSelectApartment(hoveredApt)}
                className="w-full bg-white hover:bg-slate-200 text-slate-900 font-sans text-xs font-bold uppercase tracking-wider py-3 rounded-none shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ver Distribución Completa</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* List of Apartments in this tower */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase font-bold block px-1">
              Apartamentos en {towerName} ({towerApartments.length})
            </span>

            <div className="space-y-3">
              {towerApartments.map((apt) => {
                const isHovered = hoveredAptId === apt.id;
                return (
                  <div
                    key={apt.id}
                    onMouseEnter={() => setHoveredAptId(apt.id)}
                    onMouseLeave={() => setHoveredAptId(null)}
                    onClick={() => onSelectApartment(apt)}
                    className={`group bg-white border p-4 cursor-pointer transition-all duration-300 flex items-center justify-between gap-4 rounded-none ${
                      isHovered ? 'border-slate-900 shadow-md ring-1 ring-slate-900' : 'border-slate-200/80 shadow-sm'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <span className="inline-block px-1.5 py-0.5 rounded-none font-mono text-[8px] font-semibold bg-slate-100 text-slate-600 uppercase">
                        Nivel {apt.floor} • {apt.model}
                      </span>
                      <h5 className="font-sans text-sm font-bold text-slate-950 group-hover:text-slate-800 transition-colors">
                        Apartamento {apt.id.split('-')[1]}
                      </h5>
                      <span className="font-mono text-[10px] text-slate-400">{apt.area} m² • {apt.bedrooms} Hab</span>
                    </div>

                    <div className="text-right space-y-1">
                      <span className="block font-sans text-sm font-bold text-slate-950">
                        {formatPrice(apt.price)}
                      </span>
                      <div className="flex items-center gap-1.5 justify-end">
                        <span className={`h-1.5 w-1.5 rounded-full ${getStatusColor(apt.status).split(' ')[0]}`} />
                        <span className="font-mono text-[8px] text-slate-400 uppercase tracking-wider">{getStatusText(apt.status)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
