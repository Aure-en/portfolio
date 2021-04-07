/* eslint-disable react/no-this-in-sfc */
import React, { useRef, useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import useWindowSize from "../../hooks/useWindowSize";

function Particles() {
  const canvasRef = useRef();
  const theme = useContext(ThemeContext);
  const { windowSize } = useWindowSize();

  useEffect(() => {
    if (windowSize.width === 0 || windowSize.height === 0) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = windowSize.width;
    canvas.height = windowSize.height;

    const particles = [];
    const settings = {
      number: 500,
      maxLife: 10,
    };

    function Particle() {
      // Particle settings (initial position, velocity)
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = Math.random() - 0.5;
      this.vy = Math.random() - 0.5;
      this.size = Math.random() * 1.5;
      particles.push(this);
    }

    Particle.prototype.draw = function () {
      this.x += this.vx;
      this.y += this.vy;

      // Draw on canvas
      context.beginPath();
      context.fillStyle = theme.particles_primary;
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
    };

    // Create particles
    for (let i = 0; i < settings.number; i++) {
      new Particle();
    }

    // Move particles
    setInterval(() => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => particle.draw());
    }, 50);
  }, [windowSize]);

  return <Canvas ref={canvasRef} />;
}

export default Particles;

const Canvas = styled.canvas`
  position: absolute;
  z-index: -1;
`;
