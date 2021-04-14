import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useCursor } from "../../../../contexts/CursorContext";

function Buttons({ images, imageNumber, setImageNumber }) {
  const { setState } = useCursor();
  return (
    <Container>
      {images.map((image, index) => (
        <Button
          key={image}
          type="button"
          onClick={() => setImageNumber(index)}
          onMouseEnter={() => setState("hidden")}
          onMouseLeave={() => setState("basic")}
          aria-label={`preview image ${index + 1}`}
        >
          <Square isSelected={imageNumber === index} index={index} />
        </Button>
      ))}
    </Container>
  );
}

export default Buttons;

Buttons.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageNumber: PropTypes.number.isRequired,
  setImageNumber: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;

  & > button {
    padding: 0.5rem 0.75rem;
  }

  & > button:last-child {
    margin-bottom: 0.75rem;
  }
`;

const Button = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
`;

const Square = styled.span`
  display: inline-block;
  width: 0.65rem;
  height: 0.65rem;
  cursor: pointer;
  transform: rotate(45deg);
  background: ${(props) => {
    switch ((props.index + 1) % 3) {
      case 1:
        return props.theme.preview_button_primary;
      case 2:
        return props.theme.preview_button_secondary;
      default:
        return props.theme.preview_button_tertiary;
    }
  }};
  outline: ${(props) =>
    props.isSelected
      ? `1px solid ${props.theme.border_hover_secondary}`
      : `1px solid transparent`};
  box-sizing: content-box;
`;
