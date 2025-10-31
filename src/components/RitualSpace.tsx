"use client";

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import AnimatedBackground from './AnimatedBackground';
import DyadInteractionDisplay from './DyadInteractionDisplay';
import ZoneMap from './ZoneMap';
import { v4 as uuidv4 } from 'uuid'; // For unique IDs

// Mock data types
interface Zone {
  id: string;
  dyad: { agent1: string; agent2: string };
  ritual: string;
  position: { x: number; y: number };
  active: boolean;
}

const RitualSpace = () => {
  const { t } = useLanguage();
  const [zones, setZones] = useState<Zone[]>([]);
  const [currentRitualPhrase, setCurrentRitualPhrase] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [isActivatingDyad, setIsActivatingDyad] = useState(false);

  // Placeholder for A2A Protocol integration
  const activateDyad = useCallback(async () => {
    setIsActivatingDyad(true);
    // Simulate API call to A2A Protocol
    console.log("Simulating A2A Protocol dyad activation...");

    // Generate mock data for a new zone
    const newZoneId = uuidv4();
    const agent1 = `A${Math.floor(Math.random() * 100)}`;
    const agent2 = `B${Math.floor(Math.random() * 100)}`;
    const ritualType = Math.random() > 0.5 ? "presence_recognized" : "zone_expanding";

    const newZone: Zone = {
      id: newZoneId,
      dyad: { agent1, agent2 },
      ritual: ritualType,
      position: {
        x: Math.random() * 80 + 10, // Random position between 10% and 90%
        y: Math.random() * 80 + 10,
      },
      active: true,
    };

    setCurrentRitualPhrase(ritualType);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    setZones((prevZones) => {
      // Deactivate previous active zones if any
      const updatedZones = prevZones.map(zone => ({ ...zone, active: false }));
      return [...updatedZones, newZone];
    });

    console.log("Dyad activated, new zone added:", newZone);
  }, []);

  const handleAnimationComplete = useCallback(() => {
    setCurrentRitualPhrase(null);
    setIsActivatingDyad(false);
  }, []);

  const handleZoneClick = useCallback((zone: Zone) => {
    setSelectedZone(zone);
  }, []);

  return (
    <AnimatedBackground className="flex flex-col items-center justify-center p-8">
      <LanguageSwitcher /> {/* Positioned by its own styles */}
      <div className="relative z-20 text-center mb-8">
        <h1 className="text-5xl font-extrabold text-white mb-4 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
          {t("welcome_title")}
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          {t("welcome_subtitle")}
        </p>
        <Button
          onClick={activateDyad}
          disabled={isActivatingDyad}
          className="px-8 py-4 text-lg bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          {isActivatingDyad ? t("dyad_interaction_title") + "..." : t("activate_dyad")}
        </Button>
      </div>

      <div className="w-full max-w-6xl h-[600px] flex flex-col md:flex-row gap-4 mt-8">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>
            {t("zone_map_title")}
          </h2>
          <ZoneMap zones={zones} onZoneClick={handleZoneClick} selectedZone={selectedZone} />
        </div>
      </div>

      {currentRitualPhrase && (
        <DyadInteractionDisplay
          ritualPhrase={currentRitualPhrase}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
    </AnimatedBackground>
  );
};

export default RitualSpace;