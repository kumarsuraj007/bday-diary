'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { diaryAudio } from './DiaryAudio';

interface BirthdayEndingProps {
  onWishBlown?: () => void;
}

export const BirthdayEnding: React.FC<BirthdayEndingProps> = ({ onWishBlown }) => {
  const [isBlown, setIsBlown] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const handleBlowCandle = () => {
    if (isBlown) return;
    setIsBlown(true);
    setShowSparkles(true);

    // Audio cues
    diaryAudio.playCelebrationChimes();

    // Trigger elegant pastel/gold confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#E5A4A9', '#C8A261', '#9BAE92', '#FDE2E4', '#FFE8A3'],
        disableForReducedMotion: true,
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0.2, y: 0.7 },
          colors: ['#E5A4A9', '#D4AF37'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 0.8, y: 0.7 },
          colors: ['#9BAE92', '#FDE2E4'],
        });
      }, 350);
    } catch (e) {
      // Confetti fallback
    }

    if (onWishBlown) {
      onWishBlown();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center select-none">
      {/* Interactive Birthday Cake Illustration */}
      <div
        onClick={handleBlowCandle}
        className={`relative cursor-pointer group transition-transform duration-300 ${
          isBlown ? 'scale-100' : 'hover:scale-105 active:scale-95'
        }`}
        title={isBlown ? 'Your wish has been cast! ✨' : 'Click to blow out the candle!'}
      >
        <svg
          width="130"
          height="130"
          viewBox="0 0 140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-md"
        >
          {/* Cake Stand */}
          <ellipse cx="70" cy="120" rx="48" ry="10" fill="#E8DFD1" />
          <path d="M60 120H80V126H60V120Z" fill="#D4C7B5" />
          <ellipse cx="70" cy="127" rx="26" ry="5" fill="#C5B5A0" />

          {/* Bottom Cake Tier */}
          <path
            d="M32 92C32 92 35 110 70 110C105 110 108 92 108 92V72C108 72 105 82 70 82C35 82 32 72 32 72V92Z"
            fill="#FFF1F2"
            stroke="#E2D1C3"
            strokeWidth="1.5"
          />

          {/* Frosting drips */}
          <path
            d="M32 74C38 78 44 80 50 76C56 72 62 79 70 76C78 73 84 79 92 75C98 71 103 76 108 74"
            fill="none"
            stroke="#E5A4A9"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Strawberries / Rosettes */}
          <circle cx="48" cy="70" r="4.5" fill="#E37A82" />
          <circle cx="70" cy="68" r="4.5" fill="#E37A82" />
          <circle cx="92" cy="70" r="4.5" fill="#E37A82" />

          {/* Birthday Candle */}
          <rect x="68" y="44" width="4.5" height="24" rx="2" fill="#FAF6ED" stroke="#D8C4B0" strokeWidth="1" />
          <line x1="68" y1="52" x2="72.5" y2="50" stroke="#E5A4A9" strokeWidth="1.5" />
          <line x1="68" y1="60" x2="72.5" y2="58" stroke="#E5A4A9" strokeWidth="1.5" />
          <line x1="70.2" y1="44" x2="70.2" y2="39" stroke="#685547" strokeWidth="1.5" />

          {/* Candle Flame / Smoke */}
          {!isBlown ? (
            <g className="flame-animation">
              {/* Warm Outer Glow */}
              <circle cx="70.2" cy="31" r="14" fill="#FFD782" fillOpacity="0.25" />
              {/* Flame Tear */}
              <path
                d="M70.2 21C67 27 65.5 31 66.5 35C67.5 39 73 39 74 35C75 31 73.5 27 70.2 21Z"
                fill="url(#flameGrad)"
              />
              <ellipse cx="70.2" cy="35" rx="2.5" ry="3.5" fill="#FFFFFF" />
            </g>
          ) : (
            <g className="animate-fade-in">
              {/* Smoke curl */}
              <path
                d="M70 38C68 33 73 29 70 24C67 19 72 15 69 11"
                fill="none"
                stroke="#BDB2A6"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="opacity-70 transition-opacity"
              />
              <circle cx="70.2" cy="38" r="1.5" fill="#E5A4A9" />
            </g>
          )}

          <defs>
            <linearGradient id="flameGrad" x1="70.2" y1="21" x2="70.2" y2="39" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF2A3" />
              <stop offset="0.6" stopColor="#FF9F43" />
              <stop offset="1" stopColor="#EE5253" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating invitation indicator */}
        {!isBlown ? (
          <span className="inline-block mt-1 font-hand text-sm tracking-wide text-[#8E4A49] bg-[#FFF5F5] px-3 py-1 rounded-full border border-[#E5A4A9]/40 shadow-sm animate-pulse">
            ✨ Click to blow the candle!
          </span>
        ) : (
          <span className="inline-block mt-1 font-hand text-sm tracking-wide text-[#657E59] bg-[#F4F9F1] px-3 py-1 rounded-full border border-[#9BAE92]/40 shadow-sm">
            ✨ May all your wishes come true!
          </span>
        )}
      </div>

      {/* Sweet celebratory message after blowout */}
      {isBlown && (
        <div className="mt-3 max-w-xs transition-all duration-700 ease-out animate-in fade-in slide-in-from-bottom-2">
          <p className="font-serif italic text-base text-[#473B35]">
            “Your wish has been whispered to the stars.”
          </p>
          <p className="font-hand text-xs text-[#8C7B70] mt-1">
            (Don&apos;t tell anyone what you wished for, keep it safe in your heart!)
          </p>
        </div>
      )}
    </div>
  );
};
