/* ============================================================
   MyoLand — game data
   Missions are fun, at-home NASAL BREATHING games — nose
   breathing, gentle breath-holds, puffer cheeks, humming, and
   nose-clearing drills — dressed up as silly adventure missions.
   ("Hiding the vegetables" — it's therapy, disguised as play.)
   ============================================================ */

const EXERCISES = [
  {
    id: "flower-candle",
    name: "Flower & Candle",
    emoji: "🌸",
    story: "A whole garden of flowers, each with a birthday candle!",
    instruction: "Smell the flower slooowly through your NOSE… then blow out its candle through your MOUTH. Tap after each smell-and-blow!",
    type: "reps",
    reps: 3,
    repLabel: "smell-and-blows",
    grownup: "Nasal inhale, slow oral exhale — the core of calm nasal breathing. Trains kids to breathe IN through the nose."
  },
  {
    id: "puffer",
    name: "Puffer Cheeks",
    emoji: "🐡",
    story: "The little pufferfish needs to puff up BIG to scare the shark!",
    instruction: "Breathe in through your nose, then puff both cheeks full of air like a pufferfish and hold. Keep your lips zipped tight!",
    type: "timer",
    seconds: 8,
    grownup: "Cheek puff and lip seal (buccinator + orbicularis oris) after a nasal breath — builds lip strength and breath control."
  },
  {
    id: "bunny-sniffs",
    name: "Bunny Sniffs",
    emoji: "🐰",
    story: "A bunny smelled yummy carrots in the garden!",
    instruction: "Close your mouth and take quick little sniffs through your nose — sniff, sniff, sniff — like a bunny! Tap after each sniff.",
    type: "reps",
    reps: 5,
    repLabel: "sniffs",
    grownup: "Quick nasal sniffs help wake up and clear a stuffy nose and reinforce breathing through the nose."
  },
  {
    id: "bee-hum",
    name: "Buzzy Bee Hum",
    emoji: "🐝",
    story: "Help the busy bee buzz all around the flowers!",
    instruction: "Close your mouth and huuuum like a bee — mmmmmm! Feel the buzzy tickle in your nose the whole time.",
    type: "timer",
    seconds: 8,
    grownup: "Humming (bee breath) boosts nasal airflow and nitric oxide, which helps the nasal passages feel more open."
  },
  {
    id: "dragon",
    name: "Dragon Breath",
    emoji: "🐲",
    story: "A friendly dragon is warming up its big breath!",
    instruction: "Take a BIG breath in through your NOSE, then let out a big warm dragon breath through your MOUTH — haaaah! Tap after each one.",
    type: "reps",
    reps: 4,
    repLabel: "dragon breaths",
    grownup: "Big nasal inhale with a long mouth exhale — practices deep nasal breathing and a slow, controlled out-breath."
  },
  {
    id: "superhero-nose",
    name: "Superhero Nose",
    emoji: "🦸",
    story: "Unlock your super-sniffer powers, one side at a time!",
    instruction: "Press one side of your nose with a finger and sniff through the other side. Then switch sides! Tap after each super-sniff.",
    type: "reps",
    reps: 4,
    repLabel: "super-sniffs",
    grownup: "A kid-friendly alternate-nostril breath — gently helps clear and open each nasal passage one side at a time."
  },
  {
    id: "hold-bubble",
    name: "Hold the Bubble",
    emoji: "🫧",
    story: "Catch a magic bubble of air and keep it safe!",
    instruction: "Breathe in through your nose, puff your cheeks, and hold your bubble of air. Don't let it pop until the count is done!",
    type: "timer",
    seconds: 5,
    grownup: "A short, gentle breath-hold after a nasal inhale — builds breath awareness and control. Keep it playful and brief."
  },
  {
    id: "feather-float",
    name: "Feather Float",
    emoji: "🪶",
    story: "Keep the magic feather floating up in the air!",
    instruction: "Take a big breath in through your nose, then blow a long, sloooow stream of air to keep the feather up. Don't let it fall!",
    type: "timer",
    seconds: 6,
    grownup: "A long, controlled exhale after a nasal inhale — builds breath control and a slow, steady out-breath."
  },
  {
    id: "nose-wiggle",
    name: "Nose Wiggle Wake-Up",
    emoji: "👃",
    story: "Time to wake up your sleepy nose!",
    instruction: "Scrunch and wiggle your nose like a bunny — wiggle, wiggle! Then take one happy breath through your nose. Tap after each wiggle.",
    type: "reps",
    reps: 6,
    repLabel: "wiggles",
    grownup: "Playful nose-scrunching wakes up the face and nose and helps kids tune in to breathing through the nose."
  },
  {
    id: "balloon-belly",
    name: "Balloon Belly",
    emoji: "🎈",
    story: "Fill your tummy up like a big happy balloon!",
    instruction: "Breathe in slooowly through your NOSE and fill your belly like a giant balloon. Watch it grow… then let it out nice and slow.",
    type: "timer",
    seconds: 6,
    grownup: "Slow diaphragmatic (belly) breathing through the nose — calming, and reinforces nasal over shallow mouth breathing."
  }
];

