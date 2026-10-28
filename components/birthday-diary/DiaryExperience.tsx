'use client';

import React from 'react';
import { BookScene } from './BookScene';

export const DiaryExperience: React.FC = () => {
  return (
    <main className="relative min-h-screen w-full bg-[#F5F2EB] text-[#1A1A1A] selection:bg-[#E5A4A9]/40 overflow-x-hidden">
      <BookScene />
    </main>
  );
};
