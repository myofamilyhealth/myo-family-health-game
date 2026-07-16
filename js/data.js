/* ============================================================
   MyoLand — game data
   Exercises are real myofunctional therapy drills dressed up
   as silly adventure missions ("hiding the vegetables").
   ============================================================ */

const EXERCISES = [
  {
    id: "rocket",
    name: "Rocket Launch",
    emoji: "🚀",
    story: "Your rocket can't blast off without tongue power!",
    instruction: "Touch the tip of your tongue to the magic spot right behind your top front teeth. Hold it there while the rocket counts down!",
    type: "timer",
    seconds: 10,
    grownup: "Trains tongue-tip placement on the alveolar ridge — the foundation of proper oral rest posture."
  },
  {
    id: "pony",
    name: "Pony Rides",
    emoji: "🐴",
    story: "A pony needs to trot across the bridge — you make the hoof sounds!",
    instruction: "Click your tongue against the roof of your mouth to make a loud CLIP-CLOP sound. Tap the button after every clop!",
    type: "reps",
    reps: 10,
    repLabel: "clip-clops",
    grownup: "Tongue clicks build tongue-to-palate suction and strength."
  },
  {
    id: "balloon",
    name: "Balloon Cheeks",
    emoji: "🎈",
    story: "The balloon festival is starting and they need YOUR balloons!",
    instruction: "Take a big breath, puff your cheeks up like two giant balloons, and hold the air in. Keep your lips zipped tight!",
    type: "timer",
    seconds: 8,
    grownup: "Strengthens the buccinator and orbicularis oris muscles for lip seal."
  },
  {
    id: "zipit",
    name: "Zip It!",
    emoji: "🤐",
    story: "Shhh! We're sneaking past the sleeping giant!",
    instruction: "Press your lips together as tight as a zipper. Don't let a single giggle escape until the giant stops snoring!",
    type: "timer",
    seconds: 10,
    grownup: "Lip-seal hold — encourages closed-mouth rest posture and nasal breathing."
  },
  {
    id: "bunny",
    name: "Bunny Sniffs",
    emoji: "🐇",
    story: "A bunny smelled something yummy in the flower garden!",
    instruction: "Close your mouth and take slow, quiet sniffs through your nose like a bunny smelling flowers. Tap after every sniff!",
    type: "reps",
    reps: 5,
    repLabel: "sniffs",
    grownup: "Practices calm nasal breathing with the mouth closed."
  },
  {
    id: "lizard",
    name: "Lizard Licks",
    emoji: "🦎",
    story: "Lizzy the Lizard just ate a juicy berry — help her clean up!",
    instruction: "Stick out your tongue and slooowly lick all the way around your lips in a big circle. Tap after each full circle!",
    type: "reps",
    reps: 4,
    repLabel: "circles",
    grownup: "Circular tongue sweeps improve tongue mobility and range of motion."
  },
  {
    id: "fish",
    name: "Fish Face",
    emoji: "🐠",
    story: "To swim through Bubble Bay you must look like a fish!",
    instruction: "Suck your cheeks in and pucker your lips to make the silliest fish face ever. Hold it — don't laugh!",
    type: "timer",
    seconds: 8,
    grownup: "Cheek and lip pucker strengthens perioral muscles."
  },
  {
    id: "wipers",
    name: "Windshield Wipers",
    emoji: "🚗",
    story: "Uh oh, jelly rain! Wipe the windshield so we can drive on!",
    instruction: "Move your tongue side to side, touching each corner of your mouth. Swish, swash! Tap after every swish!",
    type: "reps",
    reps: 8,
    repLabel: "swishes",
    grownup: "Lateral tongue movement builds coordination and control."
  },
  {
    id: "sky",
    name: "Kiss the Sky",
    emoji: "😚",
    story: "The little cloud is lonely — send it a kiss!",
    instruction: "Stretch your tongue up, up, UP and try to touch your nose! Reach as high as you can and hold it!",
    type: "timer",
    seconds: 6,
    grownup: "Tongue elevation stretch — extends and strengthens the tongue upward."
  },
  {
    id: "magic",
    name: "Magic Swallow",
    emoji: "✨",
    story: "Drink the invisible magic potion to open the treasure gate!",
    instruction: "Put your tongue on the magic spot, smile big so we can see your teeth, and swallow without moving your lips. Tap after each magic swallow!",
    type: "reps",
    reps: 3,
    repLabel: "swallows",
    grownup: "Practices a correct swallow pattern with tongue-tip placement and no lip strain."
  }
];

const CHARACTERS = [
  { id: "bunny",   name: "Bouncy",  emoji: "🐰", cost: 0 },
  { id: "frog",    name: "Zippy",   emoji: "🐸", cost: 0 },
  { id: "fox",     name: "Foxy",    emoji: "🦊", cost: 0 },
  { id: "unicorn", name: "Sparkle", emoji: "🦄", cost: 100 },
  { id: "dragon",  name: "Blaze",   emoji: "🐲", cost: 150 },
  { id: "dino",    name: "Rexy",    emoji: "🦖", cost: 200 },
  { id: "octopus", name: "Inky",    emoji: "🐙", cost: 250 },
  { id: "fairy",   name: "Pixie",   emoji: "🧚", cost: 300 }
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
  exercise: 10,
  veggie: 5,
  star: 5,
  finish: 50
};
