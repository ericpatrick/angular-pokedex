describe("Home page", () => {
  before(() => {
    cy.intercept(
      "GET",
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    );

    cy.visit("http://localhost:4200");
    cy.title().should("equal", "Pokedex Angular");
  });

  it("Should show pokemon cards", () => {
    cy.waitLoading();
    cy.getBySel("pokemonCard").should("have.length.gte", 1);
  });

  it("Should search for specific pokemon", () => {
    cy.getBySel("searchInput").type("Charizard");
    cy.getBySel("searchButton").click();

    cy.getBySel("pokemonCard").should("have.length", 1);
    cy.getBySel("searchInput").clear();
  });

  it("Should show a message for empty search", () => {
    cy.getBySel("searchInput").type("Desconhecido");
    cy.getBySel("searchButton").click();

    cy.getBySel("pokemonNotFoundCard").should("exist");
  });
});
