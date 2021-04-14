import React from "react";
import styled from "styled-components";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CursorProvider } from "./contexts/CursorContext";
import { SectionProvider } from "./contexts/SectionContext";
import useWindowSize from "./hooks/useWindowSize";
import Pages from "./components/Pages";
import Header from "./components/header/Header";
import About from "./components/About";
import Projects from "./components/projects/Projects";
import Contact from "./components/contact/Contact";
import GlobalStyles from "./styles/globalStyles";
import projects from "./content/projects.json";
import "normalize.css";

const sections = [];
projects.map((project, index) => sections.push(`project-${index + 1}`));
sections.unshift("about");
sections.push("contact");

function App() {
  const { windowSize } = useWindowSize();

  return (
    <LanguageProvider>
      <ThemeProvider>
        <CursorProvider>
          <SectionProvider sections={sections}>
            <Container>
              <GlobalStyles />
              <Header />
              <About />
              <Projects />
              <Contact />
              {windowSize.width > 1200 && <Pages />}
            </Container>
          </SectionProvider>
        </CursorProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;

const Container = styled.div`
  background: ${(props) => props.theme.background};
`;
