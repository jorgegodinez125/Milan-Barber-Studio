# Milán Barber Studio — Sitio web

Landing page estática para barbería con concepto barra libre: inicio, la casa, galería, servicios, testimonios y reservas por WhatsApp.

**Dominio:** MilanBarberStudio.com

## Cómo ver el sitio

Abre `index.html` en el navegador (o sírvelo con `python -m http.server`).
`barberia.html` redirige a `index.html` para enlaces antiguos.

## Estructura

```
index.html
css/styles.css               ← todos los estilos (paleta en :root, al inicio)
js/main.js                   ← menú, galería, visor de fotos y animaciones
js/galeria-config.js         ← lista de fotos de la galería
assets/images/               ← foto principal (hero) e imagen para redes (og.jpg)
assets/images/galeria/       ← fotos de cortes (.jpg originales + .webp optimizadas)
tools/optimizar-imagenes.py  ← genera las versiones .webp ligeras
```

## Personalizar

- **Galería:** guarda la foto en `assets/images/galeria/`, ejecuta `python tools/optimizar-imagenes.py` y agrega una línea en `js/galeria-config.js` apuntando al `.webp`.
- **WhatsApp / teléfono:** busca `526671234567` en `index.html` (y `+52 667 123 4567` en el bloque de datos estructurados).
- **Precio:** busca `Consultar` en la sección de servicios.
- **Redes sociales:** reemplaza los `href="#"` del footer.
- **Colores:** variables `--gold`, `--ink`, `--ivory` en `css/styles.css`.

## Tecnologías

HTML, CSS y JavaScript vanilla (sin build ni dependencias).
