import React from "react";
import { render, screen } from "@testing-library/react";
import Project from "../../components/projects/Project";
import { LanguageContext } from "../../contexts/LanguageContext";
import { CursorProvider } from "../../contexts/CursorContext";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { SectionContext } from "../../contexts/SectionContext";
import content from "../../content/projects.json";

const project = content[0];

const setup = () => {
  render(
    <LanguageContext.Provider value={{ language: "en" }}>
      <ThemeProvider>
        <CursorProvider>
          <SectionContext.Provider
            value={{
              name: `project-${project.id}`,
              section: 0,
              sections: [`project-${project.id}`],
            }}
          >
            <Project project={project} />
          </SectionContext.Provider>
        </CursorProvider>
      </ThemeProvider>
    </LanguageContext.Provider>
  );
};

describe("Renders properly", () => {
  test("Title is rendered", () => {
    setup();
    const title = project.title.split("").join(" ");
    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
  });

  test("Description is rendered", () => {
    setup();
    expect(screen.getByText(project.description.en[0])).toBeInTheDocument();
  });

  test("Stacks are rendered", () => {
    setup();
    project.technologies.map((technology) =>
      expect(screen.getByText(technology)).toBeInTheDocument()
    );
  });

  test("Links lead to preview / code", () => {
    setup();
    expect(screen.getByText(/preview/i).closest("a")).toHaveAttribute(
      "href",
      project.view
    );
    expect(screen.getByText(/view code/i).closest("a")).toHaveAttribute(
      "href",
      project.repository
    );
  });
});
