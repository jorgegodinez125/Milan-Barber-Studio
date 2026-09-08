(function () {
  const container = document.getElementById('galeriaCinta');
  const photos = window.GALLERY_PHOTOS;

  if (!container || !Array.isArray(photos) || photos.length === 0) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const track = document.createElement('div');
  track.className = 'galeria-cinta-track';

  function createItem(photo) {
    const item = document.createElement('article');
    item.className = 'galeria-cinta-item';

    const img = document.createElement('img');
    img.className = 'galeria-cinta-img';
    img.src = photo.src;
    img.alt = photo.alt || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    item.appendChild(img);

    if (photo.label) {
      const overlay = document.createElement('div');
      overlay.className = 'galeria-cinta-overlay';
      const label = document.createElement('span');
      label.textContent = photo.label;
      overlay.appendChild(label);
      item.appendChild(overlay);
    }

    return item;
  }

  if (reducedMotion) {
    container.classList.add('galeria-cinta--static');
    photos.forEach((photo) => track.appendChild(createItem(photo)));
  } else {
    for (let i = 0; i < 2; i += 1) {
      photos.forEach((photo) => track.appendChild(createItem(photo)));
    }
    const duration = Math.max(photos.length * 5, 25);
    track.style.setProperty('--cinta-duration', `${duration}s`);
  }

  container.appendChild(track);
})();
