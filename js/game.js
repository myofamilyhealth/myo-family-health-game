/* ============================================================
   MyoLand — main game logic
   Screens: title → pick (character select/customize) → board
   Modals: exercise mission, spinner result, tile events, win
   ============================================================ */

const SAVE_KEY = "myoland-save-v1";

/* Grown-up skip link: index.html?skip=1 (or skip.html) lets you jump
   through the board without doing exercises or spinning the wheel. */
const SKIP_MODE = new URLSearchParams(location.search).has("skip");

const state = {
  coins: 0,
  owned: ["bunny", "frog", "fox"],
  character: "bunny",
  color: BUBBLE_COLORS[0],
  hat: "none",
  muted: false,
  // per-run
  pos: 0,
  veggiesFound: [],
  lastExerciseId: null,
  exerciseCounts: {},   // exercise id -> times completed this round
  busy: false
};

/* ---------- persistence ---------- */

function save() {
  localStorage.setItem(SAVE_KEY, JSON.stringify({
    coins: state.coins,
    owned: state.owned,
    character: state.character,
    color: state.color,
    hat: state.hat,
    muted: state.muted
  }));
}

function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    const s = JSON.parse(raw);
    if (typeof s.coins === "number") state.coins = s.coins;
    if (Array.isArray(s.owned)) state.owned = s.owned;
    if (CHARACTERS.some(c => c.id === s.character)) state.character = s.character;
    if (BUBBLE_COLORS.includes(s.color)) state.color = s.color;
    if (HATS.some(h => h.id === s.hat)) state.hat = s.hat;
    state.muted = !!s.muted;
  } catch (e) { /* corrupted save — start fresh */ }
}

/* ---------- helpers ---------- */

const $ = sel => document.querySelector(sel);
const charById = id => CHARACTERS.find(c => c.id === id);
const hatById = id => HATS.find(h => h.id === id);
const wait = ms => new Promise(r => setTimeout(r, ms));

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $("#" + id).classList.add("active");
}

function openModal(html, { dismissible = false } = {}) {
  const overlay = $("#modal-overlay");
  overlay.innerHTML = `<div class="modal pop-in">${html}</div>`;
  overlay.classList.add("open");
  overlay.onclick = dismissible ? (e => { if (e.target === overlay) closeModal(); }) : null;
}

function closeModal() {
  const overlay = $("#modal-overlay");
  overlay.classList.remove("open");
  overlay.innerHTML = "";
}

function updateHud() {
  $("#hud-coins").textContent = state.coins;
  const c = charById(state.character);
  $("#hud-char").textContent = c.emoji;
  $("#hud-veggies").textContent = state.veggiesFound.length;
  $("#mute-btn").textContent = state.muted ? "🔇" : "🔊";
}

function confettiBurst(count = 40) {
  const layer = $("#confetti-layer");
  const colors = BOARD.candyColors;
  for (let i = 0; i < count; i++) {
    const bit = document.createElement("div");
    bit.className = "confetti-bit";
    bit.style.left = (5 + Math.random() * 90) + "%";
    bit.style.background = colors[Math.floor(Math.random() * colors.length)];
    bit.style.animationDelay = (Math.random() * 0.4) + "s";
    bit.style.animationDuration = (1.4 + Math.random() * 1.2) + "s";
    bit.style.setProperty("--drift", (Math.random() * 140 - 70) + "px");
    layer.appendChild(bit);
    setTimeout(() => bit.remove(), 3200);
  }
}

function awardCoins(n) {
  state.coins += n;
  Sound.coin();
  updateHud();
  save();
  const chip = $("#hud-coin-chip");
  chip.classList.remove("bump");
  void chip.offsetWidth;
  chip.classList.add("bump");
}

/* ---------- board layout ---------- */

let tilePositions = []; // percent coords

/* Phones get a tall 5x6 board so the trail fills a portrait screen;
   wider screens keep the landscape 6x5 layout. */
function boardLayout() {
  return window.matchMedia("(max-width: 700px)").matches
    ? { cols: 5, rows: 6, vbW: 700, vbH: 1000, portrait: true }
    : { cols: 6, rows: 5, vbW: 1000, vbH: 700, portrait: false };
}

