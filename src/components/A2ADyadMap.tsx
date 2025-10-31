"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { showSuccess, showError } from '@/utils/toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';

// --- Types for Nodes and Edges ---
interface ZoneNode {
  id: string;
  name: string;
  color: string; // Tailwind class for node background
  ritualType: 'pulse' | 'spiral' | 'glyph';
  intensity: number; // 0-100, affects visual feedback
  x: number; // Position for layout
  y: number; // Position for layout
}

interface DyadEdge {
  id: string;
  source: string; // Node ID
  target: string; // Node ID
  strength: number; // 0-100, affects glow
  active: boolean;
}

// --- Ritual Phrases ---
const ritualPhrases = [
  "Presença reconhecida",
  "Fluxo estabelecido",
  "Zona expandida",
  "Díade ativada",
  "Conexão manifesta",
  "Essência compartilhada",
];

// --- Initial Data ---
const initialNodes: ZoneNode[] = [
  { id: 'alpha', name: 'Alpha', color: 'bg-blue-500', ritualType: 'pulse', intensity: 50, x: 100, y: 100 },
  { id: 'beta', name: 'Beta', color: 'bg-green-500', ritualType: 'spiral', intensity: 50, x: 300, y: 150 },
  { id: 'gamma', name: 'Gamma', color: 'bg-purple-500', ritualType: 'glyph', intensity: 50, x: 200, y: 300 },
];

