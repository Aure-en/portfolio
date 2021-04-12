import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Cursor({ state }) {
  const circleRef = useRef();
  let currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  let mouseX = 0;
  let mouseY = 0;
  let xp = 0;
  let yp = 0;
  let raf;

  const onMouseMove = (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
  };

  const onScroll = () => {
    mouseY +=
      (document.documentElement.scrollTop || document.body.scrollTop) -
      currentScroll;
    currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
  };

  const move = () => {
    xp += (mouseX - xp) / 6;
    yp += (mouseY - yp) / 6;
    circleRef.current.style.top = `${yp}px`;
    circleRef.current.style.left = `${xp}px`;
    raf = window.requestAnimationFrame(move);
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("scroll", onScroll);
    raf = window.requestAnimationFrame(move);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.addEventListener("scroll", onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return <Circle state={state} ref={circleRef} />;
}

export default Cursor;

Cursor.propTypes = {
  state: PropTypes.string,
};

Cursor.defaultProps = {
  state: "basic",
};

const caret = `
  position: absolute;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
`;

const Circle = styled.span`
  position: absolute;
  display: ${(props) => (props.state === "hidden" ? "none" : "inline-block")};
  width: ${(props) => {
    switch (props.state) {
      case "hidden":
        return "0";
      case "preview":
        return "3rem";
      case "scroll":
        return "2.5rem";
      case "basic":
      default:
        return "2rem";
    }
  }};
  height: ${(props) => {
    switch (props.state) {
      case "hidden":
        return "0";
      case "preview":
        return "3rem";
      case "scroll":
        return "2.5rem";
      case "basic":
      default:
        return "2rem";
    }
  }};
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid grey;
  pointer-events: none;
  z-index: 999;
  transition: height, width 0.1s ease-out;

  &:before {
    ${caret};
    ${(props) => props.state === "scroll" && 'content: ""'};
    border-bottom: 4px solid ${(props) => props.theme.cursor};
    border-top: 4px solid transparent;
    top: -35%;
  }

  &:after {
    ${caret}
    ${(props) => props.state === "scroll" && 'content: ""'};
    border-top: 4px solid ${(props) => props.theme.cursor};
    border-bottom: 4px solid transparent;
    bottom: -35%;
  }
`;