let builtPortrait = null;

function buildBoard() {
  const { cols, rows, vbW, vbH, portrait } = boardLayout();
  builtPortrait = portrait;
  const xStep = 82 / (cols - 1);
  const yStep = 78 / (rows - 1);
  tilePositions = [];
  for (let r = 0; r < rows; r++) {
    const y = 90 - r * yStep;
    for (let c = 0; c < cols; c++) {
      const col = (r % 2 === 0) ? c : cols - 1 - c;
      const x = 9 + col * xStep;
      const wobble = Math.sin((r * cols + c) * 1.7) * 2.2;
      tilePositions.push({ x, y: y + wobble });
    }
  }
  tilePositions = tilePositions.slice(0, BOARD.tiles);

  // path ribbon underneath
  const svg = $("#board-path");
  const pts = tilePositions.map(p => `${(p.x / 100) * vbW},${(p.y / 100) * vbH}`).join(" ");
  svg.setAttribute("viewBox", `0 0 ${vbW} ${vbH}`);
  const wOuter = vbW * 0.052, wInner = vbW * 0.04;
  svg.innerHTML =
    `<polyline points="${pts}" fill="none" stroke="#ffffff" stroke-width="${wOuter}" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>` +
    `<polyline points="${pts}" fill="none" stroke="#ffe3f1" stroke-width="${wInner}" stroke-linecap="round" stroke-linejoin="round"/>`;

  const layer = $("#tile-layer");
  layer.innerHTML = "";
  tilePositions.forEach((p, i) => {
    const t = document.createElement("div");
    t.className = "tile";
    t.style.left = p.x + "%";
    t.style.top = p.y + "%";
    if (i === 0) {
      t.classList.add("tile-start");
      t.textContent = "🏁";
    } else if (i === BOARD.tiles - 1) {
      t.classList.add("tile-finish");
      t.textContent = "🏰";
    } else if (BOARD.veggieTiles.includes(i)) {
      t.classList.add("tile-veggie");
      t.textContent = "❓";
    } else if (BOARD.starTiles.includes(i)) {
      t.classList.add("tile-star");
      t.textContent = "⭐";
    } else if (BOARD.rainbowTiles.includes(i)) {
      t.classList.add("tile-rainbow");
      t.textContent = "🌈";
    } else {
      t.style.background = BOARD.candyColors[i % BOARD.candyColors.length];
    }
    t.dataset.index = i;
    if (SKIP_MODE) {
      t.classList.add("tappable");
      t.addEventListener("click", () => jumpToTile(i));
    }
    layer.appendChild(t);
  });
}

function renderToken() {
  const token = $("#player-token");
  const c = charById(state.character);
  const hat = hatById(state.hat);
  token.innerHTML =
    `<span class="token-hat">${hat.emoji}</span><span class="token-face">${c.emoji}</span>`;
  token.style.background = state.color;
  placeToken(false);
}

function placeToken(animate = true) {
  const token = $("#player-token");
  const p = tilePositions[state.pos];
  // lift the token off its tile by a fraction of the row spacing, so it
  // sits right whether the board is the wide 6x5 or the tall 5x6 layout
  const { rows } = boardLayout();
  const lift = (78 / (rows - 1)) * 0.3;
  token.style.transition = animate ? "left .35s cubic-bezier(.5,1.6,.4,1), top .35s cubic-bezier(.5,1.6,.4,1)" : "none";
  token.style.left = p.x + "%";
  token.style.top = (p.y - lift) + "%";
}

async function moveToken(steps) {
  const target = Math.min(state.pos + steps, BOARD.tiles - 1);
  while (state.pos < target) {
    state.pos++;
    Sound.hop();
    placeToken(true);
    await wait(380);
  }
}

