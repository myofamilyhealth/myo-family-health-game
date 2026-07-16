# MyoLand — The Great Smile Adventure 🐰🌈🏰

A candy-colored, Candyland-style board game from **Myo Family Health** that gets kids
ages 4–8 practicing real **myofunctional therapy exercises** — without them ever
realizing it's therapy. We hide the vegetables. 🥕

## How it plays

1. **Pick a buddy** — choose a character, bubble color, and a fancy hat.
2. **Play a mission** — each turn presents a silly adventure mission ("Rocket Launch",
   "Balloon Cheeks", "Bunny Sniffs"…) that is secretly a real therapy exercise:
   tongue-tip placement, lip seal, nasal breathing, tongue mobility, and swallow practice.
   Timed missions use a big countdown ring; rep missions fill up stars with each tap.
3. **Hop along the trail** — finishing a mission earns **coins** and a magic spinner
   (1–3 spaces). Special tiles along the way:
   - ❓ **Hidden veggie friends** (Captain Carrot, Barry Broccoli…) — bonus coins and a
     sneaky bite of nutrition messaging
   - ⭐ **Lucky stars** — bonus coins
   - 🌈 **Rainbow slides** — jump ahead 2 spaces
4. **Reach Smile Castle** 🏰 — big coin reward, confetti, and play again!
5. **Spend coins** in the character shop to unlock new buddies (unicorn, dragon,
   dino, octopus, fairy).

Coins, unlocked characters, and customization persist between visits via
`localStorage`. Every mission card has a small "👋 Grown-ups" note explaining the
real therapeutic purpose of the exercise.

## Running it

It's a static site — no build step, no dependencies. Open `index.html` in a browser, or:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
index.html       # all screens (title, character pick/shop, board) + modal shell
css/style.css    # candy-bright theme, animations, responsive layout
js/data.js       # exercises, characters, hats, colors, veggie friends, board config
js/audio.js      # tiny WebAudio sound effects (no audio files)
js/game.js       # game state, board rendering, missions, tile events, persistence
```
