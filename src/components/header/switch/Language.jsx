import React from "react";
import styled from "styled-components";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useCursor } from "../../../contexts/CursorContext";

function Language() {
  const { language, changeLanguage } = useLanguage();
  const { setState } = useCursor();

  return (
    <Button
      type="button"
      onClick={() => {
        changeLanguage();
        setState("basic");
      }}
      onMouseEnter={() => setState("hidden")}
      onMouseLeave={() => setState("basic")}
      aria-label={`change language to ${language === "en" ? "fr" : "en"}`}
    >
      {language === "en" ? "fr" : "en"}
    </Button>
  );
}

export default Language;

const Button = styled.button`
  background: none;
  border: none;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 1.125rem;
  color: ${(props) => props.theme.text_secondary};
  padding: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;

  &:hover {
    color: ${(props) => props.theme.text_primary};
  }

  &:focus {
    outline: 1px solid transparent;
  }
`;
