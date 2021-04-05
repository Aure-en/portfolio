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
          isSelected={imageNumber === index}
          onMouseEnter={() => setState("hidden")}
          onMouseLeave={() => setState("basic")}
        >
          <Square />
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
  align-self: flex-end;

  & > button {
    padding: 0.65rem 0.75rem;
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
  background: ${(props) => props.theme.preview_button};
  cursor: pointer;
  transform: rotate(45deg);
`;
