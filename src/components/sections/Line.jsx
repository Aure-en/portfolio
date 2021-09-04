import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";

function Line({ transition, children }) {
  return (
    <Transition in={transition} timeout={0}>
      {(state) => <Container $state={state}>{children}</Container>}
    </Transition>
  );
}

export default Line;

Line.propTypes = {
  children: PropTypes.node,
  transition: PropTypes.bool,
};

Line.defaultProps = {
  children: <div />,
  transition: false,
};

const Container = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  font-family: "Playfair Display", "Source Sans Pro", "Open Sans",
    "Trebuchet MS", "Verdana", sans-serif;
  font-size: 1.125rem;
  bottom: 0;
  left: 100%;

  @media all and (min-width: 576px) {
    left: 125%;
  }

  &:before {
    content: "";
    display: inline-block;
    width: ${(props) => {
      switch (props.$state) {
        case "entering":
          return "0";
        case "entered":
          return "5rem";
        default:
          return "0";
      }
    }};
    height: 1px;
    transition: width 0.3s ease-out;
    background: ${(props) => props.theme.text_primary};
    position: absolute;
    left: -6rem;
  }
`;
