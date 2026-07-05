// BWS drink data — extracted from script.js so the game page doesn't need the old Clubhouse stack.
// Source of truth for edits: keep in sync with script.js cocktailMenus / cocktailFortuneFlaps.
const cocktailMenus = {
  cocktail: [
    {
      name: "French 75",
      vibe: "For when you want champagne energy with a little structure.",
      order: "Gin, lemon, simple syrup, and bubbles.",
      note: "Elegant, bright, and very 'I have a hard stop at 7.'",
    },
    {
      name: "Pisco Sour",
      vibe: "For when the menu is boring but you are not.",
      order: "Pisco, lime, simple syrup, egg white, bitters.",
      note: "Silky, tart, dramatic enough to deserve a tiny garnish moment.",
    },
    {
      name: "Gin Sour",
      vibe: "For when you want classic, sharp, and not remotely beige.",
      order: "Gin, lemon, simple syrup, optional egg white.",
      note: "A clean little power suit of a drink.",
    },
    {
      name: "Cosmopolitan",
      vibe: "For when the meeting is over and Carrie Bradshaw can take the wheel.",
      order: "Vodka, cranberry, lime, orange liqueur.",
      note: "Pink, tart, iconic. No notes.",
    },
    {
      name: "Sidecar",
      vibe: "For when you want old-school fabulous without yelling about it.",
      order: "Cognac, orange liqueur, lemon.",
      note: "A tailored blazer in coupe-glass form.",
    },
    {
      name: "Margarita on the Rocks",
      vibe: "For when you want the classic answer and you want it with a salted rim.",
      order: "Tequila, lime, orange liqueur, rocks, salted rim.",
      note: "Crisp, obvious, correct. Sometimes the popular choice earned her seat.",
    },
    {
      name: "Paper Plane",
      vibe: "For when you want something modern-classic and secretly balanced.",
      order: "Bourbon, Aperol, amaro, lemon.",
      note: "Like a status update with an actual point.",
    },
    {
      name: "Aviation",
      vibe: "For when you want a little vintage glamour and a purple wink.",
      order: "Gin, lemon, maraschino, creme de violette.",
      note: "Pretty, floral, and not for people who fear a main character drink.",
    },
    {
      name: "Paloma",
      vibe: "For when you want tequila but also want to remain a person with standards.",
      order: "Tequila, grapefruit, lime, soda.",
      note: "Fresh, unfussy, and better than panic-ordering another vodka soda.",
    },
    {
      name: "Sparkling Rose",
      vibe: "For when the room needs bubbles and absolutely no one needs a speech.",
      order: "A chilled glass of sparkling rose.",
      note: "Pink, easy, and businesswomen's special approved.",
    },
    {
      name: "Yes, Get the Bottle",
      vibe: "For when the table has already done the math and the bottle is the responsible choice.",
      order: "Pick the wine, bubbles, or rose everyone will actually drink.",
      note: "Consensus, but with better glassware.",
    },
    {
      name: "Main Character Spritz",
      vibe: "For when the table needs tequila, bubbles, and a drink with its own entrance.",
      order: "Blanco tequila, Aperol, lemon, simple syrup, rocks, Prosecco, orange zest.",
      note: "Developed exclusively for LAiDIES by Ryan C at CHAR No.5. Ask for Ryan and tell him Ali sent you.",
    },
    {
      name: "Maid in Cuba",
      vibe: "For when a mojito and a daiquiri got an awards publicist.",
      order: "Rum, lime, simple syrup, mint, cucumber, absinthe rinse, soda.",
      note: "Bacardi Legacy 2014 global winner. Fresh, clever, and not the obvious order.",
    },
    {
      name: "Pink Me Up",
      vibe: "For when the drink should be pink, smart, and a little unexpected.",
      order: "Rum, tomato, orgeat, lemon, olive brine, basil.",
      note: "Bacardi Legacy 2019 global winner. Smooth, savory, and weird in the best way.",
    },
    {
      name: "Le Latin",
      vibe: "For when citrus wants a French wine subplot.",
      order: "Rum, white wine, lemon, olive brine, simple syrup.",
      note: "Bacardi Legacy 2015 global winner. Bright, salty, elegant, and not trying too hard.",
    },
    {
      name: "Venceremos",
      vibe: "For when tropical needs to stop being predictable.",
      order: "Rum, pineapple, cucumber, lime, coconut, sesame oil.",
      note: "Bacardi Legacy 2016 global winner. A pina colada idea with a sharper passport.",
    },
    {
      name: "Speak Low",
      vibe: "For when the room gets quieter and the drink gets more interesting.",
      order: "Rum, matcha, sherry, yuzu.",
      note: "Bacardi Legacy 2012 global winner. Ceremony, restraint, and main-character taste.",
    },
    {
      name: "Carino",
      vibe: "For when dessert energy grows up and gets a reservation.",
      order: "Aged rum, Greek yogurt, vanilla, lemon, yellow Chartreuse.",
      note: "Bacardi Legacy 2018 global winner. Creamy, bright, and genuinely memorable.",
    },
    {
      name: "Clarita",
      vibe: "For when the after-hours table wants something stirred and lethal-looking.",
      order: "Aged rum, sherry, cacao, absinthe, salt, olive oil.",
      note: "Bacardi Legacy 2017 global winner. Bitter, glossy, and deeply adult.",
    },
    {
      name: "Out of Sight",
      vibe: "For when tropical turns soft, green, and quietly expensive.",
      order: "Rum, pineapple, basil, yogurt, lemon, agave.",
      note: "Bacardi Legacy 2021 global winner. A weird little luxury, in a good way.",
    },
  ],
  spiritFree: [
    {
      name: "Faux French 75",
      vibe: "For champagne energy without the champagne logistics.",
      order: "Lemon, simple syrup, non-alcoholic bubbles, and a twist.",
      note: "Bright, crisp, and still dressed for the calendar invite.",
    },
    {
      name: "No-groni Spritz",
      vibe: "For when you want bitter, glossy, and above the group text drama.",
      order: "Non-alcoholic aperitif, orange, soda, rocks.",
      note: "The main-character glass without the next-day plot hole.",
    },
    {
      name: "Cucumber Spritz",
      vibe: "For when the room needs spa water that got promoted.",
      order: "Cucumber, lime, mint, soda, tiny pinch of salt.",
      note: "Cool, sharp, and very 'I already read the pre-read.'",
    },
    {
      name: "Ginger Mule",
      vibe: "For when you need sparkle with a little backtalk.",
      order: "Ginger beer, lime, mint, crushed ice.",
      note: "Zippy enough to answer the email. Polite enough not to.",
    },
    {
      name: "Coconut Colada",
      vibe: "For when your calendar says quarterly planning but your soul says vacation episode.",
      order: "Coconut, pineapple, lime, crushed ice.",
      note: "A tiny out-of-office reply in a glass.",
    },
    {
      name: "Paloma-ish",
      vibe: "For when grapefruit is doing all the heavy lifting and deserves recognition.",
      order: "Grapefruit, lime, agave, soda, salted rim.",
      note: "Fresh, punchy, and not here for beige beverages.",
    },
    {
      name: "Mint Mojito-ish",
      vibe: "For when you want patio energy without the plot complications.",
      order: "Mint, lime, simple syrup, soda, crushed ice.",
      note: "Clean, sparkly, and emotionally available.",
    },
    {
      name: "Zero Rose Fizz",
      vibe: "For when the table wants pink bubbles and no committee meeting.",
      order: "Alcohol-free rose, soda, raspberry, lemon.",
      note: "Soft launch the sparkle. Keep the standards.",
    },
    {
      name: "Espresso Tonic",
      vibe: "For when happy hour is actually a rebrand of caffeine.",
      order: "Espresso, tonic, orange peel, lots of ice.",
      note: "The 9 to 5 cup of ambition with a better outfit.",
    },
    {
      name: "Pink Lemonade Upgrade",
      vibe: "For when nostalgia deserves a promotion.",
      order: "Lemon, berry syrup, soda, sugared rim.",
      note: "Mall-food-court classic, executive edit.",
    },
    {
      name: "Arnold Palmer, Corporate Goth",
      vibe: "For when iced tea and lemonade came prepared with talking points.",
      order: "Black tea, lemonade, lemon wheel, big ice.",
      note: "Serious enough for notes. Cute enough for a straw.",
    },
    {
      name: "Berry Fizz",
      vibe: "For when the answer is bubbles and a little color theory.",
      order: "Muddled berries, lime, soda, mint.",
      note: "Pretty, useful, and impossible to call boring.",
    },
    {
      name: "Maid in Cuba-ish",
      vibe: "For when you want the award-winner's fresh cucumber-mint energy, zero proof.",
      order: "Lime, mint, cucumber, simple syrup, soda, tiny absinthe-style botanical note.",
      note: "Zero-proof riff on the Bacardi Legacy 2014 global winner.",
    },
    {
      name: "Pink Me Up-ish",
      vibe: "For when the zero-proof choice should still be pink and highly specific.",
      order: "Tomato water, orgeat, lemon, olive brine, basil.",
      note: "Zero-proof riff on the Bacardi Legacy 2019 global winner.",
    },
    {
      name: "Le Latin-ish",
      vibe: "For when citrus needs a salty little wine-bar attitude.",
      order: "Verjus, lemon, olive brine, simple syrup, chilled soda.",
      note: "Zero-proof riff on the Bacardi Legacy 2015 global winner.",
    },
    {
      name: "Venceremos-ish",
      vibe: "For when tropical wants cucumber, sesame, and a little nerve.",
      order: "Pineapple, lime, cucumber, coconut water, toasted sesame.",
      note: "Zero-proof riff on the Bacardi Legacy 2016 global winner.",
    },
    {
      name: "Speak Low-ish",
      vibe: "For when the non-alcoholic drink should still feel like a ceremony.",
      order: "Matcha, yuzu, black tea, demerara, citrus mist.",
      note: "Zero-proof riff on the Bacardi Legacy 2012 global winner.",
    },
    {
      name: "Carino-ish",
      vibe: "For when creamy, bright, and polished is the brief.",
      order: "Greek yogurt, vanilla, lemon, herbal syrup, chilled soda.",
      note: "Zero-proof riff on the Bacardi Legacy 2018 global winner.",
    },
    {
      name: "Clarita-ish",
      vibe: "For when zero proof still wants to sit in the dark corner booth.",
      order: "Oloroso-style tea, cacao, saline, orange oil, bitter botanical syrup.",
      note: "Zero-proof riff on the Bacardi Legacy 2017 global winner.",
    },
    {
      name: "Out of Sight-ish",
      vibe: "For when pineapple and basil need to feel surprisingly grown.",
      order: "Pineapple, basil, lemon, agave, yogurt foam.",
      note: "Zero-proof riff on the Bacardi Legacy 2021 global winner.",
    },
  ],
};

const cocktailFortuneFlaps = [
  {
    label: "Bubble",
    description: "sparkly, easy, celebratory",
    count: 6,
    drinks: {
      cocktail: [0, 9, 10, 13, 19],
      spiritFree: [0, 7, 11, 13, 19],
    },
  },
  {
    label: "Citrus",
    description: "bright, tart, fresh",
    count: 6,
    drinks: {
      cocktail: [1, 2, 5, 8, 12, 15],
      spiritFree: [2, 3, 5, 6, 12, 15],
    },
  },
  {
    label: "Classic",
    description: "polished, iconic, not trying too hard",
    count: 7,
    drinks: {
      cocktail: [3, 4, 7, 14, 17],
      spiritFree: [4, 9, 10, 14, 17],
    },
  },
  {
    label: "After Dark",
    description: "bitter, bold, second-shift energy",
    count: 9,
    drinks: {
      cocktail: [6, 11, 16, 18],
      spiritFree: [1, 8, 16, 18],
    },
  },
];

window.cocktailMenus = cocktailMenus;
window.cocktailFortuneFlaps = cocktailFortuneFlaps;
