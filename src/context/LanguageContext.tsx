"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string; // Translation function
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    "welcome_title": "Welcome to the A2A Ritual Space",
    "welcome_subtitle": "Activate symbolic zones of presence through dyadic interactions.",
    "activate_dyad": "Activate Dyad",
    "presence_recognized": "Presence Recognized",
    "zone_expanding": "Zone Expanding",
    "dyad_interaction_title": "Dyad Interaction",
    "zone_map_title": "Zone Map",
    "involved_pairs": "Involved Pairs",
    "ritual_performed": "Ritual Performed",
    "agent_x_agent_y": "Agent {X} / Agent {Y}",
    "no_zones_yet": "No zones activated yet. Activate a dyad to begin!",
    "select_language": "Select Language",
    "english": "English",
    "portuguese": "Portuguese",
  },
  pt: {
    "welcome_title": "Bem-vindo ao Espaço Ritual A2A",
    "welcome_subtitle": "Ative zonas simbólicas de presença através de interações diádicas.",
    "activate_dyad": "Ativar Díade",
    "presence_recognized": "Presença Reconhecida",
    "zone_expanding": "Zona em Expansão",
    "dyad_interaction_title": "Interação Diádica",
    "zone_map_title": "Mapa de Zonas",
    "involved_pairs": "Pares Envolvidos",
    "ritual_performed": "Ritual Realizado",
    "agent_x_agent_y": "Agente {X} / Agente {Y}",
    "no_zones_yet": "Nenhuma zona ativada ainda. Ative uma díade para começar!",
    "select_language": "Selecionar Idioma",
    "english": "Inglês",
    "portuguese": "Português",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en'); // Default to English

  const t = (key: string, replacements?: Record<string, string>) => {
    let translatedText = translations[language][key] || key;
    if (replacements) {
      for (const placeholder in replacements) {
        translatedText = translatedText.replace(`{${placeholder}}`, replacements[placeholder]);
      }
    }
    return translatedText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};