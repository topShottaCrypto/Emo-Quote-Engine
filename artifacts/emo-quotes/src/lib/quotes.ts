export type Quote = {
  text: string;
  source: string;
  type: "lyric" | "trend";
};

export const EMO_LYRICS = [
  { text: "I am not afraid to keep on living. I am not afraid to walk this world alone.", source: "My Chemical Romance, Famous Last Words, 2006" },
  { text: "The best part of believe is the lie. I hope you sing along and you steal a line.", source: "Fall Out Boy, Sophmore Slump or Comeback of the Year, 2005" },
  { text: "What a shame the poor groom's bride is a whore.", source: "Panic! at the Disco, I Write Sins Not Tragedies, 2005" },
  { text: "Vindicated, I am selfish, I am wrong. I am right, I swear I'm right.", source: "Dashboard Confessional, Vindicated, 2004" },
  { text: "And will you tell all your friends you've got your gun to my head?", source: "Taking Back Sunday, Cute Without the 'E' (Cut from the Team), 2002" },
  { text: "I'm sinking like a stone in the sea. I'm burning like a bridge for your body.", source: "Brand New, The Boy Who Blocked His Own Shot, 2003" },
  { text: "It just takes some time, little girl, you're in the middle of the ride. Everything, everything will be just fine.", source: "Jimmy Eat World, The Middle, 2001" },
  { text: "I'm a fake, I'm a fake, I'm a fake, I'm a fake, I'm a fake.", source: "The Used, I'm a Fake, 2004" },
  { text: "Through our bleeding, we are one.", source: "AFI, Miss Murder, 2006" },
  { text: "Cut my wrists and black my eyes, so I can fall asleep tonight or die.", source: "Hawthorne Heights, Ohio Is for Lovers, 2004" },
  { text: "If you want me back, you're gonna have to ask nicer than that.", source: "Senses Fail, Buried a Lie, 2004" },
  { text: "That's what you get when you let your heart win.", source: "Paramore, That's What You Get, 2007" },
  { text: "I need you so much closer.", source: "Death Cab for Cutie, Transatlanticism, 2003" },
  { text: "Your eyes are the size of the moon. You could 'cause you can so you do.", source: "Bright Eyes, First Day of My Life, 2005" },
  { text: "In circles I'll be spinning around you.", source: "Sunny Day Real Estate, In Circles, 1994" },
  { text: "You're a fake and you know it. I'm a fake and I know it.", source: "Thursday, Understanding In A Car Crash, 2001" },
  { text: "Let it all bleed out.", source: "Saves the Day, At Your Funeral, 2001" },
  { text: "There's no one in the world like Emily.", source: "From First to Last, Emily, 2004" },
  { text: "So long and goodnight.", source: "My Chemical Romance, Helena, 2004" },
  { text: "Dance, dance, we're falling apart to half time.", source: "Fall Out Boy, Dance, Dance, 2005" },
  { text: "Don't bother trying to explain angel, I know exactly what goes on when you're on and how about I'm outside of your window?", source: "Taking Back Sunday, You're So Last Summer, 2002" },
  { text: "Hope is a letter that never arrives.", source: "AFI, The Leaving Song Pt. II, 2003" },
  { text: "We're going down, down in an earlier round. And sugar, we're going down swinging.", source: "Fall Out Boy, Sugar, We're Goin Down, 2005" },
  { text: "And I've got a dark alley and a bad idea that says you should shut your mouth.", source: "Fall Out Boy, I've Got A Dark Alley..., 2005" },
  { text: "Well, are you dead or are you sleeping?", source: "My Chemical Romance, The Jetset Life Is Gonna Kill You, 2004" }
];

export const TREND_PROMPTS = [
  "TikTok algorithm",
  "morning routine",
  "girl dinner",
  "main character energy",
  "cancel culture",
  "crypto crash",
  "remote work",
  "the metaverse",
  "grindset",
  "vibe shift",
  "red flags",
  "doomscrolling"
];

const TEMPLATES = [
  "X is just another reminder that nothing gold can stay — and neither can I.",
  "They told me X would save me. They lied, like everyone else.",
  "I pour my heart into X, but it only bleeds in black.",
  "What's the point of X when my soul is still trapped in 2005?",
  "I tried to find meaning in X, but all I found was another reason to cry.",
  "X feels like an empty diary waiting for tears.",
  "You can have your X, I'll take my broken heart.",
  "Even X can't fill the void you left behind.",
  "Trading my sanity for X, one tragic night at a time.",
  "X is the chorus of the saddest song I've ever known.",
  "We are all just tragic accidents waiting for X to happen.",
  "I trace my scars, thinking about X and the things we've lost.",
  "X is just another ghost haunting my peripheral vision.",
  "If X is the answer, I'd rather drown in the questions.",
  "Paint the town black, let X burn out the sun."
];

export function getRandomLyric(): Quote {
  const quote = EMO_LYRICS[Math.floor(Math.random() * EMO_LYRICS.length)];
  return { ...quote, type: "lyric" };
}

export function generateTrendQuote(trend: string): Quote {
  const template = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
  const text = template.replace(/X/g, trend);
  return { text, source: "Generated Despair, " + new Date().getFullYear(), type: "trend" };
}