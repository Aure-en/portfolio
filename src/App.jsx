import React from "react";

import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Header />
        <About />
        <Projects />
        <Contact />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
