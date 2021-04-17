import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../../components/header/Header";
import { LanguageProvider } from "../../contexts/LanguageContext";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { CursorProvider } from "../../contexts/CursorContext";
import { SectionContext } from "../../contexts/SectionContext";

const setup = () => {
  render(
    <LanguageProvider>
      <ThemeProvider>
        <CursorProvider>
          <SectionContext.Provider
            value={{
              name: "about",
              section: 0,
              sections: [],
            }}
          >
            <Header />
          </SectionContext.Provider>
        </CursorProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

describe("Navigation", () => {
  test("About link", () => {
    setup();
    const about = screen.getByRole("link", { name: /about/i });
    expect(about).toHaveAttribute("href", "#about");
  });

  test("Projects link", () => {
    setup();
    const projects = screen.getByRole("link", { name: /projects/i });
    expect(projects).toHaveAttribute("href", "#project-1");
  });

  test("Contact link", () => {
    setup();
    const contact = screen.getByRole("link", { name: /contact/i });
    expect(contact).toHaveAttribute("href", "#contact");
  });
});
