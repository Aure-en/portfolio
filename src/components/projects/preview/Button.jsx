import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useCursor } from "../../../contexts/CursorContext";

function Button({ onClick, isSelected }) {
  const { setState } = useCursor();

  return (
    <StyledButton
      type="button"
      onClick={onClick}
      isSelected={isSelected}
      onMouseEnter={() => setState("hidden")}
      onMouseLeave={() => setState("basic")}
    >
      <Square />
    </StyledButton>
  );
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

Button.defaultProps = {
  isSelected: false,
};

const StyledButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
`;

const Square = styled.span`
  display: inline-block;
  width: 0.65rem;
  height: 0.65rem;
  background: ${(props) => props.theme.preview_button};
  cursor: pointer;
  transform: rotate(45deg);
`;
