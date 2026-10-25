'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { DIARY_METADATA } from '@/data/diary-pages';
import { DeskProps } from './DeskProps';
import { diaryAudio } from './DiaryAudio';
import { RotateCcw, BookOpen, Heart } from 'lucide-react';

interface DiaryBackCoverProps {
  onReopen: () => void;
  onGoToFrontCover: () => void;
}

export const DiaryBackCover: React.FC<DiaryBackCoverProps> = ({
  onReopen,
  onGoToFrontCover,
}) => {
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReopenClick = () => {
    if (animating) return;
    setAnimating(true);
    diaryAudio.playBookOpen();

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1.03,
        duration: 0.35,
        ease: 'power2.out',
        onComplete: () => {
          onReopen();
        },
      });
    } else {
      onReopen();
    }
  };

  const handleFlipToFront = () => {
    if (animating) return;
    setAnimating(true);
    diaryAudio.playPageTurn();

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        rotateY: 90,
        duration: 0.45,
        ease: 'power2.in',
        onComplete: () => {
          onGoToFrontCover();
        },
      });
    } else {
      onGoToFrontCover();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 py-6 select-none bg-[#F5F2EB] text-[#1A1A1A] overflow-hidden animate-in fade-in duration-500">
      
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
        <button
          onClick={handleFlipToFront}
          className="text-xs font-hand font-bold text-[#423A31] hover:text-[#1A1A1A] bg-white/80 hover:bg-white px-3.5 py-1 rounded-full border border-[#DDD6C8] shadow-2xs transition-all hover:scale-105 active:scale-95 flex items-center space-x-1"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#1E70D6]" />
          <span>Flip to Front Cover</span>
        </button>
      </header>

      {/* Center Closed Book Stage with the Back Cover */}
      <div className="relative z-20 my-auto flex flex-col items-center">
        
        {/* The Closed Book showing the Kitty Back Cover */}
        <div
          ref={containerRef}
          onClick={handleReopenClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleReopenClick();
            }
          }}
          aria-label="Click to reopen the Birthday Diary"
          className="relative group cursor-pointer transition-transform duration-500 ease-out hover:scale-[1.02] active:scale-[0.99] focus:outline-none"
        >
          {/* Soft Physical Desk Contact Shadow underneath */}
          <div className="absolute -bottom-6 left-6 right-6 h-12 bg-black/25 blur-xl rounded-full transform scale-95 group-hover:scale-100 transition-transform duration-500" />

          {/* 3D Book Container with the Exact Kitty Back Cover PNG */}
          <div className="relative w-[290px] sm:w-[340px] md:w-[380px] h-[365px] sm:h-[430px] md:h-[480px] transition-all duration-500 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]">
            <Image
              src="/images/covers/back_cover.png"
              alt="Birthday Diary Back Cover with cat from behind, pink bow, and Thanks for being you"
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* Reopen Action Buttons */}
          <div className="mt-5 flex items-center space-x-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleReopenClick();
              }}
              className="px-6 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white font-hand text-lg font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4 text-white" />
              <span>Read Again from Page 1 ♡</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFlipToFront();
              }}
              className="px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-[#1A1A1A] border border-[#DDD6C8] font-hand text-base font-bold shadow-xs hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center space-x-1.5"
            >
              <BookOpen className="w-4 h-4 text-[#1E70D6]" />
              <span>Front Cover</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 w-full max-w-5xl flex justify-between items-center text-xs font-hand text-[#827A71] pb-1 px-2 border-t border-[#E3DDD1]">
        <span>Thanks for being you, Khushboo ♡</span>
        <span className="flex items-center space-x-1">
          <span>Until next year&apos;s pages</span>
          <Heart className="w-3 h-3 text-[#D9463E] fill-current" />
        </span>
      </footer>
    </div>
  );
};