const CHARACTERS = [
  { id: "bunny",    name: "Bouncy",   emoji: "🐰", cost: 0 },
  { id: "frog",     name: "Zippy",    emoji: "🐸", cost: 0 },
  { id: "fox",      name: "Foxy",     emoji: "🦊", cost: 0 },
  { id: "cat",      name: "Whiskers", emoji: "🐱", cost: 50 },
  { id: "dog",      name: "Pup",      emoji: "🐶", cost: 75 },
  { id: "panda",    name: "Bamboo",   emoji: "🐼", cost: 100 },
  { id: "penguin",  name: "Waddles",  emoji: "🐧", cost: 125 },
  { id: "koala",    name: "Snuggle",  emoji: "🐨", cost: 150 },
  { id: "lion",     name: "Roary",    emoji: "🦁", cost: 175 },
  { id: "tiger",    name: "Stripes",  emoji: "🐯", cost: 200 },
  { id: "monkey",   name: "Cheeky",   emoji: "🐵", cost: 225 },
  { id: "owl",      name: "Hoot",     emoji: "🦉", cost: 250 },
  { id: "unicorn",  name: "Sparkle",  emoji: "🦄", cost: 300 },
  { id: "dragon",   name: "Blaze",    emoji: "🐲", cost: 350 },
  { id: "dino",     name: "Rexy",     emoji: "🦖", cost: 400 },
  { id: "octopus",  name: "Inky",     emoji: "🐙", cost: 450 },
  { id: "fairy",    name: "Pixie",    emoji: "🧚", cost: 500 },
  { id: "robot",    name: "Bolt",     emoji: "🤖", cost: 600 },
  { id: "sloth",    name: "Chill",    emoji: "🦥", cost: 700 },
  { id: "flamingo", name: "Fifi",     emoji: "🦩", cost: 850 }
];

const BUBBLE_COLORS = ["#ff7ab8", "#ffb84d", "#7ee081", "#6ec6ff", "#c39bff", "#ff8a80"];

const HATS = [
  { id: "none",  emoji: "",   name: "No hat" },
  { id: "party", emoji: "🎉", name: "Party" },
  { id: "crown", emoji: "👑", name: "Crown" },
  { id: "cap",   emoji: "🧢", name: "Cap" },
  { id: "bow",   emoji: "🎀", name: "Bow" },
  { id: "star",  emoji: "⭐", name: "Star" }
];

/* Sneaky veggie friends — the "hidden vegetables" of MyoLand */
const VEGGIES = [
  { emoji: "🥕", name: "Captain Carrot",  line: "Crunchy carrots give you super-sight AND a super smile!" },
  { emoji: "🥦", name: "Barry Broccoli",  line: "I'm a tiny tree that makes you grow strong branches — I mean, muscles!" },
  { emoji: "🌽", name: "Cornelius Corn",  line: "Pop pop! Golden corn keeps your energy popping all day!" },
  { emoji: "🫑", name: "Peppy Pepper",    line: "Peppers are nature's candy — sweet, crunchy, and full of pep!" },
  { emoji: "🍅", name: "Tommy Tomato",    line: "I make your cheeks rosy and your heart happy!" },
  { emoji: "🥒", name: "Cool Cucumber",   line: "Stay cool, breathe through your nose, and crunch on cucumbers!" }
];

const BOARD = {
  tiles: 30,
  veggieTiles: [4, 9, 14, 19, 24],
  starTiles: [6, 12, 21, 26],
  rainbowTiles: [8, 17],
  candyColors: ["#ff6fae", "#ffa94d", "#ffd43b", "#69db7c", "#4dabf7", "#b197fc"]
};

const COINS = {
  exercise: 5,
  veggie: 3,
  star: 3,
  finish: 20
};
