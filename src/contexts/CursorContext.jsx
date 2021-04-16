import React, { useContext, createContext, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTheme } from "../contexts/ThemeContext";
import Cursor from "../components/Cursor";

// Icon
import cursor from "../assets/icons/cursor.svg";

const CursorContext = createContext();

export function useCursor() {
  return useContext(CursorContext);
}

export function CursorProvider({ children }) {
  const [state, setState] = useState("basic");
  const { theme } = useTheme();

  const value = {
    setState,
  };

  return (
    <CursorContext.Provider value={value}>
      <Container $theme={theme}>
        <Cursor state={state} />
        {children}
      </Container>
    </CursorContext.Provider>
  );
}

CursorProvider.propTypes = {
  children: PropTypes.node,
};

CursorProvider.defaultProps = {
  children: <div />,
};

const Container = styled.div`
  position: relative;
  overflow: hidden;
  cursor: ${(props) => props.$theme === "light" && `url(${cursor}), auto`};
`;
