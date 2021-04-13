import React from "react";
import styled from "styled-components";
import { useLanguage } from "../../contexts/LanguageContext";
import contact from "../../content/contact.json";

// Icons
import { ReactComponent as IconGithub } from "../../assets/icons/github.svg";
import { ReactComponent as IconMail } from "../../assets/icons/mail.svg";

function Social() {
  const { language } = useLanguage();

  return (
    <Container>
      <span>{contact[language].social}</span>
      <List>
        <li>
          <a href={`mailto:${contact.links.mail}`}>
            <IconMail />
          </a>
        </li>
        <li>
          <a href={contact.links.github}>
            <IconGithub />
          </a>
        </li>
      </List>
    </Container>
  );
}

export default Social;

const Container = styled.div`
  color: ${(props) => props.theme.text_secondary};
  display: flex;
  align-items: center;
  margin-top: 1rem;
  text-align: center;

  @media all and (min-width: 576px) {
    position: absolute;
    bottom: -2.5rem;
    left: 1rem;
    margin-top: 0;
  }

  & > span {
    text-transform: uppercase;
    display: flex;
    align-items: center;

    &:after {
      content: "";
      display: inline-block;
      height: 1px;
      width: 5rem;
      margin: 0 0.5rem;
      background: ${(props) => `
        linear-gradient(to left,
        transparent 0%,
        ${props.theme.line_secondary} 25%,
        ${props.theme.line_primary} 50%,
        transparent 100%)
      `};
    }
  }
`;

const List = styled.ul`
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;

  & * {
    cursor: pointer;
  }

  & a {
    display: flex;
    align-items: center;
  }

  & > li:hover {
    color: ${(props) => props.theme.text_primary};
  }
`;
