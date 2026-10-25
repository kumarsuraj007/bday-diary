# 📖 A Year of You — An Interactive Birthday Diary

A warm, intimate, physical-inspired interactive digital diary created for a special birthday celebration. Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **GSAP & ScrollTrigger**, **Three.js**, **Web Audio API**, and **Canvas Confetti**.

---

## ✨ Features & Experiences

### 1. Tactile 3D Physical Book
- **Realistic Closed Book Stage:** Rich leather texture, foil-stamped gold typography, stitched perimeter border, layered paper edges with book thickness, and a burgundy bookmark ribbon.
- **Ambient Lighting:** Soft candlelight glow with Three.js floating dust motes and gentle mouse parallax.
- **Physical Opening Sequence:** Clicking "Click to Open" smoothly turns the cover around its spine hinge and transitions into the reading spreads.

### 2. Scroll-Linked 3D Page Turn System
- **GSAP ScrollTrigger:** Scrolling down naturally turns the pages one by one as if reading a real physical book.
- **Physical Page Flip Geometry:** Pages rotate around the center spine hinge (`transform-origin: left center`) with 3D perspective, dynamic lighting/shadow sweeps, and realistic edge stack thickness.
- **Multiple Navigation Modes:**
  - Mouse wheel / vertical scrolling
  - Click on page edges (left page turns back, right page turns forward)
  - Keyboard shortcuts (`←` Previous spread, `→` Next spread)
  - Interactive spread progress dots

### 3. Audio & Sensory Atmosphere (Synthesized Web Audio API)
- **Paper Rustle Sounds:** Realistic paper turning sound effects on every flip (no external sound files required).
- **Music Box Ambient Melody:** Gentle, calming music box arpeggio toggleable anytime from the top bar.
- **Celebration Chimes:** Delicate bells when wishes are revealed or candles are blown out.

### 4. Interactive Spreads (8 Curated Chapters)
1. **Spread 1 — Opening Note:** Welcoming handwritten message with floral doodles and framed chamomile chibi art.
2. **Spread 2 — A Little Introduction:** Heartfelt reflections on friendship with coffee ring stamps and quotes.
3. **Spread 3 — A Favorite Memory:** Spring sakura memories with a taped Polaroid photo card.
4. **Spread 4 — Things That Make You Special:** Playful checklist with cute checkmarks and margin annotations.
5. **Spread 5 — Under The Stars:** Full-page starlight diorama illustration and night sky reflections.
6. **Spread 6 — A Midnight Letter:** Deep, intimate letter with generous whitespace and signature.
7. **Spread 7 — Little Wishes:** 6 interactive pastel parchment slips—click any note to open and read its hidden blessing.
8. **Spread 8 — Birthday Finale:** Interactive birthday cake with candle! Click to blow out the flame, triggering confetti bursts and sweet wishes.

---

## 🚀 Running Locally

To run the diary locally on your machine:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 How to Personalize the Content

All text, titles, notes, and photos are centralized in a single file for easy customization without touching animation logic:

### 📝 Edit Text & Spreads
Open [`data/diary-pages.ts`](file:///d:/TRAVER-X-AI/bday/data/diary-pages.ts):
- **Recipient name & Cover details:** Modify `DIARY_METADATA`:
  ```ts
  export const DIARY_METADATA = {
    recipientName: "Your Friend's Name",
    celebrationYear: "2026",
    coverTitle: "A Year of You",
    coverSubtitle: "Little moments, quiet wonders & birthday wishes",
    coverDate: "October 2026",
    authorNote: "Carefully crafted with love",
  };
  ```
- **Spreads 1 through 8:** Edit `DIARY_SPREADS`:
  - Change dates, weather, greetings, paragraphs, checklists, quotes, and signatures.
  - Customize the 6 secret wishes in Spread 7.

### 🖼️ Replace Images & Illustrations
The images are located in [`public/images/illustrations/`](file:///d:/TRAVER-X-AI/bday/public/images/illustrations/):
- `cake.jpg` — Birthday cake celebration art
- `flowers.jpg` — Chibi character holding flowers
- `polaroid.jpg` — Sakura park bench memory photo
- `stargazing.jpg` — Night sky stargazing art
- `diary_closed_book.jpg` — Book cover texture

You can replace these files with your own photos or illustrations using the same filenames, or point to new paths in `data/diary-pages.ts`.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 & custom 3D CSS utilities
- **Typography:** Google Fonts (`Cormorant Garamond`, `Plus Jakarta Sans`, `Caveat`)
- **Animation:** GSAP & ScrollTrigger
- **3D Particles:** Three.js
- **Audio:** Web Audio API procedural synthesizer
- **Celebration Effects:** Canvas Confetti
