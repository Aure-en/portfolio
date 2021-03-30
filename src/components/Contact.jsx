import React from "react";
import styled from "styled-components";
import contact from "../content/contact.json";

// Icons
import { ReactComponent as IconGithub } from "../assets/icons/github.svg";
import { ReactComponent as IconMail } from "../assets/icons/mail.svg";

function Contact() {
  return (
    <Container id="contact">
      Contact
      <List>
        <Social href={contact.github}>
          <IconGithub />
        </Social>
        <Social href={`mailto:${contact.mail}`}>
          <IconMail />
        </Social>
      </List>
    </Container>
  );
}

export default Contact;

const Container = styled.footer``;

const List = styled.ul``;

const Social = styled.a``;
