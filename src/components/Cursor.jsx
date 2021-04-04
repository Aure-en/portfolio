import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// Icons
import cursor from "../assets/icons/cursor.svg";
import { ReactComponent as CaretDown } from "../assets/icons/caret-down.svg";
import { ReactComponent as CaretUp } from "../assets/icons/caret-up.svg";

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

const Circle = styled.span`
  position: absolute;
  display: ${(props) => (props.state === "hidden" ? "none" : "inline-block")};
  border-radius: 50%;
  width: ${(props) => (props.state === "preview" ? "3rem" : "2rem")};
  height: ${(props) => (props.state === "preview" ? "3rem" : "2rem")};
  border: 1px solid grey;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 999;
  transition: height, width 0.1s ease-out;
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
