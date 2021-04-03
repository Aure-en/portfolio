import React from "react";
import styled from "styled-components";
import Project from "./Project";
import Scroll from "./Scroll";
import projects from "../../content/projects.json";

function Projects() {
  return (
    <>
    <main id="projects">
      {projects.map((project) => (
        <Project project={project} key={project.id} />
      ))}
    </main>
    </>
  );
}

export default Projects;