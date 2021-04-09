import React from "react";
import styled from "styled-components";
import Project from "./Project";
import Transition from "../background/Transition";
import projects from "../../content/projects.json";

function Projects() {
  return (
    <Container>
      <main>
        {projects.map((project) => (
          <Project project={project} key={project.id} />
        ))}
      </main>
      <Transition />
    </Container>
  );
}

export default Projects;

const Container = styled.div`
  position: relative;
`;