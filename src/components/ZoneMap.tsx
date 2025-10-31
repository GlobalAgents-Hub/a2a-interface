"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { showSuccess } from '@/utils/toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import Select components

const zones = [
  { id: 'zone-a', name: 'Zone Alpha' },
  { id: 'zone-b', name: 'Zone Beta' },
  { id: 'zone-c', name: 'Zone Gamma' },
];

const ZoneMap = () => {
  const { language } = useLanguage();
  const [selectedZoneId, setSelectedZoneId] = useState(zones[0].id); // Default to the first zone

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const handleExploreClick = () => {
    const currentZone = zones.find(zone => zone.id === selectedZoneId);
    if (currentZone) {
      showSuccess(`Exploring ${currentZone.name} in ${language.toUpperCase()}!`);
    } else {
      showSuccess(`No zone selected for exploration!`);
    }
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
            Select a zone to explore dynamically.
          </p>

          <div className="mb-4">
            <Select onValueChange={setSelectedZoneId} defaultValue={selectedZoneId}>
              <SelectTrigger className="w-[180px] mx-auto">
                <SelectValue placeholder="Select a zone" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone.id} value={zone.id}>
                    {zone.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <motion.div
            className="w-full h-48 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 font-semibold cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExploreClick}
          >
            Explore {zones.find(zone => zone.id === selectedZoneId)?.name || 'Selected Zone'}!
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