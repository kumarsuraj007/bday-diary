'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { diaryAudio } from './DiaryAudio';

interface WishItem {
  id: string;
  color: string;
  title: string;
  message: string;
  from?: string;
}

interface WishNotesProps {
  wishes: WishItem[];
  rotationDeg?: number;
}

export const WishNotes: React.FC<WishNotesProps> = ({ wishes, rotationDeg = 0 }) => {
  const [selectedWish, setSelectedWish] = useState<WishItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenNote = (wish: WishItem) => {
    setSelectedWish(wish);
    diaryAudio.playChime(659.25, 0.8);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-2">
        {wishes.map((wish, idx) => {
          // slight natural hand-placed rotations
          const rotations = [-1.5, 1.2, -0.8, 2, -1.8, 1.5];
          const rot = rotations[idx % rotations.length];

          return (
            <button
              key={wish.id}
              onClick={() => handleOpenNote(wish)}
              style={{
                backgroundColor: wish.color,
                transform: `rotate(${rot}deg)`,
              }}
              className="group p-3 rounded-md shadow-sm border border-black/5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-black/10 focus:outline-none focus:ring-1 focus:ring-[#8E4A49]/30 relative overflow-hidden cursor-pointer"
            >
              {/* Mini washi tape strip on top */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-10 h-3 bg-white/60 shadow-xs border-y border-black/5 rotate-1 pointer-events-none" />

              <div className="flex items-center justify-between mt-1">
                <span className="font-serif font-semibold text-xs tracking-wide text-[#3E342F]">
                  {wish.title}
                </span>
                <span className="text-[10px] text-[#8E4A49] font-hand tracking-tighter opacity-70 group-hover:opacity-100">
                  open note ↗
                </span>
              </div>
              <p className="font-hand text-xs text-[#5C5048] line-clamp-2 mt-1 leading-relaxed">
                {wish.message}
              </p>
            </button>
          );
        })}
      </div>

      {/* Note Inspection Overlay (Portalled to document.body to avoid 3D perspective / overflow-hidden clipping) */}
      {mounted && selectedWish && createPortal(
        <div
          onClick={() => setSelectedWish(null)}
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: selectedWish.color,
              transform: rotationDeg !== 0 ? `rotate(${rotationDeg}deg)` : undefined,
              transformOrigin: 'center center',
            }}
            className="w-full max-w-[340px] sm:max-w-sm rounded-lg p-5 sm:p-6 shadow-2xl border border-black/10 relative transition-transform duration-200"
          >
            {/* Top Tape decoration */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/75 shadow-sm border-y border-black/5 -rotate-1 pointer-events-none" />

            <div className="flex justify-between items-start mb-3 pt-2 border-b border-black/10 pb-2">
              <div>
                <span className="text-[10px] tracking-wider uppercase font-serif text-[#7A6B62]">
                  {selectedWish.from || "A Special Birthday Blessing"}
                </span>
                <h4 className="font-serif text-xl font-bold text-[#2C231F]">
                  {selectedWish.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedWish(null)}
                className="w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-xs text-[#4A3D36] transition-colors cursor-pointer"
                aria-label="Close note"
              >
                ✕
              </button>
            </div>

            <p className="font-serif text-base text-[#3C322C] leading-relaxed my-4 whitespace-pre-wrap">
              {selectedWish.message}
            </p>

            <div className="flex items-center justify-between text-xs text-[#6F6258] pt-2 border-t border-black/10 font-hand">
              <span>Tucked gently inside the diary</span>
              <span>Made with love ♡</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
