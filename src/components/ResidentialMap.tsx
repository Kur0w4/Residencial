import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, MapPin, DollarSign, Layers, Expand, Sparkles } from 'lucide-react';
import { Apartment, ApartmentStatus } from '../types';
import { APARTMENTS, RESIDENTIAL_IMAGES } from '../data';

interface ResidentialMapProps {
  onSelectApartment: (apt: Apartment) => void;
}

export default function ResidentialMap({ onSelectApartment }: ResidentialMapProps) {
  const [filterBeds, setFilterBeds] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(450000);
  const [hoveredApt, setHoveredApt] = useState<Apartment | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filtering apartments
  const filteredApartments = APARTMENTS.filter((apt) => {
    const matchesBeds = filterBeds === 'all' || apt.bedrooms.toString() === filterBeds;
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    const matchesPrice = apt.price <= maxPrice;
    const matchesSearch = apt.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          apt.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBeds && matchesStatus && matchesPrice && matchesSearch;
  });

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

  return (
    <div className="space-y-8 animate-fade-in" id="interactive-map-dashboard">
      {/* Intro section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs font-bold tracking-widest text-slate-400 uppercase">
            Exploración Interactiva Residencial
          </span>
          <h2 className="mt-1 font-sans text-3xl font-light tracking-tight text-slate-950 md:text-4xl">
            Descubre tu Próximo Hogar
          </h2>
          <p className="mt-2 max-w-2xl font-sans text-sm text-slate-500 leading-relaxed">
            Navega por el mapa interactivo del residencial completo. Selecciona un bloque o pin para entrar a la vista detallada en planta de cada apartamento, explorar fotos reales de sus habitaciones en 360° y consultar la ficha técnica.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md border border-slate-200 px-4 py-2.5 rounded-none text-xs font-mono text-slate-600 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></span>
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500 ring-4 ring-amber-50"></span>
            <span>Reservado</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-400 ring-4 ring-slate-100"></span>
            <span>Vendido</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Controls & List (Left side on desktop) */}
        <div className="lg:col-span-4 space-y-6 lg:max-h-[640px] lg:overflow-y-auto pr-1">
          {/* Filters Card */}
          <div className="bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-none p-5 space-y-4 shadow-lg shadow-slate-100/50">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs font-bold text-slate-900 tracking-widest uppercase flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-slate-500" />
                Filtros de Búsqueda
              </span>
              <button 
                onClick={() => {
                  setFilterBeds('all');
                  setFilterStatus('all');
                  setMaxPrice(450000);
                  setSearchQuery('');
                }}
                className="font-mono text-[10px] text-slate-400 hover:text-slate-900 underline transition-colors"
              >
                Restablecer
              </button>
            </div>

            {/* Text Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por apartamento, modelo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/85 border border-slate-200 rounded-none px-10 py-2.5 text-xs font-sans text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
              />
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            </div>

            {/* Beds Filter */}
            <div className="space-y-2">
              <label className="block font-sans text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Habitaciones</label>
              <div className="grid grid-cols-4 gap-2">
                {['all', '1', '2', '3'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setFilterBeds(option)}
                    className={`py-1.5 px-3 text-xs font-sans cursor-pointer rounded-none border transition-all ${
                      filterBeds === option
                        ? 'bg-slate-950 text-slate-50 border-slate-950 shadow-sm font-semibold'
                        : 'bg-white/80 text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {option === 'all' ? 'Todas' : `${option} Hab`}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="block font-sans text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Estado de Venta</label>
              <div className="grid grid-cols-3 gap-2">
                {['all', 'disponible', 'reservado'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setFilterStatus(option)}
                    className={`py-1.5 px-2 text-xs font-sans cursor-pointer rounded-none border text-center truncate transition-all ${
                      filterStatus === option
                        ? 'bg-slate-950 text-slate-50 border-slate-950 shadow-sm font-semibold'
                        : 'bg-white/80 text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {option === 'all' ? 'Todos' : option === 'disponible' ? 'Disponible' : 'Reservado'}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between font-sans text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <span>Presupuesto Máximo</span>
                <span className="text-slate-900 font-bold">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="130000"
                max="450000"
                step="10000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-slate-950 h-1.5 bg-slate-200 rounded-none appearance-none cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[9px] text-slate-400">
                <span>$130k USD</span>
                <span>$450k USD</span>
              </div>
            </div>
          </div>

          {/* Apartment List Results */}
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase font-bold">
                Resultados ({filteredApartments.length})
              </span>
            </div>

            {filteredApartments.length === 0 ? (
              <div className="bg-white/60 backdrop-blur-md border border-slate-200 rounded-none p-8 text-center space-y-2">
                <span className="text-slate-300 block text-3xl">📭</span>
                <p className="font-sans text-xs font-semibold text-slate-700">No hay apartamentos disponibles con estos filtros.</p>
                <p className="font-sans text-[11px] text-slate-400">Prueba ajustando el presupuesto o limpiando los criterios.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredApartments.map((apt) => (
                  <div
                    key={apt.id}
                    onMouseEnter={() => setHoveredApt(apt)}
                    onMouseLeave={() => setHoveredApt(null)}
                    onClick={() => onSelectApartment(apt)}
                    className={`group relative bg-white/70 backdrop-blur-md border rounded-none p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      hoveredApt?.id === apt.id ? 'border-slate-900 shadow-md ring-1 ring-slate-900' : 'border-slate-200/80 shadow-sm'
                    }`}
                    id={`apt-card-${apt.id}`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded-none font-mono text-[9px] font-semibold tracking-widest bg-slate-100 text-slate-600 mb-1.5 uppercase">
                          Nivel {apt.floor} • {apt.model}
                        </span>
                        <h4 className="font-sans text-sm font-bold text-slate-950 group-hover:text-slate-800 transition-colors">
                          {apt.name}
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="block font-sans text-sm font-bold text-slate-950">
                          {formatPrice(apt.price)}
                        </span>
                        <span className="font-mono text-[9px] text-slate-400 uppercase">USD</span>
                      </div>
                    </div>

                    {/* Simple stats bar */}
                    <div className="mt-3 grid grid-cols-3 gap-1 border-t border-slate-150 pt-3 font-sans text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Expand className="h-3.5 w-3.5 text-slate-400" />
                        <span>{apt.area} m²</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5 text-slate-400" />
                        <span>{apt.bedrooms} Hab</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-slate-400" />
                        <span>{apt.bathrooms} Baños</span>
                      </div>
                    </div>

                    {/* Status badge floating absolute inside */}
                    <div className="absolute right-4 bottom-4 flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${getStatusColor(apt.status).split(' ')[0]}`} />
                      <span className="font-mono text-[9px] text-slate-500 uppercase tracking-wider font-semibold">{getStatusText(apt.status)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Interactive Map Visualizer (Right side on desktop) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative overflow-hidden bg-stone-900 rounded-3xl border border-stone-800 shadow-xl aspect-[16/9]" id="aerial-interactive-canvas">
            {/* Base Image */}
            <img
              src={RESIDENTIAL_IMAGES.aerial}
              alt="Planta Aérea Portal del Bosque"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover select-none pointer-events-none opacity-85 transition-transform duration-500"
            />

            {/* SVG Interactive Layer */}
            <svg 
              viewBox="0 0 100 100" 
              className="absolute inset-0 w-full h-full pointer-events-auto select-none"
              preserveAspectRatio="none"
            >
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Individual Interactive Polygons representing Apartment Zones */}
              {APARTMENTS.map((apt) => {
                const isHovered = hoveredApt?.id === apt.id;
                const isFiltered = filteredApartments.some(fa => fa.id === apt.id);
                
                if (!apt.polygonPoints) return null;

                // Color of polygon based on status & hover
                let polyFill = 'rgba(255, 255, 255, 0.02)';
                let polyStroke = 'rgba(255, 255, 255, 0.2)';
                let strokeWidth = '1';

                if (isHovered) {
                  polyStroke = apt.status === 'disponible' ? '#10b981' : apt.status === 'reservado' ? '#f59e0b' : '#a8a29e';
                  polyFill = apt.status === 'disponible' ? 'rgba(16, 185, 129, 0.15)' : apt.status === 'reservado' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(120, 113, 108, 0.15)';
                  strokeWidth = '2';
                } else if (!isFiltered) {
                  polyFill = 'rgba(0, 0, 0, 0.4)'; // dim down non-filtered apartments
                  polyStroke = 'rgba(0, 0, 0, 0.1)';
                }

                return (
                  <polygon
                    key={`poly-${apt.id}`}
                    points={apt.polygonPoints}
                    className="cursor-pointer transition-all duration-300"
                    style={{
                      fill: polyFill,
                      stroke: polyStroke,
                      strokeWidth: strokeWidth,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={() => setHoveredApt(apt)}
                    onMouseLeave={() => setHoveredApt(null)}
                    onClick={() => {
                      if (isFiltered) onSelectApartment(apt);
                    }}
                  />
                );
              })}

              {/* Pins layer on top of polygons */}
              {APARTMENTS.map((apt) => {
                const isHovered = hoveredApt?.id === apt.id;
                const isFiltered = filteredApartments.some(fa => fa.id === apt.id);

                if (!isFiltered) return null;

                const pinColor = apt.status === 'disponible' ? 'bg-emerald-500' : apt.status === 'reservado' ? 'bg-amber-500' : 'bg-stone-500';
                const ringColor = apt.status === 'disponible' ? 'border-emerald-300' : apt.status === 'reservado' ? 'border-amber-300' : 'border-stone-300';

                return (
                  <foreignObject
                    key={`pin-fo-${apt.id}`}
                    x={`${apt.mapCoords.x - 2.5}%`}
                    y={`${apt.mapCoords.y - 2.5}%`}
                    width="5%"
                    height="5%"
                    className="overflow-visible pointer-events-none"
                  >
                    <div 
                      className="w-full h-full flex items-center justify-center cursor-pointer pointer-events-auto"
                      onMouseEnter={() => setHoveredApt(apt)}
                      onMouseLeave={() => setHoveredApt(null)}
                      onClick={() => onSelectApartment(apt)}
                    >
                      {/* Pulse effect on hover */}
                      <div className="relative flex items-center justify-center">
                        <AnimatePresence>
                          {isHovered && (
                            <motion.span
                              initial={{ scale: 0.8, opacity: 0.8 }}
                              animate={{ scale: 2.2, opacity: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                              className={`absolute inline-flex h-6 w-6 rounded-full opacity-75 ${pinColor}`}
                            />
                          )}
                        </AnimatePresence>
                        
                        {/* Dot container */}
                        <div className={`relative flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-lg border-2 ${ringColor} transition-transform duration-300 ${isHovered ? 'scale-125' : 'scale-100'}`}>
                          {/* Inner color center */}
                          <div className={`h-2.5 w-2.5 rounded-full ${pinColor}`} />
                        </div>
                      </div>
                    </div>
                  </foreignObject>
                );
              })}
            </svg>

            {/* Hover Floating HUD Tooltip */}
            <AnimatePresence>
              {hoveredApt && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-sm bg-slate-950/80 border border-slate-800/80 backdrop-blur-md rounded-none p-4 text-slate-100 shadow-2xl flex items-start gap-4"
                  id="map-floating-tooltip"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${getStatusColor(hoveredApt.status).split(' ')[0]}`} />
                      <span className="font-mono text-[9px] text-slate-400 tracking-wider uppercase">
                        {getStatusText(hoveredApt.status)} • Piso {hoveredApt.floor}
                      </span>
                    </div>
                    <h3 className="font-sans text-base font-semibold tracking-tight text-white">{hoveredApt.name}</h3>
                    
                    <p className="font-sans text-xs text-slate-300">
                      Modelo <span className="text-slate-100 font-semibold">{hoveredApt.model}</span> • {hoveredApt.area}m²
                    </p>
                    
                    <div className="pt-2 flex items-center gap-3 border-t border-slate-800 text-[11px] font-sans text-slate-400">
                      <span>{hoveredApt.bedrooms} Hab</span>
                      <span>•</span>
                      <span>{hoveredApt.bathrooms} Baños</span>
                      <span>•</span>
                      <span className="font-mono text-emerald-400 font-semibold">{formatPrice(hoveredApt.price)} USD</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => onSelectApartment(hoveredApt)}
                    className="shrink-0 self-center bg-white hover:bg-slate-200 text-slate-950 text-xs font-sans font-bold uppercase tracking-wider px-4 py-2 rounded-none shadow-sm transition-all"
                  >
                    Ver Plano
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hint Instruction overlay */}
            <div className="absolute top-4 left-4 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-none text-[10px] font-mono uppercase tracking-wider font-semibold text-slate-200 pointer-events-none flex items-center gap-1.5 border border-white/10">
              <MapPin className="h-3 w-3 text-emerald-400 animate-bounce" />
              <span>Haz clic en un edificio para ver sus planos</span>
            </div>
          </div>
          <div className="text-center font-sans text-xs text-slate-400">
            Consejo: Pasa el cursor sobre los edificios o los puntos para previsualizar especificaciones instantáneamente.
          </div>
        </div>

      </div>
    </div>
  );
}
