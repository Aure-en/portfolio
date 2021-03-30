import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <Container>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </Container>
  );
}

export default Header;

const Container = styled.nav``;
