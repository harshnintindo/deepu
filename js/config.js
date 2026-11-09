/**
 * ===================================================================
 * 💛 HEIRLOOM MEMORY ALBUM CONFIGURATION FOR DEEPU
 * ===================================================================
 * Fully customizable: Edit her name, photos, heartfelt quotes,
 * timeline memories, and the grand closing letter.
 */

const BOOK_CONFIG = [
  {
    id: 1,
    photo: "images/di_1.jpeg",
    fallback: "images/1.jpg",
    line: "Deepu, this book is all about you.",
    subNote: "Every page, every word, every golden memory.",
    theme: "vintage-coffee",
    tag: "PAGE 01",
    tagline: "The Beginning of Us",
    sticker: "☕",
    caption: "Our sacred coffee dates & endless talks"
  },
  {
    id: 2,
    photo: "images/di_2.jpeg",
    fallback: "images/2.jpg",
    line: "You're the kind of friend people pray for.",
    subNote: "I truly got blessed with the absolute best.",
    theme: "film-strip",
    tag: "PAGE 02",
    tagline: "Pure Unfiltered Joy",
    sticker: "🎞️",
    caption: "Candid smiles & pure laughs"
  },
  {
    id: 3,
    photo: "images/di_3.jpeg",
    fallback: "images/3.jpg",
    line: "Your smile fixes bad days instantly.",
    subNote: "Literal warm sunshine in human form.",
    theme: "botanical-garden",
    tag: "PAGE 03",
    tagline: "Radiant Energy",
    sticker: "🌸",
    caption: "Blooming with kindness"
  },
  {
    id: 4,
    photo: "images/di_4.jpeg",
    fallback: "images/4.jpg",
    line: "Thank you for always understanding me, even when I don't make sense.",
    subNote: "Our unspoken secret language of glances & inside jokes.",
    theme: "vintage-postcard",
    tag: "PAGE 04",
    tagline: "Unspoken Connection",
    sticker: "💌",
    caption: "Special delivery from the heart"
  },
  {
    id: 5,
    photo: "images/di_5.jpeg",
    fallback: "images/5.jpg",
    line: "Every memory with you is my favorite one.",
    subNote: "And we're honestly just getting started.",
    theme: "fairy-lights",
    tag: "PAGE 05",
    tagline: "Golden Memories",
    sticker: "🌙",
    caption: "Under the stars & twinkling lights"
  },
  {
    id: 6,
    photo: "images/di_6.jpeg",
    fallback: "images/6.jpg",
    line: "Together we turn ordinary days into stories.",
    subNote: "Even boring errands turn into unforgettable comedy specials.",
    theme: "ticket-scrapbook",
    tag: "PAGE 06",
    tagline: "Everyday Adventures",
    sticker: "🎫",
    caption: "Lifetime VIP Bestie Pass"
  },
  {
    id: 7,
    photo: "images/di_7.jpeg",
    fallback: "images/7.jpg",
    line: "You're my person for the laughs, the chaos, and the late-night talks.",
    subNote: "3:00 AM crisis calls, wild theories, and endless tea.",
    theme: "retro-mixtape",
    tag: "PAGE 07",
    tagline: "Soundtrack of Us",
    sticker: "🎶",
    caption: "Side A • Endless conversations"
  },
  {
    id: 8,
    photo: "images/di_8.jpeg",
    fallback: "images/8.jpg",
    line: "I'm so proud of you, always.",
    subNote: "Cheering for you in the front row, louder than anyone else.",
    theme: "sunflower-sunshine",
    tag: "PAGE 08",
    tagline: "Proudest Bestie",
    sticker: "🌻",
    caption: "Golden hour glow & proud moments"
  },
  {
    id: 9,
    photo: "images/di_9.jpeg",
    fallback: "images/9.jpg",
    line: "No matter what happens, I've got you.",
    subNote: "Through thick, thin, heartbreaks, and victories.",
    theme: "pinky-promise",
    tag: "PAGE 09",
    tagline: "The Unbreakable Bond",
    sticker: "🤙",
    caption: "Pinky promise forever"
  },
  {
    id: 10,
    photo: "images/di_10.jpeg",
    fallback: "images/10.jpg",
    line: "Happy to have you, Deepu. You're my bestie forever 💛",
    subNote: "Forever and ever, no returns, no exchanges!",
    theme: "golden-celebration",
    tag: "PAGE 10",
    tagline: "Queen of My Heart",
    sticker: "👑",
    caption: "100% Best Friend Certified ✨"
  },
  {
    id: 11,
    photo: "images/di_11.jpeg",
    fallback: "images/1.jpg",
    line: "In the newspaper of my life, you're the front-page headline.",
    subNote: "Breaking news: having the greatest best friend in the world.",
    theme: "newspaper-chronicle",
    tag: "PAGE 11",
    tagline: "Front Page Exclusive",
    sticker: "📰",
    caption: "Special Edition: The Bestie Chronicle"
  },
  {
    id: 12,
    photo: "images/di_12.jpeg",
    fallback: "images/2.jpg",
    line: "Finding a friend like you feels like coming home.",
    subNote: "Warm tea, soft blankets, and someone who knows your soul.",
    theme: "cozy-cottagecore",
    tag: "PAGE 12",
    tagline: "Warm & Cozy",
    sticker: "🧺",
    caption: "Comfort and peace in every conversation"
  },
  {
    id: 13,
    photo: "images/di_13.jpeg",
    fallback: "images/3.jpg",
    line: "You shine brighter than any constellation in the sky.",
    subNote: "My personal guiding star in every chapter of life.",
    theme: "celestial-galaxy",
    tag: "PAGE 13",
    tagline: "Written in the Stars",
    sticker: "✨",
    caption: "Midnight magic & cosmic laughs"
  },
  {
    id: 14,
    photo: "images/di_14.jpeg",
    fallback: "images/4.jpg",
    line: "Captured moments, timeless laughter, and endless love.",
    subNote: "Some memories don't fade, they just get sweeter with time.",
    theme: "retro-polaroid-grid",
    tag: "PAGE 14",
    tagline: "Frozen in Time",
    sticker: "📷",
    caption: "Snapshots of our happiest chapters"
  },
  {
    id: 15,
    photo: "images/di_15.jpeg",
    fallback: "images/5.jpg",
    line: "If our friendship was a book, I'd read it a million times over.",
    subNote: "Penned in ink that never washes away.",
    theme: "antique-journal",
    tag: "PAGE 15",
    tagline: "A Tale of Two Souls",
    sticker: "✒️",
    caption: "Archival memories recorded with love"
  },
  {
    id: 16,
    photo: "images/di_16.jpeg",
    fallback: "images/6.jpg",
    line: "You bring calmness and color to my wildest storms.",
    subNote: "Like ocean waves carrying all the worries away.",
    theme: "ocean-breeze",
    tag: "PAGE 16",
    tagline: "Calm in the Storm",
    sticker: "🌊",
    caption: "Gentle breezes & golden sunsets"
  },
  {
    id: 17,
    photo: "images/di_17.jpeg",
    fallback: "images/7.jpg",
    line: "Growing, laughing, and blooming right alongside you.",
    subNote: "The sweetest metamorphosis with my favorite girl.",
    theme: "butterfly-garden",
    tag: "PAGE 17",
    tagline: "Wings & Dreams",
    sticker: "🦋",
    caption: "Always blossoming together"
  },
  {
    id: 18,
    photo: "images/di_18.jpeg",
    fallback: "images/8.jpg",
    line: "To my dearest Deepu: my confidante, my partner in crime, my sister at heart.",
    subNote: "Forever blessed, forever thankful, forever yours 💛",
    theme: "timeless-heirloom",
    tag: "PAGE 18",
    tagline: "The Grand Finale",
    sticker: "💖",
    caption: "A bond preserved for eternity"
  }
];

