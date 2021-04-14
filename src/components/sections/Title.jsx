import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";
import { useCursor } from "../../contexts/CursorContext";

function Title({ transition, title }) {
  const { setState } = useCursor();
  return (
    <Container
      onMouseEnter={() => setState("hidden")}
      onMouseLeave={() => setState("basic")}
    >
      {title.split("").map((letter) => (
        <Box>
          <Transition in={transition} timeout={0}>
            {(state) => <Letter $state={state}>{letter}</Letter>}
          </Transition>
        </Box>
      ))}
    </Container>
  );
}

export default Title;

Title.propTypes = {
  transition: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Title.defaultProps = {
  transition: false,
};

const Container = styled.h2`
  position: relative;
  font-family: "Playfair Display", "Source Sans Pro", "Open Sans",
    "Trebuchet MS", "Verdana", sans-serif;
  font-size: 3rem;
  margin: 0 0 2rem 0;
  font-weight: 400;

  @media all and (min-width: 576px) {
    font-size: 5rem;
  }

  & * {
    cursor: pointer;
  }
`;

const Box = styled.span`
  display: inline-block;
  overflow: hidden;
`;

const Letter = styled.span`
  display: inline-block;
  transition: transform 0.2s ease-out;
  transform: translateX(
    ${(props) => {
      switch (props.$state) {
        case "entering":
          return "-100%";
        case "entered":
          return "0";
        default:
          return "-100%";
      }
    }}
  );
`;
