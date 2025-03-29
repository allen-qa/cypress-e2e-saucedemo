// @ts-nocheck
import { headerSelectors, loginSelectors } from "../support/selectors";
import { users } from "../fixtures/users";

describe('SauceDemo Logout Tests', () => {
    beforeEach(() => {
        // Clear session cookies and local storage before each test
        cy.clearCookies().clearLocalStorage();

        // Login before each test
        cy.login(users.standard.username, users.standard.password);
    });

    it('successfully logs out', () => {
        // ACT
        cy.get(headerSelectors.menuButton).click(); // Open menu
        cy.get(headerSelectors.logoutButton).click(); // Click logout

        // ASSERT
        cy.url().should('eq', Cypress.config().baseUrl); // Verify redirect to login page
        cy.get(loginSelectors.loginButton).should('be.visible'); // Verify login button is visible
    });

    it('should block access to inventory page after logout', () => {
        // ACT
        cy.get(headerSelectors.menuButton).click(); // Open menu
        cy.get(headerSelectors.logoutButton).click(); // Click logout

        // ASSERT
        cy.url().should('eq', Cypress.config().baseUrl); // Verify redirect to login page
        cy.visit('/inventory.html', {
            failOnStatusCode: false, // Allow 404/403 without failing the test
          });
        cy.get(loginSelectors.errorMessage)
            .should('be.visible')
            .and('have.text', `Epic sadface: You can only access '/inventory.html' when you are logged in.`); // Verify error message
    });

    it('should clear session cookies after logout', () => {
        // ACT
        cy.get(headerSelectors.menuButton).click(); // Open menu
        cy.get(headerSelectors.logoutButton).click(); // Click logout

        // ASSERT
        cy.getCookie('session-username').should('be.null'); // Verify session cookie is cleared
    });
});