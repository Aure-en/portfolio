import React from "react";
import styled from "styled-components";
import { useLanguage } from "../../contexts/LanguageContext";
import Form from "./Form";
import Social from "./Social";
import Diagonal from "../canvas/background/Diagonal";
import Transition from "../canvas/background/Transition";
import contact from "../../content/contact.json";

// Icons
import { ReactComponent as IconSend } from "../../assets/icons/send.svg";

function Contact() {
  const { language } = useLanguage();

  return (
    <Wrapper id="contact">
      <Container>
        <Header>
          <Title>Contact</Title>
          <Icon>
            <IconSend />
          </Icon>
        </Header>
        <Text>{contact[language].message}</Text>
        <Form />
        <Line position="left" />
        <Line position="right" />
        <Line position="bottom" />
        <Social />
      </Container>
      <Diagonal />
      <Transition />
    </Wrapper>
  );
}

export default Contact;

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding: 5rem 10rem;
  max-width: 45rem;
  background: ${(props) => props.theme.background};
  z-index: 2;
`;

const Header = styled.div`
  display: inline-block;
  position: relative;
`;

const Title = styled.h2`
  position: relative;
  left: -2rem;
  font-family: "Playfair Display", "Source Sans Pro", "Open Sans",
    "Trebuchet MS", "Verdana", sans-serif;
  font-size: 5rem;
  line-height: 5rem;
  margin: 0 0 2rem 0;
  font-weight: 400;
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: -1.125rem;
  right: -5rem;

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
  max-width: 16rem;
  margin: 2rem 0;
  left: 3rem;
`;

const Line = styled.span`
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