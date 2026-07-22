# MyoLand — The Great Nose & Breathing Adventure 🐰🌈🏰

A candy-colored, Candyland-style board game from **Myo Family Health** that gets kids
ages 4–8 practicing fun **nasal breathing exercises** — nose breathing, gentle
breath-holds, puffer cheeks, humming, and nose-clearing games — without them ever
realizing it's therapy. Easy things anyone can do at home. We hide the vegetables. 🥕

## The exercises (all nose & breathing focused)

Flower & Candle (smell through the nose, blow out through the mouth), Puffer Cheeks,
Bunny Sniffs, Buzzy Bee Hum (humming to open the nose), Dragon Breath, Superhero Nose
(kid-friendly alternate-nostril sniffing), Hold the Bubble (gentle breath-hold),
Feather Float, Nose Wiggle Wake-Up, and Balloon Belly (slow belly breathing).

## How it plays

1. **Pick a buddy** — choose a character, bubble color, and a fancy hat.
2. **Play a mission** — each turn presents a silly adventure mission that is secretly a
   real nasal-breathing exercise. Timed missions use a big countdown ring; rep missions
   fill up stars with each tap.
3. **Hop along the trail** — finishing a mission earns **coins** and an animated prize
   wheel spin (1–3 spaces). Special tiles along the way:
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

## Grown-up Skip Mode

For previewing the game (or clicking through the board without doing exercises), open
**`skip.html`** (or add `?skip=1` to the URL). In skip mode each turn still shows the full
exercise card — so you can see exactly which exercise is given and read its grown-up note —
but instead of running the timer/reps and spinning the wheel, a "⏭️ Skip this one!" button
jumps the character forward 1–3 spaces instantly. Coins are still awarded and
veggie/star/finish tiles still appear, so the whole game is reviewable in seconds.

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
