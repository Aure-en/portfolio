import React, { useEffect, useRef, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import Particle from "./Particle";
import useWindowSize from "../../../hooks/useWindowSize";

function Diagonal() {
  const canvasRef = useRef();
  const theme = useContext(ThemeContext);
  const { windowSize } = useWindowSize();
  let raf;

  useEffect(() => {
    if (windowSize.width === 0 || windowSize.height === 0) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = windowSize.width;
    canvas.height = windowSize.height / 2;
    context.clearRect(0, 0, canvas.width, canvas.height);

    const particles = [];
    const settings = {
      number: 150,
      link_distance: 100,
    };

    const link = (particles) => {
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = 0; j < particles.length; j += 1) {
          const distanceX =
            Math.abs(particles[i].x - particles[j].x) - settings.link_distance;
          const distanceY =
            Math.abs(particles[i].y - particles[j].y) - settings.link_distance;

          if (distanceX < 0 && distanceY < 0) {
            // Coloring the line.
            const gradient = context.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
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
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
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

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => particle.draw());
      link(particles);
      raf = window.requestAnimationFrame(animate);
    };
    raf = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(raf);
  }, [windowSize, theme]);

  return <Canvas ref={canvasRef} />;
}

export default Diagonal;

const Canvas = styled.canvas`
  position: absolute;
  transform: skew(-20deg, -20deg);
`;
