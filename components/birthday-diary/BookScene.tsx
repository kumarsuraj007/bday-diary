'use client';

import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
import { DIARY_SPREADS, DIARY_METADATA, DiaryPageContent } from '@/data/diary-pages';
import { BookPage } from './BookPage';
import { DeskProps } from './DeskProps';
import { diaryAudio } from './DiaryAudio';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Music,
  Bookmark,
  BookOpen,
  Sparkles,
  RotateCcw,
  RotateCw
} from 'lucide-react';

export type BookState = 'closed' | 'opening' | 'reading' | 'closing' | 'closing-back' | 'closed-back';

export const BookScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookSpreadRef = useRef<HTMLDivElement>(null);
  const openingCoverRef = useRef<HTMLDivElement>(null);
  const openingCoverShadowRef = useRef<HTMLDivElement>(null);
  const leftBasePageRef = useRef<HTMLDivElement>(null);
  const rightBasePageRef = useRef<HTMLDivElement>(null);
  const turningLeafRef = useRef<HTMLDivElement>(null);
  const turningShadowRef = useRef<HTMLDivElement>(null);

  const [bookState, setBookState] = useState<BookState>('closed');
  const [currentSpread, setCurrentSpread] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [rotationDeg, setRotationDeg] = useState<number>(0);
  const [stageScale, setStageScale] = useState<number>(1);
  const [manualRotation, setManualRotation] = useState<'auto' | 'rotated' | 'normal'>('auto');

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mobile = w < 768;
      setIsMobile(mobile);

      // On mobile portrait (h > w), rotate 90deg to landscape view!
      let shouldRotate = false;
      if (manualRotation === 'rotated') {
        shouldRotate = true;
      } else if (manualRotation === 'normal') {
        shouldRotate = false;
      } else {
        shouldRotate = mobile && h > w;
      }

      if (shouldRotate) {
        setRotationDeg(90);
        // When rotated 90deg: book width (760) spans viewport height, book height (480) spans viewport width
        // Give generous margins so the book has plenty of space around it and never touches edges
        const availW = w - 40;
        const availH = h - 145;
        const scaleW = availW / 480;
        const scaleH = availH / 760;
        const s = Math.min(scaleW, scaleH) * 0.92;
        setStageScale(Number(s.toFixed(3)));
      } else {
        setRotationDeg(0);
        const availW = w - (mobile ? 28 : 64);
        const availH = h - (mobile ? 100 : 150);
        const scaleW = availW / 760;
        const scaleH = availH / 480;
        const s = Math.min(scaleW, scaleH) * 0.95;
        setStageScale(Number(s.toFixed(3)));
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
        return rotationDeg === 90 ? 'normal' : 'rotated';
      }
      return prev === 'rotated' ? 'normal' : 'rotated';
    });
  };

  const totalSpreads = DIARY_SPREADS.length;
  const activeSpreadRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);

  // Page Turn Architecture State (Pre-renders target base pages)
  const [turnState, setTurnState] = useState<{
    isTurning: boolean;
    direction: 1 | -1;
    baseLeftPage: DiaryPageContent;
    baseRightPage: DiaryPageContent;
    leafFrontPage: DiaryPageContent;
    leafBackPage: DiaryPageContent;
    targetSpread: number;
  }>({
    isTurning: false,
    direction: 1,
    baseLeftPage: DIARY_SPREADS[0].leftPage,
    baseRightPage: DIARY_SPREADS[0].rightPage,
    leafFrontPage: DIARY_SPREADS[0].rightPage,
    leafBackPage: DIARY_SPREADS[1]?.leftPage || DIARY_SPREADS[0].leftPage,
    targetSpread: 0,
  });

  // 1. OPEN BOOK TRIGGER
  const handleOpenBook = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    activeSpreadRef.current = 0;
    setCurrentSpread(0);
    setTurnState((prev) => ({
      ...prev,
      baseLeftPage: DIARY_SPREADS[0].leftPage,
      baseRightPage: DIARY_SPREADS[0].rightPage,
    }));
    diaryAudio.playBookOpen();
    setBookState('opening');
  }, []);

  // 2. CLOSE BOOK TO FRONT COVER TRIGGER
  const handleCloseToFront = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    activeSpreadRef.current = 0;
    setCurrentSpread(0);
    diaryAudio.playBookClose();
    setBookState('closing');
  }, []);

  // 3. CLOSE BOOK TO BACK COVER TRIGGER
  const handleCloseToBack = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    diaryAudio.playBookClose();
    setBookState('closing-back');
  }, []);

  // SYNCHRONOUS 3D ANIMATION CONTROLLER (Runs BEFORE browser paint to guarantee zero-glitch 3D transitions)
  useIsomorphicLayoutEffect(() => {
    if (bookState === 'opening') {
      const spread = bookSpreadRef.current;
      const cover = openingCoverRef.current;
      const rightPage = rightBasePageRef.current;

      if (!spread || !cover) {
        setBookState('reading');
        isAnimatingRef.current = false;
        return;
      }

      // Initial state: spread is at -25% (right half / front cover centered on desk), cover leaf at 0°
      gsap.set(spread, { xPercent: -25, opacity: 1 });
      gsap.set(cover, { rotateY: 0, z: 0, scaleX: 1, rotateZ: 0, opacity: 1 });
      if (rightPage) {
        gsap.set(rightPage, { opacity: 0 });
      }

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(spread, { xPercent: 0 });
          if (rightPage) {
            gsap.set(rightPage, { opacity: 1 });
          }
          setBookState('reading');
          isAnimatingRef.current = false;
        },
      });

      // Spread centers as cover swings open
      tl.to(spread, {
        xPercent: 0,
        duration: 1.15,
        ease: 'power2.inOut',
      }, 0);

      // FIX: keep the right page fully hidden until the cover is edge-on (90°),
      // so nothing shows through the transparent cover PNG while it lifts.
      // power2.inOut is symmetric, so 90° happens at exactly half the duration (~0.575s).
      if (rightPage) {
        tl.to(rightPage, {
          opacity: 1,
          duration: 0.12,
          ease: 'none',
        }, 0.52);
      }

      // 3D cover swings open from right to left (0° -> -180°), revealing Page 1 on its back face!
      tl.to(cover, {
        rotateY: -180,
        duration: 1.15,
        ease: 'power2.inOut',
        onUpdate: function () {
          const p = this.progress();
          const zLift = Math.sin(p * Math.PI) * 60;
          const xBend = 1 - Math.sin(p * Math.PI) * 0.06;
          const zTilt = -Math.sin(p * Math.PI) * 2.8;

          gsap.set(cover, {
            z: zLift,
            scaleX: xBend,
            rotateZ: zTilt,
          });
        },
      }, 0);
    } else if (bookState === 'closing') {
      const spread = bookSpreadRef.current;
      const cover = openingCoverRef.current;
      const leftPage = leftBasePageRef.current;

      if (!spread || !cover) {
        setBookState('closed');
        isAnimatingRef.current = false;
        return;
      }

      // Initial state: spread centered (0%), cover leaf at 0° on the right
      gsap.set(spread, { xPercent: 0, opacity: 1 });
      gsap.set(cover, { rotateY: 0, z: 0, scaleX: 1, rotateZ: 0, opacity: 1 });
      if (leftPage) {
        gsap.set(leftPage, { opacity: 1 });
      }

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(spread, { xPercent: 0 });
          setBookState('closed');
          isAnimatingRef.current = false;
        },
      });

      // Spread shifts right so closed cover (landing on the left) is centered on the desk
      tl.to(spread, {
        xPercent: 25,
        duration: 1.05,
        ease: 'power2.inOut',
      }, 0);

      // Right page swings in 3D from RIGHT TO LEFT (0° -> -180°), landing closed with Front Cover!
      tl.to(cover, {
        rotateY: -180,
        duration: 1.05,
        ease: 'power2.inOut',
        onUpdate: function () {
          const p = this.progress();
          const zLift = Math.sin(p * Math.PI) * 60;
          const xBend = 1 - Math.sin(p * Math.PI) * 0.06;
          const zTilt = -Math.sin(p * Math.PI) * 2.8;

          gsap.set(cover, {
            z: zLift,
            scaleX: xBend,
            rotateZ: zTilt,
          });
        },
      }, 0);

      // FIX: cover crosses 90° at ~0.525s. Start fading the left page right then,
      // so it is gone before the transparent cover PNG settles over it.
      if (leftPage) {
        tl.to(leftPage, {
          opacity: 0,
          duration: 0.3,
          ease: 'none',
        }, 0.5);
      }
    } else if (bookState === 'closing-back') {
      const spread = bookSpreadRef.current;
      const cover = openingCoverRef.current;
      const leftPage = leftBasePageRef.current;

      if (!spread || !cover) {
        setBookState('closed-back');
        isAnimatingRef.current = false;
        return;
      }

      gsap.set(spread, { xPercent: 0, opacity: 1 });
      gsap.set(cover, { rotateY: 0, z: 0, scaleX: 1, rotateZ: 0, opacity: 1 });
      if (leftPage) {
        gsap.set(leftPage, { opacity: 1 });
      }

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(spread, { xPercent: 0 });
          setBookState('closed-back');
          isAnimatingRef.current = false;
        },
      });

      tl.to(spread, {
        xPercent: 25,
        duration: 1.05,
        ease: 'power2.inOut',
      }, 0);

      // Right page swings in 3D from RIGHT TO LEFT (0° -> -180°), landing closed with Back Cover!
      tl.to(cover, {
        rotateY: -180,
        duration: 1.05,
        ease: 'power2.inOut',
        onUpdate: function () {
          const p = this.progress();
          const zLift = Math.sin(p * Math.PI) * 60;
          const xBend = 1 - Math.sin(p * Math.PI) * 0.06;
          const zTilt = -Math.sin(p * Math.PI) * 2.8;

          gsap.set(cover, {
            z: zLift,
            scaleX: xBend,
            rotateZ: zTilt,
          });
        },
      }, 0);

      // FIX: same as front close, fade the left page as the cover crosses 90°
      if (leftPage) {
        tl.to(leftPage, {
          opacity: 0,
          duration: 0.3,
          ease: 'none',
        }, 0.5);
      }
    }
  }, [bookState]);

  // 4. REOPEN FROM BACK COVER
  const handleReopenFromBack = useCallback(() => {
    if (isAnimatingRef.current) return;
    setBookState('closed');
    activeSpreadRef.current = 0;
    setCurrentSpread(0);
    setTimeout(() => {
      handleOpenBook();
    }, 100);
  }, [handleOpenBook]);

  // 5. REGULAR SPREAD NAVIGATION (Page Turns with Page Curl)
  const goToSpread = useCallback((targetIndex: number) => {
    if (targetIndex < 0) {
      handleCloseToFront();
      return;
    }
    if (targetIndex >= totalSpreads) {
      handleCloseToBack();
      return;
    }
    if (isAnimatingRef.current) return;
    if (targetIndex === activeSpreadRef.current) return;

    isAnimatingRef.current = true;
    const direction: 1 | -1 = targetIndex > activeSpreadRef.current ? 1 : -1;
    const fromSpreadIndex = activeSpreadRef.current;
    const toSpreadIndex = targetIndex;

    const fromSpread = DIARY_SPREADS[fromSpreadIndex];
    const toSpread = DIARY_SPREADS[toSpreadIndex];

    // Trigger organic paper rustle sound
    diaryAudio.playPageTurn();

    const leaf = turningLeafRef.current;
    const shadow = turningShadowRef.current;

    if (!leaf) {
      activeSpreadRef.current = toSpreadIndex;
      setCurrentSpread(toSpreadIndex);
      isAnimatingRef.current = false;
      return;
    }

    if (direction > 0) {
      // FORWARD TURN: Right to Left
      setTurnState({
        isTurning: true,
        direction: 1,
        baseLeftPage: fromSpread.leftPage,
        baseRightPage: toSpread.rightPage,
        leafFrontPage: fromSpread.rightPage,
        leafBackPage: toSpread.leftPage,
        targetSpread: toSpreadIndex,
      });

      gsap.set(leaf, {
        rotateY: 0,
        z: 0,
        scaleX: 1,
        rotateZ: 0,
        display: 'block',
      });

      gsap.to(leaf, {
        rotateY: -180,
        duration: 0.92,
        ease: 'power2.inOut',
        onUpdate: function () {
          const p = this.progress();
          const zLift = Math.sin(p * Math.PI) * 45;
          const xBend = 1 - Math.sin(p * Math.PI) * 0.07;
          const zTilt = -Math.sin(p * Math.PI) * 2.8;

          gsap.set(leaf, {
            z: zLift,
            scaleX: xBend,
            rotateZ: zTilt,
          });

          if (shadow) {
            shadow.style.opacity = `${Math.sin(p * Math.PI) * 0.38}`;
          }
        },
        onComplete: () => {
          activeSpreadRef.current = toSpreadIndex;
          setCurrentSpread(toSpreadIndex);
          setTurnState((prev) => ({
            ...prev,
            isTurning: false,
            baseLeftPage: toSpread.leftPage,
            baseRightPage: toSpread.rightPage,
          }));
          gsap.set(leaf, { display: 'none', rotateY: 0, z: 0, scaleX: 1, rotateZ: 0 });
          if (shadow) shadow.style.opacity = '0';
          isAnimatingRef.current = false;
        },
      });
    } else {
      // BACKWARD TURN: Left to Right
      setTurnState({
        isTurning: true,
        direction: -1,
        baseLeftPage: toSpread.leftPage,
        baseRightPage: fromSpread.rightPage,
        leafFrontPage: toSpread.rightPage,
        leafBackPage: fromSpread.leftPage,
        targetSpread: toSpreadIndex,
      });

      gsap.set(leaf, {
        rotateY: -180,
        z: 0,
        scaleX: 1,
        rotateZ: 0,
        display: 'block',
      });

      gsap.to(leaf, {
        rotateY: 0,
        duration: 0.92,
        ease: 'power2.inOut',
        onUpdate: function () {
          const p = 1 - this.progress();
          const zLift = Math.sin(p * Math.PI) * 45;
          const xBend = 1 - Math.sin(p * Math.PI) * 0.07;
          const zTilt = Math.sin(p * Math.PI) * 2.8;

          gsap.set(leaf, {
            z: zLift,
            scaleX: xBend,
            rotateZ: zTilt,
          });

          if (shadow) {
            shadow.style.opacity = `${Math.sin(p * Math.PI) * 0.38}`;
          }
        },
        onComplete: () => {
          activeSpreadRef.current = toSpreadIndex;
          setCurrentSpread(toSpreadIndex);
          setTurnState((prev) => ({
            ...prev,
            isTurning: false,
            baseLeftPage: toSpread.leftPage,
            baseRightPage: toSpread.rightPage,
          }));
          gsap.set(leaf, { display: 'none', rotateY: 0, z: 0, scaleX: 1, rotateZ: 0 });
          if (shadow) shadow.style.opacity = '0';
          isAnimatingRef.current = false;
        },
      });
    }
  }, [totalSpreads, isMobile, handleCloseToFront, handleCloseToBack]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (bookState === 'closed') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpenBook();
        }
        return;
      }

      if (bookState === 'closed-back') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleReopenFromBack();
        }
        return;
      }

      if (bookState === 'reading') {
        if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
          e.preventDefault();
          if (activeSpreadRef.current === totalSpreads - 1) {
            handleCloseToBack();
          } else {
            goToSpread(activeSpreadRef.current + 1);
          }
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          if (activeSpreadRef.current === 0) {
            handleCloseToFront();
          } else {
            goToSpread(activeSpreadRef.current - 1);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bookState, handleOpenBook, handleCloseToFront, handleCloseToBack, handleReopenFromBack, goToSpread, totalSpreads]);

  // Audio toggles
  const handleToggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    diaryAudio.setMuted(nextMuted);
  };

  const handleToggleMusic = () => {
    const isPlaying = diaryAudio.toggleAmbient();
    setIsAmbientPlaying(isPlaying);
  };

  // Determine active displayed pages
  const currentSpreadData = DIARY_SPREADS[currentSpread];
  const activeLeft = turnState.isTurning ? turnState.baseLeftPage : currentSpreadData.leftPage;
  const activeRight = turnState.isTurning ? turnState.baseRightPage : currentSpreadData.rightPage;

  const leftStackCount = currentSpread;
  const rightStackCount = totalSpreads - 1 - currentSpread;

  return (
    <div
      ref={containerRef}
      className="relative h-[100dvh] max-h-[100dvh] w-full bg-[#F5F2EB] text-[#1A1A1A] select-none overflow-hidden"
    >
      {/* Daylight Desk Surface Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-35 mix-blend-multiply">
        <Image
          src="/images/desk_bg.jpg"
          alt="Daylight desk surface"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Diagonal sunbeam overlay */}
      <div className="absolute inset-0 window-sunbeam-shadow pointer-events-none z-0" />

      {/* Surrounding Desk Props (Coffee cup, luxury pen, washi tapes, paperclips) */}
      <DeskProps />

      {/* Main Screen Layout Container (Locked to 100dvh with zero scrolling) */}
      <div className="relative z-10 h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between items-center px-2 sm:px-4 py-2 sm:py-3 overflow-hidden">

        {/* TOP HEADER */}
        <header className="relative z-30 w-full max-w-5xl flex items-center justify-between px-2 pt-0.5 sm:pt-1 font-hand shrink-0">
          {/* Left: Birthday Diary Title */}
          <div className="flex items-center space-x-1 sm:space-x-2 shrink min-w-0">
            <span className="font-hand font-bold text-xs sm:text-base md:text-xl text-[#1A1A1A] tracking-wide truncate flex items-center space-x-1">
              <span className="text-[#1E70D6]">✦</span>
              <span className="truncate">Diary ♡ {DIARY_METADATA.recipientName}</span>
            </span>
            {bookState === 'reading' && (
              <span className="hidden md:inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-white/70 border border-[#DDD6C8] text-xs text-[#524B43] shadow-2xs">
                <Bookmark className="w-3 h-3 text-[#1E70D6]" />
                <span>{currentSpreadData.chapterLabel || `Spread ${currentSpread + 1}`}</span>
              </span>
            )}
          </div>

          {/* Center: Reading Progress Dots (Only in reading mode on tablet/desktop) */}
          {bookState === 'reading' && (
            <div className="hidden md:flex items-center space-x-2 bg-white/60 px-3 py-1 rounded-full border border-[#E0D8CB] shadow-2xs transition-all">
              {DIARY_SPREADS.map((spread, idx) => (
                <button
                  key={spread.id}
                  onClick={() => goToSpread(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentSpread
                      ? 'w-5 h-2 bg-[#1A1A1A]'
                      : 'w-2 h-2 bg-[#B8B0A2] hover:bg-[#787063]'
                  }`}
                  title={`Go to ${spread.chapterLabel || `Spread ${idx + 1}`}`}
                  aria-label={`Go to spread ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Right: Audio Controls & Cover Return Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
            <button
              onClick={handleToggleMusic}
              className={`p-1 sm:px-2.5 sm:py-1 rounded-full border text-[11px] sm:text-xs flex items-center space-x-1 transition-all ${
                isAmbientPlaying
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-white/80 border-[#DDD6C8] text-[#474037] hover:bg-white shadow-2xs'
              }`}
              title={isAmbientPlaying ? 'Pause ambient music box' : 'Play ambient music box'}
              aria-label="Toggle ambient music"
            >
              <Music className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden md:inline font-hand text-xs font-bold">
                {isAmbientPlaying ? 'Music On' : 'Music'}
              </span>
            </button>

            <button
              onClick={handleToggleSound}
              className="p-1 sm:p-1.5 rounded-full bg-white/80 border border-[#DDD6C8] text-[#474037] hover:bg-white shadow-2xs transition-colors"
              title={isMuted ? 'Unmute paper sounds' : 'Mute paper sounds'}
              aria-label="Toggle paper sound effects"
            >
              {isMuted ? <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
            </button>

            {/* Landscape / Portrait Rotation Toggle for Mobile & Small Screens */}
            {isMobile && (
              <button
                onClick={handleToggleRotation}
                className="font-hand font-bold text-[10px] sm:text-xs text-[#3D372F] hover:text-[#1A1A1A] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/80 border border-[#DDD6C8] hover:bg-white shadow-2xs transition-all hover:scale-105 active:scale-95 flex items-center space-x-1"
                title="Rotate Book Orientation (Landscape / Portrait)"
              >
                <RotateCw className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#1E70D6]" />
                <span>{rotationDeg === 90 ? '90°' : '0°'}</span>
              </button>
            )}

            {bookState === 'reading' && (
              <button
                onClick={handleCloseToFront}
                className="font-hand font-bold text-[10px] sm:text-xs tracking-wider text-[#3D372F] hover:text-[#1A1A1A] px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/80 border border-[#DDD6C8] hover:bg-white shadow-2xs transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                title="Close to Front Cover"
              >
                Cover
              </button>
            )}

            {bookState === 'closed-back' && (
              <button
                onClick={handleCloseToFront}
                className="font-hand font-bold text-[10px] sm:text-xs text-[#3D372F] hover:text-[#1A1A1A] px-2 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-white/80 border border-[#DDD6C8] hover:bg-white shadow-2xs transition-all hover:scale-105 active:scale-95 flex items-center space-x-1"
                title="Go to Front Cover"
              >
                <RotateCcw className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#1E70D6]" />
                <span>Front</span>
              </button>
            )}
          </div>
        </header>

        {/* CENTER STAGE — Scaled and rotated dynamically to fit mobile as landscape */}
        <div className="relative my-auto flex flex-1 items-center justify-center overflow-hidden w-full">
          <div
            className="relative flex items-center justify-center transition-transform duration-300 ease-out"
            style={{
              transform: `rotate(${rotationDeg}deg) scale(${stageScale})`,
              transformOrigin: 'center center',
            }}
          >

            {/* ========================================================= */}
            {/* 1. CLOSED FRONT COVER (Single Book in Center, NO pages visible) */}
            {/* ========================================================= */}
            {bookState === 'closed' && (
              <div className="relative flex flex-col items-center">
                <div
                  onClick={handleOpenBook}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenBook();
                    }
                  }}
                  aria-label="Click to open the Birthday Diary"
                  className="relative group cursor-pointer perspective-stage transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-[0.99] focus:outline-none"
                >
                  {/* Soft Contact Shadow */}
                  <div className="absolute -bottom-6 left-6 right-6 h-12 bg-black/25 blur-xl rounded-full transform scale-95 group-hover:scale-100 transition-transform duration-500 pointer-events-none" />

                  {/* Pure Isolated Book Cover PNG */}
                  <div className="relative w-[380px] h-[480px] filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)] bg-transparent">
                    <Image
                      src="/images/covers/front_cover.png"
                      alt="Birthday Diary Front Cover with kitty, polaroid, and star charm"
                      fill
                      priority
                      sizes="380px"
                      className="object-contain bg-transparent"
                    />
                  </div>

                  {/* Invitation Below the Book */}
                  <div className="mt-7 flex flex-col items-center">
                    <button
                      type="button"
                      onClick={handleOpenBook}
                      className="px-7 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white font-hand text-lg font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center space-x-2 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-white" />
                      <span>Click to open Khushboo&apos;s diary ♡</span>
                    </button>
                    <span className="font-hand text-xs text-[#7A7165] mt-1.5 opacity-80 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-[#1E70D6]" />
                      <span>(or press Enter ↵ to open)</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 2. OPEN DOUBLE SPREAD NOTEBOOK (During opening, reading & closing) */}
            {/* ========================================================= */}
            {(bookState === 'reading' || bookState === 'opening' || bookState === 'closing' || bookState === 'closing-back') && (
              <div className="relative flex items-center justify-center">

                {/* THE OPEN BOOK SPREAD CONTAINER */}
                <div
                  ref={bookSpreadRef}
                  className="relative flex items-center justify-center perspective-stage w-[760px] h-[480px]"
                >
                  {/* Book Pages Core Stage */}
                  <div className={`relative w-full h-full preserve-3d flex ${bookState === 'reading' ? 'shadow-md rounded-xs' : ''}`}>

                    {/* LEFT BASE PAGE: Empty desk during opening so page 1 never shows prematurely */}
                    {bookState === 'opening' ? (
                      <div className="relative w-1/2 h-full pointer-events-none" />
                    ) : (
                      <div
                        ref={leftBasePageRef}
                        className={`relative w-1/2 h-full rounded-l-xs overflow-hidden ${
                          leftStackCount > 0 ? 'book-edge-stack-left' : ''
                        }`}
                      >
                        <BookPage
                          side="left"
                          pageData={activeLeft}
                          spreadNumber={currentSpread + 1}
                          totalSpreads={totalSpreads}
                          rotationDeg={rotationDeg}
                        />
                      </div>
                    )}

                    {/* RIGHT BASE PAGE: Rendered during reading & opening (hidden by GSAP until the cover is edge-on) */}
                    {(bookState === 'closing' || bookState === 'closing-back') ? (
                      <div className="relative w-1/2 h-full pointer-events-none" />
                    ) : (
                      <div
                        ref={rightBasePageRef}
                        className={`relative w-1/2 h-full rounded-r-xs overflow-hidden ${
                          rightStackCount > 0 ? 'book-edge-stack-right' : ''
                        }`}
                      >
                        <BookPage
                          side="right"
                          pageData={activeRight}
                          spreadNumber={currentSpread + 1}
                          totalSpreads={totalSpreads}
                          rotationDeg={rotationDeg}
                        />
                      </div>
                    )}

                    {/* 3D BOOK COVER SWINGING LEAF (For interactive Opening & Closing animations) */}
                    {(bookState === 'opening' || bookState === 'closing' || bookState === 'closing-back') && (
                      <div
                        ref={openingCoverRef}
                        className="absolute top-0 right-0 w-1/2 h-full preserve-3d pointer-events-none z-40 origin-left"
                        style={{ transform: 'rotateY(0deg)' }}
                      >
                        {/* FRONT FACE (Visible 0° -> -90° when swinging right to left) */}
                        <div className={`absolute inset-0 backface-hidden ${
                          bookState === 'opening'
                            ? 'bg-transparent'
                            : 'rounded-r-xs overflow-hidden shadow-xl bg-[#FAF6EE]'
                        }`}>
                          {bookState === 'opening' ? (
                            <div className="relative w-full h-full bg-transparent filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)]">
                              <Image
                                src="/images/covers/front_cover.png"
                                alt="Front Cover"
                                fill
                                priority
                                sizes="380px"
                                className="object-contain bg-transparent"
                              />
                            </div>
                          ) : bookState === 'closing' ? (
                            <BookPage
                              side="right"
                              pageData={DIARY_SPREADS[0].rightPage}
                              spreadNumber={1}
                              totalSpreads={totalSpreads}
                              rotationDeg={rotationDeg}
                            />
                          ) : (
                            <BookPage
                              side="right"
                              pageData={DIARY_SPREADS[totalSpreads - 1].rightPage}
                              spreadNumber={totalSpreads}
                              totalSpreads={totalSpreads}
                              rotationDeg={rotationDeg}
                            />
                          )}
                        </div>

                        {/* Dynamic Sweep Lighting Shadow (Only during page turn/closing) */}
                        {bookState !== 'opening' && (
                          <div
                            ref={openingCoverShadowRef}
                            className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/15 to-transparent pointer-events-none opacity-0"
                          />
                        )}

                        {/* BACK FACE (Visible -90° -> -180° when swung over to the left desk) */}
                        <div className={`absolute inset-0 backface-hidden rotate-y-180 ${
                          bookState === 'closing' || bookState === 'closing-back'
                            ? 'bg-transparent'
                            : 'rounded-l-xs overflow-hidden shadow-xl bg-[#FAF6EE]'
                        }`}>
                          {bookState === 'opening' ? (
                            <BookPage
                              side="left"
                              pageData={DIARY_SPREADS[0].leftPage}
                              spreadNumber={1}
                              totalSpreads={totalSpreads}
                              rotationDeg={rotationDeg}
                            />
                          ) : bookState === 'closing' ? (
                            <div className="relative w-full h-full bg-transparent filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)]">
                              <Image
                                src="/images/covers/front_cover.png"
                                alt="Front Cover"
                                fill
                                priority
                                sizes="380px"
                                className="object-contain bg-transparent"
                              />
                            </div>
                          ) : (
                            <div className="relative w-full h-full bg-transparent filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)]">
                              <Image
                                src="/images/covers/back_cover.png"
                                alt="Back Cover"
                                fill
                                priority
                                sizes="380px"
                                className="object-contain bg-transparent"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* 3D TURNING PAGE LEAF (For Spreads 1-8 flips with Realistic Curve) */}
                    <div
                      ref={turningLeafRef}
                      className="absolute top-0 right-0 w-1/2 h-full preserve-3d pointer-events-none z-30 origin-left hidden"
                      style={{ transform: 'rotateY(0deg)' }}
                    >
                      {/* Front Face: Outgoing Right Page */}
                      <div className="absolute inset-0 backface-hidden rounded-r-xs overflow-hidden shadow-xl">
                        <BookPage
                          side="right"
                          pageData={turnState.leafFrontPage}
                          spreadNumber={currentSpread + 1}
                          totalSpreads={totalSpreads}
                          rotationDeg={rotationDeg}
                        />
                      </div>

                      {/* Dynamic Sweep Shadow */}
                      <div
                        ref={turningShadowRef}
                        className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent pointer-events-none opacity-0"
                      />

                      {/* Back Face: Incoming Left Page */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-l-xs overflow-hidden shadow-xl">
                        <BookPage
                          side="left"
                          pageData={turnState.leafBackPage}
                          spreadNumber={turnState.targetSpread + 1}
                          totalSpreads={totalSpreads}
                          rotationDeg={rotationDeg}
                        />
                      </div>
                    </div>

                    {/* Left Page Turn Button (Positioned outside the book so it never covers text) */}
                    {bookState === 'reading' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentSpread > 0) {
                            goToSpread(currentSpread - 1);
                          } else {
                            handleCloseToFront();
                          }
                        }}
                        className="flex absolute -left-12 sm:-left-14 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-[#1A1A1A] shadow-lg hover:shadow-xl border border-[#D5CDBD] items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
                        aria-label={currentSpread > 0 ? "Previous page" : "Close to Front Cover"}
                        title={currentSpread > 0 ? "Previous page" : "Close to Front Cover"}
                      >
                        <ChevronLeft className="w-5 h-5 text-[#2C2723]" />
                      </button>
                    )}

                    {/* Right Page Turn Button (Positioned outside the book so it never covers photos or text) */}
                    {bookState === 'reading' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentSpread < totalSpreads - 1) {
                            goToSpread(currentSpread + 1);
                          } else {
                            handleCloseToBack();
                          }
                        }}
                        className="flex absolute -right-12 sm:-right-14 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-[#1A1A1A] shadow-lg hover:shadow-xl border border-[#D5CDBD] items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
                        aria-label={currentSpread < totalSpreads - 1 ? "Next page" : "Close to Back Cover"}
                        title={currentSpread < totalSpreads - 1 ? "Next page" : "Close to Back Cover"}
                      >
                        <ChevronRight className="w-5 h-5 text-[#2C2723]" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 3. CLOSED BACK COVER (Single Book in Center, after finishing) */}
            {/* ========================================================= */}
            {bookState === 'closed-back' && (
              <div className="relative flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
                <div
                  onClick={handleReopenFromBack}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleReopenFromBack();
                    }
                  }}
                  aria-label="Click to read again from page 1"
                  className="relative group cursor-pointer perspective-stage transition-transform duration-300 ease-out hover:scale-[1.02] active:scale-[0.99] focus:outline-none"
                >
                  {/* Soft Contact Shadow */}
                  <div className="absolute -bottom-6 left-6 right-6 h-12 bg-black/25 blur-xl rounded-full transform scale-95 group-hover:scale-100 transition-transform duration-500 pointer-events-none" />

                  {/* Pure Isolated Book Back Cover PNG */}
                  <div className="relative w-[380px] h-[480px] filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)] bg-transparent">
                    <Image
                      src="/images/covers/back_cover.png"
                      alt="Birthday Diary Back Cover with cat from behind, pink bow, and Thanks for being you"
                      fill
                      priority
                      sizes="380px"
                      className="object-contain bg-transparent"
                    />
                  </div>

                  {/* Reopen / Front Cover Action Buttons */}
                  <div className="mt-7 flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={handleReopenFromBack}
                      className="px-6 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white font-hand text-lg font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center space-x-2 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-white" />
                      <span>Read Again from Page 1 ♡</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (isAnimatingRef.current) return;
                        setBookState('closed');
                        activeSpreadRef.current = 0;
                        setCurrentSpread(0);
                      }}
                      className="px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-[#1A1A1A] border border-[#DDD6C8] font-hand text-base font-bold shadow-xs hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center space-x-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4 text-[#1E70D6]" />
                      <span>Front Cover</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM INSTRUCTIONS FOOTER */}
        <footer className="relative z-20 w-full max-w-5xl flex justify-between items-center text-[10px] sm:text-xs font-hand text-[#827A71] pb-0.5 px-2 border-t border-[#E3DDD1] shrink-0">
          {bookState === 'reading' ? (
            <>
              <div className="flex items-center space-x-1.5">
                <span>Spread {currentSpread + 1} of {totalSpreads}</span>
                <span className="hidden sm:inline opacity-40">•</span>
                <span className="hidden sm:inline">Use ← → keys or side buttons</span>
              </div>
              <span>For my favorite human ♡</span>
            </>
          ) : bookState === 'closed-back' ? (
            <>
              <span>Thanks for being you, Khushboo ♡</span>
              <span>Until next year&apos;s pages ♡</span>
            </>
          ) : (
            <>
              <span>EST. 2026 • Made with care</span>
              <span>For my favorite human ♡</span>
            </>
          )}
        </footer>
      </div>
    </div>
  );
};