describe("Fullsize scroll works properly", () => {
  it("Scroll to bottom on keydown", () => {
    cy.visit("/");
    cy.viewport(1200, 900);
    cy.wait(500);
    cy.get("body").type("{downarrow}");
    cy.wait(500);
    cy.window().its("scrollY").should("equal", 900);
  });

  it("Scroll to top on keyup", () => {
    cy.visit("/");
    cy.viewport(1200, 900);
    cy.wait(500);
    cy.get("body").type("{downarrow}");
    cy.wait(500);
    cy.get("body").trigger("keydown", 950, 0, { keycode: 38 });
    cy.wait(500);
    cy.window().its("scrollY").should("equal", 0);
  });
});
