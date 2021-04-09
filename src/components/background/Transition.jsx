import React, { useRef, useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import useWindowSize from "../../hooks/useWindowSize";
import Particle from "./Particle";

function Transition() {
  const canvasRef = useRef();
  const theme = useContext(ThemeContext);
  const { windowSize } = useWindowSize();

  useEffect(() => {
    if (windowSize.width === 0 || windowSize.height === 0) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = windowSize.width;
    canvas.height = windowSize.height / 2;
    context.clearRect(0, 0, canvas.width, canvas.height);

    const particles = [];
    const settings = {
      number: 70,
    };

    // Create particles
    for (let i = 0; i < settings.number; i += 1) {
      const particle = new Particle(
        canvas,
        context,
        Math.random() > 0.25
          ? theme.particles_primary
          : theme.particles_secondary
      );
      particles.push(particle);
    }

    // Move particles
    const animation = setInterval(() => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => particle.draw());
    }, 50);
    return () => clearInterval(animation);
  }, [windowSize]);

  return <Canvas ref={canvasRef} />;
}

export default Transition;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  z-index: -1;
`;
