import { Trees } from 'lucide-react';
import { RESIDENTIAL_IMAGES } from '../data';

interface ProjectsPageProps {
  onSelectProject: (projectId: string) => void;
}

export default function ProjectsPage({ onSelectProject }: ProjectsPageProps) {
  const projects = [
    {
      id: 'inmuebles-a-tu-alcance',
      name: 'Inmuebles a tu alcance',
      location: 'Santo Domingo, RD',
      tagline: 'Residencias de Lujo Boutique',
      description: 'Un desarrollo residencial de alta gama diseñado para fusionar la arquitectura moderna de bajo impacto con un entorno natural boscoso protegido. Espacios pensados para el bienestar, la elegancia y la durabilidad.',
      image: RESIDENTIAL_IMAGES.aerial,
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="font-mono text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
          Nuestros Desarrollos
        </span>
        <h2 className="font-sans text-3xl sm:text-4xl font-light tracking-tight text-slate-950">
          Proyectos Residenciales
        </h2>
        <p className="font-sans text-sm text-slate-500 font-light leading-relaxed">
          Explora nuestros desarrollos inmobiliarios boutique. Diseños arquitectónicos exclusivos concebidos para convivir en armonía con la naturaleza.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col bg-white border border-slate-200 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            {/* Project Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-slate-950/70 border border-white/10 px-3 py-1 text-[10px] font-mono tracking-wider text-white uppercase">
                {project.location}
              </div>
            </div>

            {/* Project Info */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="font-mono text-[9px] tracking-[0.25em] text-emerald-600 font-bold uppercase block">
                  {project.tagline}
                </span>
                <h3 className="font-sans text-2xl font-light text-slate-950">
                  {project.name}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-500 font-light leading-relaxed text-justify">
                  {project.description}
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => onSelectProject(project.id)}
                className="w-full bg-slate-900 hover:bg-slate-950 text-slate-50 text-xs font-sans font-bold uppercase tracking-widest py-3.5 transition-all cursor-pointer text-center"
              >
                Explorar Proyecto Interactivo
              </button>
            </div>
          </div>
        ))}

        {/* Placeholder for Next Project */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 p-8 text-center bg-slate-50/50">
          <div className="h-12 w-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mb-4">
            <Trees className="h-6 w-6 stroke-[1.2]" />
          </div>
          <h4 className="font-sans text-sm font-bold text-slate-700 uppercase tracking-widest">Próximamente</h4>
          <p className="font-sans text-xs text-slate-400 font-light mt-1.5 max-w-xs">
            Nuevas localizaciones exclusivas en fases de diseño y conceptualización ecológica.
          </p>
        </div>
      </div>
    </div>
  );
}
