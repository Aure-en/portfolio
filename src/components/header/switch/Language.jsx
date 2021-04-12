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
      onClick={changeLanguage}
      onMouseEnter={() => setState("hidden")}
      onMouseLeave={() => setState("basic")}
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
  padding: 1rem;
  cursor: pointer;

  &:focus {
    outline: 1px solid transparent;
  }
`;
