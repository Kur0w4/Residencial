import { Trees, Mail, Phone, MapPin, Shield, CheckCircle } from 'lucide-react';

export default function Footer() {
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
                  PORTAL DEL BOSQUE
                </span>
                <span className="block font-mono text-[8px] tracking-[0.2em] text-slate-400 uppercase font-semibold">
                  Real Estate Residences
                </span>
              </div>
            </div>
            <p className="max-w-md font-sans text-xs leading-relaxed text-slate-300">
              Un desarrollo residencial de alta gama diseñado para fusionar la arquitectura moderna de bajo impacto con un entorno natural boscoso protegido. Espacios pensados para el bienestar, la elegancia y la durabilidad.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[10px] font-sans text-slate-400">
              <Shield className="h-4 w-4 text-emerald-500" />
              <span>Proyecto con certificación internacional de sostenibilidad LEED.</span>
            </div>
          </div>

          {/* Quick Info */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold tracking-widest text-white uppercase">
              Ubicación & Ventas
            </h4>
            <ul className="space-y-3 font-sans text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Av. de las Ceibas No. 42, Jardines de la Reserva. Santo Domingo, RD.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-slate-500" />
                <span>+1 (809) 555-0195</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-slate-500" />
                <span>info@portaldelbosque.com.do</span>
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
          <p>© {currentYear} Portal del Bosque S.R.L. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Términos de Privacidad</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Especificaciones Técnicas</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
