import { useState } from 'react';
import { Trees, Menu, X } from 'lucide-react';

interface HeaderProps {
  activePage: 'inicio' | 'proyectos' | 'contacto' | 'privacidad';
  onNavigate: (page: 'inicio' | 'proyectos' | 'contacto') => void;
}

export default function Header({ activePage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'contacto', label: 'Contacto' }
  ] as const;

  const handleNavigate = (page: typeof menuItems[number]['id']) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 bg-white/75 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo and Brand */}
        <div
          onClick={() => handleNavigate('inicio')}
          className="flex cursor-pointer items-center gap-3 transition-all hover:opacity-90"
          id="brand-logo"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-slate-50 shadow-sm">
            <Trees className="h-6 w-6 stroke-[1.5]" />
          </div>
          <div>
            <span className="font-sans text-xl font-semibold tracking-widest text-slate-900">
              PORTAL DEL BOSQUE
            </span>
            <span className="block font-mono text-[9px] tracking-[0.2em] text-slate-400 uppercase font-medium">
              Residencias de Lujo
            </span>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8 font-semibold uppercase tracking-widest text-xs">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`font-sans tracking-widest transition-colors cursor-pointer pb-1 ${
                activePage === item.id 
                  ? 'text-slate-900 border-b-2 border-slate-900 font-bold' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden p-2 text-slate-650 hover:text-slate-950 focus:outline-none cursor-pointer"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile dropdown navigation menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-slate-200/60 bg-white px-6 py-4 flex flex-col gap-4 font-semibold uppercase tracking-widest text-xs">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`w-full text-left py-2 font-sans transition-colors cursor-pointer ${
                activePage === item.id ? 'text-slate-950 font-bold' : 'text-slate-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
