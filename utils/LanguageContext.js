// LanguageProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { translations } from "./translations";

const LanguageContext = createContext();
const STORAGE_KEY = "app_language";

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load language on start
    const loadLanguage = async () => {
      try {
        const storedLang = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedLang) {
          setLanguage(storedLang);
        }
      } catch (e) {
        console.error("Failed to load language from storage", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (lang) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, lang);
      setLanguage(lang);
    } catch (e) {
      console.error("Failed to save language to storage", e);
    }
  };

  const t = (key) => translations[language]?.[key] || key;

  // Optionally render nothing until language is loaded
  if (isLoading) return null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
