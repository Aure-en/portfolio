import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useCursor } from "../../../../contexts/CursorContext";

// Icons
import { ReactComponent as IconLight } from "../../../../assets/icons/light.svg";
import { ReactComponent as IconDark } from "../../../../assets/icons/dark.svg";

function ThemeSwitch({ theme, switchTheme }) {
  const { setState } = useCursor();
  return (
    <Switch
      onClick={switchTheme}
      onMouseEnter={() => setState("hidden")}
      onMouseLeave={() => setState("basic")}
    >
      {theme === "light" ? <IconLight /> : <IconDark />}
    </Switch>
  );
}

export default ThemeSwitch;

ThemeSwitch.propTypes = {
  theme: PropTypes.string,
  switchTheme: PropTypes.func.isRequired,
};

ThemeSwitch.defaultProps = {
  theme: "light",
};

const Switch = styled.button`
  border: none;
  background: none;
  padding: 0;

  & > svg {
    cursor: pointer;
  }
`;
