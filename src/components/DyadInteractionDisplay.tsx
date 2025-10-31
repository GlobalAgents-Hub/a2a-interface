"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface DyadInteractionDisplayProps {
  ritualPhrase: string;
  onAnimationComplete: () => void;
}

const DyadInteractionDisplay = ({ ritualPhrase, onAnimationComplete }: DyadInteractionDisplayProps) => {
  const { t } = useLanguage();
  const [showPhrase, setShowPhrase] = useState(false);

  useEffect(() => {
    setShowPhrase(false); // Reset for new phrase
    const timer1 = setTimeout(() => setShowPhrase(true), 500); // Show phrase after initial animation
    const timer2 = setTimeout(() => {
      setShowPhrase(false);
      onAnimationComplete();
    }, 3500); // Hide phrase and complete after 3.5s

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [ritualPhrase, onAnimationComplete]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
      {/* Entity Flow Animation (simplified) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 0.8, 1.5], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 mix-blend-screen filter blur-md"
      />

      {/* Ritual Phrase */}
      <AnimatePresence>
        {showPhrase && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute text-4xl font-bold text-white text-center tracking-wider z-50"
            style={{ fontFamily: 'Georgia, serif' }} // Placeholder for esoteric font
          >
            {t(ritualPhrase)}
          </motion.h2>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DyadInteractionDisplay;