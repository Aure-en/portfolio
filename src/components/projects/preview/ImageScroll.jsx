import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useCursor } from "../../../contexts/CursorContext";
import ProgressBar from "./ProgressBar";
import Border from "../../canvas/Border";

function ImageScroll({ number, src, hasScroll }) {
  const { setState } = useCursor();
  const imageRef = useRef();
  const containerRef = useRef();
  const [clientY, setClientY] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // When we switch preview images, scroll back to top.
  useEffect(() => {
    setScrollY(0);
    containerRef.current.style.scrollBehavior = "smooth";
    containerRef.current.scrollTop = 0;
    containerRef.current.style.scrollBehavior = "auto";
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
      {hasScroll && (
        <ProgressBar
          isActive={isScrolling}
          container={containerRef}
          content={imageRef}
          src={src}
          number={number}
        />
      )}
      <Border element={containerRef} radius={150} />
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
          $hasScroll={hasScroll}
        />
      </Container>
    </>
  );
}

export default ImageScroll;

ImageScroll.propTypes = {
  number: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  hasScroll: PropTypes.bool,
};

ImageScroll.defaultProps = {
  hasScroll: true,
};

const Container = styled.div`
  height: 630px;
  width: 25rem;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.border};
`;

const Image = styled.img`
  max-width: 100%;
  height: ${(props) => !props.$hasScroll && "100%"};
  vertical-align: bottom; // Prevents bottom white-space.
`;
