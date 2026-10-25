'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Volume2, VolumeX, ArrowRight, Play, RotateCw } from 'lucide-react';

interface CakeIntroScreenProps {
  onComplete: () => void;
}

export const CakeIntroScreen: React.FC<CakeIntroScreenProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [stage, setStage] = useState<'intro-prompt' | 'playing' | 'blow-ready' | 'blown' | 'fade-out'>('intro-prompt');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isRotated, setIsRotated] = useState<boolean>(false);
  const userChangedRotationRef = useRef<boolean>(false);
  const blownRef = useRef<boolean>(false);

  // Auto-detect mobile portrait on mount and enable rotated view
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobilePortrait = () => {
        if (!userChangedRotationRef.current) {
          const isMobile = window.innerWidth < 640 && window.innerHeight >= window.innerWidth;
          setIsRotated(isMobile);
        }
      };
      checkMobilePortrait();
      window.addEventListener('resize', checkMobilePortrait);
      return () => window.removeEventListener('resize', checkMobilePortrait);
    }
  }, []);

  const toggleRotation = (e: React.MouseEvent) => {
    e.stopPropagation();
    userChangedRotationRef.current = true;
    setIsRotated((prev) => !prev);
  };

  // Play synthesized breath sound effect when candle is blown
  const playBlowSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const bufferSize = Math.floor(ctx.sampleRate * 0.7);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.15;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.65);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.45, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch {
      // Audio fallback
    }
  };

  // Start video with sound (User gesture ensures audio plays without browser blocking)
  const handleStartExperience = () => {
    setHasStarted(true);
    setStage('playing');
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().catch(() => {
        // Fallback if browser still blocks sound
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
        }
      });
    }
  };

  // Toggle sound anytime
  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  // Trigger candle blowout when button or candle is clicked
  const handleBlowout = () => {
    if (blownRef.current) return;
    blownRef.current = true;

    playBlowSound();
    setStage('blown');

    // Confetti burst
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.62 },
      colors: ['#FF9EAA', '#FFD0D0', '#FFF078', '#A0E7E5', '#B4F8C8', '#FFB7B2'],
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      confetti({
        particleCount: 55,
        angle: 60,
        spread: 60,
        origin: { x: 0.15, y: 0.65 },
        colors: ['#FF9EAA', '#FFD0D0', '#FFF078'],
      });
      confetti({
        particleCount: 55,
        angle: 120,
        spread: 60,
        origin: { x: 0.85, y: 0.65 },
        colors: ['#A0E7E5', '#B4F8C8', '#FFB7B2'],
      });
    }, 250);

    // Fade out and show diary section
    setTimeout(() => {
      setStage('fade-out');
      setTimeout(() => {
        onComplete();
      }, 950);
    }, 2300);
  };

  // Watch video progress for "blow the air" moment
  const handleTimeUpdate = () => {
    if (!videoRef.current || stage !== 'playing') return;
    const currentTime = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 10;

    // Subtitle "blow the air" appears at ~8.5s
    if (currentTime >= duration - 1.6) {
      setStage('blow-ready');
      videoRef.current.pause();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7EBE4] overflow-hidden transition-opacity duration-1000 ${
        stage === 'fade-out' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Warm Atmosphere */}
      <div className="absolute inset-0 bg-radial from-[#FFF5EE] via-[#F7EBE4] to-[#EEDCD2] pointer-events-none" />

      {/* Unified Canvas Container: Rotates 90° as one unified experience on mobile so video, text, controls & buttons are all oriented together */}
      <div
        className={`relative flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          isRotated
            ? 'rotate-90 w-[100dvh] h-[100dvw] max-w-none p-2 sm:rotate-0 sm:w-full sm:h-auto sm:max-w-4xl sm:p-5'
            : 'w-full max-w-4xl h-auto p-3 sm:p-5 rotate-0'
        }`}
      >
        {/* Main Video Box */}
        <div
          className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(215,180,165,0.4)] border-3 sm:border-4 border-white/80 bg-[#F7EBE4] flex items-center justify-center transition-all duration-500 ${
            isRotated
              ? 'h-[66%] max-w-[92%]'
              : 'h-[62vh] sm:h-[75vh]'
          }`}
        >
          {/* Video & Candle Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              src="/videos/gemini_generated_video_860f33d6.mp4"
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => {
                if (stage === 'playing') {
                  setStage('blow-ready');
                }
              }}
              className="w-full h-full object-contain pointer-events-none"
            />

            {/* Candle Hotspot - clicking the candle flame directly also blows it out! */}
            {stage === 'blow-ready' && (
              <button
                onClick={handleBlowout}
                className="absolute top-[48%] left-[49%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center group cursor-pointer focus:outline-none pointer-events-auto"
                title="Click to blow out the candle! 🎂"
              >
                <div className="w-10 h-10 rounded-full bg-amber-400/40 animate-ping" />
                <div className="absolute w-6 h-6 rounded-full bg-amber-300/70 blur-[2px] group-hover:scale-125 transition-transform" />
              </button>
            )}

            {/* Smoke Plume Effect when Blown Out */}
            {stage === 'blown' && (
              <div className="absolute top-[45%] left-[49%] -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
                <div className="w-3 h-12 bg-gradient-to-t from-gray-400/50 via-gray-300/30 to-transparent rounded-full blur-[2px] animate-pulse -translate-y-4" />
                <div className="w-6 h-14 bg-gradient-to-t from-gray-400/40 via-gray-200/20 to-transparent rounded-full blur-[3px] -translate-y-8 animate-bounce opacity-70" />
              </div>
            )}
          </div>

          {/* Initial Play Overlay (Ensures Audio Works via Browser Gesture Policy) */}
          {!hasStarted && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center z-30 p-3 sm:p-4">
              <div className="flex flex-col items-center text-center space-y-2.5 sm:space-y-4 max-w-xs sm:max-w-sm bg-white/95 p-4 sm:p-6 rounded-3xl shadow-xl border border-white">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#FFE8EC] flex items-center justify-center text-[#D9463E] shadow-xs animate-pulse">
                  <Sparkles className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h3 className="font-hand font-bold text-lg sm:text-2xl text-[#2B231D]">
                    A Birthday Surprise! 🎂
                  </h3>
                  <p className="font-hand text-xs sm:text-sm text-[#7A685D] mt-0.5 sm:mt-1">
                    Turn your volume up for the full experience
                  </p>
                </div>
                <button
                  onClick={handleStartExperience}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 sm:py-3 px-5 sm:px-6 rounded-2xl bg-gradient-to-r from-[#FF8B94] to-[#FFAAA6] text-white font-hand font-bold text-sm sm:text-lg shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <span>Start with Sound 🎵</span>
                </button>
              </div>
            </div>
          )}

          {/* Top Controls: Sound, Rotate & Skip */}
          <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 flex items-center space-x-1.5 sm:space-x-2 z-40">
            {/* Rotate Video Button */}
            <button
              onClick={toggleRotation}
              className={`p-2 sm:p-2.5 rounded-full shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs flex items-center space-x-1 text-xs font-hand ${
                isRotated
                  ? 'bg-[#FF8B94] text-white ring-2 ring-white/90 shadow-md'
                  : 'bg-white/85 hover:bg-white text-[#7A6559]'
              }`}
              title={isRotated ? 'Rotate back to 0°' : 'Rotate video for mobile (90°)'}
            >
              <RotateCw className={`w-4 h-4 transition-transform duration-500 ${isRotated ? 'rotate-90' : 'rotate-0'}`} />
              <span className="text-[11px] font-bold">{isRotated ? '90°' : '0°'}</span>
            </button>

            {hasStarted && (
              <>
                <button
                  onClick={toggleSound}
                  className="p-2 sm:p-2.5 rounded-full bg-white/85 hover:bg-white text-[#7A6559] shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
                  title={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#D9463E]" />
                  )}
                </button>

                <button
                  onClick={() => {
                    blownRef.current = true;
                    onComplete();
                  }}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/85 hover:bg-white text-[#7A6559] font-hand text-xs shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
                  title="Skip directly to diary"
                >
                  <span>Skip</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Bottom Action Area */}
        <div
          className={`relative z-20 flex flex-col items-center w-full transition-all duration-500 ${
            isRotated
              ? 'mt-1.5 max-w-sm px-2'
              : 'mt-2.5 sm:mt-3 max-w-md px-4'
          }`}
        >
          {stage === 'playing' && (
            <div className="flex items-center space-x-2 text-[#8E796D] font-hand text-xs sm:text-base animate-pulse py-0.5">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5A4A9]" />
              <span>Bringing a birthday cake for Khushboo...</span>
            </div>
          )}

          {/* Prominent Blow Candle Button */}
          {stage === 'blow-ready' && (
            <div className="flex flex-col items-center space-y-1 sm:space-y-2 w-full bg-white/90 backdrop-blur-md p-2 sm:p-3.5 rounded-2xl shadow-[0_8px_24px_rgba(200,165,150,0.25)] border border-white animate-fade-in">
              <p className="font-hand font-bold text-xs sm:text-base text-[#D9463E]">
                Make a wish and click below! ✨
              </p>

              <button
                onClick={handleBlowout}
                className="w-full flex items-center justify-center space-x-2 py-1.5 sm:py-2.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FF8B94] via-[#FFAAA6] to-[#FF8B94] text-white font-hand font-bold text-xs sm:text-base shadow-md hover:shadow-lg hover:scale-102 active:scale-95 transition-all cursor-pointer animate-pulse"
              >
                <span>🎂 Blow the Candle 💨</span>
              </button>
            </div>
          )}

          {/* Celebration State */}
          {stage === 'blown' && (
            <div className="flex flex-col items-center space-y-0.5 sm:space-y-1 bg-white/95 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3.5 rounded-2xl shadow-lg border border-pink-100 animate-bounce">
              <div className="flex items-center space-x-2 text-[#D9463E] font-hand font-bold text-sm sm:text-xl">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Happy Birthday Khushboo! 🎉</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <p className="font-hand text-[11px] sm:text-sm text-[#7A685D]">
                Opening your memory diary now... ✨
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
