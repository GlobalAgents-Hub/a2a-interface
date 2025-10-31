"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import ZoneMap from "@/components/ZoneMap";
import { LanguageProvider } from "@/context/LanguageContext"; // Import the LanguageProvider

const Index = () => {
  return (
    <LanguageProvider> {/* Wrap the content with LanguageProvider */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your App</h1>
          <p className="text-xl text-gray-600">
            Here's your new Zone Map component!
          </p>
        </div>
        <ZoneMap />
        <MadeWithDyad />
      </div>
    </LanguageProvider>
  );
};

export default Index;