import React from "react";
import styled from "styled-components";
import { useSection } from "../contexts/SectionContext";

function Pages() {
  const { section, sections } = useSection();

  return (
    <Container section={section + 1} sections={sections.length}>
      {section + 1} — {sections.length}
    </Container>
  );
}

export default Pages;

const Container = styled.span`
  position: fixed;
  top: ${(props) => 80 / (props.sections / props.section)}%;
  right: 10%;
  transition: top 0.5s ease-out;
  transform: rotate(90deg);
`;