/* Skip mode: tap any tile to jump straight there. */
async function jumpToTile(index) {
  if (state.busy || index === state.pos) return;
  state.busy = true;
  const forward = index > state.pos;
  if (forward) {
    awardCoins(COINS.exercise);
    // snappier hops for longer jumps so a full-board skip stays quick
    const per = Math.min(120, Math.max(45, Math.round(900 / (index - state.pos))));
    while (state.pos < index) {
      state.pos++;
      Sound.hop();
      placeToken(true);
      await wait(per);
    }
  } else {
    Sound.whoosh();
    state.pos = index;
    placeToken(true);
    await wait(400);
  }
  await handleTile();
}

/* ---------- character select & shop ---------- */

function renderPickScreen() {
  $("#pick-coins").textContent = state.coins;
  const grid = $("#char-grid");
  grid.innerHTML = "";
  CHARACTERS.forEach(c => {
    const owned = state.owned.includes(c.id);
    const selected = state.character === c.id;
    const card = document.createElement("button");
    card.className = "char-card" + (selected ? " selected" : "") + (owned ? "" : " locked");
    card.innerHTML = `
      <span class="char-emoji">${c.emoji}</span>
      <span class="char-name">${c.name}</span>
      ${owned
        ? (selected ? `<span class="char-tag">Playing!</span>` : `<span class="char-tag pick">Pick me</span>`)
        : `<span class="char-cost">🪙 ${c.cost}</span>`}
    `;
    card.onclick = () => {
      Sound.pop();
      if (owned) {
        state.character = c.id;
        save();
        renderPickScreen();
        renderPreview();
      } else if (state.coins >= c.cost) {
        state.coins -= c.cost;
        state.owned.push(c.id);
        state.character = c.id;
        save();
        Sound.yay();
        confettiBurst(30);
        renderPickScreen();
        renderPreview();
      } else {
        card.classList.remove("shake");
        void card.offsetWidth;
        card.classList.add("shake");
        $("#pick-hint").textContent = `You need ${c.cost - state.coins} more coins for ${c.name}. Play to earn coins!`;
      }
    };
    grid.appendChild(card);
  });

  const colors = $("#color-row");
  colors.innerHTML = "";
  BUBBLE_COLORS.forEach(col => {
    const b = document.createElement("button");
    b.className = "color-dot" + (state.color === col ? " selected" : "");
    b.style.background = col;
    b.setAttribute("aria-label", "Bubble color");
    b.onclick = () => { Sound.pop(); state.color = col; save(); renderPickScreen(); renderPreview(); };
    colors.appendChild(b);
  });

  const hats = $("#hat-row");
  hats.innerHTML = "";
  HATS.forEach(h => {
    const b = document.createElement("button");
    b.className = "hat-dot" + (state.hat === h.id ? " selected" : "");
    b.textContent = h.emoji || "🚫";
    b.title = h.name;
    b.onclick = () => { Sound.pop(); state.hat = h.id; save(); renderPickScreen(); renderPreview(); };
    hats.appendChild(b);
  });

  renderPreview();
}

function renderPreview() {
  const c = charById(state.character);
  const hat = hatById(state.hat);
  const prev = $("#char-preview");
  prev.style.background = state.color;
  prev.innerHTML = `<span class="token-hat big">${hat.emoji}</span><span class="preview-face">${c.emoji}</span>`;
  $("#preview-name").textContent = c.name;
}

/* ---------- exercise missions ---------- */

/* ---------- exercise pool ----------
   Within a round an exercise leaves the draw after POOL.maxPlays
   completions; when the pool shrinks to POOL.resetAt it refills with
   everything again. This is a handful of array ops on 10 items, so it
   runs silently between turns and never touches the animation path. */

function eligibleExercises() {
  return EXERCISES.filter(e => (state.exerciseCounts[e.id] || 0) < POOL.maxPlays);
}

function resetExercisePool() {
  state.exerciseCounts = {};
}

// Called when an exercise is actually completed (not when it's skipped).
function noteExerciseCompleted(id) {
  state.exerciseCounts[id] = (state.exerciseCounts[id] || 0) + 1;
  if (eligibleExercises().length <= POOL.resetAt) resetExercisePool();
}

