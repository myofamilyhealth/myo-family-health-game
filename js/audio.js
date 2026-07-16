/* ============================================================
   MyoLand — tiny WebAudio sound kit (no audio files needed)
   ============================================================ */

const Sound = (() => {
  let ctx = null;
  let muted = false;

  function ensureCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, start, dur, type = "sine", gain = 0.18) {
    const c = ensureCtx();
    if (!c || muted) return;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime + start);
    g.gain.setValueAtTime(0.0001, c.currentTime + start);
    g.gain.linearRampToValueAtTime(gain, c.currentTime + start + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
    osc.connect(g).connect(c.destination);
    osc.start(c.currentTime + start);
    osc.stop(c.currentTime + start + dur + 0.05);
  }

  return {
    setMuted(m) { muted = m; },
    isMuted() { return muted; },
    unlock() { ensureCtx(); },
    pop()   { tone(520, 0, 0.09, "triangle", 0.22); },
    tap()   { tone(700, 0, 0.07, "square", 0.10); tone(1050, 0.02, 0.08, "triangle", 0.12); },
    coin()  { tone(880, 0, 0.09, "square", 0.10); tone(1320, 0.08, 0.16, "square", 0.10); },
    whoosh(){ tone(300, 0, 0.12, "sawtooth", 0.06); tone(480, 0.06, 0.12, "sawtooth", 0.06); },
    hop()   { tone(440, 0, 0.08, "triangle", 0.16); tone(660, 0.05, 0.08, "triangle", 0.14); },
    yay() {
      [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.22, "triangle", 0.16));
    },
    fanfare() {
      [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.12, 0.25, "triangle", 0.16));
    },
    tick()  { tone(980, 0, 0.05, "sine", 0.08); }
  };
})();
