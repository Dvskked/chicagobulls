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
    author: "Nqptun",
    level: "HaxCol · American Futsal (AF)",
    tagline: "Cinco divisiones. Un solo escudo.",
    description:
      "Club de Haxball pensado para competir al nivel de HaxCol y American Futsal (AF), con las listas oficiales de sus cinco divisiones ya confirmadas.",
  },

  /* ---------- Divisiones ----------
     id: se usa para las páginas (d1.html, d2.html...)
     tone: color de acento definido en css/base.css (.tone-d1 ... .tone-d5)
     photo: foto grupal oficial dentro de img/fotos_grupos/.
  */
  divisions: [
    {
      id: "d1",
      label: "D1",
      name: "Chicago Bulls",
      role: "Primera división",
      photo: "img/fotos_grupos/D1.jpg",
      description:
        "El primer equipo del club. La referencia competitiva y el lugar donde se mide el nivel de todo el proyecto.",
    },
    {
      id: "d2",
      label: "D2",
      name: "Windy City Bulls",
      role: "Segunda división",
      photo: "img/fotos_grupos/D2.jpg",
      description:
        "El segundo escalón. Una plantilla armada para pelear arriba y empujar por el ascenso.",
    },
    {
      id: "d3",
      label: "D3",
      name: "Bulls Academy",
      role: "Tercera división",
      photo: "img/fotos_grupos/D3.jpg",
      description:
        "La academia del club. Desarrollo, rodaje y el paso previo para muchos jugadores.",
    },
    {
      id: "d4",
      label: "D4",
      name: "Dynasty 96",
      role: "Cuarta división",
      photo: "img/fotos_grupos/D4.jpg",
      description:
        "Un equipo con identidad propia y hambre de competir cada jornada.",
    },
    {
      id: "d5",
      label: "D5",
      name: "The Madhouse",
      role: "Quinta división",
      photo: "img/fotos_grupos/D5.jpg",
      description:
        "El corazón del club. Donde nace la afición y se juega por el gusto de competir.",
    },
  ],

  /* ---------- Plantillas oficiales ---------- */
  rosters: {
    d1: [
      "Brooksby",
      "everest",
      "gerardosky",
      "pumpkk",
      "lawliet",
      "lukasss,",
      "slurpy",
      "Syrup",
      "aefy",
      "guns",
      "mhx",
      "njb",
      "rice",
    ],
    d2: [
      "duquer",
      "Hr",
      "Nqptun",
      "Six:)",
      "bh",
      "carlitos",
      "lalkkk",
      "login",
      "minichip",
      "noreik3",
      "pressure",
      "shiro",
      "signal",
    ],
    d3: [
      "Disrupted",
      "AJDYBANTSA",
      "DILAN,KR",
      "France",
      "Knight",
      "Londres",
      "Maxisss",
      "andres",
      "cloutz",
      "damasco",
      "mxti",
      "nighfall",
      "przzzz",
      "v",
      "核",
    ],
    d4: [
      "!ts me.",
      "Ayuxx",
      "BAN",
      "Depzxm",
      "Hidan la hp H",
      "Kabrinha",
      "Parolo",
      "Trx!",
      "Franchito",
      "peteoro",
      "raz.",
      "redlo",
      "resky",
      "void",
    ],
    d5: [
      "Anaskaaaa",
      "Cicade",
      "Dsk uwu",
      "Elmonaso",
      "Fallen",
      "HERO47",
      "Moi",
      "Napdose",
      "Oliver sonne",
      "Rakzz",
      "charles",
      "gio",
      "zel1on",
    ],
  },

  /* ---------- Cuerpo técnico ----------
     Los DT no llevan stats propios. Si un DT también juega en una
     división, se agrega "plays" con la división y "player" con el
     nombre exacto que figura en esa plantilla.
  */
  staff: {
    id: "dt",
    label: "DT",
    name: "Directores técnicos",
    role: "Cuerpo técnico",
    photo: "img/fotos_grupos/Directores_tecnicos.jpg",
    description:
      "El staff que acompaña a las cinco divisiones. Algunos de los DTs también tienen lugar en las plantillas de D2 y D3, así que aparecen con su ficha de jugador y sus stats.",
    members: [
      { name: "Emm", alias: "Ancelotti" },
      { name: "ngl", alias: "Mourinho" },
      { name: "dead Satan" },
      { name: "noreik3", plays: "d2", player: "noreik3" },
      { name: "Dan" },
      { name: "Mxti", plays: "d3", player: "mxti" },
      { name: "Esteban Laburante" },
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
