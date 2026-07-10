import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigateToProjects: () => void;
}

export default function HomePage({ onNavigateToProjects }: HomePageProps) {
  return (
    <div className="flex flex-col min-h-[80vh] justify-between">
      {/* Hero Header Area */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden py-24 px-6 text-center">
        {/* Subtle architectural background accent grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-4xl sm:text-6xl font-light tracking-tight text-slate-950 leading-[1.1]"
          >
            Visualiza tu próximo hogar desde la comodidad de tu casa
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-light leading-relaxed"
          >
            En una experiencia interactiva sin la necesidad de salir del hogar, donde podras apreciar cada detalle de tu proximo hogar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <button
              onClick={onNavigateToProjects}
              className="group inline-flex items-center gap-2.5 bg-slate-900 hover:bg-slate-950 text-slate-50 text-xs font-sans font-bold uppercase tracking-widest px-6 py-4 transition-all cursor-pointer shadow-md"
            >
              <span>Ver Nuestros Proyectos</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
