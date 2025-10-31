"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Zone {
  id: string;
  dyad: { agent1: string; agent2: string };
  ritual: string;
  position: { x: number; y: number };
  active: boolean;
}

interface ZoneMapProps {
  zones: Zone[];
  onZoneClick: (zone: Zone) => void;
  selectedZone: Zone | null;
}

const ZoneMap = ({ zones, onZoneClick, selectedZone }: ZoneMapProps) => {
  const { t } = useLanguage();

  return (
    <div className="relative w-full h-full min-h-[400px] bg-gray-900/50 rounded-lg p-4 border border-gray-700 flex">
      <div className="relative flex-grow">
        {zones.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
            {t("no_zones_yet")}
          </div>
        )}
        {zones.map((zone) => (
          <motion.div
            key={zone.id}
            className={`absolute w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300
              ${zone.active ? 'bg-purple-500 shadow-lg shadow-purple-500/50' : 'bg-gray-600 shadow-md shadow-gray-600/30'}
              ${selectedZone?.id === zone.id ? 'ring-4 ring-offset-2 ring-purple-400 ring-offset-gray-900' : ''}
            `}
            style={{ left: `${zone.position.x}%`, top: `${zone.position.y}%` }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={zone.active ? { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] } : {}}
            transition={zone.active ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
            onClick={() => onZoneClick(zone)}
          >
            <span className="text-white text-xs font-bold">{zone.id.substring(0, 3)}</span>
          </motion.div>
        ))}
      </div>

      {selectedZone && (
        <Card className="w-80 ml-4 bg-gray-800 text-white border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-purple-300">{t("dyad_interaction_title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">
              <span className="font-semibold">{t("involved_pairs")}:</span>{" "}
              {t("agent_x_agent_y", { X: selectedZone.dyad.agent1, Y: selectedZone.dyad.agent2 })}
            </p>
            <Separator className="my-2 bg-gray-700" />
            <p className="text-sm">
              <span className="font-semibold">{t("ritual_performed")}:</span>{" "}
              {t(selectedZone.ritual)}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ZoneMap;