import React from "react";
import styled from "styled-components";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CursorProvider } from "./contexts/CursorContext";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/projects/Projects";
import Contact from "./components/Contact";
import GlobalStyles from "./styles/globalStyles";
import "normalize.css";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CursorProvider>
          <Container>
            <GlobalStyles />
            <Header />
            <About />
            <Projects />
            <Contact />
          </Container>
        </CursorProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;

const Container = styled.div``;
