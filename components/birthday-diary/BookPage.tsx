'use client';

import React from 'react';
import Image from 'next/image';
import { DiaryPageContent } from '@/data/diary-pages';
import { DoodleRenderer } from './DiaryDoodles';
import { WishNotes } from './WishNotes';
import { BirthdayEnding } from './BirthdayEnding';

interface BookPageProps {
  side: 'left' | 'right';
  pageData: DiaryPageContent;
  spreadNumber: number;
  totalSpreads: number;
  rotationDeg?: number;
}

export const BookPage: React.FC<BookPageProps> = ({
  side,
  pageData,
  spreadNumber,
  rotationDeg = 0,
}) => {
  const isLeft = side === 'left';
  const isCover = pageData.isCoverPage || pageData.image?.style === 'cover-full';

  // If this page is a full book cover (Front or Back cover from reference image)
  if (isCover && pageData.image) {
    return (
      <div
        className={`relative w-full h-full overflow-hidden select-none bg-[#EFE8DC] transition-colors duration-200 ${
          isLeft ? 'border-r border-[#D9D3C7]' : 'border-l border-[#D9D3C7]'
        }`}
      >
        {/* Cover Photo filling the entire page */}
        <Image
          src={pageData.image.src}
          alt={pageData.image.alt}
          fill
          priority={spreadNumber <= 2}
          className="object-contain p-1"
        />

        {/* Spine crease shadow overlay */}
        <div
          className={`absolute inset-y-0 ${
            isLeft ? 'right-0 w-12 spine-shadow-left' : 'left-0 w-12 spine-shadow-right'
          } pointer-events-none z-20`}
        />

        {/* Subtle border / page edge ridge */}
        <div className="absolute inset-0 border border-black/10 pointer-events-none z-10" />

        {/* Doodles if any */}
        {pageData.doodles?.map((doodle, i) => (
          <DoodleRenderer key={i} doodle={doodle} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full lined-notebook-paper overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 md:p-5 select-text transition-colors duration-200 ${
        isLeft
          ? 'border-r border-[#D9D3C7]'
          : 'border-l border-[#D9D3C7]'
      }`}
    >
      {/* Spine crease shadow overlay: vertical between left and right pages */}
      <div
        className={`absolute inset-y-0 ${
          isLeft ? 'right-0 w-10 md:w-12 spine-shadow-left' : 'left-0 w-10 md:w-12 spine-shadow-right'
        } pointer-events-none z-20`}
      />

      {/* Subtle outer notebook margin line */}
      <div
        className={`absolute inset-y-0 ${
          isLeft ? 'left-8 border-r border-[#F0D0D0]/50' : 'right-8 border-l border-[#F0D0D0]/50'
        } pointer-events-none z-10 hidden sm:block`}
      />

      {/* Sticky Index Tabs Peeking from the Right Edge */}
      {!isLeft && (
        <div className="flex absolute right-0 top-16 flex-col space-y-2 z-30 pointer-events-none translate-x-2">
          <div className="w-4 h-5 bg-[#FF8B94] rounded-r-xs shadow-xs" />
          <div className="w-4 h-5 bg-[#FFD369] rounded-r-xs shadow-xs" />
          <div className="w-4 h-5 bg-[#4D96FF] rounded-r-xs shadow-xs" />
        </div>
      )}

      {/* Doodles on this page */}
      {pageData.doodles?.map((doodle, i) => (
        <DoodleRenderer key={i} doodle={doodle} />
      ))}

      {/* Top Header Section */}
      <header className="relative z-10 mb-1">
        <div className="flex items-center justify-between font-hand text-[10px] sm:text-xs text-[#7A746E] pb-1 border-b border-[#E3DDD1]">
          <span className="tracking-wide">
            {pageData.date || pageData.subtitle || `Spread ${spreadNumber}`}
          </span>
          {pageData.weather && (
            <span className="text-[11px] sm:text-[12px] text-[#8C847B]">
              {pageData.weather}
            </span>
          )}
        </div>

        {/* Page Titles in Patrick Hand / Gaegu */}
        {pageData.title && (
          <h2 className="font-hand text-lg sm:text-xl md:text-2xl font-bold text-[#1A1A1A] tracking-normal mt-0.5 mb-0.5 leading-snug">
            {pageData.title}
          </h2>
        )}
        {pageData.subtitle && (
          <p className="font-hand text-xs sm:text-sm text-[#6B655E] mb-0.5">
            {pageData.subtitle}
          </p>
        )}
      </header>

      {/* Page Body Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-start my-1 space-y-2 sm:space-y-2.5 font-hand text-[13px] sm:text-sm md:text-base leading-relaxed text-[#24211E] overflow-y-auto pr-0.5 scrollbar-none">
        {/* Paragraphs */}
        {pageData.paragraphs?.map((para, idx) => (
          <p key={idx} className="leading-relaxed sm:leading-loose">
            {para}
          </p>
        ))}

        {/* List items (e.g., Spread 4: Things that make you special) */}
        {pageData.listItems && (
          <div className="space-y-1.5 sm:space-y-2 my-1 shrink-0">
            {pageData.listItems.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-1.5 sm:space-x-2">
                <span className="w-3.5 h-3.5 rounded-xs border-2 border-[#1A1A1A] flex items-center justify-center shrink-0 mt-0.5 text-[9px] text-[#1A1A1A] font-bold">
                  ✓
                </span>
                <span className="font-hand text-[13px] sm:text-sm md:text-base text-[#1A1A1A] leading-relaxed">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Quote Block / Taped Note */}
        {pageData.quote && (
          <div className="relative my-1 sm:my-1.5 p-2 sm:p-2.5 bg-[#FFFBF0] border border-[#E8DEC8] shadow-xs rounded-xs shrink-0">
            {/* Washi tape on top */}
            <div className="absolute -top-2 left-6 w-10 h-3 washi-tape-beige border-y border-black/10 rotate-1" />
            <p className="font-hand text-xs sm:text-sm text-[#332E29] italic leading-snug">
              &ldquo;{pageData.quote.text}&rdquo;
            </p>
            {pageData.quote.author && (
              <p className="text-right text-[10px] sm:text-xs text-[#7A7269] mt-0.5">
                — {pageData.quote.author}
              </p>
            )}
          </div>
        )}

        {/* Polaroid Photo with Wooden Clothes Peg */}
        {pageData.image && pageData.image.style !== 'cover-full' && (
          <div className="my-1 sm:my-1.5 flex flex-col items-center shrink-0">
            <div
              className={`relative overflow-visible ${
                pageData.image.style === 'polaroid'
                  ? 'bg-white p-2 pb-4 shadow-[0_6px_16px_rgba(0,0,0,0.1)] border border-[#E0DCD3] rotate-1'
                  : 'bg-white p-1.5 shadow-md border border-[#D9D3C7]'
              }`}
            >
              {/* Wooden Clothespin Peg clipping the Polaroid photo */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3.5 h-8 flex flex-col items-center z-30 filter drop-shadow-md">
                <div className="w-3 h-4 bg-gradient-to-r from-[#E8D4B0] via-[#F5E6CD] to-[#D6BC94] rounded-t-xs border border-[#C5A87B]" />
                <div className="w-3.5 h-1 bg-gradient-to-r from-[#999] via-[#CCC] to-[#777] my-[-1px] rounded-xs" />
                <div className="w-3 h-4 bg-gradient-to-r from-[#E0CB9F] via-[#F2E2C4] to-[#C9AE84] rounded-b-xs border border-[#C5A87B]" />
              </div>

              <div className="relative w-32 sm:w-36 md:w-44 h-32 sm:h-36 md:h-44 rounded-xs overflow-hidden">
                <Image
                  src={pageData.image.src}
                  alt={pageData.image.alt}
                  fill
                  sizes="(max-width: 640px) 130px, 180px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority={spreadNumber <= 2}
                />
              </div>

              {pageData.image.caption && (
                <p className="font-hand text-[11px] sm:text-xs text-center text-[#3D3833] mt-1 px-1 leading-snug max-w-[210px]">
                  {pageData.image.caption}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Interactive Wishes (Spread 7) */}
        {pageData.wishes && <WishNotes wishes={pageData.wishes} rotationDeg={rotationDeg} />}

        {/* Interactive Cake Blowout (Spread 8) */}
        {pageData.interactiveCake && <BirthdayEnding />}

        {/* Handwritten Notes in margins */}
        {pageData.handwrittenNotes?.map((note, idx) => (
          <div
            key={idx}
            className="font-hand text-xs sm:text-sm text-[#D9463E] -rotate-1 leading-snug px-1.5 py-0.5 bg-[#FFF2F0] rounded-xs w-fit border border-[#FFD0CA]"
          >
            {note}
          </div>
        ))}

        {/* Handwritten Signature */}
        {pageData.signature && (
          <div className="font-hand text-sm sm:text-base text-[#1A1A1A] text-right mt-1 whitespace-pre-line leading-relaxed">
            {pageData.signature}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer className="relative z-10 flex items-center justify-between pt-0.5 sm:pt-1.5 border-t border-[#E3DDD1] font-hand text-[9px] sm:text-xs text-[#8E877F]">
        <span>{pageData.pageNumber ? `— ${pageData.pageNumber} —` : ''}</span>
        {pageData.stampText && (
          <span className="font-mono text-[9px] tracking-wider uppercase border border-[#1E70D6] text-[#1E70D6] px-1.5 py-0.5 rounded-xs bg-[#F0F6FF]">
            {pageData.stampText}
          </span>
        )}
        <span className="text-[11px] text-[#A69E94]">Birthday Diary ♡ Khushboo</span>
      </footer>
    </div>
  );
};
