"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import A2ADyadMap from "@/components/A2ADyadMap"; // Import the new A2ADyadMap component
import { LanguageProvider } from "@/context/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">Bem-vindo ao seu App Dyad</h1>
          <p className="text-xl text-gray-400">
            Explore o mapa ritualístico A2A!
          </p>
        </div>
        <A2ADyadMap /> {/* Render the new A2ADyadMap component */}
        <MadeWithDyad />
      </div>
    </LanguageProvider>
  );
};

export default Index;