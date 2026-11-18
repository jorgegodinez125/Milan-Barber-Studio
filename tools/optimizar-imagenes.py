"""
Optimiza las fotos de la galería: crea una versión .webp ligera junto a cada .jpg/.png.

Uso (desde la raíz del proyecto):
    python tools/optimizar-imagenes.py

Requiere Pillow:  pip install pillow
"""
from pathlib import Path
from PIL import Image, ImageOps

CARPETA = Path(__file__).resolve().parent.parent / "assets" / "images" / "galeria"
ANCHO_MAX = 1200
CALIDAD = 80

for origen in sorted(CARPETA.iterdir()):
    if origen.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
        continue
    destino = origen.with_suffix(".webp")
    with Image.open(origen) as im:
        im = ImageOps.exif_transpose(im).convert("RGB")
        im.thumbnail((ANCHO_MAX, ANCHO_MAX * 2), Image.LANCZOS)
        im.save(destino, "WEBP", quality=CALIDAD, method=6)
    print(f"{origen.name} ({origen.stat().st_size // 1024} KB) -> {destino.name} ({destino.stat().st_size // 1024} KB)")
