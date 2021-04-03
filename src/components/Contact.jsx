import React from "react";
import styled from "styled-components";
import contact from "../content/contact.json";

// Icons
import { ReactComponent as IconGithub } from "../assets/icons/github.svg";
import { ReactComponent as IconMail } from "../assets/icons/mail.svg";

function Contact() {
  return (
    <Wrapper id="contact">
      <Container>
        <Text>Contact</Text>
        <List>
          <Social>
            <a href={`mailto:${contact.mail}`}>
              <IconMail />
            </a>
          </Social>
          <Social>
            <a href={contact.github}>
              <IconGithub />
            </a>
          </Social>
        </List>
      </Container>
    </Wrapper>
  );
}

export default Contact;

const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  &:after {
    content: "";
    display: inline-block;
    width: 5rem;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      ${(props) => props.theme.text_primary},
      transparent
    );
    margin: 0 1rem;
  }
`;

const List = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
`;

const Social = styled.li`
  margin: 0 0.25rem;
`;
