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
      title: "Dear Shithead,",
      subtitle: "Happy Birthday to my absolute favorite headache!",
      paragraphs: [
        "Welcome to your very own personal birthday diary — yes, I actually spent real time making this instead of sleeping, so you better appreciate it.",
        "Consider this a cozy escape whenever the world gets a little too loud, or whenever you need a reminder of how special you really are. Somewhere to keep safe all our unhinged laughter, silly inside jokes, and all the sweet moments that make you completely irreplaceable to me.",
        "Take a slow breath, grab a snack, and turn the pages whenever you're ready.",
      ],
      quote: {
        text: "You're stuck with me forever. No refunds.",
        author: "your 24/7 personal therapist",
      },
      handwrittenNotes: [
        "\"Another year older and still running on 2% braincell ♡\"",
      ],
      doodles: [
        { type: "peg", position: { top: "10px", right: "20px" }, scale: 0.9 },
        { type: "butterfly-clip", position: { bottom: "25px", left: "20px" }, scale: 0.8 },
        { type: "sticker", stickerSrc: "/stickers/megaphone-kitten.png", position: { bottom: "12px", right: "12px" }, width: 82, height: 70, rotation: -4 },
      ],
    },
    rightPage: {
      pageNumber: 2,
      title: "To the one who deserves the world,",
      image: {
        src: "/images/illustrations/flowers.jpg",
        alt: "Chibi character holding a delicate bouquet of roses and chamomile",
        caption: "Blooming into your best era yet 🌸",
        style: "framed",
      },
      paragraphs: [
        "If there's anyone who deserves all the happiness, success, and good things life has to offer, it's you.",
        "Thank you for being my constant, for listening to me, and for always being someone I can count on. May this year bring you closer to everything your heart quietly wishes for.",
      ],
      handwrittenNotes: [
        "\"Always cheering for you 🌟\"",
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
      date: "Page 03 • Life Updates",
      title: "Leveling Up (Still No Manual)",
      paragraphs: [
        "Another year, another level unlocked, and we still have absolutely no idea what we're doing.",
        "They say time flies when you're having fun, but with you, time just moves in fast-forward because half our time is spent laughing at things that aren't even funny to normal people.",
        "Thank you for sticking around, for being my safe space, and for never judging my terrible jokes. The world is just a much cooler place with you in it.",
      ],
      quote: {
        text: "Growing old is mandatory. Growing up is strictly optional.",
        author: "the truth",
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
      subtitle: "A totally unbiased & verified list",
      paragraphs: [
        "1. Your unhinged humor — That ridiculous \"butttalk\" joke of yours that still lives completely rent-free in my head. Only you could say something that silly and make it that funny.",
        "2. The age irony — How you're literally younger than me, yet somehow end up being the mature, sensible adult between us 90% of the time. (I don't admit this often, so don't let it get to your head).",
        "3. That handmade card — The effort, time, and love you put into making that handmade card for my birthday meant the absolute world to me. In a world full of quick 2-second texts, something made with real heart is so rare. I'll always cherish it.",
        "4. Just how pyaari & brilliant you are — How insanely smart and sharp you are, even when you're acting like a complete goofball. At the end of the day, you're just so effortlessly pyaari, and having you in my life is a blessing.",
      ],
      handwrittenNotes: [
        "\"Don't let all these compliments go to your head 😤 ♡\"",
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
      date: "Core Memory • That One Outing 🌲",
      weather: "Awkward silence & flying tree glue 💀",
      title: "The Cheel Ke Ped Incident 🌲💀",
      paragraphs: [
        "Do you remember that day we went out and there was that weird, intense gap between us? We weren't even talking properly, like two awkward strangers who forgot how to communicate. 😶‍🌫️🤐",
        "And then out of nowhere... your chaotic brain decided to play with that sticky glue from the cheel ka ped (pine tree resin). You tried to fling it to the other side. 🌲🎯",
        "Except your aim was absolutely legendary... and that sticky tree resin flew directly into my head, cementing the tips of my hair into a solid rock! 😭💀 And the worst part? You were dying of laughter while I was standing there traumatized!",
        "All that awkward tension vanished real quick. When we reached home, you sweetly rushed to your house to get me oil to rinse it off... only to find out I had already used conditioner and saved my own hair. 😂🧴 Leave it to you to break the ice by literally gluing my hair. ❤️",
      ],
      doodles: [
        { type: "tape", position: { top: "-12px", right: "30%" }, rotation: 3 },
        { type: "flower", position: { bottom: "25px", left: "30px" }, scale: 0.8 },
        { type: "sticker", stickerSrc: "/stickers/white-fluffy-cat-face.png", position: { bottom: "12px", right: "14px" }, width: 80, height: 80, rotation: 4 },
      ],
      stampText: "CORE MEMORY",
    },
    rightPage: {
      pageNumber: 6,
      image: {
        src: "/images/illustrations/oil-and-conditioner.jpg",
        alt: "Cute chibi illustration of sweet hair oil and conditioner bottles hugging each other",
        caption: "The dynamic duo: Oil & Conditioner to the rescue! 🧴✨",
        style: "polaroid",
      },
      handwrittenNotes: [
        "\"Conditioner saved the day, but thanks for the oil 🧴♡\"",
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
        { checked: true, text: "Having the most comforting hugs in the entire universe. 🫂" },
        { checked: true, text: "Being a legit gifted artist 🎨 (meanwhile my drawing skills are a national emergency)." },
        { checked: true, text: "Listening to literally every music genre on earth... EXCEPT Haryanvi songs. 🎧🚫" },
        { checked: true, text: "That signature adorable smile on your face every single time we meet after a while. 😊✨" },
        { checked: true, text: "Making those legendary egg sandwiches for me 🥪🍳 (officially 5-star Michelin in my book)." },
        { checked: true, text: "Being there for me when I had no one, and standing like a rock by my side in my lowest phases. ❤️" },
      ],
      handwrittenNotes: [
        "\"100% verified & cherished forever ♡\"",
      ],
      doodles: [
        { type: "heart", position: { bottom: "30px", left: "20px" }, scale: 0.9 },
        { type: "sticker", stickerSrc: "/stickers/white-daisy-bunch-sketch.png", position: { bottom: "12px", right: "12px" }, width: 70, height: 95, rotation: -6 },
      ],
    },
    rightPage: {
      pageNumber: 8,
      title: "A Little Reminder For You",
      paragraphs: [
        "We spend so much time roasting each other and laughing at dumb things, but I genuinely wanted to say this:",
        "Thank you for never judging me, for being patient with me, and for always being a safe corner where I can just be myself.",
        "You carry so much warmth and quiet strength in you, Khushboo. Even when things feel overwhelming, you keep going with that gentle courage that I respect so much.",
        "I hope today reminds you of how deeply loved, valued, and irreplaceable you are in my life.",
      ],
      handwrittenNotes: [
        "\"Always here for you, no matter what ✨\"",
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
      date: "Under A Sky Full of Wishes",
      title: "Take A Breath, You're Doing Great 🌙",
      paragraphs: [
        "You spend so much energy caring for everyone else and trying to do everything right, that sometimes you forget to be kind to yourself.",
        "So consider this page your official permission to slow down, take a deep breath, and relax your shoulders.",
        "Life isn't a race. You don't have to prove anything to anyone. The kindness and effort you put into the world will always find its way back to you. I just know this coming year has the sweetest surprises waiting for you.",
      ],
      quote: {
        text: "Good things take time. And you are worth all the time in the world. 🤍",
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
        caption: "May your year be as peaceful as a quiet night sky 🌌",
        style: "diorama",
      },
      handwrittenNotes: [
        "\"Protect your peace & trust the journey ✨\"",
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
      title: "To My Fav Niggie 😂",
      paragraphs: [
        "I hope next year treats your heart with utmost tenderness.",
        "I hope you find mornings where the tea tastes extra warm, afternoons filled with unexpected good news, and nights where you sleep in complete, effortless peace.",
        "Along with all the good wishes, I also wanted to genuinely apologize. I know I’m not always the easiest person to deal with. Sometimes I do things that annoy you, and sometimes when my head gets overwhelmed, I just shut down, sit quiet, and don't talk to you.",
        "I know my silence can feel frustrating or distant, but please know it was never because of you. If my quiet phases ever made you feel ignored or hurt, I am truly sorry from the bottom of my heart.",
      ],
      doodles: [
        { type: "ribbon", position: { top: "15px", left: "25px" }, scale: 0.8 },
        { type: "heart", position: { bottom: "35px", left: "20px" } },
        { type: "sticker", stickerSrc: "/stickers/sunglasses-cat-with-drink.png", position: { bottom: "12px", right: "14px" }, width: 80, height: 98, rotation: 6 },
      ],
    },
    rightPage: {
      pageNumber: 12,
      title: "Forever Grateful For You",
      paragraphs: [
        "Thank you for being so patient with my moods, for understanding my quiet days, and for never giving up on me.",
        "In this grand, noisy world, real friendships like ours are rare treasures. The kind where we can be our genuine, uncurated, chaotic selves. I'm endlessly grateful to walk through life alongside you.",
        "May the chapters ahead bring you all the warmth, happiness, and gentle miracles you deserve, Khushboo.",
      ],
      signature: "With all my love & warmest hugs,\nAlways yours ♡",
      handwrittenNotes: [
        "\"Promise I'll work on talking more & going quiet less 🥺 ♡\"",
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
      title: "Birthday Coupons & Treats 🎟️",
      subtitle: "Click each note to unfold & redeem",
      paragraphs: [
        "I made these little pastel vouchers just for you. You can cash them in anytime throughout this new year—zero expiry date!",
      ],
      wishes: [
        { id: "w1", color: "#FDE2E4", title: "🍕 Unlimited Pizza Treat", message: "Valid for 1 large pizza of your choice with extra cheese. Redeemable anytime you crave it. My treat, zero questions asked! (Valid 365 days a year).", from: "Coupon #1 • Foodie Pass" },
        { id: "w2", color: "#E2ECE9", title: "🥟 Emergency Momos Date", message: "Steamed, fried, or kurkure—served with extra spicy red chutney. Valid on days when life gets annoying and you need comfort food immediately.", from: "Coupon #2 • Stress Buster" },
        { id: "w3", color: "#FFF1E6", title: "🍰 Pastry & Ice Cream Run", message: "Valid for your favorite pastries and as many scoops of ice cream as you want. Perfect for midnight sweet cravings or whenever you need instant happiness!", from: "Coupon #3 • Sweet Tooth Pass" },
      ],
      doodles: [
        { type: "sparkle", position: { top: "15px", right: "20px" } },
        { type: "star", position: { bottom: "25px", left: "25px" } },
        { type: "sticker", stickerSrc: "/stickers/pale-pink-orchid.png", position: { bottom: "10px", right: "14px" }, width: 80, height: 80, rotation: 6 },
      ],
    },
    rightPage: {
      pageNumber: 14,
      title: "More Passes & The Secret Wish ✨",
      wishes: [
        { id: "w4", color: "#DFE7FD", title: "🏆 The 'You Are Right' Pass", message: "Use this during any argument between us to instantly win with no debate. (Use it wisely, you only get one per lifetime! 😂)", from: "Coupon #4 • One-Time Miracle" },
        { id: "w5", color: "#F0E6EF", title: "🛡️ 24/7 'I Need You' Pass", message: "Valid at 2 PM or 3 AM. If you ever feel lonely, overwhelmed, or just need someone to talk to, call me. I promise I will pick up and be there.", from: "Coupon #5 • Lifetime Validity" },
        { id: "w6", color: "#FFF9DB", title: "✨ The Wildcard Wish (Blank ✍️)", message: "Click to write your own wish! Type whatever you want, take a screenshot, and send it to me to claim it 🤍", from: "Coupon #6 • Khushboo's Choice" },
      ],
      handwrittenNotes: [
        "\"All coupons are 100% non-refundable and strictly binding! 💌\"",
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
      title: "Make The Biggest Wish 🎂✨",
      subtitle: "Close your eyes & blow the candle",
      paragraphs: [
        "We've reached the very last page of your birthday diary, but before we close it, there is one last important ritual.",
        "Take a slow breath. Think of the one dream that makes your heart beat a little faster—the wish you want the most this year.",
        "And click the candle to blow it out! 🕯️💨",
      ],
      interactiveCake: true,
      handwrittenNotes: [
        "\"May every single wish you make today find its way true! 🎂✨\"",
      ],
      doodles: [
        { type: "sparkle", position: { top: "20px", right: "20px" }, scale: 1.2 },
        { type: "flower", position: { bottom: "20px", left: "20px" }, scale: 0.8 },
        { type: "sticker", stickerSrc: "/stickers/pink-lily-flower.png", position: { bottom: "12px", right: "14px" }, width: 80, height: 80, rotation: 6 },
      ],
    },
    rightPage: {
      pageNumber: 16,
      title: "Until Next Year's Pages ♡",
      paragraphs: [
        "I don't know what the future holds for us, or how much time life gives us to spend together.",
        "I won’t lie, these past two weeks have been really heavy. We got distant, set boundaries, and it honestly hurts. But more than anything, I'm truly sorry for everything on my end. I really hope with time things get better and we can find our way back to how we used to be—meeting up, hanging out, and laughing together without any tension or worries. Wherever life takes us, I’ll always be rooting for your happiness.",
        "You can come back and turn these pages whenever you need a reminder of how irreplaceable you are to me.",
      ],
      signature: "Forever in your corner,\nHappy Birthday, favorite headache! 🎉❤️",
      doodles: [
        { type: "heart", position: { top: "20px", left: "20px" }, scale: 0.8 },
        { type: "sparkle", position: { bottom: "20px", left: "20px" }, scale: 1.1 },
        { type: "sticker", stickerSrc: "/stickers/dark-red-orchid-spray.png", position: { bottom: "12px", right: "14px" }, width: 78, height: 84, rotation: -6 },
      ],
    },
  },
];
