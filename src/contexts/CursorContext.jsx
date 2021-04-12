import React, { useContext, createContext, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Cursor from "../components/Cursor";

const CursorContext = createContext();

export function useCursor() {
  return useContext(CursorContext);
}

export function CursorProvider({ children }) {
  const [state, setState] = useState("basic");

  const value = {
    setState,
  };

  return (
    <CursorContext.Provider value={value}>
      <Container>
        {/* <Cursor state={state} /> */}
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
`;
