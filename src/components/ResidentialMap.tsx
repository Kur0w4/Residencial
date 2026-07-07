import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, MapPin, Layers, Expand, Sparkles } from 'lucide-react';
import { Apartment, ApartmentStatus } from '../types';
import { APARTMENTS, RESIDENTIAL_IMAGES } from '../data';
import {
  formatPrice,
  getStatusColorClass,
  getStatusTextTranslation,
  getTowerFromApartmentName,
} from '../utils/helpers';

interface ResidentialMapProps {
  onSelectTower: (towerId: string) => void;
  onSelectApartment: (apt: Apartment) => void;
}

// Configuración de coordenadas de las torres en el mapa aéreo
const TOWERS_CONFIG = [
  {
    id: 'Bloque A',
    displayName: 'Torre A',
    mapCoords: { x: 28, y: 25 },
  },
  {
    id: 'Bloque B',
    displayName: 'Torre B',
    mapCoords: { x: 50, y: 20 },
  },
  {
    id: 'Bloque C',
    displayName: 'Torre C',
    mapCoords: { x: 72, y: 29 },
  },
];

export default function ResidentialMap({ onSelectTower, onSelectApartment }: ResidentialMapProps) {
  // --- Estados de Filtros ---
  const [filterBeds, setFilterBeds] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(450000);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // --- Estados de Interacción ---
  const [hoveredApt, setHoveredApt] = useState<Apartment | null>(null);
  const [hoveredTowerId, setHoveredTowerId] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'map' | 'list'>('map');

  // Filtrado de apartamentos según los filtros seleccionados
  const filteredApartments = APARTMENTS.filter((apt) => {
    const matchesBeds = filterBeds === 'all' || apt.bedrooms.toString() === filterBeds;
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    const matchesPrice = apt.price <= maxPrice;
    const matchesSearch = apt.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          apt.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBeds && matchesStatus && matchesPrice && matchesSearch;
  });

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
            Navega por el mapa interactivo del residencial completo. Selecciona un bloque o pin para entrar a la vista detallada de la torre, explorar la disponibilidad por niveles y acceder a los planos en 2D.
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

      {/* Selector de Pestañas en Móvil */}
      <div className="flex lg:hidden border border-slate-200 bg-white shadow-sm overflow-hidden mb-2">
        <button
          type="button"
          onClick={() => setMobileTab('map')}
          className={`flex-1 py-3 text-center text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
            mobileTab === 'map' ? 'bg-slate-950 text-slate-50' : 'bg-white text-slate-600'
          }`}
        >
          Mapa Aéreo
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('list')}
          className={`flex-1 py-3 text-center text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
            mobileTab === 'list' ? 'bg-slate-950 text-slate-50' : 'bg-white text-slate-600'
          }`}
        >
          Lista y Filtros ({filteredApartments.length})
        </button>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Controls & List (Left side on desktop) */}
        <div className={`lg:col-span-4 space-y-6 lg:max-h-[640px] lg:overflow-y-auto pr-1 ${mobileTab === 'list' ? 'block' : 'hidden lg:block'}`}>
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
                {filteredApartments.map((apt) => {
                  const blockId = getTowerFromApartmentName(apt.name);
                  return (
                    <div
                      key={apt.id}
                      onMouseEnter={() => {
                        setHoveredApt(apt);
                        setHoveredTowerId(blockId);
                      }}
                      onMouseLeave={() => {
                        setHoveredApt(null);
                        setHoveredTowerId(null);
                      }}
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
                        <span className={`h-2 w-2 rounded-full ${getStatusColorClass(apt.status).split(' ')[0]}`} />
                        <span className="font-mono text-[9px] text-slate-500 uppercase tracking-wider font-semibold">{getStatusTextTranslation(apt.status)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Interactive Map Visualizer (Right side on desktop) */}
        <div className={`lg:col-span-8 space-y-4 ${mobileTab === 'map' ? 'block' : 'hidden lg:block'}`}>
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
                const blockId = getTowerFromApartmentName(apt.name);
                const isTowerHovered = hoveredTowerId === blockId;
                const isAptHovered = hoveredApt?.id === apt.id;
                const isFiltered = filteredApartments.some(fa => fa.id === apt.id);
                
                if (!apt.polygonPoints) return null;

                // Color of polygon based on status & hover
                let polyFill = 'transparent';
                let polyStroke = 'transparent';
                let strokeWidth = '0';

                if (isAptHovered) {
                  polyStroke = 'transparent';
                  polyFill = apt.status === 'disponible' ? 'rgba(16, 185, 129, 0.2)' : apt.status === 'reservado' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(120, 113, 108, 0.2)';
                  strokeWidth = '0';
                } else if (isTowerHovered) {
                  polyStroke = 'transparent';
                  polyFill = 'rgba(255, 255, 255, 0.08)';
                  strokeWidth = '0';
                } else if (!isFiltered) {
                  polyFill = 'rgba(0, 0, 0, 0.45)'; // dim down non-filtered apartments
                  polyStroke = 'transparent';
                  strokeWidth = '0';
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
                    onMouseEnter={() => setHoveredTowerId(blockId)}
                    onMouseLeave={() => setHoveredTowerId(null)}
                    onClick={() => {
                      onSelectTower(blockId);
                    }}
                  />
                );
              })}

              {/* Pins layer on top of polygons - One per tower */}
              {TOWERS_CONFIG.map((tower) => {
                const towerApts = APARTMENTS.filter(a => a.name.includes(tower.id));
                const hasFilteredApts = towerApts.some(ta => filteredApartments.some(fa => fa.id === ta.id));
                
                if (!hasFilteredApts) return null;

                const isHovered = hoveredTowerId === tower.id;
                const statuses = towerApts.map(a => a.status);
                let towerStatus: ApartmentStatus = 'disponible';
                if (statuses.includes('disponible')) {
                  towerStatus = 'disponible';
                } else if (statuses.includes('reservado')) {
                  towerStatus = 'reservado';
                } else {
                  towerStatus = 'vendido';
                }

                                const pinColor = towerStatus === 'disponible' ? 'bg-emerald-500' : towerStatus === 'reservado' ? 'bg-amber-500' : 'bg-stone-500';

                return (
                  <foreignObject
                    key={`pin-fo-${tower.id}`}
                    x={`${tower.mapCoords.x - 0.6}%`}
                    y={`${tower.mapCoords.y - 1.5}%`}
                    width="25%"
                    height="3%"
                    className="overflow-visible pointer-events-none"
                  >
                    <div 
                      className="flex items-center gap-2 cursor-pointer pointer-events-auto group h-full"
                      onMouseEnter={() => setHoveredTowerId(tower.id)}
                      onMouseLeave={() => setHoveredTowerId(null)}
                      onClick={() => onSelectTower(tower.id)}
                    >
                      {/* Minimalist dot with tight color-coded pulse (no white ring) */}
                      <div className="relative flex items-center justify-center h-3 w-3 shrink-0">
                        <motion.span
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.6, 0.1, 0.6]
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut"
                          }}
                          className={`absolute inline-flex h-full w-full rounded-full ${pinColor}`}
                        />
                        <div className={`relative h-2 w-2 rounded-full ${pinColor} transition-transform duration-200 group-hover:scale-125`} />
                      </div>
                    </div>
                  </foreignObject>
                );
              })}
            </svg>

            {/* Hover Floating HUD Tooltip */}
            <AnimatePresence>
              {(hoveredTowerId || hoveredApt) && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="fixed bottom-0 left-0 right-0 z-40 sm:absolute sm:bottom-6 sm:left-6 sm:right-6 sm:top-auto sm:z-auto bg-slate-950/95 border-t border-slate-800 sm:border sm:border-slate-800/80 backdrop-blur-md p-5 text-slate-100 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:max-w-sm"
                  id="map-floating-tooltip"
                >
                  {/* Close button for mobile bottom sheet */}
                  <button
                    type="button"
                    onClick={() => {
                      setHoveredApt(null);
                      setHoveredTowerId(null);
                    }}
                    className="absolute top-3 right-3 text-slate-400 hover:text-white sm:hidden p-1 text-xs"
                    aria-label="Cerrar detalles"
                  >
                    ✕
                  </button>
                  {(() => {
                    if (hoveredApt) {
                      return (
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${getStatusColorClass(hoveredApt.status).split(' ')[0]}`} />
                            <span className="font-mono text-[9px] text-slate-400 tracking-wider uppercase">
                              {getStatusTextTranslation(hoveredApt.status)} • Piso {hoveredApt.floor}
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
                      );
                    }
                    
                    const tower = TOWERS_CONFIG.find(t => t.id === hoveredTowerId);
                    if (!tower) return null;
                    
                    const towerApts = APARTMENTS.filter(a => a.name.includes(tower.id));
                    const availableApts = towerApts.filter(a => a.status === 'disponible').length;
                    const reservedApts = towerApts.filter(a => a.status === 'reservado').length;
                    const soldApts = towerApts.filter(a => a.status === 'vendido').length;
                    
                    const prices = towerApts.map(a => a.price);
                    const minPrice = Math.min(...prices);
                    const maxPrice = Math.max(...prices);
                    
                    let towerStatus: ApartmentStatus = 'disponible';
                    if (availableApts > 0) towerStatus = 'disponible';
                    else if (reservedApts > 0) towerStatus = 'reservado';
                    else towerStatus = 'vendido';

                    return (
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${getStatusColorClass(towerStatus).split(' ')[0]}`} />
                          <span className="font-mono text-[9px] text-slate-400 tracking-wider uppercase">
                            {towerStatus === 'disponible' ? 'Apartamentos Disponibles' : towerStatus === 'reservado' ? 'Reservado' : 'No disponible'}
                          </span>
                        </div>
                        <h3 className="font-sans text-base font-semibold tracking-tight text-white">{tower.displayName}</h3>
                        
                        <p className="font-sans text-xs text-slate-300">
                          {towerApts.length} Apartamentos • <span className="text-emerald-400 font-semibold">{availableApts} Disponibles</span>
                        </p>
                        
                        <div className="pt-2 flex items-center gap-3 border-t border-slate-800 text-[11px] font-sans text-slate-400">
                          <span>{reservedApts} Reservados</span>
                          <span>•</span>
                          <span>{soldApts} Vendidos</span>
                          <span>•</span>
                          <span className="font-mono text-emerald-400 font-semibold">
                            {minPrice === maxPrice ? formatPrice(minPrice) : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`} USD
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                  
                  <button 
                    onClick={() => {
                      if (hoveredApt) {
                        onSelectApartment(hoveredApt);
                      } else if (hoveredTowerId) {
                        onSelectTower(hoveredTowerId);
                      }
                    }}
                    className="shrink-0 w-full sm:w-auto self-stretch sm:self-center bg-white hover:bg-slate-200 text-slate-950 text-xs font-sans font-bold uppercase tracking-wider px-4 py-3 sm:py-2 rounded-none shadow-sm transition-all"
                  >
                    {hoveredApt ? 'Ver Plano' : 'Explorar Torre'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hint Instruction overlay */}
            <div className="absolute top-4 left-4 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-none text-[10px] font-mono uppercase tracking-wider font-semibold text-slate-200 pointer-events-none flex items-center gap-1.5 border border-white/10">
              <MapPin className="h-3 w-3 text-emerald-400 animate-bounce" />
              <span>Haz clic en una torre para ver sus apartamentos</span>
            </div>
          </div>
          <div className="text-center font-sans text-xs text-slate-400">
            Consejo: Pasa el cursor sobre las torres o los puntos para previsualizar especificaciones instantáneamente.
          </div>
        </div>

      </div>
    </div>
  );
}
