import { motion } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Sparkles, AlertCircle } from 'lucide-react';
import { Hotspot } from '../types';

interface RoomPhotoModalProps {
  hotspot: Hotspot;
  allHotspots: Hotspot[];
  onClose: () => void;
  onNavigate: (nextHotspot: Hotspot) => void;
}

export default function RoomPhotoModal({ hotspot, allHotspots, onClose, onNavigate }: RoomPhotoModalProps) {
  const currentIndex = allHotspots.findIndex((h) => h.id === hotspot.id);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + allHotspots.length) % allHotspots.length;
    onNavigate(allHotspots[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allHotspots.length;
    onNavigate(allHotspots[nextIndex]);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
      id="room-lightbox-modal"
    >
      {/* Absolute close trigger on background */}
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

      {/* Main interactive window container */}
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-none overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close button for entire modal (placed sticky at top-right of container) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 h-10 w-10 bg-slate-950/70 border border-white/10 text-white flex items-center justify-center transition-all hover:bg-white hover:text-slate-950 cursor-pointer rounded-none"
          aria-label="Cerrar modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left column / Image viewer (Takes 70% width on large screens) */}
        <div className="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden h-[45vh] md:h-auto md:min-h-[450px]">
          
          {/* Main Room Image with scale transitions */}
          <motion.img
            key={hotspot.imageSrc}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            src={hotspot.imageSrc}
            alt={hotspot.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover max-h-full"
          />

          {/* HUD overlay for room status/photography label */}
          <div className="absolute top-5 left-5 bg-slate-950/70 border border-slate-850 backdrop-blur-xs px-3 py-1.5 rounded-none text-[10px] font-mono tracking-widest text-slate-200 uppercase flex items-center gap-1.5 pointer-events-none">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Fotografía Real de Unidad</span>
          </div>

          {/* Quick cycle arrows layout */}
          {allHotspots.length > 1 && (
            <>
              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-none bg-slate-950/75 hover:bg-white hover:text-slate-950 text-white flex items-center justify-center transition-all border border-slate-800 shadow-lg cursor-pointer"
                aria-label="Anterior foto"
              >
                <ChevronLeft className="h-5 w-5 stroke-[2]" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-none bg-slate-950/75 hover:bg-white hover:text-slate-950 text-white flex items-center justify-center transition-all border border-slate-800 shadow-lg cursor-pointer"
                aria-label="Siguiente foto"
              >
                <ChevronRight className="h-5 w-5 stroke-[2]" />
              </button>
            </>
          )}

          {/* Indicators dots floating at bottom */}
          <div className="absolute bottom-5 flex gap-1.5 z-10">
            {allHotspots.map((h, idx) => (
              <button
                key={h.id}
                onClick={() => onNavigate(h)}
                className={`h-1.5 rounded-none transition-all cursor-pointer ${
                  idx === currentIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right column / Specs & Description details (Takes 30% width) */}
        <div className="w-full md:w-[320px] p-6 bg-slate-900 text-slate-200 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800 flex-1 md:flex-initial overflow-y-auto">
          
          <div className="space-y-4">
            <span className="font-mono text-[9px] text-slate-400 tracking-widest uppercase block font-semibold">Espacio Interior</span>
            <h3 className="font-sans text-xl font-semibold tracking-tight text-white uppercase">
              {hotspot.name}
            </h3>

            <div className="h-[1px] bg-slate-800 w-full"></div>

            <p className="font-sans text-xs text-slate-300 leading-relaxed text-justify">
              {hotspot.description}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-sans text-slate-400 bg-slate-950/40 p-2.5 rounded-none border border-slate-850">
              <AlertCircle className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>Nuestras fotos muestran el diseño real, materiales importados y la distribución de la unidad modelo.</span>
            </div>

            <div className="flex gap-2 text-xs font-mono text-slate-500 justify-between">
              <span>Unidad {currentIndex + 1} de {allHotspots.length}</span>
              <span>• Portal del Bosque</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
