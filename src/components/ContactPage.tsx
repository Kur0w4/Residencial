import { Phone, Mail, MapPin, Instagram, Facebook, ArrowUpRight } from 'lucide-react';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono de Ventas',
      value: '+1 (809) 555-0195',
      href: 'tel:+18095550195',
    },
    {
      icon: Mail,
      title: 'Correo Electrónico',
      value: 'info@inmueblesatualcance.com',
      href: 'mailto:info@inmueblesatualcance.com',
    },
    {
      icon: MapPin,
      title: 'Oficina de Ventas',
      value: 'Av. de las Ceibas No. 42, Jardines de la Reserva. Santo Domingo, RD.',
      href: '#',
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: 'Instagram',
      handle: '@inmueblesatualcance.rd',
      href: 'https://instagram.com',
    },
    {
      icon: Facebook,
      name: 'Facebook',
      handle: 'Inmuebles a tu alcance Residencias',
      href: 'https://facebook.com',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      {/* Intro */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="font-mono text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
          Asesoría Inmobiliaria
        </span>
        <h2 className="font-sans text-3xl sm:text-4xl font-light tracking-tight text-slate-950">
          Contáctanos
        </h2>
        <p className="font-sans text-sm text-slate-500 font-light leading-relaxed">
          Programa una visita de inspección o solicita un dossier detallado con especificaciones de materiales y terminaciones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="font-sans text-lg font-bold text-slate-900 uppercase tracking-widest">
            Información Directa
          </h3>
          <div className="space-y-4">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <a
                  key={i}
                  href={info.href}
                  className="flex items-start gap-4 p-4 border border-slate-200/80 bg-white hover:border-slate-950 transition-all group"
                >
                  <div className="h-10 w-10 bg-slate-50 border border-slate-200/50 flex items-center justify-center text-slate-700 shrink-0">
                    <Icon className="h-5 w-5 stroke-[1.2]" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                      {info.title}
                    </span>
                    <span className="font-sans text-xs sm:text-sm text-slate-900 font-semibold group-hover:text-slate-800 transition-colors">
                      {info.value}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Social Networks */}
        <div className="space-y-6">
          <h3 className="font-sans text-lg font-bold text-slate-900 uppercase tracking-widest">
            Redes Sociales
          </h3>
          <div className="space-y-4">
            {socialLinks.map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 border border-slate-200/80 bg-white hover:border-slate-950 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-50 border border-slate-200/50 flex items-center justify-center text-slate-750">
                      <Icon className="h-5 w-5 stroke-[1.2]" />
                    </div>
                    <div>
                      <span className="block font-sans text-xs font-bold text-slate-900">{social.name}</span>
                      <span className="font-mono text-[9px] text-slate-400">{social.handle}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
