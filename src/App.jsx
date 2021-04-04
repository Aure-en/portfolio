import React from "react";
import styled from "styled-components";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Cursor from "./components/Cursor";
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
        <Container>
          <GlobalStyles />
          <Cursor />
          <Header />
          <About />
          <Projects />
          <Contact />
        </Container>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;

const Container = styled.div``;
