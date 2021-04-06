import React from "react";
import Project from "./Project";
import projects from "../../content/projects.json";

function Projects() {
  return (
    <>
      <main>
        {projects.map((project) => (
          <Project project={project} key={project.id} />
        ))}
      </main>
    </>
  );
}

export default Projects;