// Timeline Milestones (Our Memories Section)
const TIMELINE_MEMORIES = [
  {
    date: "The Day We Met",
    tag: "Chapter 1 • The Beginning 🌸",
    title: "Where It All Started",
    image: "images/di_14.jpeg",
    fallback: "images/memory1.svg",
    note: "Who knew that bumping into each other would turn into a lifetime of inside jokes? Within five minutes we were already laughing like we had known each other forever."
  },
  {
    date: "Late Night Talks",
    tag: "Chapter 2 • 3:00 AM Chronicles 🌙",
    title: "Late Night Talks & Survival Snacks",
    image: "images/di_15.jpeg",
    fallback: "images/memory2.svg",
    note: "Those chaotic study sessions that turned into 3:00 AM deep philosophical debates, cold pizza, terrible coffee, and laughing until our stomachs hurt."
  },
  {
    date: "First Spontaneous Trip",
    tag: "Chapter 3 • Adventure Mode ✈️",
    title: "Our First Spontaneous Getaway",
    image: "images/di_16.jpeg",
    fallback: "images/memory3.svg",
    note: "No strict itinerary, wrong turns at three different highway exits, blasting throwback songs on the aux, and finding the best sunset spot on Earth."
  },
  {
    date: "Photobooth Disaster",
    tag: "Chapter 4 • Pure Chaos 😂",
    title: "The Photobooth Disaster",
    image: "images/di_17.jpeg",
    fallback: "images/memory4.svg",
    note: "We tried so hard to take aesthetic photos, but we completely lost our composure on the countdown. Those goofy candid snapshots are still our most prized treasures."
  },
  {
    date: "Always & Forever",
    tag: "Chapter 5 • Unbreakable Bond 💛",
    title: "Through Everything, Side by Side",
    image: "images/di_18.jpeg",
    fallback: "images/memory5.svg",
    note: "Highs, lows, tears, victories, and everything in between. Thank you for always listening without judgment, cheering the loudest, and simply being the most wonderful friend."
  }
];

