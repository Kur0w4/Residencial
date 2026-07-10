import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Apartment, Hotspot } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProjectsPage from './components/ProjectsPage';
import ContactPage from './components/ContactPage';
import PrivacyPage from './components/PrivacyPage';
import ResidentialMap from './components/ResidentialMap';
import TowerElevationView from './components/TowerElevationView';
import FloorPlanView from './components/FloorPlanView';
import RoomPhotoModal from './components/RoomPhotoModal';
import { getTowerFromApartmentName, scrollToInteractiveContainer } from './utils/helpers';

export default function App() {
  // --- Estados de Navegación de Páginas ---
  const [activePage, setActivePage] = useState<'inicio' | 'proyectos' | 'contacto' | 'privacidad'>('inicio');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // --- Estados del Visualizador Inmobiliario (Inmuebles a tu alcance) ---
  const [selectedTower, setSelectedTower] = useState<string | null>(null);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [activeRoomPhoto, setActiveRoomPhoto] = useState<Hotspot | null>(null);

  /**
   * Cambia la página activa de la aplicación.
   */
  const handleNavigate = (page: typeof activePage) => {
    setActivePage(page);
    // Al navegar a proyectos desde el menú, resetear para mostrar la lista de proyectos
    if (page === 'proyectos') {
      setSelectedProject(null);
      setSelectedTower(null);
      setSelectedApartment(null);
      setActiveRoomPhoto(null);
    }
  };

  /**
   * Selecciona una torre y desplaza suavemente la pantalla al contenedor interactivo.
   */
  const handleSelectTower = (towerId: string) => {
    setSelectedTower(towerId);
    scrollToInteractiveContainer();
  };

  /**
   * Selecciona un apartamento específico, determina su torre y se desplaza al contenedor interactivo.
   */
  const handleSelectApartment = (apt: Apartment) => {
    setSelectedApartment(apt);
    const blockId = getTowerFromApartmentName(apt.name);
    setSelectedTower(blockId);
    scrollToInteractiveContainer();
  };

  /**
   * Regresa a la vista de elevación de la torre.
   */
  const handleBackToTower = () => {
    setSelectedApartment(null);
    setActiveRoomPhoto(null);
    scrollToInteractiveContainer();
  };

  /**
   * Regresa al mapa residencial general.
   */
  const handleBackToMap = () => {
    setSelectedApartment(null);
    setSelectedTower(null);
    setActiveRoomPhoto(null);
    scrollToInteractiveContainer();
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
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      {/* Main Core View Area */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activePage === 'inicio' && (
            <motion.div
              key="inicio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <HomePage onNavigateToProjects={() => handleNavigate('proyectos')} />
            </motion.div>
          )}

          {activePage === 'proyectos' && (
            <motion.div
              key="proyectos"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {!selectedProject ? (
                <ProjectsPage onSelectProject={(id) => setSelectedProject(id)} />
              ) : (
                <section className="py-16 mx-auto max-w-7xl px-6" id="main-interactive-container">
                  {/* Botón para regresar al catálogo de proyectos */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="mb-8 group flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-950 transition-colors cursor-pointer"
                  >
                    ← Volver a Desarrollos
                  </button>

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
              )}
            </motion.div>
          )}

          {activePage === 'contacto' && (
            <motion.div
              key="contacto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ContactPage />
            </motion.div>
          )}

          {activePage === 'privacidad' && (
            <motion.div
              key="privacidad"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <PrivacyPage onBackToHome={() => handleNavigate('inicio')} />
            </motion.div>
          )}
        </AnimatePresence>
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
      <Footer onNavigatePrivacy={() => handleNavigate('privacidad')} />

    </div>
  );
}
