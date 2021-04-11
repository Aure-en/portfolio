import React, { useState } from "react";
import styled from "styled-components";
import contact from "../content/contact.json";

// Icons
import { ReactComponent as IconGithub } from "../assets/icons/github.svg";
import { ReactComponent as IconMail } from "../assets/icons/mail.svg";
import { ReactComponent as IconSend } from "../assets/icons/send.svg";

function Contact() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <Wrapper id="contact">
      <Container>
        <Header>
          <Title>Contact</Title>
          <Icon>
            <IconSend />
          </Icon>
        </Header>
        <Text>Feel free to contact me for any inquiry, and I will get back to you as soon as I can.</Text>
        <Form action="https://mailthis.to/nn.aurelie@gmail.com" method="POST">
          <label htmlFor="name">
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={inputs.name}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor="email">
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={inputs.email}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor="message">
            <Input
              as="textarea"
              rows={1}
              name="message"
              id="message"
              placeholder="Message"
              value={inputs.message}
              onChange={handleInputChange}
            />
          </label>

          <button type="submit">Send Message</button>
        </Form>
      </Container>
    </Wrapper>
  );
}

export default Contact;

const Wrapper = styled.footer`
  width: 100vw;
  min-height: 100vh;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding: 3rem 8rem;
  max-width: 40rem;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.border};
  padding: 0.5rem 0 0.25rem 0;
  margin: 2rem 0;
  width: 100%;

  &::placeholder {
    color: ${(props) => props.theme.border};
  }

  &:focus {
    border-bottom: 1px solid ${(props) => props.theme.text_primary};
    outline: 1px solid transparent;
  }
`;
