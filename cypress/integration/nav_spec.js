describe("Nav links", () => {
  it("About link works", () => {
    cy.visit("/");
    cy.viewport(1200, 900);
    cy.contains("a", /about/i).click();
    cy.window().its("scrollY").should("equal", 0);
  });

  it("Projects link works", () => {
    cy.visit("/");
    cy.viewport(1200, 900);
    cy.contains("a", /projects/i).click();
    cy.window().its("scrollY").should("equal", 900);
  });

  it("Contact link works", () => {
    cy.visit("/");
    cy.viewport(1200, 900);
    cy.contains("a", /contact/i).click();
    cy.window().its("scrollY").should("equal", 2700);
  });
});