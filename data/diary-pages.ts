export interface PageDoodle {
  type: 'star' | 'heart' | 'sparkle' | 'flower' | 'coffee-ring' | 'tape' | 'stamp' | 'ribbon' | 'peg' | 'butterfly-clip' | 'admit-ticket' | 'film-strip' | 'paperclip' | 'code-tape' | 'lighthouse' | 'airplane' | 'sticker';
  stickerSrc?: string;
  width?: number;
  height?: number;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  rotation?: number;
  scale?: number;
  opacity?: number;
}

export interface DiaryPageContent {
  pageNumber: number;
  date?: string;
  weather?: string;
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
  handwrittenNotes?: string[];
  listItems?: Array<{ checked: boolean; text: string; note?: string }>;
  quote?: { text: string; author?: string };
  doodles?: PageDoodle[];
  signature?: string;
  stampText?: string;
  isCoverPage?: boolean;
  image?: {
    src: string;
    alt: string;
    caption?: string;
    aspect?: 'portrait' | 'square' | 'wide' | 'cover';
    style?: 'polaroid' | 'clean' | 'framed' | 'diorama' | 'cover-full';
  };
  wishes?: Array<{ id: string; color: string; title: string; message: string; from?: string }>;
  interactiveCake?: boolean;
}

export interface DiarySpreadData {
  id: string;
  spreadNumber: number;
  chapterLabel?: string;
  leftPage: DiaryPageContent;
  rightPage: DiaryPageContent;
}

export const DIARY_METADATA = {
  recipientName: "Khushboo",
  celebrationYear: "2026",
  coverTitle: "Birthday Diary ♡",
  coverSubtitle: "for my favorite human",
  coverDate: "October 2026",
  authorNote: "with all my love ♡",
};