function pickExercise() {
  let pool = eligibleExercises();
  // never repeat the previous exercise back-to-back, as long as there's a choice
  const fresh = pool.filter(e => e.id !== state.lastExerciseId);
  if (fresh.length) pool = fresh;
  const ex = pool[Math.floor(Math.random() * pool.length)];
  state.lastExerciseId = ex.id;
  return ex;
}

function startTurn() {
  if (state.busy) return;
  state.busy = true;
  Sound.unlock();
  const ex = pickExercise();
  // Skip mode offers a choice: play the exercise through, or skip it.
  const buttons = SKIP_MODE
    ? `<div class="mission-btns">
         <button class="big-btn" id="mission-start">▶️ Play it!</button>
         <button class="big-btn alt" id="mission-skip">⏭️ Skip this one</button>
       </div>`
    : `<button class="big-btn" id="mission-start">Let's go!</button>`;
  openModal(`
    <div class="mission-emoji bounce">${ex.emoji}</div>
    <h2 class="mission-title">${ex.name}</h2>
    <p class="mission-story">${ex.story}</p>
    <p class="mission-instruction">${ex.instruction}</p>
    ${buttons}
    <details class="grownup-note"${SKIP_MODE ? " open" : ""}><summary>👋 Grown-ups</summary><p>${ex.grownup}</p></details>
  `);
  $("#mission-start").onclick = () => {
    Sound.pop();
    if (ex.type === "timer") runTimerMission(ex);
    else runRepsMission(ex);
  };
  if (SKIP_MODE) {
    $("#mission-skip").onclick = async () => {
      Sound.hop();
      closeModal();
      awardCoins(COINS.exercise);
      const steps = spinSteps();
      await moveToken(steps);
      await handleTile();
    };
  }
}

function runTimerMission(ex) {
  // Breath-hold exercises run two timers back to back: a short breathe-in,
  // then the hold itself. Everything else stays a single timer.
  const phases = ex.inhale
    ? [
        { key: "inhale", title: "🌬️ Breathe in…", hint: "Slow breath in through your nose…", secs: ex.inhale },
        { key: "hold",   title: "🫁 Hold it!",     hint: "Keep it in… you're doing great!",   secs: ex.seconds }
      ]
    : [{ key: "single", title: "", hint: "Keep going… you're doing great!", secs: ex.seconds }];
  const twoPhase = phases.length > 1;

  openModal(`
    <div class="mission-emoji wiggle">${ex.emoji}</div>
    <h2 class="mission-title">${ex.name}</h2>
    ${twoPhase ? `<div class="phase-steps">
      <span class="step" id="step-0">1️⃣ Breathe in</span>
      <span class="step" id="step-1">2️⃣ Hold</span>
    </div>` : ""}
    ${twoPhase ? `<p class="phase-label" id="phase-label"></p>` : ""}
    <div class="timer-ring" id="timer-ring"><span id="timer-num"></span></div>
    <p class="mission-instruction" id="phase-hint"></p>
  `);

  const ring = $("#timer-ring");
  const num = $("#timer-num");
  const hint = $("#phase-hint");
  const label = twoPhase ? $("#phase-label") : null;
  let pi = 0;
  let interval = null;

  function runPhase() {
    const p = phases[pi];
    let remaining = p.secs;
    if (label) label.textContent = p.title;
    hint.textContent = p.hint;
    num.textContent = remaining;
    ring.classList.toggle("inhale", p.key === "inhale");
    ring.style.setProperty("--deg", "0deg");
    if (twoPhase) {
      phases.forEach((_, i) => {
        const el = $("#step-" + i);
        el.classList.toggle("active", i === pi);
        el.classList.toggle("done", i < pi);
      });
    }
    if (p.key === "inhale") Sound.whoosh();

    interval = setInterval(() => {
      remaining--;
      if (remaining > 0) {
        Sound.tick();
        num.textContent = remaining;
        ring.style.setProperty("--deg", ((p.secs - remaining) / p.secs) * 360 + "deg");
      } else {
        clearInterval(interval);
        pi++;
        if (pi < phases.length) {
          Sound.pop();
          runPhase();
        } else {
          missionComplete(ex);
        }
      }
    }, 1000);
  }

  runPhase();
}

