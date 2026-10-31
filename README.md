# Chicago Bulls · Haxball Club

Sitio web del club **Chicago Bulls** de Haxball. Es un sitio estático multipágina (HTML, CSS y JavaScript puro, sin backend ni dependencias): todo el contenido se edita desde un solo archivo, `js/data.js`.

## Contenido

- **Inicio** (`index.html`): presentación del club, las cinco divisiones y accesos rápidos.
- **Categorías** (`categorias.html`): selector de D1 a D5 con foto oficial de cada plantilla.
- **Plantillas** (`d1.html` a `d5.html`): jugadores clickeables, buscador, fichas emergentes con estadísticas y foto grupal.
- **Cuerpo técnico** (`dt.html`): directores técnicos del club, con acceso a la ficha de los que también juegan.
- **Fixture** (`fixture.html`): calendario mensual, reloj en vivo y horarios en la zona local del visitante.
- **Stats** (`stats.html`): tabla de PJ, goles, asistencias y vallas invictas (CS), con filtros y ordenamiento.
- **Resultados** (`resultados.html`): todos los resultados en una sola lista, filtrables por división.
- **Museo** (`museo.html`): palmarés colectivo y premios individuales.

Divisiones: D1 Chicago Bulls, D2 Windy City Bulls, D3 Bulls Academy, D4 Dynasty 96 y D5 The Madhouse. Fundador del club: **satan**. El proyecto compite al nivel de **HaxCol** y **American Futsal (AF)**. Plantillas actuales: 68 jugadores (D1 13, D2 13, D3 15, D4 14 y D5 13) y 7 directores técnicos.

## Cómo abrir el sitio

La forma más simple es hacer doble clic en `index.html`. Para una experiencia idéntica a producción (rutas, `sessionStorage` y fuentes), conviene servirlo con un servidor local:

```bash
# Opción 1: Python
python -m http.server 4173

# Opción 2: Node
npx serve .
```

Luego abrir `http://localhost:4173`.

## Estructura de archivos

```
.
├── index.html            Inicio
├── categorias.html       Selector de divisiones
├── d1.html … d5.html     Plantillas por división
├── dt.html               Cuerpo técnico
├── fixture.html          Calendario
├── stats.html            Estadísticas
├── resultados.html       Resultados
├── museo.html            Palmarés
├── css/
│   ├── base.css          Variables, reset, loader, header y footer
│   ├── pages.css         Inicio, categorías, equipos, staff y foto grupal
│   ├── components.css    Fixture, stats, resultados, museo y estados vacíos
│   └── responsive.css    Ajustes para tablet y móvil
├── js/
│   ├── data.js           TODO el contenido editable del club
│   └── app.js            Lógica de navegación y renderizado
├── img/
│   ├── logo.png          Escudo del club y favicons
│   └── fotos_grupos/     Fotos oficiales D1–D5 y del cuerpo técnico
└── equipo.txt            Plantilla original (referencia)
```

## Editar el contenido

Todo se configura en `js/data.js`, dentro del objeto `window.CB`. Después de guardar, recargá la página (Ctrl + F5) para ver los cambios.

### Club y divisiones

```js
club: { name, shortName, subtitle, season, founder, author, level, tagline, description }

divisions: [
  {
    id: "d1",                 // no cambiar: define d1.html
    label: "D1",
    name: "Chicago Bulls",
    role: "Primera división",
    photo: "img/fotos_grupos/D1.jpg",
    description: "…",
  },
  // …
]
```

El objeto `club` incluye `level`, que muestra el nivel competitivo (HaxCol · American Futsal) en las páginas de equipo. Cada división usa `photo` para su foto oficial; ya están cargadas las cinco imágenes de `img/fotos_grupos/`.

### Plantillas

Cada clave de `rosters` corresponde a una división y contiene los nombres tal como se muestran. Los totales actuales son D1 13, D2 13, D3 15, D4 14 y D5 13 (68 jugadores):

```js
rosters: {
  d1: ["Brooksby", "everest", "…"],
  d2: ["…"],
  // …
}
```

### Cuerpo técnico

Los DTs se editan en `staff`. No tienen estadísticas propias; si un DT también juega en una división, se agregan `plays` y `player` para que su ficha abra las stats reales de esa plantilla:

```js
staff: {
  id: "dt",
  label: "DT",
  name: "Directores técnicos",
  role: "Cuerpo técnico",
  photo: "img/fotos_grupos/Directores_tecnicos.jpg",
  description: "…",
  members: [
    { name: "Emm", alias: "Ancelotti" },
    { name: "noreik3", plays: "d2", player: "noreik3" },
    { name: "Mxti", plays: "d3", player: "mxti" },
    // …
  ],
}
```

