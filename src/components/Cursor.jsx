import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// Icons
import cursor from "../assets/icons/cursor.svg";

function Cursor({ state }) {
  const cursorRef = useRef();
  const circleRef = useRef();
  let currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  let mouseX = 0;
  let mouseY = 0;
  let xp = 0;
  let yp = 0;

  const onMouseMove = (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
    cursorRef.current.style.top = `${e.pageY}px`;
    cursorRef.current.style.left = `${e.pageX}px`;
  };

  const onScroll = () => {
    mouseY +=
      (document.documentElement.scrollTop || document.body.scrollTop) -
      currentScroll;
    cursorRef.current.style.top = `${mouseY}px`;
    currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("scroll", onScroll);
    setInterval(() => {
      xp += (mouseX - xp) / 6;
      yp += (mouseY - yp) / 6;
      circleRef.current.style.top = `${yp}px`;
      circleRef.current.style.left = `${xp}px`;
    }, 20);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.addEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <Circle state={state} ref={circleRef} />
      <Icon state={state} ref={cursorRef} alt="Cursor" />
    </>
  );
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

const Icon = styled.span`
  position: absolute;
  display: ${(props) => (props.state === "hidden" ? "none" : "inline-block")};
  width: 1.5rem;
  height: 1.5rem;
  background: url(${cursor});
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 1000;
`;
