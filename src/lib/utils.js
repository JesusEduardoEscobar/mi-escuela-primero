/**
 * Combina nombres de clases de manera condicional
 * Esta función es útil para aplicar clases CSS condicionalmente,
 * especialmente cuando se trabaja con Tailwind CSS
 * 
 * @param {...string} classes - Las clases CSS a combinar
 * @returns {string} - Una cadena con todas las clases válidas combinadas
 * 
 * Ejemplos de uso:
 * cn('text-red-500', true && 'bg-blue-500', false && 'text-green-500')
 * // Resultado: 'text-red-500 bg-blue-500'
 * 
 * cn('p-4', isActive ? 'bg-blue-500' : 'bg-gray-200')
 * // Resultado si isActive es true: 'p-4 bg-blue-500'
 * // Resultado si isActive es false: 'p-4 bg-gray-200'
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formatea una fecha en un formato legible
 * 
 * @param {Date|string} date - La fecha a formatear
 * @param {Object} options - Opciones de formato
 * @returns {string} - La fecha formateada
 */
export function formatDate(date, options = {}) {
  const dateObj = date instanceof Date ? date : new Date(date);
  
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...options
  }).format(dateObj);
}

/**
 * Trunca un texto si excede la longitud máxima
 * 
 * @param {string} text - El texto a truncar
 * @param {number} maxLength - La longitud máxima
 * @returns {string} - El texto truncado
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Genera un ID único
 * 
 * @returns {string} - Un ID único
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Capitaliza la primera letra de cada palabra en un texto
 * 
 * @param {string} text - El texto a capitalizar
 * @returns {string} - El texto con la primera letra de cada palabra en mayúscula
 */
export function capitalizeWords(text) {
  if (!text) return '';
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Formatea un número de teléfono
 * 
 * @param {string} phone - El número de teléfono a formatear
 * @returns {string} - El número de teléfono formateado
 */
export function formatPhoneNumber(phone) {
  if (!phone) return '';
  
  // Elimina todos los caracteres no numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  // Aplica el formato XXX-XXX-XXXX
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  
  return phone;
}

/**
 * Valida una dirección de correo electrónico
 * 
 * @param {string} email - El correo electrónico a validar
 * @returns {boolean} - true si el correo es válido, false en caso contrario
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}