import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <Wrapper>
      <Container>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </Container>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  max-width: 100%;
  color: ${(props) => props.theme.text_primary};
  background: ${(props) => props.theme.header_bg};

  @media all and (min-width: 576px) {
    justify-content: flex-end;
    padding: 0 1rem;
  }
`;

const Container = styled.nav`
  display: flex;

  & > a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-weight: 300;
    font-size: 1.125rem;
    padding: 1rem;
  }
`;
