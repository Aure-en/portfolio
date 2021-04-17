import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Line({ current }) {
  return (
    <>
      {current && current.current && (
        <Container current={current} aria-hidden="true" />
      )}
    </>
  );
}

export default Line;

const Container = styled.span`
  display: inline-block;
  position: absolute;
  pointer-events: none;
  top: 50%;
  height: 1px;
  background: ${(props) => props.theme.header_accent};
  transition: all 0.2s linear;
  left: ${(props) => props.current.current.getBoundingClientRect().left}px;
  width: ${(props) =>
    props.current.current.getBoundingClientRect().right -
    props.current.current.getBoundingClientRect().left}px;
`;

Line.propTypes = {
  current: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
};

Line.defaultProps = {
  current: { current: undefined },
};
