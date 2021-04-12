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
      onClick={changeTheme}
      onMouseEnter={() => setState("hidden")}
      onMouseLeave={() => setState("basic")}
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
  cursor: pointer;
  color: ${(props) => props.theme.text_primary};

  &:focus {
    outline: 1px solid transparent;
  }

  & * {
    cursor: pointer;
  }
`;
