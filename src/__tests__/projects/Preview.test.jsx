import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Preview from "../../components/projects/preview/Preview";
import { LanguageContext } from "../../contexts/LanguageContext";
import { CursorProvider } from "../../contexts/CursorContext";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { SectionContext } from "../../contexts/SectionContext";
import content from "../../content/projects.json";

const project = content[1];

const setup = () => {
  // Using project #2 (Breadit) because it has dark mode.
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
            <Preview
              visuals={project.visuals}
              hasDarkMode={project.hasDarkMode}
            />
          </SectionContext.Provider>
        </CursorProvider>
      </ThemeProvider>
    </LanguageContext.Provider>
  );
};

describe("It renders properly", () => {
  test("Preview renders", () => {
    setup();
    expect(
      screen.getByRole("img", { name: /project preview/i })
    ).toBeInTheDocument();
  });

  test("Buttons are rendered", () => {
    setup();
    project.visuals.light.map((visual, index) =>
      expect(
        screen.getByLabelText(`preview image ${index + 1}`)
      ).toBeInTheDocument()
    );
  });

  test("Switch theme button is rendered", () => {
    setup();
    expect(
      screen.getByLabelText(/switch preview to dark mode/i)
    ).toBeInTheDocument();
  });
});

describe("User can interact with the Preview component", () => {
  test("The preview image changes when the user clicks on the button", () => {
    setup();

    // The first preview image is displayed
    const image = screen.getByRole("img", { name: /project preview/i });
    expect(image).toHaveAttribute("src", project.visuals.light[0]);

    // After the user clicks on the 2nd button,
    // The 2nd preview image is displayed.
    const nextPreview = screen.getByLabelText(/preview image 2/i);
    userEvent.click(nextPreview);
    expect(image).toHaveAttribute("src", project.visuals.light[1]);
  });

  test("The user can switch between light / dark mode", () => {
    setup();
    const image = screen.getByRole("img", { name: /project preview/i });
    const switchBtn = screen.getByLabelText(/switch preview to dark mode/i);
    userEvent.click(switchBtn);
    expect(image).toHaveAttribute("src", project.visuals.dark[0]);
  });
});
