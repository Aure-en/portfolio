describe("Nav links", () => {
  it("About link works", () => {
    cy.visit("/");
    cy.contains("a", /about/i).click();
    cy.contains(/aurélie/i).should("be.visible");
  });

  it("Projects link works", () => {
    cy.visit("/");
    cy.contains("a", /projects/i).click();
    cy.contains("h2", /room/i).should("be.visible");
  });

  it("Contact link works", () => {
    cy.visit("/");
    cy.contains("a", /contact/i).click();
    cy.contains("h2", /contact/i).should("be.visible");
  });
});