function runRepsMission(ex) {
  let done = 0;
  const stars = Array.from({ length: ex.reps }, () => "☆").join("");
  openModal(`
    <div class="mission-emoji wiggle">${ex.emoji}</div>
    <h2 class="mission-title">${ex.name}</h2>
    <div class="rep-stars" id="rep-stars">${stars}</div>
    <p class="mission-instruction">Tap the big button after every one of your ${ex.repLabel}!</p>
    <button class="big-btn rep-btn" id="rep-btn">${ex.emoji} I did one!</button>
  `);
  $("#rep-btn").onclick = () => {
    done++;
    Sound.tap();
    $("#rep-stars").textContent =
      "⭐".repeat(done) + "☆".repeat(Math.max(ex.reps - done, 0));
    if (done >= ex.reps) missionComplete(ex);
  };
}

const WHEEL_ORDER = [1, 2, 3, 1, 2, 3]; // clockwise from the top, 60° segments

async function missionComplete(ex) {
  noteExerciseCompleted(ex.id);
  Sound.yay();
  confettiBurst(35);
  const steps = spinSteps();
  const nums = WHEEL_ORDER
    .map((n, i) => `<span class="wheel-num" style="--a:${i * 60 + 30}deg">${n}</span>`)
    .join("");
  openModal(`
    <div class="mission-emoji bounce">🎉</div>
    <h2 class="mission-title">You did it!</h2>
    <p class="mission-story">+${COINS.exercise} coins for finishing <strong>${ex.name}</strong>!</p>
    <div class="wheel-wrap">
      <div class="wheel-pointer">▼</div>
      <div class="wheel" id="wheel">${nums}<div class="wheel-hub">🎡</div></div>
    </div>
    <button class="big-btn" id="spin-btn">Spin the wheel!</button>
    <button class="big-btn" id="go-move" hidden>Hop ${steps} ${steps === 1 ? "space" : "spaces"}!</button>
  `);
  awardCoins(COINS.exercise);

  $("#spin-btn").onclick = () => {
    const spinBtn = $("#spin-btn");
    spinBtn.disabled = true;
    Sound.whoosh();

    // land the pointer on a random segment showing `steps`
    const candidates = WHEEL_ORDER
      .map((n, i) => (n === steps ? i : -1))
      .filter(i => i >= 0);
    const seg = candidates[Math.floor(Math.random() * candidates.length)];
    const center = seg * 60 + 30;
    const jitter = Math.random() * 40 - 20;
    const rotation = 5 * 360 + (360 - center) + jitter;

    const wheel = $("#wheel");
    wheel.style.transition = "transform 3s cubic-bezier(.12,.75,.18,1)";
    wheel.style.transform = `rotate(${rotation}deg)`;

    // slowing click-clack while it spins
    let delay = 70;
    (function tick() {
      if (delay > 420) return;
      Sound.tick();
      delay *= 1.22;
      setTimeout(tick, delay);
    })();

    setTimeout(() => {
      Sound.yay();
      confettiBurst(15);
      spinBtn.hidden = true;
      const btn = $("#go-move");
      if (!btn) return;
      btn.hidden = false;
      btn.classList.add("pop-in");
      btn.onclick = async () => {
        closeModal();
        await moveToken(steps);
        await handleTile();
      };
    }, 3100);
  };
}

function spinSteps() {
  const r = Math.random();
  return r < 0.4 ? 1 : r < 0.8 ? 2 : 3;
}

/* ---------- tile events ---------- */

