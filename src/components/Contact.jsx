import React, { useState } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import Submit from "./shared/buttons/Submit";
import Diagonal from "./canvas/background/Diagonal";
import Transition from "./canvas/background/Transition";
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
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    let hasError = false;
    setErrors({
      name: "",
      email: "",
      message: "",
    });

    Object.keys(inputs).map((key) => {
      if (!inputs[key]) {
        setErrors((prev) => ({ ...prev, [key]: "This field is required." }));
        hasError = true;
      }
    });

    if (hasError) {
      e.preventDefault();
      return;
    }
    setMessage("Your message has been sent.");
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
        <Text>
          Feel free to contact me for any inquiry, and I will get back to you as
          soon as I can.
        </Text>
        <Form
          action="https://mailthis.to/nn.aurelie@gmail.com"
          method="POST"
          onSubmit={onSubmit}
        >
          <Field>
            <label htmlFor="name">
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={inputs.name}
                onChange={handleInputChange}
                $hasError={errors.name}
              />
            </label>
            {errors.name && <Error>{errors.name}</Error>}
          </Field>

          <Field>
            <label htmlFor="email">
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={inputs.email}
                onChange={handleInputChange}
                $hasError={errors.email}
              />
            </label>
            {errors.email && <Error>{errors.email}</Error>}
          </Field>

          <Field>
            <label htmlFor="message">
              <Textarea
                name="message"
                id="message"
                placeholder="Message"
                value={inputs.message}
                onChange={handleInputChange}
                maxRows={5}
                $hasError={errors.message}
              />
            </label>
            {errors.message && <Error>{errors.message}</Error>}
          </Field>

          <Validation>
            <Submit>Send Message</Submit>
            {message && <Message>{message}</Message>}
          </Validation>
        </Form>
        <Line position="left" />
        <Line position="right" />
        <Line position="bottom" />
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`;

const Field = styled.div`
  margin: 1.5rem 0;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid
    ${(props) => (props.$hasError ? props.theme.error : props.theme.border)};
  padding: 0.5rem 0 0.25rem 0;
  width: 100%;

  &::placeholder {
    color: ${(props) => props.theme.border};
  }

  &:focus {
    border-bottom: 1px solid ${(props) => props.theme.text_primary};
    outline: 1px solid transparent;
  }
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  border-bottom: 1px solid
    ${(props) => (props.$hasError ? props.theme.error : props.theme.border)};
  padding: 0.5rem 0 0.25rem 0;
  width: 100%;

  &::placeholder {
    color: ${(props) => props.theme.border};
  }

  &:focus {
    border-bottom: 1px solid ${(props) => props.theme.text_primary};
    outline: 1px solid transparent;
  }
`;

const Validation = styled.div`
  position: relative;
  align-self: flex-end;

  & > button {
    margin-bottom: 0.5rem;
  }
`;

const Message = styled.div`
  position: absolute;
  font-size: 0.75rem;
  text-align: center;
`;

const Error = styled(Message)`
  color: ${(props) => props.theme.error};
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
