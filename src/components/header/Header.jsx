import React, { useRef } from "react";
import styled from "styled-components";
import { useCursor } from "../../contexts/CursorContext";
import { useSection } from "../../contexts/SectionContext";
import Language from "./switch/Language";
import Theme from "./switch/Theme";
import Line from "./Line";

function Header() {
  const { setState } = useCursor();
  const { prev, section, sections, link } = useSection();

  // To create the decorative line under the elements.
  const aboutRef = useRef();
  const projectsRef = useRef();
  const contactRef = useRef();

  return (
    <Wrapper>
      <Container>
        <Link
          href="#about"
          onMouseEnter={() => setState("hidden")}
          onMouseLeave={() => setState("basic")}
          onClick={() => link("about")}
          isActive={sections[section] === "about"}
          ref={aboutRef}
        >
          About
        </Link>
        <Link
          href="#project-1"
          onMouseEnter={() => setState("hidden")}
          onMouseLeave={() => setState("basic")}
          onClick={() => link("project-1")}
          isActive={sections[section].includes("project")}
          ref={projectsRef}
        >
          Projects
        </Link>
        <Link
          href="#contact"
          onMouseEnter={() => setState("hidden")}
          onMouseLeave={() => setState("basic")}
          onClick={() => link("contact")}
          isActive={sections[section] === "contact"}
          ref={contactRef}
        >
          Contact
        </Link>
        <Theme />
        <Language />
      </Container>
      <Line
        prev={
          prev === 0
            ? aboutRef
            : prev === sections.length - 1
            ? contactRef
            : projectsRef
        }
        current={
          section === 0
            ? aboutRef
            : section === sections.length - 1
            ? contactRef
            : projectsRef
        }
      />
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
  z-index: 10;

  @media all and (min-width: 576px) {
    justify-content: flex-end;
    padding: 0 1rem;
  }
`;

const Container = styled.nav`
  display: flex;

  & > a {
    text-transform: uppercase;
    font-weight: 300;
    font-size: 1.125rem;
    padding: 1rem;
  }
`;

const Link = styled.a`
  position: relative;

  &:hover {
    color: ${(props) => props.theme.text_secondary};
  }
`;
