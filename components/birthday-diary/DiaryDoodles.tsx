import React from 'react';
import { PageDoodle } from '@/data/diary-pages';

interface DoodleRendererProps {
  doodle: PageDoodle;
}

export const DoodleRenderer: React.FC<DoodleRendererProps> = ({ doodle }) => {
  const { type, position, rotation = 0, scale = 1, opacity = 0.95 } = doodle;

  const style: React.CSSProperties = {
    position: 'absolute',
    ...position,
    transform: `rotate(${rotation}deg) scale(${scale})`,
    opacity,
    pointerEvents: 'none',
    zIndex: 25,
  };

  switch (type) {
    case 'peg':
      // Wooden clothespin / peg from Reference Images 1 & 2
      return (
        <div style={style} className="w-4 h-12 flex flex-col items-center filter drop-shadow-md">
          {/* Top pin head */}
          <div className="w-3.5 h-6 bg-gradient-to-r from-[#E8D4B0] via-[#F5E6CD] to-[#D6BC94] rounded-t-xs border border-[#C5A87B]" />
          {/* Metal spring coil */}
          <div className="w-4 h-1.5 bg-gradient-to-r from-[#999] via-[#CCC] to-[#777] my-[-1px] rounded-xs shadow-xs" />
          {/* Clamping prongs */}
          <div className="w-3.5 h-6 bg-gradient-to-r from-[#E0CB9F] via-[#F2E2C4] to-[#C9AE84] rounded-b-xs border border-[#C5A87B] flex justify-between px-0.5">
            <div className="w-[1px] h-full bg-[#BA9F74]/50" />
            <div className="w-[1px] h-full bg-[#BA9F74]/50" />
          </div>
        </div>
      );

    case 'butterfly-clip':
      // Bright blue butterfly paperclip from Reference Image 2
      return (
        <div style={style} className="flex flex-col items-center filter drop-shadow-md">
          {/* Silver paperclip wire */}
          <div className="w-4 h-10 border-2 border-[#BAC0C7] rounded-full absolute -top-3 z-0" />
          {/* Blue Butterfly Ornament */}
          <div className="relative z-10 w-9 h-7 text-[#1A73E8]">
            <svg viewBox="0 0 36 28" fill="currentColor">
              {/* Left wing */}
              <path
                d="M17 14C12 6 2 2 1 10C0 18 10 24 16 16"
                fill="#1D6FD2"
                stroke="#0D47A1"
                strokeWidth="1.2"
              />
              <path d="M5 8C8 10 12 14 14 15" stroke="white" strokeWidth="0.8" opacity="0.6" />
              {/* Right wing */}
              <path
                d="M19 14C24 6 34 2 35 10C36 18 26 24 20 16"
                fill="#2196F3"
                stroke="#0D47A1"
                strokeWidth="1.2"
              />
              <path d="M31 8C28 10 24 14 22 15" stroke="white" strokeWidth="0.8" opacity="0.6" />
              {/* Body */}
              <ellipse cx="18" cy="14" rx="1.5" ry="5" fill="#0D47A1" />
            </svg>
          </div>
        </div>
      );

    case 'admit-ticket':
      // Vintage Cinema ADMIT ONE Ticket Stub from Reference Image 2
      return (
        <div
          style={style}
          className="relative px-3 py-1.5 bg-[#FAF6EC] border border-[#D9463E]/80 shadow-md rounded-xs flex items-center space-x-2 text-[#D9463E] select-none"
        >
          {/* Scotch tape holding ticket */}
          <div className="absolute -top-2 left-4 w-8 h-3.5 washi-tape-beige rotate-2 border-y border-black/10" />
          <div className="text-[7px] font-sans uppercase tracking-tighter leading-tight border-r border-[#D9463E]/40 pr-1.5">
            <div>EVENING SHOW</div>
            <div className="font-bold text-[8px] text-[#A82B24]">041226</div>
          </div>
          <div className="font-serif font-bold text-xs tracking-wider">ADMIT ONE</div>
        </div>
      );

    case 'film-strip':
      // 35mm Photographic Film Strip from Reference Image 2
      return (
        <div
          style={style}
          className="film-strip-border px-2 py-1 rounded-xs flex items-center space-x-1.5 select-none"
        >
          {/* Film Frames */}
          <div className="w-12 h-9 bg-[#2B231D] rounded-2xs border border-white/20 overflow-hidden relative flex items-center justify-center">
            <span className="text-[7px] font-mono text-white/60">01A</span>
          </div>
          <div className="w-12 h-9 bg-[#1E2833] rounded-2xs border border-white/20 overflow-hidden relative flex items-center justify-center">
            <span className="text-[7px] font-mono text-white/60">02A</span>
          </div>
          <div className="w-12 h-9 bg-[#291B24] rounded-2xs border border-white/20 overflow-hidden relative flex items-center justify-center">
            <span className="text-[7px] font-mono text-white/60">03A</span>
          </div>
        </div>
      );

    case 'code-tape':
      // Code Snippet Taped to Page from Reference Image 2
      return (
        <div
          style={style}
          className="px-2.5 py-1 bg-[#EEF7F2] border border-[#C2E0D1] shadow-xs rounded-xs font-mono text-[11px] text-[#2D5A43] flex items-center space-x-1"
        >
          <span className="text-[#8FBBA4]">while (!there) &#123;</span>
          <span className="font-bold text-[#1F7A4D]">keepGoing();</span>
          <span className="text-[#8FBBA4]">&#125;</span>
        </div>
      );

    case 'lighthouse':
      // Delicate architectural lighthouse sketch from Reference Images 1 & 2
      return (
        <div style={style} className="w-28 h-48 text-[#8C867F] opacity-35 pointer-events-none">
          <svg viewBox="0 0 100 180" fill="none" stroke="currentColor" strokeWidth="1.2">
            {/* Tower Body */}
            <path d="M35 150 L42 50 L58 50 L65 150 Z" />
            <line x1="38" y1="120" x2="62" y2="120" />
            <line x1="40" y1="90" x2="60" y2="90" />
            <line x1="41" y1="70" x2="59" y2="70" />
            {/* Lantern Room */}
            <rect x="44" y="32" width="12" height="18" />
            <path d="M40 32 L50 20 L60 32 Z" />
            {/* Foundation rocks */}
            <path d="M20 155 Q50 148 80 155 Q90 165 80 175 Q50 170 20 175 Z" />
          </svg>
        </div>
      );

    case 'airplane':
      // Paper airplane with dotted flight trail from Reference Image 1
      return (
        <div style={style} className="text-[#7D7770]">
          <svg width="45" height="35" viewBox="0 0 50 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M48 2L2 24L20 28L28 38L32 26L48 2Z" fill="white" fillOpacity="0.5" />
            <path d="M20 28L48 2" />
            {/* Dotted trail */}
            <path
              d="M2 24 C-10 18 -5 35 -18 30"
              strokeDasharray="2 3"
              strokeWidth="1"
            />
          </svg>
        </div>
      );

    case 'paperclip':
      return (
        <div style={style} className="text-[#A6ADB5]">
          <svg width="18" height="42" viewBox="0 0 24 50" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 2C7 2 3 6 3 11V38C3 44 8 48 13 48C18 48 22 44 22 38V14C22 10 19 8 16 8C13 8 10 10 10 14V36" />
          </svg>
        </div>
      );

    case 'tape':
      return (
        <div
          style={style}
          className="w-20 h-5 washi-tape-beige border-y border-black/10 flex items-center justify-center opacity-85 shadow-2xs"
        />
      );

    case 'star':
      return (
        <div style={style} className="text-[#C8A261]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path
              d="M12 2L14.4 8.6L21.5 9.1L16 13.8L17.7 20.8L12 17.2L6.3 20.8L8 13.8L2.5 9.1L9.6 8.6L12 2Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );

    case 'heart':
      return (
        <div style={style} className="text-[#D9463E]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.4">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );

    case 'sparkle':
      return (
        <div style={style} className="text-[#C8A261]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14 9L23 11L14 13L12 22L10 13L1 11L10 9L12 0Z" />
          </svg>
        </div>
      );

    case 'flower':
      return (
        <div style={style} className="text-[#688A6E]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
            <circle cx="12" cy="12" r="2.5" fill="#E8B4B8" fillOpacity="0.4" />
            <path d="M12 5C12 2 10 2 10 5C10 7 12 8 12 9.5" />
            <path d="M19 12C22 12 22 10 19 10C17 10 16 12 14.5 12" />
            <path d="M12 19C12 22 14 22 14 19C14 17 12 16 12 14.5" />
            <path d="M5 12C2 12 2 14 5 14C7 14 8 12 9.5 12" />
          </svg>
        </div>
      );

    case 'stamp':
      return (
        <div
          style={style}
          className="px-2 py-0.5 border-2 border-[#1E70D6]/70 rounded-xs font-mono text-[9px] tracking-widest text-[#1E70D6] uppercase font-bold shadow-xs bg-white/70"
        >
          ✦ POSTAGE • 2026 ✦
        </div>
      );

    case 'coffee-ring':
      return (
        <div style={style} className="w-20 h-20 rounded-full border-[2.5px] border-[#91765F] border-dashed opacity-15 rotate-12 pointer-events-none" />
      );

    case 'sticker':
      if (!doodle.stickerSrc) return null;
      return (
        <div
          style={style}
          className="select-none filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:scale-115 hover:rotate-3 pointer-events-auto cursor-pointer active:scale-95 z-20"
          title="Cute sticker! ✨"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={doodle.stickerSrc}
            alt="Diary sticker"
            className="object-contain filter drop-shadow-sm select-none"
            style={{
              width: doodle.width ? Math.round(doodle.width * 0.72) : 60,
              height: doodle.height ? Math.round(doodle.height * 0.72) : 60,
            }}
            draggable={false}
          />
        </div>
      );

    default:
      return null;
  } 
};