- `alias` es opcional y se muestra junto al nombre.
- `plays` debe coincidir con el `id` de una división.
- `player` debe coincidir exactamente con el nombre que figura en `rosters` (por eso `Mxti` usa `player: "mxti"`).

### Estadísticas

Las stats se generan automáticamente para todos los jugadores con valores en 0. Para cargar números reales, agregá entradas con la clave `"division|nombre exacto del jugador"`:

```js
stats: {
  "d1|Brooksby": { played: 4, goals: 3, assists: 1, cleanSheets: 0 },
  "d2|rice":     { played: 3, goals: 0, assists: 2, cleanSheets: 3 },
}
```

- `played` (PJ), `goals` (G), `assists` (A) y `cleanSheets` (CS).
- El nombre debe coincidir exactamente con el de `rosters` (incluidas mayúsculas y símbolos).

### Fixture

```js
fixtures: [
  {
    date: "2026-11-08T21:00:00-03:00", // ISO con zona horaria
    division: "d1",
    opponent: "Rival FC",
    competition: "Liga Elite",
    venue: "home",                    // "home" = local, "away" = visitante
  },
]
```

La hora se convierte automáticamente a la zona horaria del visitante. Si la lista está vacía, se muestra un estado vacío elegante.

### Resultados

Todos los resultados van en una única lista, sin separar por división:

```js
results: [
  {
    date: "2026-11-08T21:00:00-03:00",
    division: "d2",
    opponent: "Rival FC",
    competition: "Liga de Ascenso",
    scoreFor: 4,
    scoreAgainst: 2,
    venue: "home",
  },
]
```

### Museo

```js
museum: {
  collective: [
    { title: "Campeón Liga Elite", year: 2026, division: "d1", description: "…" },
  ],
  individual: [
    { title: "MVP de la temporada", year: 2026, division: "d2", description: "rice · máximo exponente de la D2" },
  ],
}
```

Campos admitidos en cada premio: `title`, `year`, `division` y `description` (opcional).

### Fotos oficiales

1. Guardá la imagen en `img/fotos_grupos/`, por ejemplo `img/fotos_grupos/D1.jpg`.
2. En `js/data.js`, completá el campo `photo` de esa división o del cuerpo técnico:

```js
{ id: "d1", /* … */ photo: "img/fotos_grupos/D1.jpg" }
```

Las fotos actuales miden 1024 × 572 (16:9) y se recortan automáticamente (`object-fit: cover`). Las páginas de cada división y la del cuerpo técnico también incluyen la imagen fija en el HTML, así que al cambiar una foto conviene actualizar el archivo y la ruta en `js/data.js`.

## Fichas de jugadores

En cada plantilla, seleccioná un jugador para abrir su ficha estilo Chicago Bulls. Incluye el escudo, avatar con hasta dos iniciales, la división y el dorsal, además de PJ, goles, asistencias y CS. Las estadísticas que no se hayan cargado aparecen en 0. Para editarlas, usá `stats` en `js/data.js` como se explica en la sección Estadísticas.

En `dt.html`, los DTs que también juegan (`noreik3` en D2 y `Mxti` en D3) abren su ficha de jugador con estadísticas; el resto del cuerpo técnico se muestra sin stats.

El pie de página acredita el diseño y desarrollo a **Nqptun**, creador de esta página.

## Personalización visual

- **Colores y tipografías**: variables CSS al inicio de `css/base.css` (`--accent`, `--bg`, `--surface`, fuentes, radios).
- **Estilo**: interfaz plana y sobria, sin degradados ni animaciones decorativas. El logo del header gira 360° cada 3 segundos; el resto del sitio mantiene solo transiciones cortas.
- **Tono por división**: clases `.tone-d1` … `.tone-d5` y `.tone-dt` en `css/base.css`.
- **Logo y favicons**: reemplazá `img/logo.png` y regenerá `img/favicon-32.png`, `img/favicon-64.png` e `img/favicon-180.png` con el mismo nombre para conservar las referencias.
- **Pantalla de carga**: aparece completa en la primera visita de la sesión. Se controla con `sessionStorage` (`cb-loader-seen`); para verla de nuevo, abrí una pestaña nueva o limpiá los datos del sitio.

## Publicar

Al ser 100 % estático, se puede subir la carpeta tal cual a GitHub Pages, Netlify, Vercel o cualquier hosting. No requiere build ni configuración especial.

## Notas técnicas

- Sin frameworks ni dependencias: solo HTML, CSS y JavaScript.
- Accesibilidad: navegación por teclado, `aria-*` en menú, filtros y tablas, y respeto por `prefers-reduced-motion`.
- Responsive verificado entre 360 px y 1440 px sin desbordamiento horizontal.
- Validación HTML sin errores y pruebas funcionales de navegación, búsqueda, fichas y filtros.
