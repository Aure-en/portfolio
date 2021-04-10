import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Line({ prev, current }) {
  return (
    <>
      {current && current.current && (
        <Container prev={prev} current={current} />
      )}
    </>
  );
}

export default Line;

const Container = styled.span`
  display: inline-block;
  position: absolute;
  top: 50%;
  height: 1px;
  background: ${(props) => props.theme.header_accent};
  transition: all 0.2s linear;
  left: ${(props) => props.current.current.getBoundingClientRect().left}px;
  width: ${(props) =>
    props.current.current.getBoundingClientRect().right -
    props.current.current.getBoundingClientRect().left}px;
`;
