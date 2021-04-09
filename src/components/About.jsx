import React, { useRef } from "react";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import { useCursor } from "../contexts/CursorContext";
import { useSection } from "../contexts/SectionContext";
import Particles from "./canvas/background/Particles";
import Border from "./canvas/Border";
import content from "../content/about.json";
import { ReactComponent as IconDown } from "../assets/icons/chevron-down.svg";

function About() {
  const { language } = useLanguage();
  const { setState } = useCursor();
  const { link } = useSection();
  const ref = useRef();

  return (
    <Wrapper id="about">
      <Container ref={ref}>
        <Title>{content[language].title}</Title>
        <Text>
          {content[language].text.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Text>
        <Interest>{content[language].interests.introduction}</Interest>
        <ul>
          {content[language].interests.list.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
        <Link
          href="#project-1"
          onClick={() => link("project-1")}
          onMouseEnter={() => setState("hidden")}
          onMouseLeave={() => setState("basic")}
        >
          {content[language].link} <IconDown />
        </Link>
      </Container>
      <Border element={ref} radius={250} />
      <Particles />
    </Wrapper>
  );
}

export default About;

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  padding: 3rem 5rem;
  width: 100vw;
  max-width: 50rem;
  z-index: 2;
  background: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
`;

const Text = styled.div``;

const Title = styled.h1`
  font-family: "Playfair Display", "Source Sans Pro", "Open Sans",
    "Trebuchet MS", "Verdana", sans-serif;
  font-weight: 300;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Interest = styled.h3`
  font-family: "Playfair Display", "Source Sans Pro", "Open Sans",
    "Trebuchet MS", "Verdana", sans-serif;
  font-weight: 300;
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.theme.border};
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  align-self: flex-end;
  margin-top: 0.5rem;
  pointer-events: auto;

  & > svg {
    margin-left: 0.5rem;
  }
`;
