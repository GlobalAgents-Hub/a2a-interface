"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

const AnimatedBackground = ({ children, className }: AnimatedBackgroundProps) => {
  return (
    <div className={cn("relative min-h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden", className)}>
      {/* Luminous glyphs/particles - simplified for now, can be enhanced with more complex animations */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-purple-500 rounded-full mix-blend-screen filter blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-blue-500 rounded-full mix-blend-screen filter blur-xl animate-pulse-medium animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-green-500 rounded-full mix-blend-screen filter blur-xl animate-pulse-fast animation-delay-4000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-red-500 rounded-full mix-blend-screen filter blur-xl animate-pulse-slow animation-delay-6000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.3; }
          50% { transform: scale(1.2) translate(10px, 10px); opacity: 0.6; }
        }
        @keyframes pulse-medium {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.4; }
          50% { transform: scale(1.1) translate(-15px, 5px); opacity: 0.7; }
        }
        @keyframes pulse-fast {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.2; }
          50% { transform: scale(1.3) translate(5px, -10px); opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s infinite ease-in-out;
        }
        .animate-pulse-medium {
          animation: pulse-medium 8s infinite ease-in-out;
        }
        .animate-pulse-fast {
          animation: pulse-fast 6s infinite ease-in-out;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;