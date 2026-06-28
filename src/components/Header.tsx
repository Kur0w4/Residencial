import { Trees, Phone, Map, ShieldCheck, Mail } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  selectedAptId: string | null;
}

export default function Header({ onReset, selectedAptId }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 bg-white/75 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo and Brand */}
        <div 
          onClick={onReset}
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

        {/* Navigation / Status */}
        <nav className="hidden md:flex items-center gap-8 font-semibold uppercase tracking-widest text-xs">
          <button 
            onClick={onReset}
            className={`font-sans tracking-widest transition-colors cursor-pointer ${!selectedAptId ? 'text-slate-900 border-b-2 border-slate-900 pb-1 font-bold' : 'text-slate-500 hover:text-slate-900 pb-1'}`}
          >
            Inicio
          </button>
          <a 
            href="#amenities-section" 
            className="font-sans text-slate-500 hover:text-slate-900 transition-colors pb-1"
          >
            Amenidades
          </a>
          <a 
            href="#inquiry-section" 
            className="font-sans text-slate-500 hover:text-slate-900 transition-colors pb-1"
          >
            Contacto
          </a>
        </nav>

        {/* Action Button & Contact info */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end text-right">
            <span className="font-mono text-[9px] tracking-wider text-slate-400 uppercase">Llámanos</span>
            <span className="font-sans text-xs font-semibold text-slate-900">+1 (809) 555-0195</span>
          </div>
          <a
            href="#inquiry-section"
            className="flex items-center gap-2 rounded-none bg-slate-900 px-4 py-2.5 font-sans text-xs font-bold uppercase tracking-[0.15em] text-slate-50 transition-all hover:bg-slate-850"
            id="contact-button"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Solicitar Dossier</span>
          </a>
        </div>
      </div>
    </header>
  );
}
