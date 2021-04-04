import React, { useContext, createContext, useState } from "react";
import PropTypes from "prop-types";
import Cursor from "../components/Cursor";

const CursorContext = createContext();

export function useCursor() {
  return useContext(CursorContext);
}

export function CursorProvider({ children }) {
  const [isActive, setIsActive] = useState(false);

  const value = {
    isActive,
    setIsActive,
  };

  return (
    <CursorContext.Provider value={value}>
      <Cursor />
      {children}
    </CursorContext.Provider>
  );
}

CursorProvider.propTypes = {
  children: PropTypes.node,
};

CursorProvider.defaultProps = {
  children: <div />,
};