async function handleTile() {
  const i = state.pos;

  if (i >= BOARD.tiles - 1) return winGame();

  if (BOARD.veggieTiles.includes(i)) {
    const veg = VEGGIES[Math.floor(Math.random() * VEGGIES.length)];
    state.veggiesFound.push(veg.emoji);
    awardCoins(COINS.veggie);
    Sound.yay();
    confettiBurst(20);
    openModal(`
      <div class="mission-emoji bounce">${veg.emoji}</div>
      <h2 class="mission-title">You found ${veg.name}!</h2>
      <p class="mission-story">"${veg.line}"</p>
      <p class="mission-instruction">+${COINS.veggie} bonus coins! ${veg.name} joins your veggie basket!</p>
      <button class="big-btn" id="modal-ok">Yay!</button>
    `);
    $("#modal-ok").onclick = () => { closeModal(); endTurn(); };
    return;
  }

  if (BOARD.starTiles.includes(i)) {
    awardCoins(COINS.star);
    openModal(`
      <div class="mission-emoji bounce">⭐</div>
      <h2 class="mission-title">Lucky Star!</h2>
      <p class="mission-story">A shiny star gives you +${COINS.star} coins!</p>
      <button class="big-btn" id="modal-ok">Woohoo!</button>
    `);
    $("#modal-ok").onclick = () => { closeModal(); endTurn(); };
    return;
  }

  if (BOARD.rainbowTiles.includes(i)) {
    openModal(`
      <div class="mission-emoji bounce">🌈</div>
      <h2 class="mission-title">Rainbow Slide!</h2>
      <p class="mission-story">Wheee! The rainbow slides you 2 spaces ahead!</p>
      <button class="big-btn" id="modal-ok">Slide!</button>
    `);
    $("#modal-ok").onclick = async () => {
      closeModal();
      Sound.whoosh();
      await moveToken(2);
      await handleTile();
    };
    return;
  }

  endTurn();
}

function endTurn() {
  state.busy = false;
  updateHud();
}

function winGame() {
  state.busy = false;
  awardCoins(COINS.finish);
  Sound.fanfare();
  confettiBurst(80);
  const c = charById(state.character);
  const basket = state.veggiesFound.length
    ? `<p class="mission-instruction">Veggie friends found: ${state.veggiesFound.join(" ")}</p>`
    : "";
  openModal(`
    <div class="mission-emoji bounce">🏰</div>
    <h2 class="mission-title">${c.name} made it to Smile Castle!</h2>
    <p class="mission-story">+${COINS.finish} royal coins! Your smile muscles are getting SO strong!</p>
    ${basket}
    <p class="mission-story">🪙 Total coins: <strong>${state.coins}</strong></p>
    <div class="win-btns">
      <button class="big-btn" id="win-again">Play again!</button>
      <button class="big-btn alt" id="win-shop">Character shop</button>
    </div>
  `);
  $("#win-again").onclick = () => { closeModal(); startRun(); };
  $("#win-shop").onclick = () => { closeModal(); renderPickScreen(); showScreen("screen-pick"); };
}

/* ---------- run / screens ---------- */

function startRun() {
  state.pos = 0;
  state.veggiesFound = [];
  state.lastExerciseId = null;
  resetExercisePool();
  state.busy = false;
  buildBoard();
  renderToken();
  updateHud();
  showScreen("screen-board");
}

function init() {
  load();
  Sound.setMuted(state.muted);
  updateHud();

  if (SKIP_MODE) {
    document.body.classList.add("skip-mode");
    $("#go-btn").textContent = "▶️ Next mission";
  }
  $("#go-btn").onclick = startTurn;

  $("#title-play").onclick = () => {
    Sound.unlock();
    Sound.pop();
    renderPickScreen();
    showScreen("screen-pick");
  };

  $("#pick-go").onclick = () => { Sound.yay(); startRun(); };
  $("#pick-back").onclick = () => { Sound.pop(); showScreen("screen-title"); };
  $("#board-shop").onclick = () => {
    if (state.busy) return;
    Sound.pop();
    renderPickScreen();
    showScreen("screen-pick");
  };

  $("#mute-btn").onclick = () => {
    state.muted = !state.muted;
    Sound.setMuted(state.muted);
    save();
    updateHud();
  };

  // Rebuild the trail when the phone rotates across the layout breakpoint,
  // otherwise just re-seat the token. Debounced so rotation stays smooth.
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    if (!$("#screen-board").classList.contains("active")) return;
    placeToken(false);
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (boardLayout().portrait !== builtPortrait) {
        buildBoard();
        renderToken();
      }
    }, 150);
  });
}

document.addEventListener("DOMContentLoaded", init);
