import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText, CheckCircle2, ArrowLeft } from 'lucide-react';

interface PrivacyPageProps {
  onBackToHome: () => void;
}

export default function PrivacyPage({ onBackToHome }: PrivacyPageProps) {
  const sections = [
    {
      icon: Shield,
      title: '1. Responsable del Tratamiento',
      content: 'El responsable del tratamiento de sus datos personales es Fideicomiso Portal del Bosque / Inmobiliaria Portal del Bosque, S.A.S., con domicilio social en Av. de las Ceibas No. 42, Jardines de la Reserva, Santo Domingo, República Dominicana. Correo de contacto: info@portaldelbosque.com.do.'
    },
    {
      icon: Eye,
      title: '2. Datos que Recopilamos',
      content: 'Recopilamos información de identificación personal y preferencias inmobiliarias cuando interactúa con nuestro visualizador o se pone en contacto con nosotros. Esto incluye: nombre completo, dirección de correo electrónico, número de teléfono (WhatsApp), así como el tipo de apartamento, torre, nivel y distribución de interés.'
    },
    {
      icon: FileText,
      title: '3. Finalidad del Tratamiento',
      content: 'Tratamos sus datos para las siguientes finalidades: (a) Facilitar información detallada y enviar el dossier de especificaciones de materiales y acabados; (b) Coordinar visitas guiadas a la obra o sala de ventas; (c) Gestionar solicitudes de pre-reserva de unidades de apartamentos; y (d) Informar sobre los beneficios fiscales de exención de impuestos bajo la Ley de Fomento al Desarrollo Turístico (CONFOTUR).'
    },
    {
      icon: Lock,
      title: '4. Compartición y Destinatarios de los Datos',
      content: 'Sus datos no serán cedidos a terceros, salvo a las entidades indispensables para la gestión y formalización de su adquisición: la Fiduciaria Dominicana encargada de la administración de los fondos de preventa, las entidades financieras de su elección para evaluación crediticia, o las autoridades fiscales competentes en el marco de la Ley CONFOTUR.'
    },
    {
      icon: CheckCircle2,
      title: '5. Sus Derechos (ARCO)',
      content: 'Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales en cualquier momento. Para ejercer estos derechos, puede enviar una solicitud por escrito acompañada de una copia de su documento de identidad a info@portaldelbosque.com.do.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      {/* Botón de retroceso */}
      <button
        onClick={onBackToHome}
        className="group flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-950 transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Volver a la Página Principal
      </button>

      {/* Título de la página */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center justify-center p-2.5 bg-slate-100 text-slate-900 border border-slate-200 mb-2">
          <Shield className="h-6 w-6 stroke-[1.5]" />
        </div>
        <h2 className="font-sans text-3xl sm:text-4xl font-light tracking-tight text-slate-950">
          Política de Privacidad y Términos
        </h2>
        <p className="font-sans text-sm text-slate-500 font-light leading-relaxed max-w-2xl">
          De conformidad con las regulaciones de protección de datos personales de la República Dominicana, esta política detalla el uso ético y transparente de la información que nos suministra sobre el proyecto residencial.
        </p>
      </div>

      <hr className="border-slate-200" />

      {/* Secciones de la política */}
      <div className="space-y-8">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex gap-4 p-6 border border-slate-200/80 bg-white hover:border-slate-950 transition-all"
            >
              <div className="h-10 w-10 bg-slate-50 border border-slate-250 flex items-center justify-center text-slate-800 shrink-0">
                <Icon className="h-5 w-5 stroke-[1.2]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-sans text-sm font-bold text-slate-900 uppercase tracking-wider">
                  {section.title}
                </h3>
                <p className="font-sans text-xs text-slate-600 font-light leading-relaxed">
                  {section.content}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cláusula adicional */}
      <div className="p-6 bg-slate-50 border border-slate-200 text-center font-sans text-xs text-slate-500 leading-relaxed font-light">
        Última actualización: 10 de julio de 2026. Esta declaración de privacidad se rige estrictamente por la legislación vigente de la República Dominicana.
      </div>
    </div>
  );
}
