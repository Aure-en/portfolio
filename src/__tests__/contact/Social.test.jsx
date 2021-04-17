import React from "react";
import { render, screen } from "@testing-library/react";
import Social from "../../components/contact/Social";
import { LanguageContext } from "../../contexts/LanguageContext";
import { CursorProvider } from "../../contexts/CursorContext";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { SectionContext } from "../../contexts/SectionContext";
import contact from "../../content/contact.json";

const setup = () => {
  render(
    <LanguageContext.Provider value={{ language: "en" }}>
      <ThemeProvider>
        <CursorProvider>
          <SectionContext.Provider
            value={{
              name: "contact",
              section: 0,
              sections: ["contact"],
            }}
          >
            <Social />
          </SectionContext.Provider>
        </CursorProvider>
      </ThemeProvider>
    </LanguageContext.Provider>
  );
};

test("Links work properly", () => {
  setup();
  expect(screen.getByTitle(/send a mail/i)).toHaveAttribute(
    "href",
    `mailto:${contact.links.mail}`
  );
  expect(screen.getByTitle(/github profile/i)).toHaveAttribute(
    "href",
    contact.links.github
  );
});
