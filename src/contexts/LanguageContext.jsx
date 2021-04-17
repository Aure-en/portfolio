import React, { useContext, createContext, useState } from "react";
import PropTypes from "prop-types";

const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
  // Checks the saved language / browser language
  let initial = localStorage.getItem("language");
  if (!initial) {
    if (navigator.language.includes("fr")) initial = "fr";
  } else {
    initial = "en";
  }

  const [language, setLanguage] = useState(initial || "en");

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

LanguageProvider.propTypes = {
  children: PropTypes.node,
};

LanguageProvider.defaultProps = {
  children: <div />,
};
