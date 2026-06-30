import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trees, Waves, Dumbbell, ShieldCheck, HelpCircle,
  MapPin, Phone, Mail, Award, Key, Sparkles, Compass
} from 'lucide-react';
import { Apartment, Hotspot } from './types';
import { APARTMENTS } from './data';
import Header from './components/Header';
import Footer from './components/Footer';
import ResidentialMap from './components/ResidentialMap';
import TowerElevationView from './components/TowerElevationView';
import FloorPlanView from './components/FloorPlanView';
import RoomPhotoModal from './components/RoomPhotoModal';

export default function App() {
  const [selectedTower, setSelectedTower] = useState<string | null>(null);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [activeRoomPhoto, setActiveRoomPhoto] = useState<Hotspot | null>(null);

  const handleSelectTower = (towerId: string) => {
    setSelectedTower(towerId);
    // Scroll smoothly to interactive container
    const element = document.getElementById('main-interactive-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectApartment = (apt: Apartment) => {
    setSelectedApartment(apt);
    const blockId = apt.name.split(' - ')[1] || 'Bloque A';
    setSelectedTower(blockId);
    // Scroll smoothly to interactive container
    const element = document.getElementById('main-interactive-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToTower = () => {
    setSelectedApartment(null);
    setActiveRoomPhoto(null);
    // Scroll back to interactive section
    const element = document.getElementById('main-interactive-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToMap = () => {
    setSelectedApartment(null);
    setSelectedTower(null);
    setActiveRoomPhoto(null);
    // Scroll back to interactive section
    const element = document.getElementById('main-interactive-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenRoom = (hotspot: Hotspot) => {
    setActiveRoomPhoto(hotspot);
  };

  const handleNavigateRoom = (nextHotspot: Hotspot) => {
    setActiveRoomPhoto(nextHotspot);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-slate-900 selection:text-white">

      {/* Premium Navigation Header */}
      <Header
        onReset={handleBackToMap}
        selectedAptId={selectedApartment?.id || selectedTower || null}
      />

      {/* Main Core View Area */}
      <main className="flex-1">

        {/* Hero Concept Banner */}
        <section className="relative overflow-hidden border-b border-slate-200/60 bg-white/70 backdrop-blur-md py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 relative z-10 space-y-4">
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-slate-950 max-w-4xl leading-[1.1]">
              Arquitectura de vanguardia en <br className="hidden sm:inline" />
              <span className="font-light">Portal del Bosque</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-slate-500 max-w-2xl font-light leading-relaxed">
              Un desarrollo inmobiliario boutique con apartamentos diseñados para inspirar paz, ventilación cruzada, abundantes entradas de luz solar y vistas infinitas a una reserva natural protegida.
            </p>
          </div>
          {/* Subtle architectural background accent grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] z-0"></div>
        </section>

        {/* Interactive Interactive Sandbox Frame */}
        <section className="py-16 mx-auto max-w-7xl px-6" id="main-interactive-container">
          <AnimatePresence mode="wait">
            {!selectedTower && !selectedApartment ? (
              <motion.div
                key="map-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <ResidentialMap 
                  onSelectTower={handleSelectTower}
                  onSelectApartment={handleSelectApartment} 
                />
              </motion.div>
            ) : selectedTower && !selectedApartment ? (
              <motion.div
                key="tower-elevation-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <TowerElevationView
                  towerId={selectedTower}
                  onBackToMap={handleBackToMap}
                  onSelectApartment={handleSelectApartment}
                />
              </motion.div>
            ) : (
              <motion.div
                key="floor-plan-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <FloorPlanView
                  apartment={selectedApartment!}
                  onBackToMap={handleBackToTower}
                  onOpenRoom={handleOpenRoom}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Community Amenities & Lifestyle benefits */}
        <section className="bg-slate-100/40 border-y border-slate-200/60 py-16" id="amenities-section">
          <div className="mx-auto max-w-7xl px-6 space-y-12">

            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="font-mono text-[9px] tracking-[0.2em] text-slate-400 uppercase font-bold block">
                Amenities & Services
              </span>
              <h3 className="font-sans text-2xl font-light tracking-tight text-slate-950 sm:text-3xl">
                Un Estilo de Vida Elevado
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-500">
                Portal del Bosque combina la privacidad de tu hogar con una selección exclusiva de áreas sociales para el esparcimiento y el autocuidado.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              <div className="bg-white/75 backdrop-blur-md border border-slate-200/80 rounded-none p-6 text-center space-y-3 shadow-lg shadow-slate-100/50">
                <div className="h-12 w-12 rounded-none bg-slate-50 text-slate-900 border border-slate-200/50 flex items-center justify-center mx-auto">
                  <Waves className="h-6 w-6 stroke-[1.2]" />
                </div>
                <h4 className="font-sans text-sm font-bold text-slate-900 uppercase tracking-wider">Piscina Infinity</h4>
                <p className="font-sans text-[11px] text-slate-400">Área climatizada con deck de solárium y camastros de relajación.</p>
              </div>

              <div className="bg-white/75 backdrop-blur-md border border-slate-200/80 rounded-none p-6 text-center space-y-3 shadow-lg shadow-slate-100/50">
                <div className="h-12 w-12 rounded-none bg-slate-50 text-slate-900 border border-slate-200/50 flex items-center justify-center mx-auto">
                  <Dumbbell className="h-6 w-6 stroke-[1.2]" />
                </div>
                <h4 className="font-sans text-sm font-bold text-slate-900 uppercase tracking-wider">Wellness Center</h4>
                <p className="font-sans text-[11px] text-slate-400">Gimnasio completo con equipamiento de cardio, musculación y yoga.</p>
              </div>

              <div className="bg-white/75 backdrop-blur-md border border-slate-200/80 rounded-none p-6 text-center space-y-3 shadow-lg shadow-slate-100/50">
                <div className="h-12 w-12 rounded-none bg-slate-50 text-slate-900 border border-slate-200/50 flex items-center justify-center mx-auto">
                  <ShieldCheck className="h-6 w-6 stroke-[1.2]" />
                </div>
                <h4 className="font-sans text-sm font-bold text-slate-900 uppercase tracking-wider">Seguridad 24/7</h4>
                <p className="font-sans text-[11px] text-slate-400">Acceso controlado mediante garita, cámaras y patrullaje preventivo.</p>
              </div>

              <div className="bg-white/75 backdrop-blur-md border border-slate-200/80 rounded-none p-6 text-center space-y-3 shadow-lg shadow-slate-100/50">
                <div className="h-12 w-12 rounded-none bg-slate-50 text-slate-900 border border-slate-200/50 flex items-center justify-center mx-auto">
                  <Trees className="h-6 w-6 stroke-[1.2]" />
                </div>
                <h4 className="font-sans text-sm font-bold text-slate-900 uppercase tracking-wider">Senderos Verdes</h4>
                <p className="font-sans text-[11px] text-slate-400">Sendero ecológico privado de 1.2 kilómetros para caminata y running.</p>
              </div>

            </div>

            {/* Quick investment seals */}
            <div className="pt-8 border-t border-slate-200 flex flex-wrap gap-8 items-center justify-center text-slate-400 text-[10px] font-mono uppercase tracking-widest font-bold">
              <span className="flex items-center gap-2">
                <Award className="h-4 w-4 text-slate-500" />
                Doble Altura Estructural
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-slate-500" />
                Ventilación Cruzada Certificada
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Key className="h-4 w-4 text-slate-500" />
                Entrega Garantizada Fiduciaria
              </span>
            </div>

          </div>
        </section>

      </main>

      {/* Cinematic Photorealistic Lightbox Modal */}
      <AnimatePresence>
        {activeRoomPhoto && selectedApartment && (
          <RoomPhotoModal
            hotspot={activeRoomPhoto}
            allHotspots={selectedApartment.hotspots}
            onClose={() => setActiveRoomPhoto(null)}
            onNavigate={handleNavigateRoom}
          />
        )}
      </AnimatePresence>

      {/* Modern Compact Real Estate Footer */}
      <Footer />

    </div>
  );
}
