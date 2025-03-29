import { loginSelectors, inventorySelectors } from "./selectors";

Cypress.Commands.add('login', (username, password) => {
    // ACT
    cy.visit('/');
    cy.get(loginSelectors.username).type(username);
    cy.get(loginSelectors.password).type(password);
    cy.get(loginSelectors.loginButton).click();

    // ASSERT
    cy.url().should('include', '/inventory.html'); // Verify redirect
    cy.get(inventorySelectors.title).should('contain', 'Products'); // Verify UI update
    cy.getCookie('session-username').should('exist'); // Verify session cookie
});