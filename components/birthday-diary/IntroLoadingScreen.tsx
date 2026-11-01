'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { BookOpen, Heart, AlertCircle, RotateCw } from 'lucide-react';

interface IntroLoadingScreenProps {
  onProceed: () => void;
}

export const IntroLoadingScreen: React.FC<IntroLoadingScreenProps> = ({ onProceed }) => {
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isRotated, setIsRotated] = useState<boolean>(true);
  const [manualRotation, setManualRotation] = useState<'auto' | 'rotated' | 'normal'>('auto');
  const [escapeCount, setEscapeCount] = useState<number>(0);
  const [escapeText, setEscapeText] = useState<string>('No, save your dignity & run away 🏃‍♂️');
  const [screenDims, setScreenDims] = useState<{ w: number; h: number }>({ w: 400, h: 800 });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      setScreenDims({ w, h });

      const isMobilePortrait = (w < 768 && h > w) || (w < h);

      if (manualRotation === 'rotated') {
        setIsRotated(true);
      } else if (manualRotation === 'normal') {
        setIsRotated(false);
      } else {
        setIsRotated(isMobilePortrait);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [manualRotation]);

  const handleToggleRotation = () => {
    setManualRotation((prev) => {
      if (prev === 'auto') {
        return isRotated ? 'normal' : 'rotated';
      }
      return prev === 'rotated' ? 'normal' : 'rotated';
    });
  };

  const handleEscapeClick = () => {
    setEscapeCount((prev) => prev + 1);
    const excuses = [
      'Nice try, but you have no choice! 😤',
      'Escape rejected by system admin 🛑',
      'Bro please, I spent hours on this 😭',
      'Error 404: Dignity not found, open it! 💀',
      'You are legally obligated to read this now 📜',
    ];
    setEscapeText(excuses[escapeCount % excuses.length]);
  };

  const handleOpenDiary = () => {
    try {
      confetti({
        particleCount: 85,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF9EAA', '#FFD0D0', '#FFF078', '#A0E7E5', '#B4F8C8'],
      });
    } catch {
      // fallback
    }
    setIsFadingOut(true);
    setTimeout(() => onProceed(), 600);
  };

  // In 90deg rotated mobile view:
  // - cardWidth controls the card along the Y-AXIS (phone height, top-to-bottom)
  // - cardHeight controls the card along the X-AXIS (phone width, left-to-right)
  const cardWidth = isRotated ? Math.min(screenDims.h * 0.72, 560) : 580;
  const cardHeight = isRotated ? Math.min(screenDims.w - 28, 350) : 480;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#F3EFE6] overflow-hidden transition-all duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background warm desk surface with faint dot grid */}
      <div className="absolute inset-0 bg-[#F5EFE6] bg-[radial-gradient(#DECBB2_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-80" />

      {/* Rotation toggle button */}
      <button
        onClick={handleToggleRotation}
        className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-[#D9D3C7] shadow-sm text-xs font-hand text-[#5A5148] hover:bg-white active:scale-95 transition-all cursor-pointer"
        title="Toggle Screen Orientation"
      >
        <RotateCw className="w-3.5 h-3.5 text-[#1E70D6]" />
        <span>{isRotated ? 'Rotated 90°' : 'Normal'}</span>
      </button>

      {/* Card Wrapper: shrink-0 prevents flexbox from squishing the card */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-all duration-300 ease-out"
        style={
          isRotated
            ? {
                transform: 'rotate(90deg)',
                transformOrigin: 'center center',
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                minWidth: `${cardWidth}px`,
                minHeight: `${cardHeight}px`,
              }
            : {
                transform: 'none',
                width: '100%',
                maxWidth: '620px',
                padding: '16px',
              }
        }
      >
        {/* Aesthetic Handwritten Notebook Note */}
        <div className="relative w-full h-full bg-[#FAF7EE] lined-notebook-paper border-2 border-[#D9D3C7] rounded-2xl shadow-[0_20px_50px_rgba(80,60,40,0.18)] px-7 py-3.5 flex flex-col justify-between overflow-hidden">
          {/* Top Washi Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-48 h-6 bg-[#E8B4B8]/85 border-y border-[#D6969B]/40 rotate-[-1deg] shadow-xs flex items-center justify-center z-20">
            <span className="font-hand text-xs text-white tracking-wider font-semibold">
              a quick confession 💌
            </span>
          </div>

          {/* Cute Sticker attached to top-right corner */}
          <div className="absolute top-2 right-4 rotate-6 z-20 pointer-events-none">
            <Image
              src="/stickers/white-cat-pink-bow.png"
              alt="Cute cat"
              width={42}
              height={42}
              className="drop-shadow-sm"
            />
          </div>

          {/* Top Content: Heading + Confession + Terms Box */}
          <div className="pt-0.5">
            <h1 className="font-hand text-lg sm:text-2xl text-[#2B231D] font-bold leading-tight">
              Wait... should I be embarrassed for making this? 🙈💀
            </h1>

            <div className="mt-1 space-y-0.5 font-hand text-[11px] sm:text-xs text-[#3A332C] leading-snug">
              <p>
                You made me that handmade card with all those cute drawings for my birthday, and it was so special.
              </p>
              <p>
                I honestly tried to draw and make one for you too, but I failed so miserably 😭 (my drawing skills are a tragedy).
              </p>
              <p>
                So... this is what I made for you instead. A whole personal birthday diary. Sorry it&apos;s not made of real paper and colors, but every single word and memory in here is 100% from the heart.
              </p>
            </div>

            {/* Official Terms & Conditions Parchment Box */}
            <div className="mt-1.5 bg-[#FFFDF5] border border-[#EADBBD] rounded-xl px-3 py-1.5 text-left shadow-xs">
              <h2 className="font-hand text-[10.5px] sm:text-xs font-bold text-[#8C6D23] flex items-center gap-1 uppercase tracking-wider">
                <AlertCircle className="w-3 h-3" />
                Official Terms & Conditions for Khushboo:
              </h2>
              <ul className="mt-0.5 space-y-0.5 font-hand text-[10px] sm:text-xs text-[#3E3730] leading-tight list-disc list-inside">
                <li>
                  You are strictly forbidden from screenshotting my soft side to roast me later. 🚫
                </li>
                <li>
                  If you laugh at my feelings, you legally owe me food & chai. 🍟☕
                </li>
                <li>
                  In any court of law, I will officially deny writing any of this. 🤐
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Actions Section: Both Buttons + Footer */}
          <div className="pt-1.5 border-t border-[#E3DDD1] flex flex-col gap-1">
            <div className="flex gap-2.5 sm:gap-3">
              {/* Playful Escape Button */}
              <button
                onClick={handleEscapeClick}
                type="button"
                className="w-1/2 py-1.5 px-3 rounded-xl border border-[#D9D3C7] bg-[#F5F0E6] hover:bg-[#EFE7D8] text-[#5A5148] font-hand text-xs font-medium transition-all cursor-pointer active:scale-95 text-center truncate"
              >
                {escapeText}
              </button>

              {/* Primary Open Diary Button */}
              <button
                onClick={handleOpenDiary}
                type="button"
                className="w-1/2 py-1.5 px-4 rounded-xl bg-gradient-to-r from-[#FF8B94] to-[#FFAAA6] text-white font-hand font-bold text-xs shadow-md hover:shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Open Diary (No Judging!) 📖</span>
              </button>
            </div>

            {/* Small endearing footer line */}
            <div className="flex items-center justify-center gap-1 text-[10px] font-hand text-[#8A7E72]">
              <Heart className="w-3 h-3 text-[#FF8B94] fill-current" />
              <span>Happy Birthday, my favorite headache ♡</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