// Master Book Settings & Closing Letter
const BOOK_DETAILS = {
  cover: {
    name: "DEEPU",
    title: "Heirloom Memory Album",
    subtitle: "A celestial keepsake of memories, laughter, and unbreakable friendship",
    avatarUrl: "https://lh3.googleusercontent.com/aida/ALJJyrClhX1A4quBV4PMoUCndCBhBEvGuDZIf_Ar7ZLuH7m9BIuSGjgLv7zt_0OfCvkFY3P3_-Yv_CBmxEbIxSl-W46gQBNPNSTa3CPcW3JgKq3XNqWh6mmjilxUTCm-2vQ0CTAj7yBz0t3P1iR2o2T7kQQ8drDtYlSSmnaaqX1AaAuSmFeTlFRF4NjqLeGFqZhBwz1_HRBL3OD-rvkH3fzGDTVxKXayJ25lNdq-wQmB73N0gYoWWqexrBIPyvtQ",
    heroCoverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjB95RvEpNMR6BehMa1nKo-jC_tzAZECUn742QY8H8bGzb8II3qZrCeMZ3oaELm9FOWXMFQ7VaqvLDcl-v6-glJjj9nFJy8y_aDXyYEvkUcW_QOkj5x5Xx3azSwWgjFzWVI0vNOCG_lMu1hRkc-mWOfXkQQce3_NUwGYwLgfHcXG8bEbMfwXjv3icdNpD5dzAXP8e7pjeiXLtYEbD_fd9TlljrVBgNz5vLYbx5aCHPfmiPopZkJPWK4w"
  },

  finalLetter: {
    heading: "Oye Kubhkaran Deepu,",
    body: [
      "Class 6 se sar dard bani hui hai tu mera, aur Class 7 me jo tune meri bina baat ke kutton jaisi kutai kari hai na, uska hisaab uparwala lega tujhse! Mera to daily routine ban gaya tha tere thappad aur mukke chup-chaap sehna, pata nahi kis janam ka badla leti thi😭😭.",
      "Fir COVID ka tamasha ho gaya, saal bhar hum sab nalayak ghar pe pade rahe. Aur Class 9 aate hi madam doosre school phurr ho gayi! Poore do saal ke liye apan logo ki koi baaat dhang se nahi hui . Par jab do saal baad wapas baat shuru hui, to aisi shuru hui jaise pichhle minute hi chappal fek ke maari ho tune mujhe😁",
      "Fir aaya 11th ka sabse bada joke—main tehra Non-Med wala aur tu banne chali Commerce wali! Bhai, accounts ko leke jo hamara permanent kalesh chalta hai na, uska koi muqabla nahi. Main har baar tujhe yahi bol ke cheeda ta hoon ki \"abe dhang se add aur subtract to hota nahi tujhse, Commerce me kya ghanta ukhaad rahi hai?\" Aur bas, isi baat pe jo tu bilbila ke ladne lagti hai na, kasam se full entertainment milta hai mujhe! Par chal koi na. mujhe bas intna pta hai ki dark chocolate tujhe bhoot pasand hai nd sona or khana khana bhi bhukad bhi hai tu .",
      "Mere saare kaand aur nautanki sabse pehle tere or Sunidhi kaan me padti hai, aur tum dono ki bhi thodi bhoot harkate mujhe pata chalni chalui hagai hai .",
      "Aur sun, tu mujhse bas 3 din pehle paida ho gayi thi—tera 4 August aur mera 7 August. Iska ye matlab nahi ki tu meri daadi amma ban jaye, to ye senior banne ka rob apne paas hi rakhna!"
    ],
    signOff: "mai babygirl nahi hui😮💨",
    signature: "Tera lifetime punching bag 🥊"
  },

  music: {
    enabled: true,
    songName: "Beautiful",
    artist: "Amit Trivedi",
    audioSrc: "audio/beautiful.mp3",
    autoplayOnOpen: true,
    fallbackToSynthesizer: false
  }
};

// Global Browser Exports
if (typeof window !== 'undefined') {
  window.BOOK_CONFIG = BOOK_CONFIG;
  window.BOOK_DETAILS = BOOK_DETAILS;
  window.TIMELINE_MEMORIES = TIMELINE_MEMORIES;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BOOK_CONFIG, BOOK_DETAILS, TIMELINE_MEMORIES };
}

