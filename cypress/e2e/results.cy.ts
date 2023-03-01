describe("Results Page", () => {
  it("Should calculate the correct distance between cities", () => {
    cy.visit(
      "/results?passengers=5&date=2023-03-11&cities=Bordeaux,Nantes,Paris"
    );

    cy.get('[data-layer="total"]').contains("617.92 km");
    cy.get('[data-layer="passengers"]').contains("5");
    cy.get('[data-layer="date"]').contains("Mar 11, 2023");
  });

  it("Should fail if Dijon is selectes", () => {
    cy.visit(
      "/results?passengers=1&date=2023-03-11&cities=Bordeaux,Dijon,Paris"
    );

    cy.get('[data-layer="error-message"]').should("exist");
  });
});
