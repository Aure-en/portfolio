import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../../components/contact/Form";
import { LanguageContext } from "../../contexts/LanguageContext";
import { CursorProvider } from "../../contexts/CursorContext";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { SectionContext } from "../../contexts/SectionContext";

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
            <Form />
          </SectionContext.Provider>
        </CursorProvider>
      </ThemeProvider>
    </LanguageContext.Provider>
  );
};

describe("Form validation", () => {
  test("3 required fields messages when the form is empty", () => {
    setup();
    const submitBtn = screen.getByRole("button");
    userEvent.click(submitBtn);
    expect(screen.queryAllByText(/this field is required/i)).toHaveLength(3);
  });

  test("Only 2 required fields messages are left after the user fill their name", () => {
    setup();
    const name = screen.getByPlaceholderText(/name/i);
    userEvent.type(name, "John Smith");
    const submitBtn = screen.getByRole("button");
    userEvent.click(submitBtn);
    expect(screen.queryAllByText(/this field is required/i)).toHaveLength(2);
  });

  test("Only 1 required field message is left after the user fill their name and email", () => {
    setup();
    const name = screen.getByPlaceholderText(/name/i);
    userEvent.type(name, "John Smith");
    const email = screen.getByPlaceholderText(/email/i);
    userEvent.type(email, "john@smith.com");
    const submitBtn = screen.getByRole("button");
    userEvent.click(submitBtn);
    expect(screen.queryAllByText(/this field is required/i)).toHaveLength(1);
  });
});

test("User receives a confirmation message after the form has been sent", () => {
  setup();
  const name = screen.getByPlaceholderText(/name/i);
  userEvent.type(name, "John Smith");
  const email = screen.getByPlaceholderText(/email/i);
  userEvent.type(email, "john@smith.com");
  const message = screen.getByPlaceholderText(/message/i);
  userEvent.type(message, "This is a message.");
  const submitBtn = screen.getByRole("button");
  userEvent.click(submitBtn);
  expect(screen.getByText(/your message has been sent/i)).toBeInTheDocument();
});
