/**
 * Galería — agrega fotos aquí (una línea por imagen).
 *
 * 1. Guarda la foto en assets/images/galeria/  (ej. mi-corte.jpg)
 * 2. Ejecuta:  python tools/optimizar-imagenes.py   → crea mi-corte.webp (ligera)
 * 3. Agrega una línea abajo apuntando al .webp
 *
 * Las primeras dos fotos de cada grupo de cinco se muestran grandes.
 */
window.GALLERY_PHOTOS = [
  { src: 'assets/images/galeria/barba-corte.webp',     alt: 'Corte con barba perfilada',           label: 'Barba & Corte' },
  { src: 'assets/images/galeria/diseno-premium.webp',  alt: 'Diseño de líneas a mano sobre fade', label: 'Diseño Premium' },
  { src: 'assets/images/galeria/skin-fade.webp',       alt: 'Skin fade visto desde atrás',         label: 'Skin Fade' },
  { src: 'assets/images/galeria/textura-moderna.webp', alt: 'Corte con textura moderna',           label: 'Textura Moderna' },
  { src: 'assets/images/galeria/fade-clasico.webp',    alt: 'Fade clásico con barba',              label: 'Fade Clásico' },
];
