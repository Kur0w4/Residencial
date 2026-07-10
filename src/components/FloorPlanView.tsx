import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Expand, Layers, Sparkles, Car, Check, Calculator
} from 'lucide-react';
import { Apartment, Hotspot } from '../types';
import { formatPrice } from '../utils/helpers';

interface FloorPlanViewProps {
  apartment: Apartment;
  onBackToMap: () => void;
  onOpenRoom: (hotspot: Hotspot) => void;
}

export default function FloorPlanView({ apartment, onBackToMap, onOpenRoom }: FloorPlanViewProps) {
  // --- Estados del Componente ---
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  // --- Estados de la Calculadora de Financiamiento ---
  const price = apartment.price;
  const [downPaymentAmount, setDownPaymentAmount] = useState<number | ''>('');
  const [loanTermMonths, setLoanTermMonths] = useState<number | ''>('');
  const [annualInterestRate, setAnnualInterestRate] = useState<number | ''>('');
  const [showSliders, setShowSliders] = useState<boolean>(false);

  // --- Cálculos Financieros ---
  const isValid = typeof downPaymentAmount === 'number' && downPaymentAmount > 0 && downPaymentAmount <= price &&
                  typeof loanTermMonths === 'number' && loanTermMonths > 0 &&
                  typeof annualInterestRate === 'number' && annualInterestRate >= 0;

  const currentDownPayment = typeof downPaymentAmount === 'number' ? downPaymentAmount : 0;
  const currentTerm = typeof loanTermMonths === 'number' ? loanTermMonths : 0;
  const currentRate = typeof annualInterestRate === 'number' ? annualInterestRate : 0;

  const loanAmount = Math.max(0, price - currentDownPayment);
  const downPaymentPercent = Math.min(100, Math.max(0, Math.round((currentDownPayment / price) * 100)));
  const monthlyRate = (currentRate / 100) / 12;

  let monthlyPayment = 0;
  if (isValid && loanAmount > 0) {
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / currentTerm;
    } else {
      monthlyPayment =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, currentTerm)) /
        (Math.pow(1 + monthlyRate, currentTerm) - 1);
    }
  }

  const totalCost = monthlyPayment * currentTerm + currentDownPayment;
  const totalInterest = Math.max(0, totalCost - price);

  // Generar tabla de amortización
  const generateSchedule = () => {
    if (!isValid) return [];
    const schedule = [];
    let remainingBalance = loanAmount;
    for (let month = 1; month <= currentTerm; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      const endingBalance = Math.max(0, remainingBalance - principalPayment);
      schedule.push({
        month,
        startingBalance: remainingBalance,
        payment: monthlyPayment,
        interest: interestPayment,
        principal: principalPayment,
        endingBalance,
      });
      remainingBalance = endingBalance;
    }
    return schedule;
  };

  const amortizationSchedule = generateSchedule();

  // Renders the architectural CAD style floor plan based on the selected type
  const renderFloorPlanSVG = () => {
    switch (apartment.floorPlanType) {
      case 'loft':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full text-stone-300 stroke-current stroke-[0.8] fill-none">
            {/* Outer walls */}
            <rect x="10" y="10" width="80" height="80" rx="3" className="stroke-stone-800 stroke-[1.5]" />
            {/* Division - Loft upper part / double height line */}
            <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="2,2" className="stroke-stone-400 stroke-[1.2]" />
            <text x="15" y="47" className="fill-stone-400 font-mono text-[4px] font-semibold tracking-wider uppercase">Vacio Doble Altura</text>

            {/* Bedroom Suite (Mezanine / Upper floor represented conceptually) */}
            <rect x="10" y="10" width="40" height="40" className="fill-stone-50/50 stroke-stone-600" />
            <text x="14" y="20" className="fill-stone-800 font-sans text-[4px] font-medium uppercase">Dormitorio Principal</text>
            {/* Bed shape */}
            <rect x="20" y="12" width="16" height="18" className="stroke-stone-400 fill-stone-100" />
            <rect x="22" y="14" width="6" height="4" className="stroke-stone-300 fill-stone-50" />
            <rect x="30" y="14" width="6" height="4" className="stroke-stone-300 fill-stone-50" />

            {/* Bathroom */}
            <rect x="50" y="10" width="40" height="40" className="fill-stone-50/50 stroke-stone-600" />
            <text x="54" y="20" className="fill-stone-800 font-sans text-[4px] font-medium uppercase">Baño Suite</text>
            <circle cx="70" cy="30" r="4" className="stroke-stone-400" /> {/* Jacuzzi / Tub */}
            <rect x="54" y="28" width="6" height="8" className="stroke-stone-400" /> {/* Sink */}

            {/* Lower floor: Living & Kitchen area */}
            <rect x="10" y="50" width="80" height="40" className="fill-stone-100/20" />
            
            {/* Living room furniture */}
            <text x="54" y="80" className="fill-stone-800 font-sans text-[4px] font-medium uppercase">Sala Familiar</text>
            <rect x="44" y="60" width="30" height="8" rx="1" className="stroke-stone-400 fill-stone-50" /> {/* Sofa */}
            <rect x="52" y="72" width="14" height="6" className="stroke-stone-300 fill-stone-100" /> {/* TV table */}

            {/* Kitchen */}
            <rect x="15" y="65" width="20" height="20" className="stroke-stone-500 fill-stone-50" />
            <text x="18" y="71" className="fill-stone-800 font-sans text-[4px] font-medium uppercase">Cocina</text>
            {/* Island table */}
            <rect x="18" y="74" width="14" height="6" rx="0.5" className="stroke-stone-400 fill-stone-100" />
            
            {/* Stairs indicator */}
            <g className="stroke-stone-400">
              <rect x="10" y="42" width="6" height="16" />
              <line x1="10" y1="45" x2="16" y2="45" />
              <line x1="10" y1="48" x2="16" y2="48" />
              <line x1="10" y1="51" x2="16" y2="51" />
              <line x1="10" y1="54" x2="16" y2="54" />
              <text x="11" y="40" className="fill-stone-400 font-mono text-[3px]">SUBE</text>
            </g>
          </svg>
        );

      case 'garden':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full text-stone-300 stroke-current stroke-[0.8] fill-none">
            {/* Outer layout */}
            <rect x="8" y="8" width="84" height="84" rx="3" className="stroke-stone-800 stroke-[1.5]" />

            {/* Garden Private Strip (Left block) */}
            <rect x="8" y="8" width="20" height="84" className="fill-emerald-50/30 stroke-emerald-600/50" />
            <text x="11" y="45" className="fill-emerald-800 font-sans text-[4.5px] font-semibold uppercase tracking-wider writing-mode-vertical">JARDÍN PRIVADO (40m²)</text>
            {/* Plant assets */}
            <circle cx="14" cy="20" r="2" className="stroke-emerald-400 fill-emerald-100/50" />
            <circle cx="21" cy="25" r="1.5" className="stroke-emerald-400 fill-emerald-100/50" />
            <circle cx="15" cy="75" r="3" className="stroke-emerald-400 fill-emerald-100/50" />

            {/* Living Room / Dining area */}
            <rect x="28" y="8" width="35" height="84" className="fill-stone-100/20" />
            <text x="36" y="55" className="fill-stone-800 font-sans text-[4px] font-medium uppercase">Sala de Estar</text>
            <rect x="36" y="60" width="8" height="24" rx="1" className="stroke-stone-400 fill-stone-50" /> {/* L-Sofa */}
            <rect x="44" y="76" width="12" height="8" rx="1" className="stroke-stone-400 fill-stone-50" /> 
            <rect x="34" y="24" width="22" height="10" rx="0.5" className="stroke-stone-400 fill-stone-100" /> {/* Dining table */}
            <text x="42" y="30" className="fill-stone-400 font-sans text-[3.5px] uppercase">Comedor</text>

            {/* Kitchen */}
            <rect x="28" y="8" width="35" height="15" className="stroke-stone-600 fill-stone-50" />
            <text x="41" y="16" className="fill-stone-800 font-sans text-[4px] font-medium uppercase">Cocina Abierta</text>
            <rect x="34" y="8" width="6" height="4" className="stroke-stone-400" /> {/* stove */}
            <rect x="48" y="8" width="8" height="4" className="stroke-stone-400" /> {/* sink */}

            {/* Right block: Bedrooms */}
            {/* Master Bedroom */}
            <rect x="63" y="8" width="29" height="42" className="fill-stone-50/50 stroke-stone-600" />
            <text x="67" y="18" className="fill-stone-800 font-sans text-[4px] font-medium uppercase">Habitación Principal</text>
            <rect x="70" y="22" width="16" height="16" className="stroke-stone-400 fill-stone-100" /> {/* Bed */}
            
            {/* Master Bathroom */}
            <rect x="63" y="50" width="29" height="21" className="fill-stone-50/50 stroke-stone-600" />
            <text x="67" y="57" className="fill-stone-800 font-sans text-[4px] font-medium uppercase">Baño Principal</text>
            <rect x="80" y="56" width="8" height="10" className="stroke-stone-400" /> {/* Shower */}

            {/* Second Bedroom / Multiuse */}
            <rect x="63" y="71" width="29" height="21" className="fill-stone-50/50 stroke-stone-600" />
            <text x="67" y="78" className="fill-stone-800 font-sans text-[4px] font-medium uppercase">Habitación 2</text>
            <rect x="74" y="82" width="12" height="8" className="stroke-stone-300 fill-stone-100" />
          </svg>
        );

      case 'family':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full text-stone-300 stroke-current stroke-[0.8] fill-none">
            {/* Outer border */}
            <rect x="5" y="5" width="90" height="90" rx="3" className="stroke-stone-800 stroke-[1.5]" />

            {/* Balcony / Terrace (Top edge) */}
            <rect x="5" y="5" width="90" height="15" className="fill-stone-50 stroke-stone-600" />
            <line x1="5" y1="20" x2="95" y2="20" strokeWidth="1" className="stroke-stone-800" />
            <text x="42" y="14" className="fill-stone-800 font-sans text-[4px] font-medium uppercase">Balcón Terraza</text>

            {/* Left Block: Living Room & Dining */}
            <rect x="5" y="20" width="45" height="75" className="fill-stone-100/10" />
            <text x="20" y="50" className="fill-stone-800 font-sans text-[4.5px] font-medium uppercase">Gran Salón Social</text>
            {/* Large Sofa */}
            <rect x="10" y="30" width="30" height="10" rx="1" className="stroke-stone-400 fill-stone-50" />
            <rect x="10" y="40" width="8" height="12" rx="1" className="stroke-stone-400 fill-stone-50" />
            {/* Dining Table */}
            <rect x="12" y="65" width="25" height="12" rx="1" className="stroke-stone-400 fill-stone-100" />
            <text x="20" y="72" className="fill-stone-500 font-sans text-[4px] uppercase">Comedor Familiar</text>

            {/* Center Top: Kitchen with Island */}
            <rect x="5" y="20" width="25" height="25" className="stroke-stone-500 fill-stone-50/50" />
            <text x="12" y="32" className="fill-stone-800 font-sans text-[3.5px] font-semibold uppercase">Cocina</text>
            {/* Island block */}
            <rect x="11" y="36" width="12" height="5" rx="0.5" className="stroke-stone-400 fill-stone-100" />

            {/* Right Block: Three Bedrooms */}
            {/* Main Bedroom */}
            <rect x="50" y="20" width="45" height="35" className="fill-stone-50/50 stroke-stone-600" />
            <text x="60" y="30" className="fill-stone-800 font-sans text-[4.5px] font-medium uppercase">Habitación Master</text>
            <rect x="64" y="34" width="18" height="16" className="stroke-stone-400 fill-stone-100" /> {/* King Bed */}
            
            {/* Master Bathroom */}
            <rect x="50" y="55" width="22" height="20" className="stroke-stone-600" />
            <text x="53" y="62" className="fill-stone-800 font-sans text-[3.5px] uppercase">Baño Master</text>

            {/* Secondary Bedroom 1 */}
            <rect x="72" y="55" width="23" height="18" className="stroke-stone-600" />
            <text x="76" y="62" className="fill-stone-800 font-sans text-[3.5px] uppercase">Dormitorio 2</text>
            <rect x="78" y="66" width="12" height="5" className="stroke-stone-400 fill-stone-100" />

            {/* Secondary Bedroom 2 */}
            <rect x="50" y="75" width="23" height="20" className="stroke-stone-600" />
            <text x="54" y="82" className="fill-stone-800 font-sans text-[3.5px] uppercase">Dormitorio 3</text>
            <rect x="56" y="86" width="12" height="7" className="stroke-stone-400 fill-stone-100" />

            {/* Shared Bathroom */}
            <rect x="73" y="73" width="22" height="22" className="stroke-stone-600" />
            <text x="77" y="82" className="fill-stone-800 font-sans text-[3.5px] uppercase">Baño 2</text>
          </svg>
        );

      case 'penthouse':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full text-stone-300 stroke-current stroke-[0.8] fill-none">
            {/* Luxury Wrap Around Layout */}
            <rect x="6" y="6" width="88" height="88" rx="4" className="stroke-stone-800 stroke-[2]" />

            {/* Terrace Rooftop & Plunge Pool (Left Strip represent active outdoor space) */}
            <rect x="6" y="6" width="30" height="88" className="fill-stone-50 stroke-stone-700" />
            <text x="12" y="30" className="fill-stone-800 font-sans text-[4.5px] font-semibold uppercase tracking-wider">ROOFTOP PRIVADO</text>
            
            {/* Plunge Pool / Mini-pool layout */}
            <rect x="10" y="38" width="22" height="24" rx="2" className="stroke-blue-400 fill-blue-50/40" />
            <line x1="10" y1="44" x2="32" y2="44" strokeWidth="0.5" className="stroke-blue-200" />
            <line x1="10" y1="50" x2="32" y2="50" strokeWidth="0.5" className="stroke-blue-200" />
            <line x1="10" y1="56" x2="32" y2="56" strokeWidth="0.5" className="stroke-blue-200" />
            <text x="16" y="52" className="fill-blue-700 font-mono text-[3.5px] font-bold tracking-widest uppercase">Plunge Pool</text>

            {/* Outdoor Living on Rooftop */}
            <rect x="10" y="72" width="22" height="14" rx="1" className="stroke-stone-400 fill-stone-100" />
            <text x="15" y="80" className="fill-stone-500 font-sans text-[3px] uppercase">Rooftop Lounge</text>

            {/* Main Entrance & Internal Salon */}
            <rect x="36" y="6" width="58" height="88" className="fill-stone-100/10" />
            <text x="54" y="50" className="fill-stone-800 font-sans text-[5px] font-semibold uppercase tracking-widest text-center">Master Living Area</text>
            {/* Mega luxury seating arrangement */}
            <rect x="50" y="56" width="30" height="12" rx="1.5" className="stroke-stone-400 fill-stone-50" />
            <rect x="50" y="72" width="12" height="12" rx="1.5" className="stroke-stone-400 fill-stone-50" />
            <rect x="68" y="72" width="12" height="12" rx="1.5" className="stroke-stone-400 fill-stone-50" />

            {/* Kitchen Gourmet */}
            <rect x="36" y="6" width="28" height="32" className="stroke-stone-600 fill-stone-50" />
            <text x="42" y="16" className="fill-stone-800 font-sans text-[4px] font-medium uppercase">Cocina Gourmet</text>
            <rect x="42" y="22" width="16" height="8" rx="0.5" className="stroke-stone-400 fill-stone-100" />

            {/* Master Suite (Right block) */}
            <rect x="64" y="6" width="30" height="42" className="fill-stone-50/50 stroke-stone-600" />
            <text x="68" y="16" className="fill-stone-800 font-sans text-[4px] font-medium uppercase">Master Suite</text>
            <rect x="71" y="22" width="16" height="18" className="stroke-stone-400 fill-stone-100" /> {/* King Bed */}

            {/* Spiral Stairs Symbol */}
            <g className="stroke-stone-500">
              <circle cx="42" cy="46" r="4.5" />
              <line x1="42" y1="41.5" x2="42" y2="50.5" />
              <line x1="37.5" y1="46" x2="46.5" y2="46" />
              <text x="39" y="44" className="fill-stone-400 font-mono text-[2.5px] uppercase">Rooftop Sube</text>
            </g>
          </svg>
        );
    }
  };

  return (
    <div className="space-y-12 animate-fade-in" id="floor-plan-interactive-viewer">
      
      {/* Back to Master Map Button & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6">
        <button
          onClick={onBackToMap}
          className="group inline-flex items-center gap-2.5 self-start font-sans text-xs font-bold tracking-widest uppercase text-slate-500 hover:text-slate-950 transition-colors cursor-pointer"
          id="back-to-map-button"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Volver al Mapa Residencial
        </button>

        <div className="sm:text-right">
          <span className="font-mono text-[10px] tracking-[0.2em] text-emerald-600 uppercase font-bold block mb-1">
            {apartment.status === 'disponible' ? '✓ Unidad Disponible para Compra' : '✦ Reservada temporalmente'}
          </span>
          <h2 className="font-sans text-2xl font-light tracking-tight text-slate-900 sm:text-3xl">
            {apartment.name}
          </h2>
          <p className="font-sans text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
            Planta de Arquitectura • {apartment.model}
          </p>
        </div>
      </div>

      {/* Main floor plan section and quick highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Floor Plan Display (Left on desktop) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative bg-white/70 backdrop-blur-md rounded-none border border-slate-200/80 p-6 md:p-10 shadow-lg shadow-slate-100/40 flex items-center justify-center min-h-[400px] md:min-h-[500px]">
            
            {/* The SVG structural plan drawing */}
            <div className="w-full max-w-[500px] aspect-square relative">
              {renderFloorPlanSVG()}

              {/* Glowing Hotspots Layer over the SVG plan */}
              {apartment.hotspots.map((hotspot) => {
                const isActive = activeHotspot?.id === hotspot.id;

                return (
                  <div
                    key={hotspot.id}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 p-3"
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    onMouseEnter={() => setActiveHotspot(hotspot)}
                    onMouseLeave={() => setActiveHotspot(null)}
                    onClick={() => onOpenRoom(hotspot)}
                    id={`hotspot-${hotspot.id}`}
                  >
                    {/* Ring Pulse Container */}
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-9 w-9 rounded-none bg-slate-950/25 opacity-75" />
                      <div className={`flex h-8 w-8 sm:h-6 sm:w-6 items-center justify-center rounded-none border shadow-md transition-all duration-300 ${
                        isActive 
                          ? 'bg-slate-950 border-slate-950 text-slate-50 scale-125' 
                          : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                      }`}>
                        <span className="font-sans text-xs sm:text-[11px] font-bold">+</span>
                      </div>

                      {/* Floating local name tooltip */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -8 }}
                            animate={{ opacity: 1, scale: 1, y: -38 }}
                            exit={{ opacity: 0, scale: 0.9, y: -8 }}
                            className="absolute bg-slate-950/85 backdrop-blur-sm text-slate-50 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-none shadow-lg whitespace-nowrap border border-slate-800 pointer-events-none"
                          >
                            👁 Ver {hotspot.name}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Instructions Overlay Box inside plan */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/75 backdrop-blur-md px-4 py-3 rounded-none border border-slate-200/80 flex items-center gap-3 shadow-sm">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-none bg-slate-950 text-white animate-pulse">
                <span className="font-sans text-xs font-bold">+</span>
              </div>
              <p className="font-sans text-[11px] text-slate-600 leading-tight">
                Haz clic en los <strong>puntos interactivos</strong> del plano para abrir fotos reales tomadas en el apartamento.
              </p>
            </div>

            {/* Compass / Orientation graphic */}
            <div className="absolute top-6 right-6 flex flex-col items-center">
              <div className="h-9 w-9 border border-slate-200 rounded-none flex items-center justify-center text-xs font-mono font-bold text-slate-500 bg-white shadow-sm">
                N
              </div>
              <div className="h-4 w-[1px] bg-slate-200 mt-1"></div>
            </div>
          </div>

        </div>

        {/* Spec Sheet & Request Form (Right on desktop) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Speck/Pricing Card */}
          <div className="bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-none p-6 space-y-6 shadow-lg shadow-slate-100/50">
            <div className="flex justify-between items-center border-b border-slate-200/60 pb-4">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-widest font-semibold">Ficha de Inversión</span>
              <span className="font-sans text-2xl font-bold text-slate-900">{formatPrice(apartment.price)} <span className="text-[10px] text-slate-400 font-mono">USD</span></span>
            </div>

            {/* Grid Specifications (Ficha técnica requested) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 border border-slate-200/60 rounded-none p-3.5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-none bg-slate-50 border border-slate-200/50 flex items-center justify-center text-slate-600">
                  <Expand className="h-5 w-5 stroke-[1.5]" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] text-slate-400 uppercase font-semibold">Área Total</span>
                  <span className="font-sans text-sm font-bold text-slate-900">{apartment.area} m²</span>
                </div>
              </div>

              <div className="bg-white/80 border border-slate-200/60 rounded-none p-3.5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-none bg-slate-50 border border-slate-200/50 flex items-center justify-center text-slate-600">
                  <Layers className="h-5 w-5 stroke-[1.5]" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] text-slate-400 uppercase font-semibold">Dormitorios</span>
                  <span className="font-sans text-sm font-bold text-slate-900">{apartment.bedrooms}</span>
                </div>
              </div>

              <div className="bg-white/80 border border-slate-200/60 rounded-none p-3.5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-none bg-slate-50 border border-slate-200/50 flex items-center justify-center text-slate-600">
                  <Sparkles className="h-5 w-5 stroke-[1.5]" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] text-slate-400 uppercase font-semibold">Baños</span>
                  <span className="font-sans text-sm font-bold text-slate-900">{apartment.bathrooms}</span>
                </div>
              </div>

              <div className="bg-white/80 border border-slate-200/60 rounded-none p-3.5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-none bg-slate-50 border border-slate-200/50 flex items-center justify-center text-slate-600">
                  <Car className="h-5 w-5 stroke-[1.5]" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] text-slate-400 uppercase font-semibold">Parqueos</span>
                  <span className="font-sans text-sm font-bold text-slate-900">{apartment.parking} techados</span>
                </div>
              </div>
            </div>

            {/* Description Paragraph */}
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-semibold block">Sobre el Apartamento</span>
              <p className="font-sans text-xs text-slate-600 leading-relaxed text-justify">
                {apartment.description}
              </p>
            </div>

            {/* Highlights List */}
            <div className="space-y-3 pt-2">
              <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-semibold block">Amenidades Destacadas</span>
              <div className="space-y-2">
                {apartment.highlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-sans text-slate-700">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CALCULADORA DE FINANCIAMIENTO */}
          <div className="bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-none p-6 shadow-lg shadow-slate-100/50 space-y-6">
            <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3">
              <Calculator className="h-4.5 w-4.5 text-slate-950 stroke-[1.5]" />
              <h4 className="font-sans text-sm font-bold text-slate-900 uppercase tracking-wider">
                Simulador de Financiamiento
              </h4>
            </div>

            {/* Manual Text Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-[10px] font-semibold text-slate-400 uppercase mb-1">
                  Monto Inicial (USD)
                </label>
                <input
                  type="number"
                  placeholder={`Ej. ${Math.round(price * 0.2)}`}
                  value={downPaymentAmount}
                  onChange={(e) => {
                    const val = e.target.value === '' ? '' : Number(e.target.value);
                    setDownPaymentAmount(val);
                    if (val !== '' && loanTermMonths !== '' && annualInterestRate !== '') {
                      setShowSliders(true);
                    }
                  }}
                  className="w-full bg-white/80 border border-slate-200 rounded-none px-3.5 py-2 text-xs font-mono text-slate-850 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:bg-white"
                />
                <span className="block text-[9px] font-mono text-slate-400 mt-1">
                  Recomendado mín. 10% ({formatPrice(price * 0.1)})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-sans text-[10px] font-semibold text-slate-400 uppercase mb-1">
                    Plazo (Meses)
                  </label>
                  <input
                    type="number"
                    placeholder="Ej. 36"
                    value={loanTermMonths}
                    onChange={(e) => {
                      const val = e.target.value === '' ? '' : Number(e.target.value);
                      setLoanTermMonths(val);
                      if (downPaymentAmount !== '' && val !== '' && annualInterestRate !== '') {
                        setShowSliders(true);
                      }
                    }}
                    className="w-full bg-white/80 border border-slate-200 rounded-none px-3.5 py-2 text-xs font-mono text-slate-850 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] font-semibold text-slate-400 uppercase mb-1">
                    Interés Anual (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ej. 7.5"
                    value={annualInterestRate}
                    onChange={(e) => {
                      const val = e.target.value === '' ? '' : Number(e.target.value);
                      setAnnualInterestRate(val);
                      if (downPaymentAmount !== '' && loanTermMonths !== '' && val !== '') {
                        setShowSliders(true);
                      }
                    }}
                    className="w-full bg-white/80 border border-slate-200 rounded-none px-3.5 py-2 text-xs font-mono text-slate-850 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Sliders section - shown once inputs are modified or showSliders is true */}
            {showSliders && (
              <div className="space-y-5 pt-4 border-t border-slate-100 animate-fade-in">
                <span className="block font-mono text-[9px] text-slate-400 uppercase font-semibold">
                  Ajuste Fino con Sliders
                </span>

                <div>
                  <div className="flex justify-between items-center mb-1 text-[10px]">
                    <span className="text-slate-500 font-sans">Inicial</span>
                    <span className="font-mono text-slate-800 font-bold">{downPaymentPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => {
                      const pct = Number(e.target.value);
                      setDownPaymentAmount(Math.round((price * pct) / 100));
                    }}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 text-[10px]">
                    <span className="text-slate-500 font-sans">Plazo</span>
                    <span className="font-mono text-slate-800 font-bold">{loanTermMonths} Meses</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="120"
                    step="12"
                    value={typeof loanTermMonths === 'number' ? loanTermMonths : 12}
                    onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 text-[10px]">
                    <span className="text-slate-500 font-sans">Tasa de Interés</span>
                    <span className="font-mono text-slate-800 font-bold">{annualInterestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.5"
                    value={typeof annualInterestRate === 'number' ? annualInterestRate : 0}
                    onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                  />
                </div>
              </div>
            )}

            {/* Metric Summary Cards */}
            {isValid && (
              <div className="space-y-3 pt-4 border-t border-slate-200/60 animate-fade-in">
                <div className="bg-slate-50 border border-slate-200/50 p-4 space-y-1">
                  <span className="block font-mono text-[9px] text-slate-400 uppercase font-semibold">
                    Cuota Mensual Estimada
                  </span>
                  <span className="block font-sans text-xl font-bold text-emerald-600">
                    {formatPrice(monthlyPayment)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[10px]">
                  <div className="bg-white border border-slate-200 p-2.5">
                    <span className="block text-slate-400 font-mono text-[8px] uppercase">Financiado</span>
                    <span className="font-sans font-bold text-slate-800">{formatPrice(loanAmount)}</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-2.5">
                    <span className="block text-slate-400 font-mono text-[8px] uppercase">Total Interés</span>
                    <span className="font-sans font-bold text-slate-800">{formatPrice(totalInterest)}</span>
                  </div>
                </div>

                <div className="text-[10px] space-y-1 border-t border-slate-100 pt-2 font-mono text-slate-400">
                  <div className="flex justify-between">
                    <span>Precio de Lista:</span>
                    <span className="text-slate-600 font-semibold">{formatPrice(price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Costo Final:</span>
                    <span className="text-slate-800 font-bold">{formatPrice(totalCost)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* TABLA DE AMORTIZACIÓN */}
      {isValid && (
        <div className="bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-none p-6 shadow-lg shadow-slate-100/40 space-y-4 animate-fade-in mt-6">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <span className="font-sans text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              Tabla de Amortización Mensual
            </span>
            <span className="font-mono text-[10px] text-slate-400 uppercase font-semibold">
              {loanTermMonths} Pagos
            </span>
          </div>
          <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-100/60 sticky top-0 z-10 border-b border-slate-200">
                <tr className="font-mono text-[9px] text-slate-500 uppercase tracking-wider">
                  <th className="px-4 py-2.5 text-center">Mes</th>
                  <th className="px-4 py-2.5 text-right">Saldo Pendiente</th>
                  <th className="px-4 py-2.5 text-right">Cuota Total</th>
                  <th className="px-4 py-2.5 text-right">Interés</th>
                  <th className="px-4 py-2.5 text-right">Capital</th>
                  <th className="px-4 py-2.5 text-right">Nuevo Saldo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[10px] font-mono text-slate-600">
                {amortizationSchedule.map((row) => (
                  <tr key={row.month} className="hover:bg-slate-50/50">
                    <td className="px-4 py-2 text-center font-bold text-slate-900">{row.month}</td>
                    <td className="px-4 py-2 text-right">{formatPrice(row.startingBalance)}</td>
                    <td className="px-4 py-2 text-right text-slate-900 font-semibold">{formatPrice(row.payment)}</td>
                    <td className="px-4 py-2 text-right text-amber-700">{formatPrice(row.interest)}</td>
                    <td className="px-4 py-2 text-right text-emerald-700">{formatPrice(row.principal)}</td>
                    <td className="px-4 py-2 text-right text-slate-800">{formatPrice(row.endingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
