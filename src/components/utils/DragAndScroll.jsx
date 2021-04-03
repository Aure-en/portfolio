import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function DragAndScroll({ image, children }) {
  const [clientY, setClientY] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const ref = useRef();

  // When we switch preview images, scroll back to top.
  useEffect(() => {
    ref.current.scrollTop = 0;
    setScrollY(0);
  }, [image]);

  const onMouseUp = (e) => {
    setIsScrolling(false);
    setClientY(e.clientY);
    setScrollY(ref.current.scrollTop);
    window.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseDown = (e) => {
    setIsScrolling(true);
    setClientY(e.clientY);
    setScrollY(ref.current.scrollTop);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!isScrolling) return;
    ref.current.scrollTop = scrollY - e.clientY + clientY;
  };

  return (
    <Container ref={ref} onMouseDown={onMouseDown} onMouseMove={onMouseMove}>
      {children}
    </Container>
  );
}

export default DragAndScroll;

DragAndScroll.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  image: PropTypes.number.isRequired,
};

const Container = styled.div`
  height: 70vh;
  width: 25rem;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.border};
  cursor: grab;
`;
