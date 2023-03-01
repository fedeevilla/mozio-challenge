describe("SearchForm Page", () => {
  it("Button should be disabled", () => {
    cy.visit("/");
    cy.get('[data-layer="submit-button"]').should("be.disabled");
  });
});
