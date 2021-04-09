import React from "react";
import Project from "./Project";
import Transition from "../canvas/background/Transition";
import projects from "../../content/projects.json";

function Projects() {
  return (
    <>
      <main>
        {projects.map((project) => (
          <Project project={project} key={project.id} />
        ))}
      </main>
      <Transition />
    </>
  );
}

export default Projects;