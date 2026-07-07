import { ApartmentStatus } from '../types';

/**
 * Formatea un valor numérico en una cadena de precio en dólares americanos (USD).
 * Ejemplo: 150000 -> "$150,000"
 * 
 * @param price - El precio numérico a formatear
 * @returns El precio formateado como string
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Devuelve las clases CSS correspondientes para el indicador visual según el estado del apartamento.
 * 
 * @param status - El estado actual del apartamento ('disponible', 'reservado', 'vendido')
 * @returns Clases CSS de color de fondo y borde para Tailwind
 */
export const getStatusColorClass = (status: ApartmentStatus): string => {
  switch (status) {
    case 'disponible':
      return 'bg-emerald-500 border-emerald-200';
    case 'reservado':
      return 'bg-amber-500 border-amber-200';
    case 'vendido':
      return 'bg-stone-400 border-stone-200';
    default:
      return '';
  }
};

/**
 * Devuelve el texto en español para mostrar al usuario según el estado del apartamento.
 * 
 * @param status - El estado del apartamento
 * @returns Descripción legible para el usuario
 */
export const getStatusTextTranslation = (status: ApartmentStatus): string => {
  switch (status) {
    case 'disponible':
      return 'Disponible';
    case 'reservado':
      return 'Reservado';
    case 'vendido':
      return 'No disponible';
    default:
      return '';
  }
};

/**
 * Obtiene el nombre del bloque/torre (ej. 'Bloque A') a partir del nombre completo del apartamento.
 * Ejemplo: "Apto 101 - Bloque A" -> "Bloque A"
 * 
 * @param name - Nombre del apartamento
 * @returns Nombre de la torre
 */
export const getTowerFromApartmentName = (name: string): string => {
  return name.split(' - ')[1] || 'Bloque A';
};

/**
 * Realiza un scroll suave hacia el contenedor interactivo principal de la aplicación.
 */
export const scrollToInteractiveContainer = (): void => {
  const element = document.getElementById('main-interactive-container');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
