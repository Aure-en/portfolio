import React from "react";
import styled from "styled-components";
import { useLanguage } from "../../contexts/LanguageContext";
import { useSection } from "../../contexts/SectionContext";
import useWindowSize from "../../hooks/useWindowSize";
import Title from "../sections/Title";
import Line from "../sections/Line";
import Form from "./Form";
import Social from "./Social";
import Diagonal from "../canvas/background/Diagonal";
import Transition from "../canvas/background/Transition";
import contact from "../../content/contact.json";

// Icons
import { ReactComponent as IconSend } from "../../assets/icons/send.svg";

function Contact() {
  const { language } = useLanguage();
  const { windowSize } = useWindowSize();
  const { name } = useSection();

  return (
    <Wrapper id="contact">
      <Container>
        <Header>
          <Title transition={name === "contact"} title="Contact" />
          <Line transition={name === "contact"}>
            <IconSend />
          </Line>
        </Header>
        <Text>{contact[language].message}</Text>
        <Form />
        {windowSize.width > 768 && (
          <>
            <Border position="left" />
            <Border position="right" />
            <Border position="bottom" />
          </>
        )}
        <Social />
      </Container>
      {windowSize.width > 768 && (
        <>
          <Diagonal />
          <Transition />
        </>
      )}
    </Wrapper>
  );
}

export default Contact;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  overflow: hidden; // Without it, the Diagonal canvas causes the scroll to be weird on refresh.

  @media all and (min-width: 576px) {
    width: 100vw;
    max-width: 100%;
  }

  @media all and (min-width: 992px) {
    height: 100vh;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  max-width: 45rem;
  background: ${(props) => props.theme.background};
  z-index: 2;
  padding: 1rem 2rem;

  @media all and (min-width: 576px) {
    padding: 5rem 10rem;
  }
`;

const Header = styled.div`
  display: inline-block;
  position: relative;
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: -1rem;

  @media all and (min-width: 576px) {
    bottom: -1.125rem;
    right: -5rem;
  }

  &:before {
    content: "";
    display: inline-block;
    width: 5rem;
    height: 1px;
    background: ${(props) => props.theme.text_primary};
    margin-right: 1rem;
  }
`;

const Text = styled.p`
  position: relative;
  text-indent: 0;

  @media all and (min-width: 576px) {
    max-width: 16rem;
    margin: 2rem 0;
    left: 3rem;
  }
`;

const Border = styled.span`
  position: absolute;
  top: ${(props) => props.position === "right" && "-15%"};
  right: ${(props) => props.position === "right" && 0};
  left: ${(props) => {
    if (props.position === "left") return 0;
    if (props.position === "bottom") return "-15%";
  }};
  bottom: ${(props) => {
    if (props.position === "left") return "-15%";
    if (props.position === "bottom") return 0;
  }};
  width: ${(props) => (props.position === "bottom" ? "70%" : "1px")};
  height: ${(props) => (props.position === "bottom" ? "1px" : "70%")};
  background: ${(props) => `
    linear-gradient(${props.position === "bottom" ? "to left" : "to bottom"},
    transparent 0%,
    ${props.theme.line_secondary} 25%,
    ${props.theme.line_primary} 50%,
    transparent 100%)
  `};
`;
