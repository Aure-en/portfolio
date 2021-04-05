import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useCursor } from "../../../contexts/CursorContext";
import ProgressBar from "./ProgressBar";

function ImageScroll({ number, src }) {
  const { setState } = useCursor();
  const imageRef = useRef();
  const containerRef = useRef();
  const [clientY, setClientY] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // When we switch preview images, scroll back to top.
  useEffect(() => {
    setScrollY(0);
    containerRef.current.scrollTop = 0;
  }, [number]);

  const onMouseUp = (e) => {
    setIsScrolling(false);
    setClientY(e.clientY);
    setScrollY(containerRef.current.scrollTop);
    setState("preview");
    window.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseDown = (e) => {
    setIsScrolling(true);
    setClientY(e.clientY);
    setScrollY(containerRef.current.scrollTop);
    setState("scroll");
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!isScrolling) return;
    containerRef.current.scrollTop = scrollY - e.clientY + clientY;
  };

  return (
    <>
      <ProgressBar
        isActive={isScrolling}
        container={containerRef}
        content={imageRef}
        src={src}
      >
        (Drag and scroll)
      </ProgressBar>
      <Container
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
      >
        <Image
          ref={imageRef}
          src={src}
          alt="Project Preview"
          onDragStart={(e) => {
            e.preventDefault();
          }}
          onMouseEnter={() => setState("preview")}
          onMouseLeave={() => setState("basic")}
        />
      </Container>
    </>
  );
}

// Prevents re-render when cursor changes
export default React.memo(ImageScroll);

ImageScroll.propTypes = {
  number: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
};

const Container = styled.div`
  height: 70vh;
  width: 25rem;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.border};
`;

const Image = styled.img`
  max-width: 100%;
  vertical-align: bottom; // Prevents bottom white-space.
`;
