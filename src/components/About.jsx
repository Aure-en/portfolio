import React, { useRef } from "react";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Particles from "./canvas/background/Particles";
import Border from "./canvas/Border";
import View from "./shared/links/View";
import content from "../content/about.json";
import { ReactComponent as IconDown } from "../assets/icons/chevron-down.svg";

function About() {
  const { language } = useLanguage();
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
        <View>
          {content[language].link} <IconDown />
        </View>
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
