import React, { useState } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { useLanguage } from "../../contexts/LanguageContext";
import Submit from "../shared/buttons/Submit";
import contact from "../../content/contact.json";

function Form() {
  const { language } = useLanguage();
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
  const [message, setMessage] = useState(false);

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
      name: false,
      email: false,
      message: false,
    });
    setMessage(false);

    Object.keys(inputs).map((key) => {
      if (!inputs[key]) {
        setErrors((prev) => ({ ...prev, [key]: true }));
        hasError = true;
      }
    });

    if (hasError) {
      e.preventDefault();
      return;
    }
    setMessage(true);
  };

  return (
    <ContactForm
      action={`https://mailthis.to/${contact.links.mail}`}
      method="POST"
      onSubmit={onSubmit}
    >
      <Field>
        <label htmlFor="name">
          <Input
            type="text"
            name="name"
            id="name"
            placeholder={contact[language].form.name}
            value={inputs.name}
            onChange={handleInputChange}
            $hasError={errors.name}
          />
        </label>
        {errors.name && <Error>{contact[language].form.error}</Error>}
      </Field>

      <Field>
        <label htmlFor="email">
          <Input
            type="email"
            name="email"
            id="email"
            placeholder={contact[language].form.email}
            value={inputs.email}
            onChange={handleInputChange}
            $hasError={errors.email}
          />
        </label>
        {errors.email && <Error>{contact[language].form.error}</Error>}
      </Field>

      <Field>
        <label htmlFor="message">
          <Textarea
            name="message"
            id="message"
            placeholder={contact[language].form.message}
            value={inputs.message}
            onChange={handleInputChange}
            maxRows={5}
            $hasError={errors.message}
          />
        </label>
        {errors.message && <Error>{contact[language].form.error}</Error>}
      </Field>

      <Validation>
        <Submit>{contact[language].form.submit}</Submit>
        {message && <Message>{contact[language].form.success}</Message>}
      </Validation>
    </ContactForm>
  );
}

export default Form;

const ContactForm = styled.form`
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
