// logout.cy.js
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
        // ACT: Logout
        cy.get(headerSelectors.menuButton).click();
        cy.get(headerSelectors.logoutButton).click();

        // ASSERT: Verify successful logout
        cy.url().should('eq', Cypress.config().baseUrl);
        cy.get(loginSelectors.loginButton).should('be.visible');
    });

    it('should block access to inventory page after logout', () => {
        // ACT: Logout and try to access inventory page
        cy.get(headerSelectors.menuButton).click();
        cy.get(headerSelectors.logoutButton).click();

        // ASSERT: Verify error message and no redirect
        cy.url().should('eq', Cypress.config().baseUrl);
        cy.visit('/inventory.html', {
            failOnStatusCode: false, // Allow 404/403 without failing the test
          });
        cy.get(loginSelectors.errorMessage)
            .should('be.visible')
            .and('have.text', `Epic sadface: You can only access '/inventory.html' when you are logged in.`);
    });

    it('should clear session cookies after logout', () => {
        // ACT: Logout and check session cookie
        cy.get(headerSelectors.menuButton).click();
        cy.get(headerSelectors.logoutButton).click();

        // ASSERT: Verify session cookie is cleared
        cy.getCookie('session-username').should('be.null');
    });
});
