import React from "react";
import styled from "styled-components";
import { useTheme } from "../../../contexts/ThemeContext";
import { useCursor } from "../../../contexts/CursorContext";

// Icons
import { ReactComponent as IconLight } from "../../../assets/icons/light.svg";
import { ReactComponent as IconDark } from "../../../assets/icons/dark.svg";

function Theme() {
  const { theme, changeTheme } = useTheme();
  const { setState } = useCursor();

  return (
    <Button
      type="button"
      onClick={() => {
        changeTheme();
        setState("basic");
      }}
      onMouseEnter={() => setState("hidden")}
      onMouseLeave={() => setState("basic")}
      aria-label={`change theme to ${
        theme === "light" ? "dark mode" : "light mode"
      }`}
    >
      {theme === "light" ? <IconDark /> : <IconLight />}
    </Button>
  );
}

export default Theme;

const Button = styled.button`
  background: none;
  border: none;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 1.125rem;
  color: ${(props) => props.theme.text_secondary};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.text_primary};
  }

  &:focus {
    outline: 1px solid transparent;
  }

  & * {
    cursor: pointer;
  }
`;
