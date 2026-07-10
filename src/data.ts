import { Apartment } from './types';

// Import our generated images so Vite can resolve them correctly
import residentialAerial from './assets/images/residential_aerial_1782609608029.jpg';
import roomLiving from './assets/images/room_living_1782609619534.jpg';
import roomKitchen from './assets/images/room_kitchen_1782609632695.jpg';
import roomBedroom from './assets/images/room_bedroom_1782609644801.jpg';
import roomBathroom from './assets/images/room_bathroom_1782609658083.jpg';
import roomTerrace from './assets/images/room_terrace_1782609671526.jpg';

export const RESIDENTIAL_IMAGES = {
  aerial: residentialAerial,
  living: roomLiving,
  kitchen: roomKitchen,
  bedroom: roomBedroom,
  bathroom: roomBathroom,
  terrace: roomTerrace,
};

export const APARTMENTS: Apartment[] = [
  {
    id: 'apt-101',
    name: 'Apartamento 101 - Bloque A',
    model: 'Terraza Garden',
    price: 185000,
    area: 125,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    floor: 1,
    status: 'disponible',
    mapCoords: { x: 28, y: 58 },
    polygonPoints: '20,45 36,45 36,70 20,70',
    description: 'Exclusivo apartamento en planta baja con un espectacular jardín privado de 40m² y acceso directo a las zonas verdes y piscina del residencial. Perfecto para quienes valoran la comodidad de un primer piso con espacio exterior propio.',
    highlights: [
      'Jardín privado de 40m²',
      'Acceso directo a piscina',
      'Cocina abierta integrada',
      'Habitación principal con baño en suite',
      'Acabados en mármol y madera noble'
    ],
    floorPlanType: 'garden',
    hotspots: [
      {
        id: '101-living',
        name: 'Sala Familiar',
        x: 40,
        y: 65,
        imageSrc: roomLiving,
        description: 'Amplia sala de estar con espectaculares ventanales de piso a techo que integran el jardín exterior con el espacio de convivencia familiar.'
      },
      {
        id: '101-kitchen',
        name: 'Cocina de Autor',
        x: 40,
        y: 35,
        imageSrc: roomKitchen,
        description: 'Cocina minimalista de concepto abierto con isla central, equipada con electrodomésticos empotrados y encimeras de mármol blanco italiano.'
      },
      {
        id: '101-bedroom',
        name: 'Habitación Principal',
        x: 75,
        y: 35,
        imageSrc: roomBedroom,
        description: 'Un santuario de descanso con vestidor incorporado, iluminación cálida empotrada y vistas serenas al jardín privado.'
      },
      {
        id: '101-bathroom',
        name: 'Baño Principal',
        x: 75,
        y: 65,
        imageSrc: roomBathroom,
        description: 'Baño de lujo con revestimiento de mármol de Carrara, ducha tipo lluvia con mampara de cristal templado y grifería negro mate.'
      },
      {
        id: '101-terrace',
        name: 'Terraza / Jardín',
        x: 12,
        y: 50,
        imageSrc: roomTerrace,
        description: 'Área exterior de descanso ideal para barbacoas, cenas al aire libre y relajación, rodeada de abundante vegetación natural.'
      }
    ]
  },
  {
    id: 'apt-201',
    name: 'Apartamento 201 - Bloque A',
    model: 'Family Horizon',
    price: 260000,
    area: 175,
    bedrooms: 3,
    bathrooms: 2.5,
    parking: 2,
    floor: 2,
    status: 'disponible',
    mapCoords: { x: 28, y: 38 },
    polygonPoints: '20,20 36,20 36,44 20,44',
    description: 'Magnífico apartamento familiar en segundo nivel con una impresionante vista panorámica hacia el bosque circundante. Cuenta con una gran terraza perimetral y un estudio de trabajo independiente.',
    highlights: [
      'Amplia terraza perimetral',
      'Estudio / Family Room independiente',
      '2 puestos de estacionamiento techados',
      'Área de lavado y cuarto de servicio',
      'Ventilación cruzada natural'
    ],
    floorPlanType: 'family',
    hotspots: [
      {
        id: '201-living',
        name: 'Gran Salón',
        x: 50,
        y: 55,
        imageSrc: roomLiving,
        description: 'Espacioso salón social con altura y media, óptimo para reuniones familiares y entretenimiento, conectado de forma fluida a la terraza.'
      },
      {
        id: '201-kitchen',
        name: 'Cocina Familiar',
        x: 20,
        y: 30,
        imageSrc: roomKitchen,
        description: 'Cocina de gran tamaño con despensa, barra desayunadora y acabados de última generación en melamina texturizada.'
      },
      {
        id: '201-bedroom',
        name: 'Dormitorio Principal',
        x: 80,
        y: 30,
        imageSrc: roomBedroom,
        description: 'Dormitorio master con ventanales de esquina, walk-in closet doble y un ambiente de máxima relajación.'
      },
      {
        id: '201-bathroom',
        name: 'Baño Master',
        x: 80,
        y: 75,
        imageSrc: roomBathroom,
        description: 'Sanitario principal equipado con doble lavamanos, bañera exenta y acabados en piedra natural pulida.'
      },
      {
        id: '201-terrace',
        name: 'Terraza Panorámica',
        x: 50,
        y: 15,
        imageSrc: roomTerrace,
        description: 'Terraza techada con barandas de vidrio de seguridad que ofrece vistas ininterrumpidas a las copas de los árboles de la reserva forestal.'
      }
    ]
  },
  {
    id: 'apt-102',
    name: 'Apartamento 102 - Bloque B',
    model: 'Vista Loft',
    price: 145000,
    area: 95,
    bedrooms: 1,
    bathrooms: 1.5,
    parking: 1,
    floor: 1,
    status: 'disponible',
    mapCoords: { x: 50, y: 55 },
    polygonPoints: '42,40 58,40 58,65 42,65',
    description: 'Increíble loft de doble altura perfecto para profesionales o parejas modernas. El diseño abierto maximiza la luz natural y el espacio, creando un ambiente residencial contemporáneo e industrial-chic.',
    highlights: [
      'Doble altura en zona social',
      'Cocina de concepto integrado ultra moderno',
      'Medio baño de visitas en primer nivel',
      'Dormitorio tipo mezanine en segundo nivel',
      'Espacio optimizado para teletrabajo'
    ],
    floorPlanType: 'loft',
    hotspots: [
      {
        id: '102-living',
        name: 'Salón de Doble Altura',
        x: 50,
        y: 70,
        imageSrc: roomLiving,
        description: 'Impresionante salón con techos de 5 metros de altura que otorgan una sensación de amplitud y libertad espacial única.'
      },
      {
        id: '102-kitchen',
        name: 'Kitchenette Minimalista',
        x: 25,
        y: 55,
        imageSrc: roomKitchen,
        description: 'Cocina de diseño limpio y funcional integrada en el salón, ideal para un estilo de vida dinámico.'
      },
      {
        id: '102-bedroom',
        name: 'Mezanine Suite',
        x: 50,
        y: 30,
        imageSrc: roomBedroom,
        description: 'Ubicada en el segundo nivel del loft, ofrece privacidad visual sin perder la conexión con la amplitud arquitectónica.'
      },
      {
        id: '102-bathroom',
        name: 'Baño de la Suite',
        x: 80,
        y: 30,
        imageSrc: roomBathroom,
        description: 'Elegante y compacto cuarto de baño con sanitarios suspendidos y ducha con hornacina para accesorios.'
      }
    ]
  },
  {
    id: 'apt-302',
    name: 'Apartamento 302 - Bloque B',
    model: 'Penthouse Celestial',
    price: 420000,
    area: 240,
    bedrooms: 3,
    bathrooms: 3.5,
    parking: 3,
    floor: 3,
    status: 'disponible',
    mapCoords: { x: 50, y: 30 },
    polygonPoints: '42,15 58,15 58,38 42,38',
    description: 'La joya del residencial. Un penthouse de lujo supremo distribuido en dos niveles, coronado por un impresionante rooftop privado con plunge pool y cocina exterior. Ofrece vistas de 360 grados de todo el valle.',
    highlights: [
      'Rooftop privado de 80m²',
      'Piscina de inmersión (plunge pool)',
      'Cocina exterior en terraza',
      'Tres amplias suites con baños privados',
      'Tres espacios de aparcamiento'
    ],
    floorPlanType: 'penthouse',
    hotspots: [
      {
        id: '302-living',
        name: 'Salón Principal',
        x: 45,
        y: 60,
        imageSrc: roomLiving,
        description: 'Salón de lujo con carpintería a medida, aire acondicionado central invisible y puertas correderas de cristal de gran formato.'
      },
      {
        id: '302-kitchen',
        name: 'Cocina Gourmet Profesional',
        x: 20,
        y: 45,
        imageSrc: roomKitchen,
        description: 'Cocina premium equipada con encimeras de cuarzo, vinoteca, herrajes de amortiguación Blum y despensa de gran capacidad.'
      },
      {
        id: '302-bedroom',
        name: 'Master Suite Celestial',
        x: 80,
        y: 45,
        imageSrc: roomBedroom,
        description: 'El dormitorio principal definitivo. Espacio para cama King, sala de lectura integrada, acceso a balcón privado y un imponente vestidor.'
      },
      {
        id: '302-bathroom',
        name: 'Baño Spa',
        x: 80,
        y: 80,
        imageSrc: roomBathroom,
        description: 'Baño diseñado como un templo de relajación, con tina exenta iluminada, lavabos de mármol tallado y grifería termostática.'
      },
      {
        id: '302-terrace',
        name: 'Rooftop & Plunge Pool',
        x: 45,
        y: 20,
        imageSrc: roomTerrace,
        description: 'Terraza superior al aire libre equipada con camastros, comedor exterior y una piscina climatizada con vistas estelares.'
      }
    ]
  },
  {
    id: 'apt-103',
    name: 'Apartamento 103 - Bloque C',
    model: 'Terraza Garden',
    price: 180000,
    area: 120,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    floor: 1,
    status: 'reservado',
    mapCoords: { x: 72, y: 65 },
    polygonPoints: '64,52 80,52 80,78 64,78',
    description: 'Preciosa opción de planta baja con jardín privado. Excelente orientación que permite disfrutar del sol de la mañana y de una temperatura fresca por la tarde.',
    highlights: [
      'Jardín privado de 35m²',
      'Excelente orientación solar',
      'Habitaciones con armarios empotrados',
      'Seguridad privada las 24 horas',
      'Excelente rentabilidad para inversores'
    ],
    floorPlanType: 'garden',
    hotspots: [
      {
        id: '103-living',
        name: 'Sala / Comedor',
        x: 40,
        y: 65,
        imageSrc: roomLiving,
        description: 'Área social acogedora con perfecta entrada de luz matutina que ilumina de forma homogénea todo el salón.'
      },
      {
        id: '103-kitchen',
        name: 'Cocina Moderna',
        x: 40,
        y: 35,
        imageSrc: roomKitchen,
        description: 'Elegante cocina de diseño europeo, dotada de excelentes soluciones de almacenamiento vertical.'
      },
      {
        id: '103-bedroom',
        name: 'Suite Secundaria',
        x: 75,
        y: 35,
        imageSrc: roomBedroom,
        description: 'Espacioso dormitorio que acomoda dos camas o una de tamaño matrimonial, con luz natural abundante.'
      },
      {
        id: '103-bathroom',
        name: 'Baño Elegante',
        x: 75,
        y: 65,
        imageSrc: roomBathroom,
        description: 'Baño completo con mampara de vidrio translúcido y lavamanos sobre encimera de piedra volcánica.'
      },
      {
        id: '103-terrace',
        name: 'Jardín con Cubierta',
        x: 12,
        y: 50,
        imageSrc: roomTerrace,
        description: 'Área exterior techada con porche de madera y césped natural, ideal para disfrutar de momentos de lectura.'
      }
    ]
  },
  {
    id: 'apt-203',
    name: 'Apartamento 203 - Bloque C',
    model: 'Family Horizon',
    price: 255000,
    area: 170,
    bedrooms: 3,
    bathrooms: 2.5,
    parking: 2,
    floor: 2,
    status: 'disponible',
    mapCoords: { x: 72, y: 44 },
    polygonPoints: '64,28 80,28 80,50 64,50',
    description: 'Increíble y amplio piso familiar en el Bloque C. Cuenta con una gran distribución interna donde las habitaciones quedan totalmente separadas del salón social para mayor privacidad y descanso.',
    highlights: [
      'Distribución óptima de estancias',
      'Gran balcón exterior panorámico',
      'Habitación principal con amplio walk-in closet',
      'Instalaciones pre-cableadas para domótica',
      'Cerca al sendero peatonal del residencial'
    ],
    floorPlanType: 'family',
    hotspots: [
      {
        id: '203-living',
        name: 'Salón Familiar',
        x: 50,
        y: 55,
        imageSrc: roomLiving,
        description: 'Un espacioso salón familiar perfecto para tardes de cine o reuniones sociales, amparado por amplios balcones.'
      },
      {
        id: '203-kitchen',
        name: 'Cocina de Concepto Abierto',
        x: 20,
        y: 30,
        imageSrc: roomKitchen,
        description: 'Moderna cocina con isla de granito, ideal para desayunar o cocinar interactivamente con invitados.'
      },
      {
        id: '203-bedroom',
        name: 'Dormitorio Principal',
        x: 80,
        y: 30,
        imageSrc: roomBedroom,
        description: 'Master suite silenciosa y orientada hacia el atardecer, garantizando un descanso placentero y fresco.'
      },
      {
        id: '203-bathroom',
        name: 'Baño Completo',
        x: 80,
        y: 75,
        imageSrc: roomBathroom,
        description: 'Baño de diseño italiano con plato de ducha extraplano de resina mineral antideslizante.'
      },
      {
        id: '203-terrace',
        name: 'Balcón Privado',
        x: 50,
        y: 15,
        imageSrc: roomTerrace,
        description: 'Estupendo balcón alargado que permite colocar mesas auxiliares o plantas decorativas medianas.'
      }
    ]
  }
];