const A2ADyadMap = () => {
  const { language } = useLanguage();
  const [nodes, setNodes] = useState<ZoneNode[]>(initialNodes);
  const [edges, setEdges] = useState<DyadEdge[]>([]);
  const [activeRitualPhrase, setActiveRitualPhrase] = useState('');
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [nextNodeId, setNextNodeId] = useState(initialNodes.length);

  // --- Ritual Phrase Display Logic ---
  const displayRitualPhrase = useCallback((phrase: string) => {
    setActiveRitualPhrase(phrase);
    const timer = setTimeout(() => setActiveRitualPhrase(''), 3000);
    return () => clearTimeout(timer);
  }, []);

  // --- Simulate A2A Protocol Interactions ---
  const simulateDiadicInteraction = useCallback((sourceId: string, targetId: string) => {
    setNodes(prevNodes => prevNodes.map(node => {
      if (node.id === sourceId || node.id === targetId) {
        return { ...node, intensity: Math.min(100, node.intensity + 10) };
      }
      return node;
    }));

    setEdges(prevEdges => {
      const existingEdgeIndex = prevEdges.findIndex(
        edge => (edge.source === sourceId && edge.target === targetId) || (edge.source === targetId && edge.target === sourceId)
      );

      if (existingEdgeIndex > -1) {
        const updatedEdges = [...prevEdges];
        updatedEdges[existingEdgeIndex] = {
          ...updatedEdges[existingEdgeIndex],
          strength: Math.min(100, updatedEdges[existingEdgeIndex].strength + 20),
          active: true,
        };
        return updatedEdges;
      } else {
        return [
          ...prevEdges,
          { id: `edge-${sourceId}-${targetId}`, source: sourceId, target: targetId, strength: 50, active: true },
        ];
      }
    });
    displayRitualPhrase(ritualPhrases[Math.floor(Math.random() * ritualPhrases.length)]);
    showSuccess(`Díade entre ${sourceId} e ${targetId} ativada!`);
  }, [displayRitualPhrase]);

  // --- Ritual Template: Simple Dyad ---
  const handleDemoInteraction = () => {
    if (nodes.length < 2) {
      showError("Precisa de pelo menos duas zonas para uma díade simples.");
      return;
    }
    const [node1, node2] = nodes.slice(0, 2); // Use first two nodes for simplicity
    simulateDiadicInteraction(node1.id, node2.id);
  };

  // --- Ritual Template: Zone Builder ---
  const handleZoneBuilder = () => {
    const newId = `zone-${String.fromCharCode(97 + nextNodeId)}`; // 'd', 'e', 'f'...
    const newName = `Zone ${String.fromCharCode(65 + nextNodeId)}`; // 'D', 'E', 'F'...
    const newColor = ['bg-red-500', 'bg-yellow-500', 'bg-cyan-500'][nextNodeId % 3];
    const newRitualType: ZoneNode['ritualType'] = ['pulse', 'spiral', 'glyph'][nextNodeId % 3];

    const newNode: ZoneNode = {
      id: newId,
      name: newName,
      color: newColor,
      ritualType: newRitualType,
      intensity: 30,
      x: Math.random() * 300 + 50, // Random position
      y: Math.random() * 300 + 50, // Random position
    };

    setNodes(prevNodes => [...prevNodes, newNode]);
    setNextNodeId(prev => prev + 1);

    if (nodes.length > 0) {
      // Connect new node to a random existing node
      const randomExistingNode = nodes[Math.floor(Math.random() * nodes.length)];
      simulateDiadicInteraction(newNode.id, randomExistingNode.id);
    }
    displayRitualPhrase("Zona expandida");
    showSuccess(`Nova zona '${newName}' criada!`);
  };

  // --- Ritual Template: Agent Simulator (Continuous Flow) ---
  const [isAgentFlowActive, setIsAgentFlowActive] = useState(false);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAgentFlowActive && nodes.length >= 2) {
      interval = setInterval(() => {
        const randomNode1 = nodes[Math.floor(Math.random() * nodes.length)];
        let randomNode2 = nodes[Math.floor(Math.random() * nodes.length)];
        while (randomNode1.id === randomNode2.id && nodes.length > 1) {
          randomNode2 = nodes[Math.floor(Math.random() * nodes.length)];
        }
        simulateDiadicInteraction(randomNode1.id, randomNode2.id);
      }, 1500); // Every 1.5 seconds
    } else if (isAgentFlowActive && nodes.length < 2) {
      showError("Precisa de pelo menos duas zonas para simular o fluxo de agentes.");
      setIsAgentFlowActive(false);
    }
    return () => clearInterval(interval);
  }, [isAgentFlowActive, nodes, simulateDiadicInteraction]);

  // --- Node Visuals ---
  const getNodeVisual = (node: ZoneNode) => {
    const baseClasses = "absolute rounded-full flex items-center justify-center text-white font-bold text-xs transition-all duration-300";
    const size = 40 + node.intensity * 0.5; // Size scales with intensity
    const opacity = 0.5 + node.intensity * 0.005; // Opacity scales with intensity

    const pulseAnimation = {
      scale: [1, 1.2, 1],
      opacity: [opacity, 1, opacity],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    };

    const spiralAnimation = {
      rotate: [0, 360],
      transition: { duration: 3, repeat: Infinity, ease: "linear" },
    };

    const glyphAnimation = {
      opacity: [opacity, 1, opacity],
      borderRadius: ["50%", "20%", "50%"],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    };

    let animationProps = {};
    if (node.ritualType === 'pulse') animationProps = { animate: pulseAnimation };
    if (node.ritualType === 'spiral') animationProps = { animate: spiralAnimation };
    if (node.ritualType === 'glyph') animationProps = { animate: glyphAnimation };

    return (
      <motion.div
        key={node.id}
        className={cn(baseClasses, node.color, selectedZoneId === node.id ? 'ring-4 ring-yellow-300 ring-offset-2' : '')}
        style={{
          width: size,
          height: size,
          left: node.x - size / 2,
          top: node.y - size / 2,
          opacity: opacity,
          zIndex: selectedZoneId === node.id ? 10 : 1,
        }}
        {...animationProps}
        whileHover={{ scale: 1.3, boxShadow: "0 0 15px rgba(255,255,255,0.7)" }}
        onClick={() => setSelectedZoneId(node.id)}
      >
        {node.name.charAt(0)}
      </motion.div>
    );
  };

  // --- Edge Visuals ---
  const getEdgeVisual = (edge: DyadEdge) => {
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);

    if (!sourceNode || !targetNode) return null;

    const x1 = sourceNode.x;
    const y1 = sourceNode.y;
    const x2 = targetNode.x;
    const y2 = targetNode.y;

    const strokeWidth = 1 + edge.strength * 0.05; // Thickness scales with strength
    const glowIntensity = edge.strength * 0.01; // Glow scales with strength

    const isHighlighted = selectedZoneId && (edge.source === selectedZoneId || edge.target === selectedZoneId);

    return (
      <motion.line
        key={edge.id}
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="url(#gradient)"
        strokeWidth={strokeWidth}
        className={cn(
          "transition-all duration-300",
          isHighlighted ? "stroke-yellow-300" : "stroke-gray-400"
        )}
        style={{
          filter: `drop-shadow(0 0 ${glowIntensity * 5}px rgba(255,255,255,${glowIntensity}))`,
          zIndex: isHighlighted ? 5 : 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-4 font-mono">
      <Card className="w-full max-w-3xl bg-gray-800 border-gray-700 text-white shadow-lg">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-3xl font-bold text-center text-purple-300">
            Dyad A2A Ritual Map ({language.toUpperCase()})
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center p-6">
          <p className="text-gray-400 mb-6 text-lg">
            Ative díades e expanda zonas simbólicas.
          </p>

          {/* Ritual Phrases Display */}
          <motion.div
            className="h-8 mb-4 text-lg font-semibold text-yellow-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: activeRitualPhrase ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeRitualPhrase}
          </motion.div>

          {/* Control Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button onClick={handleDemoInteraction} className="bg-blue-600 hover:bg-blue-700 text-white">
              Simular Díade Simples
            </Button>
            <Button onClick={handleZoneBuilder} className="bg-green-600 hover:bg-green-700 text-white">
              Construir Zona
            </Button>
            <Button
              onClick={() => setIsAgentFlowActive(prev => !prev)}
              className={cn(
                "text-white",
                isAgentFlowActive ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"
              )}
            >
              {isAgentFlowActive ? "Parar Fluxo de Agentes" : "Iniciar Fluxo de Agentes"}
            </Button>
          </div>

          {/* Zone Selector */}
          <div className="mb-8">
            <Select onValueChange={setSelectedZoneId} value={selectedZoneId || ''}>
              <SelectTrigger className="w-[200px] mx-auto bg-gray-700 text-white border-gray-600">
                <SelectValue placeholder="Focar em uma Zona" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 text-white border-gray-600">
                {nodes.map((node) => (
                  <SelectItem key={node.id} value={node.id} className="hover:bg-gray-600">
                    {node.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dynamic Zone Map Visualization */}
          <div className="relative w-full h-[400px] bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" /> {/* Purple */}
                  <stop offset="100%" stopColor="#EC4899" /> {/* Pink */}
                </linearGradient>
              </defs>
              {edges.map(getEdgeVisual)}
            </svg>
            {nodes.map(getNodeVisual)}
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Linguagem atual: {language}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default A2ADyadMap;