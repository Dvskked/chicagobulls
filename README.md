# Chicago Bulls · Haxball Club

Sitio web oficial del club **Chicago Bulls** de Haxball. Es un sitio estático multipágina (HTML, CSS y JavaScript puro, sin backend ni dependencias): todo el contenido se edita desde un solo archivo, `js/data.js`.

## Contenido

- **Inicio** (`index.html`): presentación del club, las cinco divisiones y accesos rápidos.
- **Categorías** (`categorias.html`): selector de D1 a D5.
- **Plantillas** (`d1.html` a `d5.html`): jugadores clickeables, buscador, fichas emergentes con estadísticas y espacio para la foto grupal.
- **Fixture** (`fixture.html`): calendario mensual, reloj en vivo y horarios en la zona local del visitante.
- **Stats** (`stats.html`): tabla de PJ, goles, asistencias y vallas invictas (CS), con filtros y ordenamiento.
- **Resultados** (`resultados.html`): todos los resultados en una sola lista, filtrables por división.
- **Museo** (`museo.html`): palmarés colectivo y premios individuales.

Divisiones y acentos de color: D1 Chicago Bulls (negro), D2 Windy City Bulls (rojo), D3 Bulls Academy (blanco), D4 Dynasty 96 (amarillo) y D5 The Madhouse (gris claro). Fundador del club: **satan**. Plantillas actuales: 14 jugadores por división (70 en total).

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
├── fixture.html          Calendario
├── stats.html            Estadísticas
├── resultados.html       Resultados
├── museo.html            Palmarés
├── css/
│   ├── base.css          Variables, reset, loader, header y footer
│   ├── pages.css         Inicio, categorías, equipos y foto grupal
│   ├── components.css    Fixture, stats, resultados, museo y estados vacíos
│   └── responsive.css    Ajustes para tablet y móvil
├── js/
│   ├── data.js           TODO el contenido editable del club
│   └── app.js            Lógica de navegación y renderizado
├── img/                  Logo y favicons
└── equipo.txt            Plantilla original (referencia)
```

## Editar el contenido

Todo se configura en `js/data.js`, dentro del objeto `window.CB`. Después de guardar, recargá la página (Ctrl + F5) para ver los cambios.

### Club y divisiones

```js
club: { name, shortName, subtitle, season, founder, tagline, description }

divisions: [
  {
    id: "d1",                 // no cambiar: define d1.html
    label: "D1",
    name: "Chicago Bulls",
    role: "Primera división",
    colors: "Negro / grafito",
    description: "…",
    photo: "",                // ruta de la foto grupal, ver más abajo
  },
  // …
]
```

### Plantillas

Cada clave de `rosters` corresponde a una división y contiene los nombres tal como se muestran:

```js
rosters: {
  d1: ["Brooksby", "Everest", "…"],
  d2: ["…"],
  // …
}
```

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

### Foto grupal

1. Guardá la imagen en `img/`, por ejemplo `img/d1-equipo.jpg`.
2. En `js/data.js`, completá el campo `photo` de esa división:

```js
{ id: "d1", /* … */ photo: "img/d1-equipo.jpg" }
```

Si `photo` queda vacío, la página muestra el espacio reservado con el ícono de cámara. La imagen se recorta automáticamente (`object-fit: cover`) y mantiene una altura máxima de 620 px.

## Fichas de jugadores

En cada plantilla, seleccioná un jugador para abrir su ficha estilo Chicago Bulls. Incluye el escudo, avatar con hasta dos iniciales, pelota con el color de la división, división y dorsal, además de PJ, goles, asistencias y CS. Las estadísticas que no se hayan cargado aparecen en 0. Para editarlas, usá `stats` en `js/data.js` como se explica en la sección Estadísticas.

El pie de página acredita el diseño y desarrollo a **Nqptun**, creador de esta página.

## Personalización visual

- **Colores y tipografías**: variables CSS al inicio de `css/base.css` (`--accent`, `--bg`, `--surface`, fuentes, radios).
- **Estilo**: interfaz plana y sobria, sin degradados ni animaciones decorativas. El logo del header gira 360° cada 12 segundos; el resto del sitio mantiene solo transiciones cortas.
- **Acento por división**: clases `.tone-d1` … `.tone-d5` en `css/base.css`.
- **Logo y favicons**: reemplazá `img/logo.png` y regenerá `img/favicon-32.png`, `img/favicon-64.png` e `img/favicon-180.png` con el mismo nombre para conservar las referencias.
- **Pantalla de carga**: aparece completa en la primera visita de la sesión. Se controla con `sessionStorage` (`cb-loader-seen`); para verla de nuevo, abrí una pestaña nueva o limpiá los datos del sitio.

## Publicar

Al ser 100 % estático, se puede subir la carpeta tal cual a GitHub Pages, Netlify, Vercel o cualquier hosting. No requiere build ni configuración especial.

## Notas técnicas

- Sin frameworks ni dependencias: solo HTML, CSS y JavaScript.
- Accesibilidad: navegación por teclado, `aria-*` en menú, filtros y tablas, y respeto por `prefers-reduced-motion`.
- Responsive verificado entre 360 px y 1440 px sin desbordamiento horizontal.
- Validación HTML sin errores (`html-validate`) y 66 pruebas funcionales aprobadas.
