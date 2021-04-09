/* eslint-disable react/no-this-in-sfc */
import React, { useRef, useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import useWindowSize from "../../hooks/useWindowSize";
import Particle from "./Particle";

function Particles() {
  const canvasRef = useRef();
  const theme = useContext(ThemeContext);
  const { windowSize } = useWindowSize();

  /* Using ref because:
  - With state, the component would rerender everytime we move the mouse.
  - With simple variables, the event listener wouldn't update them properly.
  */
  const mouseRef = useRef();
  mouseRef.current = { mouseX: 0, mouseY: 0 };

  useEffect(() => {
    if (windowSize.width === 0 || windowSize.height === 0) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = windowSize.width;
    canvas.height = windowSize.height;
    context.clearRect(0, 0, canvas.width, canvas.height);

    const particles = [];
    const settings = {
      number: 500,
      link_distance: 75,
      distance_mouse: 200,
    };

    const link = (particles) => {
      const { mouseX, mouseY } = mouseRef.current;
      const linked = particles.filter(
        (particle) =>
          (particle.x - mouseX) ** 2 + (particle.y - mouseY) ** 2 <
          settings.distance_mouse ** 2
      );

      for (let i = 0; i < linked.length; i += 1) {
        for (let j = 0; j < linked.length; j += 1) {
          const distanceX =
            Math.abs(linked[i].x - linked[j].x) - settings.link_distance;
          const distanceY =
            Math.abs(linked[i].y - linked[j].y) - settings.link_distance;

          if (distanceX < 0 && distanceY < 0) {
            // Coloring the line.
            const gradient = context.createLinearGradient(
              linked[i].x,
              linked[i].y,
              linked[j].x,
              linked[j].y
            );
            gradient.addColorStop(0, theme.line_primary);
            gradient.addColorStop(0.5, theme.line_secondary);

            if (Math.random() > 0.5) {
              gradient.addColorStop(0.65, theme.line_transition);
              gradient.addColorStop(0.75, theme.particles_secondary);
              gradient.addColorStop(0.85, theme.line_transition);
            }

            gradient.addColorStop(1, theme.line_primary);
            context.strokeStyle = gradient;
            context.lineWidth = 0.15;
            context.beginPath();
            context.moveTo(linked[i].x, linked[i].y);
            context.lineTo(linked[j].x, linked[j].y);
            context.stroke();
          }
        }
      }
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
      link(particles);
    }, 50);
    return () => clearInterval(animation);
  }, [windowSize]);

  const updatePosition = (e) => {
    mouseRef.current = { mouseX: e.clientX, mouseY: e.clientY };
  };

  return (
    <Canvas
      ref={canvasRef}
      onMouseEnter={() => {
        window.addEventListener("mousemove", updatePosition);
      }}
      onMouseLeave={() => {
        window.removeEventListener("mousemove", updatePosition);
      }}
    />
  );
}

export default Particles;

const Canvas = styled.canvas`
  position: absolute;
  z-index: 1;
`;
