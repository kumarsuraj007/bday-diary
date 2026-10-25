'use client';

import React from 'react';

export const DeskProps: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. White Ceramic Coffee Mug with Saucer (Top Left - visible on tablet/desktop) */}
      <div className="hidden sm:block absolute sm:top-4 sm:left-6 md:top-8 md:left-12 transform sm:scale-90 md:scale-100 transition-transform">
        {/* Soft daylight contact shadow */}
        <div className="absolute top-10 left-8 w-44 h-44 bg-black/15 blur-2xl rounded-full transform rotate-12" />

        {/* Wooden Coaster Saucer */}
        <div className="relative w-36 h-36 rounded-full bg-[#C89B6F] shadow-[0_8px_20px_rgba(0,0,0,0.15)] border border-[#B3875B] flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border border-[#B08358] shadow-inner" />
        </div>

        {/* Ceramic Mug Body */}
        <div className="absolute top-2 left-2 w-32 h-32 rounded-full bg-gradient-to-br from-[#FFFFFF] via-[#F7F4EE] to-[#E6E1D3] shadow-[0_12px_24px_rgba(0,0,0,0.22)] border border-[#E0DBCF] flex items-center justify-center">
          {/* Mug Handle */}
          <div className="absolute -left-6 top-8 w-9 h-16 rounded-l-full border-[6px] border-[#EDE8DC] shadow-md -rotate-12" />

          {/* Coffee Surface with soft swirl reflection */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#3D2517] via-[#24130A] to-[#120803] shadow-[inset_0_4px_10px_rgba(0,0,0,0.7)] flex items-center justify-center overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#63412A]/30 via-transparent to-white/10 opacity-70" />
            {/* Latte swirl foam ring */}
            <div className="absolute w-12 h-12 rounded-full border border-[#D9C4A6]/20" />
          </div>
        </div>
      </div>

      {/* 2. Kraft Paper Luggage Tag & Paperclips (Left Desk Side) */}
      <div className="hidden lg:flex flex-col items-start absolute left-8 top-1/2 -translate-y-1/2 space-y-5">
        {/* Kraft Tag */}
        <div className="relative w-20 h-32 bg-[#D4BEA0] shadow-[0_8px_20px_rgba(0,0,0,0.12)] border border-[#BEA88B] rounded-sm p-2 flex flex-col justify-between transform -rotate-6">
          {/* Tag Hole & String */}
          <div className="w-3.5 h-3.5 rounded-full bg-[#FAF7F0] border border-[#B09A7F] mx-auto shadow-inner" />
          <div className="text-center font-hand text-[10px] tracking-widest uppercase text-[#544537] leading-tight">
            <span>EST.</span>
            <span className="block font-bold text-sm text-[#382B20]">2026</span>
            <span className="text-[8px] text-[#786655]">SPECIAL DAY</span>
          </div>
          <div className="text-[8px] font-sans text-center text-[#82715F] border-t border-[#B8A387] pt-1">
            made with care
          </div>
        </div>

        {/* Silver Paperclip */}
        <div className="ml-4 transform rotate-45">
          <svg width="22" height="48" viewBox="0 0 24 50" fill="none">
            <path
              d="M12 2C7 2 3 6 3 11V38C3 44 8 48 13 48C18 48 22 44 22 38V14C22 10 19 8 16 8C13 8 10 10 10 14V36"
              stroke="#B3B9C1"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="drop-shadow-sm"
            />
          </svg>
        </div>

        {/* Small Red "play!" Label from reference image */}
        <div className="px-2 py-0.5 bg-[#D9463E] text-white font-hand font-bold text-xs tracking-wider rounded-xs shadow-md transform -rotate-3">
          play!
        </div>
      </div>

      {/* 3. Luxury Black & Gold Fountain Pen (Right Desk Side) */}
      <div className="hidden xl:block absolute right-10 top-1/3 transform rotate-6">
        {/* Pen shadow */}
        <div className="absolute top-2 left-3 w-4 h-80 bg-black/20 blur-md rounded-full transform rotate-1" />

        {/* Pen Body */}
        <div className="relative w-4 h-80 flex flex-col items-center">
          {/* Gold Nib */}
          <div className="w-2.5 h-6 bg-gradient-to-b from-[#E6CA65] to-[#B89230] [clip-path:polygon(50%_0%,100%_100%,0%_100%)] shadow-sm" />
          {/* Grip Section */}
          <div className="w-3.5 h-10 bg-[#1A1A1A] border-y border-[#D4AF37]" />
          {/* Barrel */}
          <div className="w-4 h-48 bg-gradient-to-r from-[#2B2B2B] via-[#0D0D0D] to-[#2B2B2B] rounded-b-sm shadow-md relative">
            {/* Gold Trim Ring */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#E6CA65] via-[#FFEB99] to-[#B89230]" />
            {/* Gold Clip */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-[#E6CA65] to-[#B89230] rounded-full shadow-sm" />
            <div className="absolute bottom-6 inset-x-0 h-1 bg-[#D4AF37]" />
          </div>
          {/* End Cap */}
          <div className="w-3.5 h-5 bg-[#111111] rounded-b-md" />
        </div>
      </div>

      {/* 4. Pastel Washi Tape Rolls (Bottom Right Desk Corner) */}
      <div className="hidden lg:flex items-center space-x-2 absolute right-12 bottom-8 transform -rotate-12">
        {/* Sky Blue Tape Roll */}
        <div className="w-14 h-14 rounded-full border-[8px] border-[#B8D8E8] bg-[#F5F2EB] shadow-md flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border border-[#A4C9DC] bg-[#EAE4D8]" />
        </div>
        {/* Beige Tape Roll */}
        <div className="w-14 h-14 rounded-full border-[8px] border-[#DED1BC] bg-[#F5F2EB] shadow-md -ml-4 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border border-[#C9BC9F] bg-[#EAE4D8]" />
        </div>
      </div>
    </div>
  );
};
