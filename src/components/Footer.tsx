import { Trees, Mail, Phone, MapPin, Shield, CheckCircle } from 'lucide-react';

interface FooterProps {
  onNavigatePrivacy: () => void;
}

export default function Footer({ onNavigatePrivacy }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-16 text-slate-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-none bg-slate-800 text-slate-100 border border-slate-700">
                <Trees className="h-5 w-5 stroke-[1.5]" />
              </div>
              <div>
                <span className="font-sans text-lg font-bold tracking-tight text-white block uppercase">
                  Inmuebles
                </span>
                <span className="block font-mono text-[8px] tracking-[0.2em] text-slate-400 uppercase font-semibold">
                  a tu alcance
                </span>
              </div>
            </div>
            <p className="max-w-md font-sans text-xs leading-relaxed text-slate-300">
              Encuentra tu proximo hogar desde la comodidad de tu casa con todo lujo de detalles.
            </p>
          </div>

          {/* Quick Info */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold tracking-widest text-white uppercase">
              Ubicación & Ventas
            </h4>
            <ul className="space-y-3 font-sans text-xs text-slate-300">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-slate-500" />
                <span>+1 (849) 555-0195</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-slate-500" />
                <span>info@inmueblesatualcance.com</span>
              </li>
            </ul>
          </div>

          {/* Legal / Features */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold tracking-widest text-white uppercase">
              Garantía Inmobiliaria
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-slate-500" />
                <span>Título deslindado y aprobado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-slate-500" />
                <span>Amparado por Ley Confotur (Exento de impuestos)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-slate-500" />
                <span>Fiduciaria Dominicana autorizada</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-slate-500" />
                <span>Garantía estructural de 10 años</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold">
          <p>© {currentYear} Inmuebles a tu alcance. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                onNavigatePrivacy();
              }}
              className="hover:text-slate-300 transition-colors cursor-pointer text-left focus:outline-none"
            >
              Términos de Privacidad
            </button>
            <a href="#" className="hover:text-slate-300 transition-colors">Especificaciones Técnicas</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
