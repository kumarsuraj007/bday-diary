'use client';

import React, { useState } from 'react';
import { BookScene } from './BookScene';
import { IntroLoadingScreen } from './IntroLoadingScreen';

export const DiaryExperience: React.FC = () => {
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  return (
    <main className="relative min-h-screen w-full bg-[#F5F2EB] text-[#1A1A1A] selection:bg-[#E5A4A9]/40 overflow-x-hidden">
      <BookScene />
      {!hasEntered && (
        <IntroLoadingScreen onProceed={() => setHasEntered(true)} />
      )}
    </main>
  );
};
