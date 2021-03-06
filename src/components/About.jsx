import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import useWindowSize from "../hooks/useWindowSize";
import Particles from "./canvas/background/Particles";
import Border from "./canvas/Border";
import View from "./shared/links/View";
import content from "../content/about.json";
import { ReactComponent as IconDown } from "../assets/icons/chevron-down.svg";

function About() {
  const [font, setFont] = useState(false);
  const { language } = useLanguage();
  const ref = useRef();
  const { windowSize } = useWindowSize();

  // Avoid shift on border canvas caused by FOUT.
  document.fonts.ready.then(() => setFont(true));

  return (
    <Wrapper id="about">
      <Container ref={ref}>
        <Title>{content[language].title}</Title>
        <div>
          {content[language].text.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <Focus>{content[language].focus.introduction}</Focus>
        <List>
          {content[language].focus.list.map((interest) => (
            <Li key={interest}>{interest}</Li>
          ))}
        </List>

        <Focus>{content[language].stack.introduction}</Focus>
        <StackList>
          {content[language].stack.list.map((tool) => (
            <Li key={tool}>{tool}</Li>
          ))}
        </StackList>

        <View>
          {content[language].link} <IconDown />
        </View>
      </Container>
      {windowSize.width > 768 && font && <Border element={ref} radius={250} />}
      {windowSize.width > 768 && <Particles />}
    </Wrapper>
  );
}

export default About;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;

  @media all and (min-width: 576px) {
    width: 100vw;
    height: 100vh;
    max-width: 100%;
    padding-top: 0;
  }
`;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 55rem;
  padding: 1rem;
  z-index: 2;
  background: ${(props) => props.theme.background};

  @media all and (min-width: 576px) {
    padding: 3rem 5rem;
  }

  @media all and (min-width: 50rem) {
    border: 1px solid ${(props) => props.theme.border};
  }
`;

const Title = styled.h1`
  font-family: "Playfair Display", "Source Sans Pro", "Open Sans",
    "Trebuchet MS", "Verdana", sans-serif;
  font-weight: 300;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Focus = styled.div`
  font-family: "Playfair Display", "Source Sans Pro", "Open Sans",
    "Trebuchet MS", "Verdana", sans-serif;
  font-weight: 300;
`;

const List = styled.ul`
  list-style: none;
`;

const StackList = styled(List)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media all and (min-width: 400px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Li = styled.li`
  display: flex;
  align-items: center;

  &:before {
    content: "";
    display: inline-block;
    height: 0.3rem;
    width: 0.3rem;
    background: ${(props) => props.theme.text_accent};
    transform: rotate(45deg);
    margin-right: 1rem;
    opacity: 0.8;
  }
`;
