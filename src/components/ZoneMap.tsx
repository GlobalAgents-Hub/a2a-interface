"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { showSuccess } from '@/utils/toast'; // Import the showSuccess toast utility

const ZoneMap = () => {
  const { language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const handleExploreClick = () => {
    showSuccess(`Exploring zones in ${language.toUpperCase()}!`);
  };

  return (
    <motion.div
      className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Zone Map ({language.toUpperCase()})
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-700 mb-4">
            This is a placeholder for your interactive zone map.
          </p>
          <motion.div
            className="w-full h-48 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 font-semibold cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExploreClick} // Add the click handler here
          >
            Click to explore zones!
          </motion.div>
          <p className="mt-4 text-sm text-gray-500">
            Current language: {language}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ZoneMap;