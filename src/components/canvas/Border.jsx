import React, { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import styled, { ThemeContext } from "styled-components";
import useWindowSize from "../../hooks/useWindowSize";

function Border({ element, radius }) {
  const canvasRef = useRef();
  const theme = useContext(ThemeContext);
  const { windowSize } = useWindowSize();
  const mouseRef = useRef();
  mouseRef.current = { mouseX: 0, mouseY: 0 };
  let raf;

  useEffect(() => {
    if (windowSize.width === 0 || windowSize.height === 0) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = element.current.offsetWidth;
    canvas.height = element.current.offsetHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);

    const draw = () => {
      const { mouseX, mouseY } = mouseRef.current;

      // Create gradient effect around the mouse
      context.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = context.createRadialGradient(
        mouseX - canvas.getBoundingClientRect().left,
        mouseY - canvas.getBoundingClientRect().top,
        70,
        mouseX - canvas.getBoundingClientRect().left,
        mouseY - canvas.getBoundingClientRect().top,
        100
      );
      gradient.addColorStop(0, theme.border_hover_primary);
      gradient.addColorStop(0.75, theme.border_hover_secondary);
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(
        mouseX - canvas.getBoundingClientRect().left,
        mouseY - canvas.getBoundingClientRect().top,
        radius,
        0,
        Math.PI * 2
      );
      context.fill();

      // Delete everything that isn't on the border
      context.clearRect(1, 1, canvas.width - 2, canvas.height - 2);
      raf = window.requestAnimationFrame(draw);
    };
    raf = window.requestAnimationFrame(draw);
  }, [windowSize, theme]);

  const updatePosition = (e) => {
    mouseRef.current = { mouseX: e.clientX, mouseY: e.clientY };
  };

  useEffect(() => {
    window.addEventListener("mousemove", updatePosition);
    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return <Canvas ref={canvasRef} />;
}

export default Border;

Border.propTypes = {
  element: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
  radius: PropTypes.number,
};

Border.defaultProps = {
  radius: 300,
  element: { current: undefined },
};

const Canvas = styled.canvas`
  position: absolute;
  z-index: 10;
  pointer-events: none;
`;
