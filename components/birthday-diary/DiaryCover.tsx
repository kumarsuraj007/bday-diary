'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { DIARY_METADATA } from '@/data/diary-pages';
import { DeskProps } from './DeskProps';
import { diaryAudio } from './DiaryAudio';
import { BookOpen, Sparkles } from 'lucide-react';

interface DiaryCoverProps {
  onOpen: () => void;
  isOpen: boolean;
  isOpening: boolean;
}

export const DiaryCover: React.FC<DiaryCoverProps> = ({
  onOpen,
  isOpen,
}) => {
  const [animating, setAnimating] = useState(false);
  const coverRef = useRef<HTMLDivElement>(null);

  if (isOpen) return null;

  const handleOpenClick = () => {
    if (animating) return;
    setAnimating(true);

    // Play real recorded book opening sound!
    diaryAudio.playBookOpen();

    const cover = coverRef.current;
    if (!cover) {
      onOpen();
      return;
    }

    // Smooth 3D book cover opening animation
    gsap.to(cover, {
      rotateY: -110,
      scale: 1.05,
      x: -30,
      opacity: 0,
      duration: 0.65,
      ease: 'power2.in',
      onComplete: () => {
        onOpen();
      },
    });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 py-6 select-none bg-[#F5F2EB] text-[#1A1A1A] overflow-hidden">
      
      {/* Daylight Desk Surface Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-35 mix-blend-multiply">
        <Image
          src="/images/desk_bg.jpg"
          alt="Daylight desk surface"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Diagonal sunbeam overlay */}
      <div className="absolute inset-0 window-sunbeam-shadow pointer-events-none z-0" />

      {/* Surrounding Desk Props (Coffee cup, luxury pen, washi tapes, paperclips) */}
      <DeskProps />

      {/* Top Header */}
      <header className="relative z-30 w-full max-w-5xl flex items-center justify-between px-2 pt-1 font-hand">
        <div className="flex items-center space-x-2">
          <span className="font-hand font-bold text-xl sm:text-2xl text-[#1A1A1A] tracking-wider flex items-center space-x-1.5">
            <span>✦</span>
            <span>Birthday Diary ♡ {DIARY_METADATA.recipientName}</span>
          </span>
        </div>
        <div className="text-xs font-hand text-[#756C62] bg-white/80 px-3 py-1 rounded-full border border-[#DDD6C8] shadow-2xs">
          Special Edition • 2026
        </div>
      </header>

      {/* Center Closed Book Stage */}
      <div className="relative z-20 my-auto flex flex-col items-center">
        
        {/* The Closed Book with the Kitty Cover - ZERO Background, ZERO Box */}
        <div
          ref={coverRef}
          onClick={handleOpenClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpenClick();
            }
          }}
          aria-label="Click to open the Birthday Diary"
          className="relative group cursor-pointer perspective-stage transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-[0.99] focus:outline-none origin-left"
        >
          {/* Soft Physical Desk Contact Shadow underneath */}
          <div className="absolute -bottom-6 left-6 right-6 h-12 bg-black/25 blur-xl rounded-full transform scale-95 group-hover:scale-100 transition-transform duration-500 pointer-events-none" />

          {/* Pure Isolated Book Cover PNG - Clean transparent wrapper, no beige box or border */}
          <div className="relative w-[290px] sm:w-[340px] md:w-[380px] h-[365px] sm:h-[430px] md:h-[480px] filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)] bg-transparent">
            <Image
              src="/images/covers/front_cover.png"
              alt="Birthday Diary Front Cover with kitty, polaroid, and star charm"
              fill
              priority
              className="object-contain bg-transparent"
            />
          </div>

          {/* Invitation Below the Book */}
          {!animating && (
            <div className="mt-6 flex flex-col items-center">
              <button
                type="button"
                className="px-7 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white font-hand text-lg font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center space-x-2"
              >
                <BookOpen className="w-4 h-4 text-white" />
                <span>Click to open Khushboo&apos;s diary ♡</span>
              </button>
              <span className="font-hand text-xs text-[#7A7165] mt-1.5 opacity-80 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-[#1E70D6]" />
                <span>(or press Enter ↵ to open)</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 w-full max-w-5xl flex justify-between items-center text-xs font-hand text-[#827A71] pb-1 px-2 border-t border-[#E3DDD1]">
        <span>EST. 2026 • Made with care</span>
        <span>For my favorite human ♡</span>
      </footer>
    </div>
  );
};
