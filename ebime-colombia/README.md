# EBIME Colombia — Sitio corporativo

Sitio web de EBIME Colombia: dispositivos de acceso vascular para instituciones de salud. Multi-página, un solo despliegue estático.

## Páginas

- **Inicio** — presentación, portafolio, servicios y datos de la empresa.
- **Productos** — las 5 familias (CVC, PICC, CHD, CDP, PVQ) con formato de tarjeta y detalle de referencias.
- **Servicios** — suministro, formación clínica, acompañamiento e indicadores.
- **Nosotros** — quiénes somos, misión, visión y valores.
- **Contacto** — formulario y datos de contacto.

## Subir a GitHub Pages

### Sin consola (desde la web)

1. Crea un repositorio nuevo en GitHub, por ejemplo `ebime-colombia`.
2. En el repo → **Add file → Upload files**.
3. Arrastra TODOS los archivos de esta carpeta (incluido `.nojekyll`; si el navegador no deja arrastrarlo, créalo con **Add file → Create new file**, nombre `.nojekyll`, contenido vacío).
4. **Commit changes**.
5. **Settings → Pages → Deploy from a branch → Branch: main / (root) → Save**.
6. En 1–2 minutos queda en `https://<tu-usuario>.github.io/ebime-colombia/`.

### Con consola

```bash
cd ebime-colombia
git init
git add .
git commit -m "EBIME Colombia: sitio corporativo"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/ebime-colombia.git
git push -u origin main
```

Luego activa Pages en **Settings → Pages** igual que arriba.

## Dominio propio (opcional)

Para publicarlo en un dominio como `www.ebime.co` o similar:

1. En tu DNS crea un CNAME: `www` → `<tu-usuario>.github.io`.
2. **Settings → Pages → Custom domain** → escribe tu dominio → guarda.
3. Marca **Enforce HTTPS** cuando el certificado esté listo.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Punto de entrada. |
| `styles.css` | Estilos, con la paleta del manual de marca. |
| `app.js` | Navegación, vistas y lógica. |
| `data.js` | Contenido: productos, referencias, servicios, contacto. |
| `images.js` | Fotos de los productos embebidas (base64). |
| `favicon.png`, `og.jpg` | Ícono y vista previa al compartir. |
| `logo_*.png`, `prod-*.jpg` | Copias sueltas de los logos y fotos, por si quieres editarlas. El sitio ya las tiene embebidas en `images.js`. |

## Cómo editar el contenido

Todo el contenido vive en `data.js`. Para cambiar un texto, una referencia o un dato de contacto, edita ese archivo. Para cambiar una foto de producto:

1. Reemplaza el archivo `prod-<familia>.jpg` (mismo nombre).
2. Vuelve a generar el base64 dentro de `images.js`, o pídeme que lo haga.

## Notas

- El botón "Ir a Plataforma clínica de acceso vascular" enlaza a `https://eblab.ebime.com.mx/`.
- Las métricas del inicio (+15 años, +120 instituciones, etc.) son de ejemplo: ajústalas en `data.js` (`STATS`) o pídeme que las cambie.
