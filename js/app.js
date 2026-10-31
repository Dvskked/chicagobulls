/* =========================================================
   CHICAGO BULLS · HAXBALL CLUB
   app.js · Navegación, carga, plantillas, calendario, stats y museo
   ========================================================= */

(function () {
  "use strict";

  const DATA = window.CB || {};
  const CLUB = DATA.club || {};
  const DIVISIONS = Array.isArray(DATA.divisions) ? DATA.divisions : [];
  const ROSTERS = DATA.rosters || {};
  const STAFF = DATA.staff || null;
  const STAFF_MEMBERS = STAFF && Array.isArray(STAFF.members) ? STAFF.members : [];
  const DIVISION_BY_ID = new Map(DIVISIONS.map((division) => [division.id, division]));

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[character]);

  const norm = (value) =>
    String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("es");

  const pad2 = (value) => String(value).padStart(2, "0");

  const capitalize = (value) => {
    const text = String(value ?? "");
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const initials = (name) => {
    const parts = String(name ?? "")
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (!parts.length) return "?";
    return (parts[0].charAt(0) + (parts.length > 1 ? parts[1].charAt(0) : "")).toUpperCase();
  };

  const toDate = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  const dateKey = (date) =>
    `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;

  const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);

  const addMonths = (date, amount) => new Date(date.getFullYear(), date.getMonth() + amount, 1);

  const rosterFor = (divisionId) =>
    Array.isArray(ROSTERS[divisionId]) ? ROSTERS[divisionId] : [];

  const totalPlayers = () =>
    DIVISIONS.reduce((total, division) => total + rosterFor(division.id).length, 0);

  const totalStaff = () => STAFF_MEMBERS.length;

  const playingStaff = () => STAFF_MEMBERS.filter((member) => member.plays && DIVISION_BY_ID.has(member.plays));

  const svg = (content) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${content}</svg>`;

  const icons = {
    arrow: svg('<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>'),
    calendar: svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>'),
    chart: svg('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
    trophy: svg('<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3"/>'),
    medal: svg('<circle cx="12" cy="14" r="5"/><path d="m8 10-3-7h5l2 5 2-5h5l-3 7"/>'),
    camera: svg('<path d="M14.5 5 13 3h-2L9.5 5H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4.5Z"/><circle cx="12" cy="12" r="3.5"/>'),
    close: svg('<path d="m6 6 12 12M18 6 6 18"/>'),
  };

  /* ---------- Carga inicial ---------- */
  function initLoader() {
    const loader = $("#loader");
    if (!loader) return;
    if (document.documentElement.classList.contains("no-loader")) return;

    const startedAt = performance.now();
    const minimumTime = 1550;
    let hidden = false;

    const hide = () => {
      if (hidden) return;
      hidden = true;
      loader.classList.add("is-hidden");
      document.body.classList.add("is-loaded");
      try {
        sessionStorage.setItem("cb-loader-seen", "1");
      } catch (error) {
        /* sessionStorage puede estar bloqueado; la web sigue funcionando. */
      }
      window.setTimeout(() => loader.remove(), 750);
    };

    const schedule = () => {
      const elapsed = performance.now() - startedAt;
      window.setTimeout(hide, Math.max(0, minimumTime - elapsed));
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    window.setTimeout(hide, 4200);
  }

  /* ---------- Navegación ---------- */
  function initHeader() {
    const header = $(".site-header");
    if (header) {
      const updateShadow = () => header.classList.toggle("is-scrolled", window.scrollY > 6);
      updateShadow();
      window.addEventListener("scroll", updateShadow, { passive: true });
    }

    const currentFile = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    const pageMap = {
      "index.html": "home",
      "categorias.html": "categorias",
      "dt.html": "dt",
      "fixture.html": "fixture",
      "stats.html": "stats",
      "resultados.html": "resultados",
      "museo.html": "museo",
    };
    const activePage = /^d[1-5]\.html$/.test(currentFile) ? "categorias" : pageMap[currentFile] || "";

    $$("[data-nav]").forEach((link) => {
      if (link.dataset.nav === activePage) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });

    const toggle = $(".nav-toggle");
    const nav = $("#primary-nav");
    if (!toggle || !nav) return;

    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) setOpen(false);
    });
  }

  /* ---------- Relojes y año ---------- */
  function initClocks() {
    const shortClocks = $$("[data-clock]");
    const liveClocks = $$("[data-live-clock]");
    const liveDates = $$("[data-live-date]");
    const timeZones = $$("[data-tz-name]");
    if (!shortClocks.length && !liveClocks.length && !liveDates.length && !timeZones.length) return;

    let shortFormat;
    let secondsFormat;
    let dateFormat;
    try {
      shortFormat = new Intl.DateTimeFormat("es-ES", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
      secondsFormat = new Intl.DateTimeFormat("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      });
      dateFormat = new Intl.DateTimeFormat("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (error) {
      return;
    }

    let zoneLabel = "";
    try {
      const zoneName = Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " ");
      const zonePart = new Intl.DateTimeFormat("es-ES", { timeZoneName: "short" })
        .formatToParts(new Date())
        .find((part) => part.type === "timeZoneName");
      zoneLabel = zonePart ? `${zonePart.value} · ${zoneName}` : zoneName;
    } catch (error) {
      zoneLabel = "Hora local";
    }
    timeZones.forEach((element) => {
      element.textContent = zoneLabel;
    });

    const update = () => {
      const now = new Date();
      shortClocks.forEach((element) => {
        element.textContent = shortFormat.format(now);
      });
      liveClocks.forEach((element) => {
        element.textContent = secondsFormat.format(now);
      });
      liveDates.forEach((element) => {
        element.textContent = capitalize(dateFormat.format(now));
      });
    };

    update();
    window.setInterval(update, 1000);
  }

  function initStaticContent() {
    $$("[data-year]").forEach((element) => {
      element.textContent = String(new Date().getFullYear());
    });
    $$("[data-total-players]").forEach((element) => {
      element.textContent = pad2(totalPlayers());
    });
    $$("[data-total-divisions]").forEach((element) => {
      element.textContent = pad2(DIVISIONS.length);
    });
    $$("[data-total-staff]").forEach((element) => {
      element.textContent = String(totalStaff());
    });
    $$("[data-founder]").forEach((element) => {
      element.textContent = CLUB.founder || "satan";
    });
    $$("[data-author]").forEach((element) => {
      element.textContent = CLUB.author || "Nqptun";
    });
  }

  /* ---------- Tarjetas de divisiones ---------- */
  function divisionCard(division) {
    const count = rosterFor(division.id).length;
    const photo = division.photo
      ? `<img src="${esc(division.photo)}" alt="Foto oficial de ${esc(division.name)} · ${esc(division.label)}" loading="lazy" decoding="async" width="1024" height="572">`
      : "";
    return `
      <a class="division-card tone-${division.id} reveal" href="${division.id}.html"
         aria-label="Ver la plantilla de ${esc(division.name)}, ${esc(division.label)}">
        <span class="division-card__media${photo ? " has-photo" : ""}">
          ${photo}
          <span class="division-card__stamp">Plantilla oficial</span>
          <span class="division-card__logo" aria-hidden="true">
            <img src="img/logo.png" alt="" width="800" height="800">
          </span>
        </span>
        <span class="division-card__body">
          <span class="division-card__top">
            <span class="division-card__role">${esc(division.role)}</span>
            <span class="division-card__count">${count} jugadores</span>
          </span>
          <h3>${esc(division.name)}</h3>
          <p>${esc(division.description)}</p>
        </span>
        <span class="division-card__link">
          <span><span class="div-badge">${esc(division.label)}</span> Ver plantilla</span>
          ${icons.arrow}
        </span>
      </a>`;
  }

  function renderDivisions() {
    $$("[data-divisions]").forEach((container) => {
      container.innerHTML = DIVISIONS.map(divisionCard).join("");
    });
  }

  /* ---------- Tarjeta del cuerpo técnico ---------- */
  function renderStaffFeature() {
    const container = $("[data-staff-feature]");
    if (!container || !STAFF) return;
    const photo = STAFF.photo
      ? `<img src="${esc(STAFF.photo)}" alt="Foto oficial del ${esc(STAFF.name)}" loading="lazy" decoding="async" width="1024" height="572">`
      : "";
    container.innerHTML = `
      <article class="staff-feature tone-dt reveal">
        <figure class="staff-feature__media${photo ? " has-photo" : ""}">
          ${photo}
          <span class="division-card__logo" aria-hidden="true">
            <img src="img/logo.png" alt="" width="800" height="800">
          </span>
          <figcaption>${esc(STAFF.label)} · ${esc(CLUB.season || "Temporada 2026")}</figcaption>
        </figure>
        <div class="staff-feature__copy">
          <span class="eyebrow">Cuerpo técnico</span>
          <h2>${esc(STAFF.name)}</h2>
          <p>${esc(STAFF.description)}</p>
          <ul class="staff-feature__names">
            ${STAFF_MEMBERS.map((member) => `<li>${esc(member.name)}</li>`).join("")}
          </ul>
          <a class="btn btn--ghost btn--sm" href="${esc(STAFF.id)}.html">Ver cuerpo técnico ${icons.arrow}</a>
        </div>
      </article>`;
  }

  function renderDivisionSwitcher() {
    const container = $("[data-division-switcher]");
    if (!container) return;
    const current = document.body.dataset.division;
    container.innerHTML = DIVISIONS.map((division) => {
      const active = division.id === current;
      return `
        <a class="tone-${division.id}${active ? " is-current" : ""}" href="${division.id}.html"
           ${active ? 'aria-current="page"' : ""}>
          <span class="div-badge">${esc(division.label)}</span>
          <strong>${esc(division.name)}</strong>
          <small>${rosterFor(division.id).length} jugadores</small>
        </a>`;
    }).join("");
  }

  /* ---------- Chips de división reutilizables ---------- */
  function divisionChips(container, active, onChange) {
    if (!container) return;
    const buttons = [
      `<button class="chip${active === "all" ? " is-active" : ""}" type="button" data-division="all" aria-pressed="${active === "all"}">Todas</button>`,
      ...DIVISIONS.map((division) => `
        <button class="chip tone-${division.id}${active === division.id ? " is-active" : ""}" type="button"
                data-division="${division.id}" aria-pressed="${active === division.id}">
          <span class="chip__dot"></span>${esc(division.label)}
        </button>`),
    ];
    container.innerHTML = buttons.join("");
    container.querySelectorAll("[data-division]").forEach((button) => {
      button.addEventListener("click", () => onChange(button.dataset.division));
    });
  }

  /* ---------- Ficha de jugador ---------- */
  const playerCardModal = (() => {
    let modal = null;
    let panel = null;
    let content = null;
    let site = null;
    let triggerElement = null;

    const statRow = (label, value) =>
      `<div><dt>${esc(label)}</dt><dd>${Number(value) || 0}</dd></div>`;

    const build = () => {
      if (modal) return;
      modal = document.createElement("div");
      modal.className = "player-modal";
      modal.id = "player-modal";
      modal.hidden = true;
      modal.innerHTML = `
        <div class="player-modal__backdrop" data-player-close></div>
        <div class="player-modal__panel" role="dialog" aria-modal="true" aria-labelledby="player-modal-name">
          <button class="player-modal__close" type="button" data-player-close aria-label="Cerrar ficha">${icons.close}</button>
          <div class="player-modal__content" data-player-content></div>
        </div>`;
      document.body.appendChild(modal);
      panel = modal.querySelector(".player-modal__panel");
      content = modal.querySelector("[data-player-content]");
      site = document.querySelector(".site");

      modal.addEventListener("click", (event) => {
        if (event.target.closest("[data-player-close]")) close();
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") close();
      });
    };

    const close = () => {
      if (!modal || modal.hidden) return;
      modal.hidden = true;
      document.body.classList.remove("is-locked");
      if (site) site.inert = false;
      const previous = triggerElement;
      triggerElement = null;
      if (previous) previous.focus({ preventScroll: true });
    };

    const open = (trigger) => {
      const divisionId = trigger.dataset.division;
      const name = trigger.dataset.playerName;
      const displayName = trigger.dataset.playerLabel || name;
      const division = DIVISION_BY_ID.get(divisionId);
      if (!division || !name) return;

      build();

      const stats = playerStats(divisionId, name);
      const number = (Number(trigger.dataset.playerIndex) || 0) + 1;

      content.innerHTML = `
        <div class="player-modal__head">
          <span class="player-modal__logo">
            <img src="img/logo.png" alt="Escudo de ${esc(CLUB.name || "Chicago Bulls")} Haxball">
          </span>
          <span class="div-badge">${esc(division.label)} · ${esc(division.name)}</span>
        </div>
        <div class="player-modal__identity">
          <span class="player-ball" aria-hidden="true"><span class="player-ball__initials">${esc(initials(displayName))}</span></span>
          <h2 id="player-modal-name">${esc(displayName)}</h2>
          <p>Jugador de ${esc(division.name)}</p>
        </div>
        <dl class="player-modal__stats">
          ${statRow("Partidos jugados", stats.played)}
          ${statRow("Goles", stats.goals)}
          ${statRow("Asistencias", stats.assists)}
          ${statRow("CS", stats.cleanSheets)}
        </dl>
        <div class="player-modal__meta">
          <div><span>División</span><strong>${esc(division.label)} · ${esc(division.name)}</strong></div>
          <div><span>Nivel</span><strong>${esc(CLUB.level || "HaxCol · AF")}</strong></div>
          <div><span>Dorsal</span><strong>#${pad2(number)}</strong></div>
        </div>
        <p class="player-modal__foot">${esc(CLUB.name || "Chicago Bulls")} Haxball · ${esc(CLUB.season || "Temporada 2026")}</p>`;

      panel.className = `player-modal__panel tone-${divisionId}`;
      triggerElement = trigger;
      modal.hidden = false;
      document.body.classList.add("is-locked");
      if (site) site.inert = true;
      const closeButton = modal.querySelector(".player-modal__close");
      if (closeButton) closeButton.focus({ preventScroll: true });
    };

    return { open };
  })();

  /* ---------- Página de equipo ---------- */
  function initTeamPage() {
    const teamId = document.body.dataset.division;
    if (!teamId) return;
    const division = DIVISION_BY_ID.get(teamId);
    const grid = $("[data-roster]");
    if (!division || !grid) return;

    const roster = rosterFor(teamId);
    const empty = $("[data-roster-empty]");
    const search = $("[data-roster-search]");
    const counters = $$("[data-roster-count], [data-roster-visible]");

    $$("[data-team-name]").forEach((element) => {
      element.textContent = division.name;
    });
    $$("[data-team-desc]").forEach((element) => {
      element.textContent = division.description;
    });
    $$("[data-team-role]").forEach((element) => {
      element.textContent = division.role;
    });
    $$("[data-team-label]").forEach((element) => {
      element.textContent = division.label;
    });

    // Foto grupal opcional: se activa al completar "photo" en js/data.js.
    const photoFrame = $("[data-team-photo]");
    if (photoFrame && division.photo) {
      photoFrame.classList.add("has-photo");
      photoFrame.innerHTML = `
        <img class="team-photo__img" src="${esc(division.photo)}" alt="Foto oficial de ${esc(division.name)} · ${esc(division.label)}" loading="lazy" decoding="async">`;
    }

    let query = "";

    const render = () => {
      const filtered = roster
        .map((name, index) => ({ name, index }))
        .filter(({ name }) => !query || norm(name).includes(query));

      grid.innerHTML = filtered.map(({ name, index }) => `
        <li class="roster-item">
          <button class="player-card tone-${teamId}" type="button" data-player-open
                  data-division="${esc(teamId)}" data-player-index="${index}" data-player-name="${esc(name)}"
                  aria-label="Ver ficha de ${esc(name)}, ${esc(division.label)}">
            <span class="player-card__num">${pad2(index + 1)}</span>
            <span class="player-card__avatar" aria-hidden="true">${esc(initials(name))}</span>
            <span class="player-card__info">
              <strong>${esc(name)}</strong>
              <span>Jugador · ${esc(division.label)}</span>
            </span>
            <span class="player-card__div">${esc(division.label)}</span>
          </button>
        </li>`).join("");

      grid.hidden = filtered.length === 0;
      if (empty) empty.hidden = filtered.length > 0;
      counters.forEach((element) => {
        element.textContent = `${filtered.length} ${filtered.length === 1 ? "jugador" : "jugadores"}`;
      });
    };

    if (search) {
      search.addEventListener("input", () => {
        query = norm(search.value.trim());
        render();
      });
    }

    grid.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-player-open]");
      if (trigger) playerCardModal.open(trigger);
    });

    render();
  }

  /* ---------- Página del cuerpo técnico ---------- */
  function initStaffPage() {
    const staffRoot = $("[data-staff]");
    if (!staffRoot || !STAFF) return;

    $$("[data-staff-name]").forEach((element) => {
      element.textContent = STAFF.name;
    });
    $$("[data-staff-desc]").forEach((element) => {
      element.textContent = STAFF.description;
    });
    $$("[data-staff-count]").forEach((element) => {
      element.textContent = `${STAFF_MEMBERS.length} DTs`;
    });
    $$("[data-staff-players]").forEach((element) => {
      element.textContent = String(playingStaff().length);
    });

    const photoFrame = $("[data-staff-photo]");
    if (photoFrame && STAFF.photo) {
      photoFrame.classList.add("has-photo");
      photoFrame.innerHTML = `
        <img class="team-photo__img" src="${esc(STAFF.photo)}" alt="Foto oficial del ${esc(STAFF.name)}" loading="lazy" decoding="async">`;
    }

    const list = $("[data-staff-list]");
    if (!list) return;

    list.innerHTML = STAFF_MEMBERS.map((member, index) => {
      const division = member.plays ? DIVISION_BY_ID.get(member.plays) : null;
      const alias = member.alias ? `${esc(member.alias)} · ` : "";

      if (division) {
        const player = member.player || member.name;
        const roster = rosterFor(division.id);
        const rosterIndex = roster.findIndex((name) => name === player);
        return `
          <li class="staff-item">
            <button class="player-card tone-${division.id}" type="button" data-player-open
                    data-division="${esc(division.id)}" data-player-index="${rosterIndex >= 0 ? rosterIndex : index}"
                    data-player-name="${esc(player)}"
                    data-player-label="${esc(member.name)}"
                    aria-label="Ver stats de ${esc(member.name)}, también juega en ${esc(division.label)}">
              <span class="player-card__num">${pad2(index + 1)}</span>
              <span class="player-card__avatar" aria-hidden="true">${esc(initials(member.name))}</span>
              <span class="player-card__info">
                <strong>${esc(member.name)}</strong>
                <span>${alias}DT · Juega en ${esc(division.label)}</span>
              </span>
              <span class="player-card__div">${esc(division.label)}</span>
            </button>
          </li>`;
      }

      return `
        <li class="staff-item">
          <div class="player-card player-card--static tone-dt">
            <span class="player-card__num">${pad2(index + 1)}</span>
            <span class="player-card__avatar" aria-hidden="true">${esc(initials(member.name))}</span>
            <span class="player-card__info">
              <strong>${esc(member.name)}</strong>
              <span>${alias}Director técnico</span>
            </span>
            <span class="player-card__div">${esc(STAFF.label)}</span>
          </div>
        </li>`;
    }).join("");

    list.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-player-open]");
      if (trigger) playerCardModal.open(trigger);
    });
  }

  /* ---------- Estadísticas ---------- */
  function playerStats(divisionId, name) {
    const key = `${divisionId}|${name}`;
    const raw = (DATA.stats && DATA.stats[key]) || {};
    const number = (value) => {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : 0;
    };
    return {
      played: number(raw.played ?? raw.pj),
      goals: number(raw.goals ?? raw.g),
      assists: number(raw.assists ?? raw.a),
      cleanSheets: number(raw.cleanSheets ?? raw.cs),
    };
  }

  function buildStatsRows() {
    const rows = [];
    DIVISIONS.forEach((division) => {
      rosterFor(division.id).forEach((name, index) => {
        rows.push({
          name,
          division,
          index,
          ...playerStats(division.id, name),
        });
      });
    });
    return rows;
  }

  function initStatsPage() {
    const tbody = $("[data-stats-body]");
    if (!tbody) return;

    const rows = buildStatsRows();
    const filters = $("[data-stats-filters]");
    const search = $("[data-stats-search]");
    const empty = $("[data-stats-empty]");
    const tableCard = $("[data-stats-table-card]");
    const totals = rows.reduce(
      (accumulator, row) => {
        accumulator.players += 1;
        accumulator.goals += row.goals;
        accumulator.assists += row.assists;
        accumulator.cleanSheets += row.cleanSheets;
        return accumulator;
      },
      { players: 0, goals: 0, assists: 0, cleanSheets: 0 }
    );

    const summaryElements = {
      players: $$("[data-stat-players]"),
      goals: $$("[data-stat-goals]"),
      assists: $$("[data-stat-assists]"),
      cleanSheets: $$("[data-stat-cs]"),
    };
    summaryElements.players.forEach((element) => {
      element.textContent = String(totals.players);
    });
    summaryElements.goals.forEach((element) => {
      element.textContent = String(totals.goals);
    });
    summaryElements.assists.forEach((element) => {
      element.textContent = String(totals.assists);
    });
    summaryElements.cleanSheets.forEach((element) => {
      element.textContent = String(totals.cleanSheets);
    });

    const state = { division: "all", query: "", sort: "goals", direction: "desc" };

    const updateSortButtons = () => {
      $$("[data-sort]").forEach((button) => {
        const active = button.dataset.sort === state.sort;
        button.classList.toggle("is-active", active);
        const arrow = button.querySelector(".sort-arrow");
        if (arrow) arrow.textContent = active ? (state.direction === "asc" ? "↑" : "↓") : "↕";
        const header = button.closest("th");
        if (header) {
          header.setAttribute(
            "aria-sort",
            active ? (state.direction === "asc" ? "ascending" : "descending") : "none"
          );
        }
      });
    };

    const render = () => {
      divisionChips(filters, state.division, (divisionId) => {
        state.division = divisionId;
        render();
      });

      const filtered = rows
        .filter((row) => state.division === "all" || row.division.id === state.division)
        .filter((row) => !state.query || norm(row.name).includes(state.query));

      filtered.sort((a, b) => {
        let first;
        let second;
        if (state.sort === "name") {
          first = norm(a.name);
          second = norm(b.name);
        } else if (state.sort === "division") {
          first = a.division.label;
          second = b.division.label;
        } else {
          first = a[state.sort] ?? 0;
          second = b[state.sort] ?? 0;
        }
        const comparison = typeof first === "string" ? first.localeCompare(second, "es") : first - second;
        if (comparison !== 0) return state.direction === "asc" ? comparison : -comparison;
        return norm(a.name).localeCompare(norm(b.name), "es");
      });

      tbody.innerHTML = filtered.map((row, index) => `
        <tr class="tone-${row.division.id}">
          <td class="rank">${pad2(index + 1)}</td>
          <td>
            <div class="player-cell">
              <span class="player-cell__avatar" aria-hidden="true">${esc(initials(row.name))}</span>
              <strong>${esc(row.name)}</strong>
            </div>
          </td>
          <td><span class="div-badge">${esc(row.division.label)}</span></td>
          <td class="num">${row.played}</td>
          <td class="num">${row.goals}</td>
          <td class="num">${row.assists}</td>
          <td class="num">${row.cleanSheets}</td>
        </tr>`).join("");

      if (empty) empty.hidden = filtered.length > 0;
      if (tableCard) tableCard.hidden = filtered.length === 0;
      updateSortButtons();
    };

    if (search) {
      search.addEventListener("input", () => {
        state.query = norm(search.value.trim());
        render();
      });
    }

    $$("[data-sort]").forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.dataset.sort;
        if (state.sort === key) {
          state.direction = state.direction === "asc" ? "desc" : "asc";
        } else {
          state.sort = key;
          state.direction = key === "name" ? "asc" : "desc";
        }
        render();
      });
    });

    render();
  }

  /* ---------- Fixture y calendario ---------- */
  function initFixturePage() {
    const calendar = $("[data-calendar]");
    if (!calendar) return;

    const fixtures = (Array.isArray(DATA.fixtures) ? DATA.fixtures : [])
      .map((fixture) => ({ ...fixture, dateObj: toDate(fixture.date) }))
      .filter((fixture) => fixture.dateObj)
      .sort((a, b) => a.dateObj - b.dateObj);

    $$("[data-fixture-total]").forEach((element) => {
      element.textContent = pad2(fixtures.length);
    });

    const title = $("[data-calendar-title]");
    const subtitle = $("[data-calendar-sub]");
    const list = $("[data-fixture-list]");
    const listTitle = $("[data-fixture-list-title]");
    const count = $("[data-fixture-count]");
    const filters = $("[data-fixture-filters]");
    const todayButton = $("[data-calendar-today]");
    const previousButton = $("[data-calendar-prev]");
    const nextButton = $("[data-calendar-next]");

    const state = {
      view: startOfMonth(new Date()),
      selected: null,
      division: "all",
    };

    const monthName = (date) =>
      capitalize(new Intl.DateTimeFormat("es-ES", { month: "long" }).format(date));

    const fullDate = (date) =>
      capitalize(new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "numeric", month: "long" }).format(date));

    const timeLabel = (date) =>
      new Intl.DateTimeFormat("es-ES", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date);

    const dayLabel = (date) => new Intl.DateTimeFormat("es-ES", { day: "2-digit" }).format(date);

    const shortMonth = (date) =>
      new Intl.DateTimeFormat("es-ES", { month: "short" }).format(date).replace(".", "");

    const weekdayLabel = (date) =>
      capitalize(new Intl.DateTimeFormat("es-ES", { weekday: "long" }).format(date));

    const resultZone = (date) => {
      try {
        const part = new Intl.DateTimeFormat("es-ES", { timeZoneName: "short" })
          .formatToParts(date)
          .find((item) => item.type === "timeZoneName");
        return part ? part.value : "";
      } catch (error) {
        return "";
      }
    };

    const filteredFixtures = () =>
      fixtures.filter((fixture) => state.division === "all" || fixture.division === state.division);

    const renderCalendar = () => {
      const year = state.view.getFullYear();
      const month = state.view.getMonth();
      const firstDay = new Date(year, month, 1);
      const offset = (firstDay.getDay() + 6) % 7;
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const todayKey = dateKey(new Date());

      const monthFixtures = filteredFixtures().filter(
        (fixture) => fixture.dateObj.getFullYear() === year && fixture.dateObj.getMonth() === month
      );
      const byDay = new Map();
      monthFixtures.forEach((fixture) => {
        const key = dateKey(fixture.dateObj);
        if (!byDay.has(key)) byDay.set(key, []);
        byDay.get(key).push(fixture);
      });

      let cells = "";
      for (let blank = 0; blank < offset; blank += 1) {
        cells += '<span class="cal-day cal-day--blank" aria-hidden="true"></span>';
      }
      for (let day = 1; day <= daysInMonth; day += 1) {
        const date = new Date(year, month, day);
        const key = dateKey(date);
        const matches = byDay.get(key) || [];
        const classes = ["cal-day"];
        if (key === todayKey) classes.push("cal-day--today");
        if (key === state.selected) classes.push("cal-day--selected");
        const aria = `${fullDate(date)}${matches.length ? `, ${matches.length} partido${matches.length === 1 ? "" : "s"}` : ", sin partidos"}`;
        cells += `
          <button class="${classes.join(" ")}" type="button" data-cal-day="${key}" aria-label="${esc(aria)}">
            <span class="cal-day__num">${day}</span>
            ${matches.length ? `<span class="cal-day__count">${matches.length}</span><span class="cal-day__dot"></span>` : ""}
          </button>`;
      }

      calendar.innerHTML = cells;
      if (title) title.textContent = `${monthName(state.view)} ${year}`;
      if (subtitle) {
        subtitle.textContent = `${monthFixtures.length} partido${monthFixtures.length === 1 ? "" : "s"} en el mes · horarios en tu hora local`;
      }
    };

    const emptyFixtureState = (selectedDate) => {
      const heading = selectedDate
        ? `Sin partidos el ${fullDate(selectedDate).toLowerCase()}`
        : `Sin partidos en ${monthName(state.view)}`;
      const copy = selectedDate
        ? "No hay encuentros programados para ese día. Probá con otra fecha o cambiá el filtro de división."
        : "El calendario todavía no tiene partidos cargados. Cuando se publique el fixture, los encuentros aparecerán acá automáticamente.";
      return `
        <div class="empty-state">
          <span class="empty-state__icon">${icons.calendar}</span>
          <h3>${esc(heading)}</h3>
          <p>${esc(copy)}</p>
        </div>`;
    };

    const fixtureCard = (fixture) => {
      const division = DIVISION_BY_ID.get(fixture.division);
      if (!division) return "";
      const isHome = fixture.venue !== "away";
      const opponent = fixture.opponent || "Rival";
      const matchup = isHome ? `Chicago Bulls vs ${opponent}` : `${opponent} vs Chicago Bulls`;
      return `
        <article class="fixture-card tone-${division.id}">
          <div class="fixture-card__date">
            <span class="fixture-card__day">${dayLabel(fixture.dateObj)}</span>
            <span class="fixture-card__month">${shortMonth(fixture.dateObj)}</span>
          </div>
          <div class="fixture-card__info">
            <div class="fixture-card__meta">
              <span class="div-badge">${esc(division.label)}</span>
              <span>${esc(fixture.competition || "Partido")}</span>
              <span>${isHome ? "Local" : "Visitante"}</span>
            </div>
            <h3>${esc(matchup)}</h3>
            <div class="fixture-card__meta"><span>${weekdayLabel(fixture.dateObj)}</span></div>
          </div>
          <div class="fixture-card__time">
            <strong>${timeLabel(fixture.dateObj)}</strong>
            <span>${esc(resultZone(fixture.dateObj))}</span>
          </div>
        </article>`;
    };

    const renderList = () => {
      if (!list) return;
      const year = state.view.getFullYear();
      const month = state.view.getMonth();
      let visible = filteredFixtures().filter(
        (fixture) => fixture.dateObj.getFullYear() === year && fixture.dateObj.getMonth() === month
      );

      if (state.selected) {
        visible = visible.filter((fixture) => dateKey(fixture.dateObj) === state.selected);
      }

      const selectedDate = state.selected
        ? new Date(`${state.selected}T12:00:00`)
        : null;

      if (listTitle) {
        listTitle.textContent = selectedDate
          ? `Partidos del ${fullDate(selectedDate).toLowerCase()}`
          : `Partidos de ${monthName(state.view).toLowerCase()}`;
      }
      if (count) {
        count.textContent = `${visible.length} partido${visible.length === 1 ? "" : "s"}`;
      }

      list.innerHTML = visible.length
        ? visible.map(fixtureCard).join("")
        : emptyFixtureState(selectedDate);
    };

    const render = () => {
      divisionChips(filters, state.division, (divisionId) => {
        state.division = divisionId;
        state.selected = null;
        render();
      });
      renderCalendar();
      renderList();
    };

    calendar.addEventListener("click", (event) => {
      const dayButton = event.target.closest("[data-cal-day]");
      if (!dayButton) return;
      state.selected = state.selected === dayButton.dataset.calDay ? null : dayButton.dataset.calDay;
      renderCalendar();
      renderList();
    });

    if (previousButton) {
      previousButton.addEventListener("click", () => {
        state.view = addMonths(state.view, -1);
        state.selected = null;
        renderCalendar();
        renderList();
      });
    }
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        state.view = addMonths(state.view, 1);
        state.selected = null;
        renderCalendar();
        renderList();
      });
    }
    if (todayButton) {
      todayButton.addEventListener("click", () => {
        const now = new Date();
        state.view = startOfMonth(now);
        state.selected = dateKey(now);
        renderCalendar();
        renderList();
      });
    }

    render();
  }

  /* ---------- Resultados ---------- */
  function initResultsPage() {
    const container = $("[data-results-list]");
    if (!container) return;

    const results = (Array.isArray(DATA.results) ? DATA.results : [])
      .map((result) => ({ ...result, dateObj: toDate(result.date) }))
      .filter((result) => result.dateObj)
      .sort((a, b) => b.dateObj - a.dateObj);

    const filters = $("[data-results-filters]");
    const empty = $("[data-results-empty]");
    const counters = $$("[data-results-count]");
    const state = { division: "all" };

    const dateLabel = (date) =>
      new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short", year: "numeric" })
        .format(date)
        .replace(".", "");

    const resultCard = (result) => {
      const division = DIVISION_BY_ID.get(result.division);
      if (!division) return "";
      const scoreFor = Number(result.scoreFor) || 0;
      const scoreAgainst = Number(result.scoreAgainst) || 0;
      const outcome = scoreFor > scoreAgainst ? "win" : scoreFor < scoreAgainst ? "loss" : "draw";
      const outcomeText = outcome === "win" ? "Victoria" : outcome === "loss" ? "Derrota" : "Empate";
      const opponent = result.opponent || "Rival";
      return `
        <article class="result-card tone-${division.id}">
          <div class="result-card__head">
            <span class="div-badge">${esc(division.label)}</span>
            <span>${esc(result.competition || "Partido")}</span>
            <time datetime="${esc(result.date)}">${esc(dateLabel(result.dateObj))}</time>
          </div>
          <div class="result-card__match">
            <div class="result-team">
              <span class="result-team__crest result-team__crest--club"><img src="img/logo.png" alt=""></span>
              <strong>Chicago Bulls</strong>
            </div>
            <div class="result-score">
              <strong>${scoreFor}<span>–</span>${scoreAgainst}</strong>
              <span class="result-status result-status--${outcome}">${outcomeText}</span>
            </div>
            <div class="result-team result-team--right">
              <strong>${esc(opponent)}</strong>
              <span class="result-team__crest">${esc(initials(opponent))}</span>
            </div>
          </div>
          <div class="result-card__venue">${result.venue === "away" ? "Visitante" : "Local"} · ${esc(division.name)}</div>
        </article>`;
    };

    const render = () => {
      divisionChips(filters, state.division, (divisionId) => {
        state.division = divisionId;
        render();
      });
      const visible = results.filter(
        (result) => state.division === "all" || result.division === state.division
      );
      container.innerHTML = visible.map(resultCard).join("");
      if (empty) empty.hidden = visible.length > 0;
      counters.forEach((element) => {
        element.textContent = `${visible.length} resultado${visible.length === 1 ? "" : "s"}`;
      });
    };

    render();
  }

  /* ---------- Museo ---------- */
  function initMuseumPage() {
    const grids = {
      collective: $('[data-museum-grid="collective"]'),
      individual: $('[data-museum-grid="individual"]'),
    };
    if (!grids.collective && !grids.individual) return;

    const museum = DATA.museum || {};
    const tabs = $$("[data-museum-tab]");
    const panels = $$("[data-museum-panel]");
    const counters = $$("[data-museum-count]");

    const emptyMarkup = (type) => {
      const isCollective = type === "collective";
      return `
        <div class="museum-empty">
          <span class="museum-empty__icon">${isCollective ? icons.trophy : icons.medal}</span>
          <h3>${isCollective ? "Vitrina en construcción" : "Premios por conquistar"}</h3>
          <p>${isCollective
            ? "Los títulos colectivos del club se exhibirán acá. La primera estrella todavía está por conquistarse."
            : "Los premios individuales tendrán su lugar en esta vitrina. El trabajo diario es el primer candidato."}</p>
          <div class="museum-shelf" aria-hidden="true"><span></span><span></span><span></span></div>
        </div>`;
    };

    const museumCard = (item, type) => {
      const division = DIVISION_BY_ID.get(item.division);
      const meta = [division ? division.label : "", item.year ? String(item.year) : ""]
        .filter(Boolean)
        .join(" · ");
      return `
        <article class="museum-card tone-${division ? division.id : "d1"}">
          <span class="museum-card__icon">${type === "collective" ? icons.trophy : icons.medal}</span>
          <div>
            <span class="museum-card__meta">${esc(meta || "Chicago Bulls")}</span>
            <h3>${esc(item.title || "Título")}</h3>
            ${item.description ? `<p>${esc(item.description)}</p>` : ""}
          </div>
        </article>`;
    };

    const render = (type) => {
      const grid = grids[type];
      if (!grid) return;
      const items = Array.isArray(museum[type]) ? museum[type] : [];
      grid.innerHTML = items.length ? items.map((item) => museumCard(item, type)).join("") : emptyMarkup(type);
      counters.forEach((counter) => {
        if (counter.dataset.museumCount === type) counter.textContent = pad2(items.length);
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const type = tab.dataset.museumTab;
        tabs.forEach((item) => {
          const active = item === tab;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-selected", String(active));
        });
        panels.forEach((panel) => {
          panel.hidden = panel.dataset.museumPanel !== type;
        });
        render(type);
      });
    });

    render("collective");
    render("individual");
  }

  /* ---------- Paneles del inicio ---------- */
  function initHomePanels() {
    const nextContainer = $("[data-next-fixture]");
    const resultsContainer = $("[data-latest-results]");
    if (!nextContainer && !resultsContainer) return;

    const fixtures = (Array.isArray(DATA.fixtures) ? DATA.fixtures : [])
      .map((fixture) => ({ ...fixture, dateObj: toDate(fixture.date) }))
      .filter((fixture) => fixture.dateObj)
      .sort((a, b) => a.dateObj - b.dateObj);

    const results = (Array.isArray(DATA.results) ? DATA.results : [])
      .map((result) => ({ ...result, dateObj: toDate(result.date) }))
      .filter((result) => result.dateObj)
      .sort((a, b) => b.dateObj - a.dateObj);

    if (nextContainer) {
      const now = new Date();
      const next = fixtures.find((fixture) => fixture.dateObj >= now);
      if (!next) {
        nextContainer.innerHTML = `
          <div class="panel-empty">
            <span class="panel-empty__icon">${icons.calendar}</span>
            <h4>Calendario por confirmar</h4>
            <p>El fixture todavía no está cargado. El próximo partido aparecerá acá en cuanto se publique.</p>
            <a class="text-link" href="fixture.html">Ver calendario ${icons.arrow}</a>
          </div>`;
      } else {
        const division = DIVISION_BY_ID.get(next.division);
        const dateText = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short" })
          .format(next.dateObj)
          .replace(".", "");
        const timeText = new Intl.DateTimeFormat("es-ES", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
          .format(next.dateObj);
        nextContainer.innerHTML = `
          <div class="next-match">
            <div class="next-match__teams">
              <div class="next-match__team">
                <span class="next-match__crest"><img src="img/logo.png" alt=""></span>
                Chicago Bulls
              </div>
              <span class="next-match__vs">VS</span>
              <div class="next-match__team">
                <span class="next-match__crest next-match__crest--rival">${esc(initials(next.opponent))}</span>
                ${esc(next.opponent || "Rival")}
              </div>
            </div>
            <div class="next-match__meta">
              ${division ? `<span class="div-badge tone-${division.id}">${esc(division.label)}</span>` : ""}
              <span><strong>${esc(capitalize(dateText))}</strong> · ${timeText} hs</span>
              <span>${esc(next.competition || "Partido")}</span>
            </div>
          </div>`;
      }
    }

    if (resultsContainer) {
      if (!results.length) {
        resultsContainer.innerHTML = `
          <div class="panel-empty">
            <span class="panel-empty__icon">${icons.chart}</span>
            <h4>Sin resultados todavía</h4>
            <p>Cuando ruede la pelota, los marcadores de las cinco divisiones van a aparecer en una sola lista.</p>
            <a class="text-link" href="resultados.html">Ver resultados ${icons.arrow}</a>
          </div>`;
      } else {
        resultsContainer.innerHTML = results.slice(0, 3).map((result) => {
          const division = DIVISION_BY_ID.get(result.division);
          const scoreFor = Number(result.scoreFor) || 0;
          const scoreAgainst = Number(result.scoreAgainst) || 0;
          const outcome = scoreFor > scoreAgainst ? "win" : scoreFor < scoreAgainst ? "loss" : "draw";
          const outcomeText = outcome === "win" ? "V" : outcome === "loss" ? "D" : "E";
          const dateText = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short" })
            .format(result.dateObj)
            .replace(".", "");
          return `
            <div class="mini-result">
              <div class="mini-result__teams">
                <strong>Chicago Bulls vs ${esc(result.opponent || "Rival")}</strong>
                <span>${esc(division ? division.label : "")} · ${esc(result.competition || "Partido")} · ${esc(dateText)}</span>
              </div>
              <div class="mini-result__score">${scoreFor}–${scoreAgainst}<em class="${outcome}">${outcomeText}</em></div>
            </div>`;
        }).join("");
      }
    }
  }

  /* ---------- Animaciones de aparición ---------- */
  function initReveals() {
    const elements = $$(".reveal:not(.is-visible)");
    if (!elements.length) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    elements.forEach((element) => observer.observe(element));
  }

  /* ---------- Arranque ---------- */
  function boot() {
    initLoader();
    initHeader();
    initClocks();
    initStaticContent();
    renderDivisions();
    renderStaffFeature();
    renderDivisionSwitcher();
    initHomePanels();
    initTeamPage();
    initStaffPage();
    initFixturePage();
    initStatsPage();
    initResultsPage();
    initMuseumPage();
    initReveals();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
