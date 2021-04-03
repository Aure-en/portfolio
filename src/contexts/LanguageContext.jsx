import React, { useContext, createContext, useState } from "react";

const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
  const current = localStorage.getItem("language");
  const [language, setLanguage] = useState(current || "en");

  const changeLanguage = () => {
    if (language === "en") {
      setLanguage("fr");
      localStorage.setItem("language", "fr");
    } else {
      setLanguage("en");
      localStorage.setItem("language", "en");
    }
  };

  const value = {
    language,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