export const DIARY_SPREADS: DiarySpreadData[] = [
  // SPREAD 1: Welcome & Opening Note
  {
    id: "spread-1",
    spreadNumber: 1,
    chapterLabel: "I. The Beginning",
    leftPage: {
      pageNumber: 1,
      date: "Special Edition • 2026",
      weather: "Warm sunbeams & cozy vibes ☀️",
      title: "Dear Khushboo,",
      subtitle: "Happy Birthday to my favorite human!",
      paragraphs: [
        "Welcome to your very own personal birthday diary.",
        "A quiet space to step into whenever the world gets too noisy. Somewhere to keep safe all our shared laughter, silly inside jokes, late-night talks, little victories, and sweet moments that make you so irreplaceable.",
        "Take a slow breath. Turn the pages whenever you're ready.",
      ],
      quote: {
        text: "Good Things Take Time ☺ ♡",
        author: "a gentle reminder",
      },
      handwrittenNotes: [
        "\"More smiles, more dreams, more you ♡\"",
      ],
      doodles: [
        { type: "peg", position: { top: "10px", right: "20px" }, scale: 0.9 },
        { type: "butterfly-clip", position: { bottom: "25px", left: "20px" }, scale: 0.8 },
        { type: "sticker", stickerSrc: "/stickers/megaphone-kitten.png", position: { bottom: "12px", right: "12px" }, width: 82, height: 70, rotation: -4 },
      ],
    },
    rightPage: {
      pageNumber: 2,
      title: "For the gentlest soul",
      image: {
        src: "/images/illustrations/flowers.jpg",
        alt: "Chibi character holding a delicate bouquet of roses and chamomile",
        caption: "May your coming year be as gentle and blooming as wild chamomile, Khushboo.",
        style: "framed",
      },
      paragraphs: [
        "Here's to celebrating who you are today, and every small spark you bring into this life without even realizing it.",
      ],
      doodles: [
        { type: "butterfly-clip", position: { top: "15px", right: "20px" }, rotation: 12 },
        { type: "heart", position: { bottom: "20px", left: "25px" }, scale: 0.8 },
        { type: "sticker", stickerSrc: "/stickers/glasses-bouquet-cat.png", position: { bottom: "14px", right: "14px" }, width: 80, height: 98, rotation: 6 },
      ],
    },
  },

  // SPREAD 2: Another Orbit
  {
    id: "spread-2",
    spreadNumber: 2,
    chapterLabel: "II. Turning Pages",
    leftPage: {
      pageNumber: 3,
      date: "Page 03 • Reflections",
      title: "Another Orbit Around the Sun",
      paragraphs: [
        "Time moves in such strange ways. One day we are counting down the days until summer, and the next, autumn leaves are twirling on the sidewalks.",
        "Through every season, you carry this soft, steady warmth with you, Khushboo. The way you genuinely listen when people speak, the way your laugh rings across the room, the kindness you quietly give without ever asking for applause.",
        "This little book is simply a mirror to remind you of that magic.",
      ],
      quote: {
        text: "Some people are like soft lamplight on a rainy evening—they make the whole room feel like home.",
        author: "from the diary",
      },
      doodles: [
        { type: "code-tape", position: { bottom: "12px", left: "15px" }, rotation: -1 },
        { type: "coffee-ring", position: { top: "10px", right: "15px" }, scale: 0.7, opacity: 0.15 },
        { type: "sticker", stickerSrc: "/stickers/white-cat-pink-bow.png", position: { bottom: "10px", right: "14px" }, width: 80, height: 80, rotation: 6 },
      ],
    },
    rightPage: {
      pageNumber: 4,
      title: "Things I Love About You",
      subtitle: "A quick list from the heart",
      paragraphs: [
        "Your contagious excitement over small stationery, bookstore smells, and that one very specific cafe playlist.",
        "How you remember the smallest details someone mentioned three months ago.",
        "The gentle patience you give to everyone around you (now remember to give some of that patience to yourself too!).",
      ],
      handwrittenNotes: [
        "Never lose that spark in your eyes, Khushboo! ✨",
      ],
      doodles: [
        { type: "stamp", position: { top: "18px", right: "20px" }, rotation: 8 },
        { type: "sticker", stickerSrc: "/stickers/heart-paws-bow-cat.png", position: { bottom: "12px", right: "14px" }, width: 82, height: 98, rotation: -6 },
      ],
    },
  },

  // SPREAD 3: A Favorite Memory
  {
    id: "spread-3",
    spreadNumber: 3,
    chapterLabel: "III. Snapshots",
    leftPage: {
      pageNumber: 5,
      date: "Spring Memories • April 14",
      weather: "Cherry blossoms & warm milk tea 🌸",
      title: "The Sakura Afternoon",
      paragraphs: [
        "Do you remember that afternoon when we lost track of time sitting by the park bench?",
        "We said we would only stay for twenty minutes, but we ended up sharing three cups of boba, talking about childhood dreams, favourite songs, and laughing until our stomachs hurt.",
        "The petals were falling like pink snow, and you said: 'I wish we could pause this exact second and tuck it into a pocket.'",
        "Well Khushboo, here it is—safely tucked right into page five.",
      ],
      doodles: [
        { type: "tape", position: { top: "-12px", right: "30%" }, rotation: 3 },
        { type: "flower", position: { bottom: "25px", left: "30px" }, scale: 0.8 },
        { type: "sticker", stickerSrc: "/stickers/white-fluffy-cat-face.png", position: { bottom: "12px", right: "14px" }, width: 80, height: 80, rotation: 4 },
      ],
      stampText: "CHERISHED MEMORY",
    },
    rightPage: {
      pageNumber: 6,
      image: {
        src: "/images/illustrations/polaroid.jpg",
        alt: "Polaroid snapshot of cute chibi friends sharing boba on a park bench",
        caption: "Spring Memories • Our eternal bench under the cherry trees",
        style: "polaroid",
      },
      handwrittenNotes: [
        "\"Some moments never fade, they just turn into gold.\" 📸",
      ],
      doodles: [
        { type: "peg", position: { top: "-10px", left: "45%" } },
        { type: "sparkle", position: { bottom: "15px", left: "20px" } },
        { type: "sticker", stickerSrc: "/stickers/red-kitty-camera.png", position: { bottom: "10px", right: "12px" }, width: 76, height: 104, rotation: 8 },
      ],
    },
  },

  // SPREAD 4: Things That Make You Special
  {
    id: "spread-4",
    spreadNumber: 4,
    chapterLabel: "IV. The Little Things",
    leftPage: {
      pageNumber: 7,
      date: "A Field Guide to Khushboo",
      title: "Things That Make You, You",
      subtitle: "Certified 100% genuine & irreplaceable",
      listItems: [
        { checked: true, text: "Having the most comforting hugs in the entire universe." },
        { checked: true, text: "Your instinctive urge to take aesthetic photos of the sky when the sunset turns pink." },
        { checked: true, text: "Listening to the same song on repeat 47 times in a row without getting tired of it." },
        { checked: true, text: "Your secret superpower: making everyone feel instantly welcome and heard." },
        { checked: true, text: "Always knowing the right thing to say when someone had a long, exhausting day." },
        { checked: true, text: "Making the most adorable sound whenever you see a fluffy cat or puppy." },
      ],
      handwrittenNotes: [
        "Checked & verified by yours truly ✔️",
      ],
      doodles: [
        { type: "heart", position: { bottom: "30px", left: "20px" }, scale: 0.9 },
        { type: "sticker", stickerSrc: "/stickers/white-daisy-bunch-sketch.png", position: { bottom: "12px", right: "12px" }, width: 70, height: 95, rotation: -6 },
      ],
    },
    rightPage: {
      pageNumber: 8,
      title: "Margin Doodles & Whispers",
      paragraphs: [
        "I was thinking about all the versions of you that exist in people's memories, Khushboo:",
        "To a stranger on the street, you are the courteous girl who held the door. To a barista, you're the sunny regular with the gentle order.",
        "To me, you are an anchor, a favourite adventure companion, and the truest kind of friend anyone could ever ask the universe for.",
      ],
      handwrittenNotes: [
        "Thank you for being in my world, Khushboo ♡",
      ],
      doodles: [
        { type: "flower", position: { top: "30px", left: "25px" }, scale: 0.8 },
        { type: "sparkle", position: { bottom: "40px", left: "40px" }, scale: 1.1 },
        { type: "sticker", stickerSrc: "/stickers/strawberry-swirl-scoop.png", position: { bottom: "14px", right: "18px" }, width: 52, height: 52, rotation: 8 },
      ],
    },
  },

  // SPREAD 5: An Illustrated Moment
  {
    id: "spread-5",
    spreadNumber: 5,
    chapterLabel: "V. Under The Stars",
    leftPage: {
      pageNumber: 9,
      date: "Starlight Whispers",
      title: "A Night Full of Wishes",
      paragraphs: [
        "Remember when we looked up at the stars and made ridiculous wishes that seemed too big for our shoes?",
        "Watching you grow, chase after your dreams, stumble sometimes, pick yourself back up, and keep going with that soft courage of yours—it inspires me constantly.",
        "Every star in the night sky has its own time to shine. Don't rush yourself. You are right where you need to be.",
      ],
      quote: {
        text: "The stars don't compete with the moon. They just light up the sky together.",
      },
      doodles: [
        { type: "star", position: { top: "20px", left: "20px" }, scale: 0.9 },
        { type: "sparkle", position: { bottom: "25px", left: "25px" } },
        { type: "sticker", stickerSrc: "/stickers/smiling-yellow-star.png", position: { bottom: "12px", right: "14px" }, width: 80, height: 80, rotation: 10 },
      ],
    },
    rightPage: {
      pageNumber: 10,
      image: {
        src: "/images/illustrations/stargazing.jpg",
        alt: "Chibi friends stargazing under the twinkling galaxy",
        caption: "Underneath a billion stars, counting blessings and laughing softly.",
        style: "diorama",
      },
      handwrittenNotes: [
        "\"May your wishes travel farther than the furthest comet.\" 🌌",
      ],
      doodles: [
        { type: "airplane", position: { top: "15px", left: "20px" }, scale: 0.8 },
        { type: "heart", position: { bottom: "15px", left: "25px" }, scale: 0.75 },
        { type: "sticker", stickerSrc: "/stickers/bunny-plush-headphones.png", position: { bottom: "12px", right: "14px" }, width: 78, height: 78, rotation: -6 },
      ],
    },
  },

  // SPREAD 6: A Letter
  {
    id: "spread-6",
    spreadNumber: 6,
    chapterLabel: "VI. Heart to Heart",
    leftPage: {
      pageNumber: 11,
      date: "A quiet midnight letter",
      title: "To My Dearest Khushboo",
      paragraphs: [
        "I hope this year treats your heart with utmost tenderness.",
        "I hope you find mornings where the tea tastes extra warm, afternoons filled with unexpected good news, and nights where you sleep in complete, effortless peace.",
        "Whenever doubts try to sneak in and whisper that you're not doing enough, I hope you remember this page.",
        "You are so deeply loved. Not for what you produce or achieve, but simply for the beautiful soul you are when you wake up each day.",
      ],
      doodles: [
        { type: "ribbon", position: { top: "15px", left: "25px" }, scale: 0.8 },
        { type: "heart", position: { bottom: "35px", left: "20px" } },
        { type: "sticker", stickerSrc: "/stickers/sunglasses-cat-with-drink.png", position: { bottom: "12px", right: "14px" }, width: 80, height: 98, rotation: 6 },
      ],
    },
    rightPage: {
      pageNumber: 12,
      title: "Forever Cheering For You",
      paragraphs: [
        "In this grand, noisy world, real friendships are rare treasures. The kind where silence is comfortable, where distance doesn't dim the bond, and where both of you can be your genuine, uncurated selves.",
        "I am so endlessly grateful to walk through this chapter of life alongside you.",
        "Happy birthday, Khushboo. May the chapters ahead be filled with blooming gardens, gentle miracles, and boundless joy.",
      ],
      signature: "With all my love & warmest hugs,\nAlways yours ♡",
      handwrittenNotes: [
        "Keep shining your light. The world is so much softer with you in it.",
      ],
      doodles: [
        { type: "stamp", position: { bottom: "25px", right: "25px" }, rotation: -6 },
        { type: "flower", position: { top: "20px", left: "20px" }, scale: 0.7 },
        { type: "sticker", stickerSrc: "/stickers/pink-tulip-bouquet.png", position: { bottom: "12px", left: "16px" }, width: 75, height: 92, rotation: -5 },
      ],
    },
  },

  // SPREAD 7: Little Wishes
  {
    id: "spread-7",
    spreadNumber: 7,
    chapterLabel: "VII. Little Notes",
    leftPage: {
      pageNumber: 13,
      date: "Wish Jar Collection",
      title: "Seven Birthday Wishes for Khushboo",
      subtitle: "Click each note to read the secret blessing",
      paragraphs: [
        "I wrote these down on little slips of pastel parchment so you can unfold them whenever you need a gentle pick-me-up throughout this new year.",
      ],
      wishes: [
        { id: "w1", color: "#FDE2E4", title: "Wish for Peace", message: "May your days have calm pauses and your mind remain quiet and serene, Khushboo.", from: "Note #1" },
        { id: "w2", color: "#E2ECE9", title: "Wish for Adventure", message: "May you discover hidden cute cafes, unexpected friendships, and new favorite streets.", from: "Note #2" },
        { id: "w3", color: "#FFF1E6", title: "Wish for Laughter", message: "May your belly ache from giggling with people who cherish you.", from: "Note #3" },
      ],
      doodles: [
        { type: "sparkle", position: { top: "15px", right: "20px" } },
        { type: "star", position: { bottom: "25px", left: "25px" } },
        { type: "sticker", stickerSrc: "/stickers/pale-pink-orchid.png", position: { bottom: "10px", right: "14px" }, width: 80, height: 80, rotation: 6 },
      ],
    },
    rightPage: {
      pageNumber: 14,
      title: "More Whispers for Khushboo",
      wishes: [
        { id: "w4", color: "#DFE7FD", title: "Wish for Courage", message: "May you say 'yes' to new dreams and trust your intuition boldly.", from: "Note #4" },
        { id: "w5", color: "#F0E6EF", title: "Wish for Rest", message: "May you allow yourself unhurried weekends, long naps, and cozy books.", from: "Note #5" },
        { id: "w6", color: "#FFF5EB", title: "Wish for Warmth", message: "May you always find a jacket that fits, tea that comforts, and hands that hold you.", from: "Note #6" },
      ],
      handwrittenNotes: [
        "Pick a note whenever you need a reminder of how special you are! 💌",
      ],
      doodles: [
        { type: "tape", position: { top: "-10px", left: "45%" }, rotation: 2 },
        { type: "heart", position: { bottom: "20px", left: "30px" }, scale: 0.8 },
        { type: "sticker", stickerSrc: "/stickers/dark-red-geraniums.png", position: { bottom: "12px", right: "14px" }, width: 90, height: 60, rotation: -4 },
      ],
    },
  },

  // SPREAD 8: The Birthday Cake Finale & Back Cover
  {
    id: "spread-ending",
    spreadNumber: 8,
    chapterLabel: "VIII. Birthday Finale",
    leftPage: {
      pageNumber: 15,
      date: "October 2026 • The Grand Finale",
      title: "Happy Birthday Khushboo!",
      subtitle: "Blow out the candle & make your wish",
      paragraphs: [
        "Before we close this little diary, there is one last important ritual.",
        "Take a moment, close your eyes, think of the one dream that makes your heart beat a little faster...",
        "And click the candle to blow it out!",
      ],
      interactiveCake: true,
      handwrittenNotes: [
        "May every single wish you make today find its way true! 🎂✨",
      ],
      doodles: [
        { type: "sparkle", position: { top: "20px", right: "20px" }, scale: 1.2 },
        { type: "flower", position: { bottom: "20px", left: "20px" }, scale: 0.8 },
        { type: "sticker", stickerSrc: "/stickers/pink-lily-flower.png", position: { bottom: "12px", right: "14px" }, width: 80, height: 80, rotation: 6 },
      ],
    },
    rightPage: {
      pageNumber: 16,
      title: "Until Next Year's Pages",
      image: {
        src: "/images/illustrations/cake.jpg",
        alt: "Chibi character celebrating with cake and warm festive glow",
        caption: "Happy Birthday, Khushboo! May this year be your brightest masterpiece yet.",
        style: "framed",
      },
      paragraphs: [
        "Thank you for taking this gentle walk through the diary with me.",
        "Remember: you can come back and turn these pages whenever you miss this warmth.",
      ],
      signature: "Forever & always,\nHappy Birthday! 🎉",
      doodles: [
        { type: "heart", position: { top: "20px", left: "20px" }, scale: 0.8 },
        { type: "sparkle", position: { bottom: "20px", left: "20px" }, scale: 1.1 },
        { type: "sticker", stickerSrc: "/stickers/dark-red-orchid-spray.png", position: { bottom: "12px", right: "14px" }, width: 78, height: 84, rotation: -6 },
      ],
    },
  },
];
