'use client';

import React, { useState } from 'react';
import { BookScene } from './BookScene';
import { CakeIntroScreen } from './CakeIntroScreen';

export const DiaryExperience: React.FC = () => {
  const [introCompleted, setIntroCompleted] = useState<boolean>(false);

  return (
    <main className="relative min-h-screen w-full bg-[#F5F2EB] text-[#1A1A1A] selection:bg-[#E5A4A9]/40 overflow-x-hidden">
      {!introCompleted && (
        <CakeIntroScreen onComplete={() => setIntroCompleted(true)} />
      )}
      <BookScene />
    </main>
  );
};
