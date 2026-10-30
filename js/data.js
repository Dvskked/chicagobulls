/* =========================================================
   CHICAGO BULLS · HAXBALL CLUB
   data.js · Todo el contenido editable del club en un solo lugar.
   No necesitas backend: los HTML leen estos datos con JavaScript.
   ========================================================= */

window.CB = {
  club: {
    name: "Chicago Bulls",
    shortName: "Bulls",
    subtitle: "Haxball Club",
    season: "Temporada 2026",
    founder: "satan",
    tagline: "Cinco divisiones. Un solo escudo.",
    description:
      "Organización de Haxball con cinco divisiones, una identidad y la misma hambre de competir.",
  },

  /* ---------- Divisiones ----------
     id: se usa para las páginas (d1.html, d2.html...)
     tone: color de acento definido en css/base.css (.tone-d1 ... .tone-d5)
     photo: ruta de la foto grupal (ej. "img/d1-equipo.jpg"). Vacío = espacio reservado.
  */
  divisions: [
    {
      id: "d1",
      label: "D1",
      name: "Chicago Bulls",
      role: "Primera división",
      colors: "Negro / grafito",
      photo: "",
      description:
        "El primer equipo. La referencia del club, con la exigencia y la identidad que representa el escudo.",
    },
    {
      id: "d2",
      label: "D2",
      name: "Windy City Bulls",
      role: "Segunda división",
      colors: "Rojo",
      photo: "",
      description:
        "El segundo escalón competitivo. Una plantilla con hambre de ascenso que empuja desde abajo.",
    },
    {
      id: "d3",
      label: "D3",
      name: "Bulls Academy",
      role: "Tercera división",
      colors: "Blanco",
      photo: "",
      description:
        "Nuestra academia. Desarrollo, disciplina y el primer paso de muchos jugadores hacia el primer equipo.",
    },
    {
      id: "d4",
      label: "D4",
      name: "Dynasty 96",
      role: "Cuarta división",
      colors: "Amarillo",
      photo: "",
      description:
        "La garra de una dinastía que no olvida de dónde viene. Competimos cada jornada con identidad propia.",
    },
    {
      id: "d5",
      label: "D5",
      name: "The Madhouse",
      role: "Quinta división",
      colors: "Gris claro",
      photo: "",
      description:
        "El corazón del club. La casa donde nace la afición y se disfruta del Haxball sin excusas.",
    },
  ],

  /* ---------- Plantillas ---------- */
  rosters: {
    d1: [
      "aefy",
      "brooksby",
      "Everest",
      "Gerardosky",
      "Guns",
      "Hr",
      "Pumpk",
      "Lawliet",
      "Metzi",
      "Njb",
      "Swarovski",
      "Syrup",
      "Slurpy",
      "risuhina",
    ],
    d2: [
      "bh",
      "dan1",
      "Mxti",
      "Kyx",
      "lalkkkk.",
      "login",
      "Nqptun",
      "rice",
      "shiro",
      "signal",
      "Six",
      "mhx",
      "carlitos.",
      "minichip",
    ],
    d3: [
      "Disrupted",
      "caligueba",
      "damasco",
      "France",
      "noctz",
      "divine",
      "Maxisc",
      "Duquerr.",
      "Snless",
      "przzzzzz",
      "v",
      "plastic",
      "cloutz",
      "plm.rb",
    ],
    d4: [
      "BAN",
      "hitlaroro",
      "Kabrinha",
      "Palolo",
      "peteoro",
      "Raz.",
      "redlo",
      "DILAN KR",
      "Trx!",
      "Hidan",
      "Ayuxx",
      "franchito",
      "void",
      "!Its me.",
    ],
    d5: [
      "Anaskaaaa",
      "charles",
      "notdri",
      "Dsk",
      "elmonaso",
      "Fallen",
      "Gio",
      "cicade",
      "Moi",
      "napdose",
      "Rakz",
      "HERO",
      "zelioon",
      "Oliver sonne (depressed)",
    ],
  },

  /* ---------- Estadísticas ----------
     Se generan automáticamente para todos los jugadores con 0.
     Para cargar números reales, descomenta y completa el ejemplo:
     "d1|Brooksby": { played: 4, goals: 3, assists: 1, cleanSheets: 0 },
     La clave siempre es "division|nombre exacto del jugador".
  */
  stats: {
    // "d1|Brooksby": { played: 0, goals: 0, assists: 0, cleanSheets: 0 },
  },

  /* ---------- Fixture ----------
     Agrega partidos con fecha ISO (incluye la zona horaria) y división.
     El sitio convierte la hora automáticamente a la zona horaria del visitante.
     Ejemplo:
     {
       date: "2026-11-08T21:00:00-03:00",
       division: "d1",
       opponent: "Rival FC",
       competition: "Liga Elite",
       venue: "home", // "home" = local, "away" = visitante
     },
  */
  fixtures: [],

  /* ---------- Resultados ----------
     Todos los resultados van en una sola lista, sin separar por división.
     Ejemplo:
     {
       date: "2026-11-08T21:00:00-03:00",
       division: "d2",
       opponent: "Rival FC",
       competition: "Liga de Ascenso",
       scoreFor: 4,
       scoreAgainst: 2,
       venue: "home",
     },
  */
  results: [],

  /* ---------- Museo ----------
     collective = títulos colectivos · individual = premios individuales.
     Ejemplo:
     { title: "Campeón Liga Elite", year: 2026, division: "d1", description: "..." }
  */
  museum: {
    collective: [],
    individual: [],
  },
};
