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

  /* ---------- Ligas y competencias ----------
     El color se usa en el calendario, la leyenda y los bordes de cada
     partido/resultado para identificar la liga de un vistazo.
  */
  leagues: [
    { id: "mls", name: "MLS", color: "#3ddc84" },
    { id: "vivet", name: "Vivet", color: "#550404" },
    { id: "haxcol", name: "HaxCol", color: "#4d8dff" },
    { id: "laliga", name: "LaLiga", color: "#ff4d5e" },
    { id: "haxcl", name: "HaxCL", color: "#b57bff" },
    { id: "amistoso", name: "Amistoso", color: "#9aa0ad" },
  ],

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
    "d2|signal": { played: 1, goals: 1, assists: 1, cleanSheets: 0 },
    "d3|Disrupted": { played: 1, goals: 3, assists: 1, cleanSheets: 0 },
    "d2|lalkkk": { played: 1, goals: 0, assists: 2, cleanSheets: 0 },
    "d2|Nqptun": { played: 1, goals: 0, assists: 0, cleanSheets: 1 },
    "d2|Six:)": { played: 1, goals: 0, assists: 1, cleanSheets: 1 },
    // Resultados.txt: el amistoso no genera stats.
    // Jugadores mencionados fuera de plantilla (sin stats): swarovski (D1),
    // satan, hitlaoro y lalk. Solo quedan documentados en el informe.
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
  fixtures: [
    {
      date: "2026-10-24T20:00:00-05:00",
      division: "d2",
      squads: ["d2", "d3"],
      league: "mls",
      competition: "Liga",
      opponent: "Cereal killer's",
      venue: "away",
    },
    {
      date: "2026-10-26T20:20:00-05:00",
      division: "d2",
      squads: ["d2", "d3", "d4", "d5"],
      league: "haxcol",
      competition: "Copa promesa",
      opponent: "Red devils",
      venue: "home",
      note: "Play offs",
    },
    {
      date: "2026-10-30T19:15:00-05:00",
      division: "d2",
      squads: ["d2", "d3"],
      league: "mls",
      competition: "Liga",
      opponent: "Juan Aurich",
      venue: "home",
    },
    {
      date: "2026-10-31T19:00:00-05:00",
      division: "d2",
      squads: ["d2", "d3", "d4", "d5"],
      league: "haxcol",
      competition: "Copa promesa",
      opponent: "Rappi Gang",
      venue: "home",
      note: "Play offs",
    },
    {
      date: "2026-10-31T20:10:00-05:00",
      division: "d2",
      squads: ["d2", "d3", "d4", "d5"],
      league: "laliga",
      competition: "Liga",
      opponent: "Deportivo de la Coruña",
      venue: "home",
    },
    {
      date: "2026-10-31T18:00:00-05:00",
      division: "d3",
      squads: ["d3", "d4", "d5"],
      league: "haxcl",
      competition: "Liga",
      opponent: "Juventus",
      venue: "home",
    },
    {
      date: "2026-10-31T19:00:00-05:00",
      division: "d2",
      squads: ["d2","d3", "d4", "d5"],
      league: "Vivet",
      competition: "Liga",
      opponent: "Pollolandia",
      venue: "home",
    },
  ],

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
  results: [
    {
      date: null,
      dateLabel: "Fecha sin registrar",
      division: "d1",
      squads: ["d1"],
      league: "amistoso",
      competition: "Amistoso",
      opponent: "Chelsea",
      scoreFor: 3,
      scoreAgainst: 2,
      venue: "home",
      players: ["aefy", "swarovski", "slurpy", "guns"],
      note: "Sin stats por ser amistoso.",
    },
    {
      date: "2026-10-24T20:00:00-05:00",
      division: "d2",
      squads: ["d2", "d3"],
      league: "mls",
      competition: "Liga",
      opponent: "Cereal Killers",
      scoreFor: 4,
      scoreAgainst: 3,
      venue: "away",
    },
    {
      date: "2026-10-26T20:20:00-05:00",
      division: "d2",
      squads: ["d2", "d3", "d4", "d5"],
      league: "haxcol",
      competition: "Copa promesa",
      opponent: "Red Devills Academy",
      scoreFor: 11,
      scoreAgainst: 5,
      venue: "away",
    },
  ],

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
