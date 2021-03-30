import React from "react";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import content from "../content/about.json";

function About() {
  const { language } = useLanguage();

  return (
    <Wrapper id="about">
      <Container>
        <Title>{content[language].title}</Title>
        <Text>
          {content[language].text.map((paragraph) => (
            <p>{paragraph}</p>
          ))}
        </Text>
        <div>{content[language].interests.introduction}</div>
        <div>
          {content[language].interests.list.map((interest) => (
            <div key={interest}>{interest}</div>
          ))}
        </div>
        <Link href="#projects">View Projects</Link>
      </Container>
    </Wrapper>
  );
}

export default About;

const Wrapper = styled.div``;

const Container = styled.main``;

const Text = styled.div``;

const Title = styled.h1``;

const Link = styled.a``;
