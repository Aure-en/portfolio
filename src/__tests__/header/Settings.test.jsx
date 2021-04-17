import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

describe("Settings", () => {
  test("Dropdown", () => {
    setup();
    const dropdownBtn = screen.getByRole("button", { name: /settings/i });
    userEvent.click(dropdownBtn);
    expect(
      screen.getByRole("button", {
        name: "change theme to dark mode",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "change language to fr",
      })
    ).toBeInTheDocument();
  });

  const openSettings = () => {
    const dropdownBtn = screen.getByRole("button", { name: /settings/i });
    userEvent.click(dropdownBtn);
  };

  test("Theme change", () => {
    setup();
    openSettings();

    // Click to change theme
    const themeBtn = screen.getByRole("button", {
      name: "change theme to dark mode",
    });
    userEvent.click(themeBtn);

    // Open settings again to check that the theme button has changed
    openSettings();
    expect(
      screen.getByRole("button", { name: "change theme to light mode" })
    ).toBeInTheDocument();
  });

  test("Language change", () => {
    setup();
    openSettings();

    // Click to change language
    const languageBtn = screen.getByRole("button", {
      name: "change language to fr",
    });
    userEvent.click(languageBtn);

    // Open settings again to check that the theme button has changed
    openSettings();
    expect(
      screen.getByRole("button", { name: "change language to en" })
    ).toBeInTheDocument();
  });
});
