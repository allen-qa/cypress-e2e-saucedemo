/// <reference types="cypress" />
import { users } from '../fixtures/users';
import { loginSelectors, inventorySelectors } from '../support/selectors';

describe('SauceDemo Login Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully logs in with valid credentials (Happy Path)', () => {
    // ACT
    cy.get(loginSelectors.username).type(users.standard.username);
    cy.get(loginSelectors.password).type(users.standard.password, { log: false }); // Hide password in logs
    cy.get(loginSelectors.loginButton).click();

    // ASSERT
    cy.url().should('include', '/inventory.html'); // Verify redirect
    cy.get(inventorySelectors.title).should('contain', 'Products'); // Verify UI update
    cy.getCookie('session-username').should('exist'); // Verify session cookie
  });

  it('displays error for invalid password', () => {
    // ACT
    cy.get(loginSelectors.username).type(users.standard.username);
    cy.get(loginSelectors.password).type('invalid_password');
    cy.get(loginSelectors.loginButton).click();

    // ASSERT
    cy.url().should('eq', Cypress.config().baseUrl); // Verify no redirect
    cy.get(loginSelectors.errorMessage)
      .should('be.visible')
      .and('contain', 'Username and password do not match'); // Verify error message
  });

  it('blocks locked-out users with descriptive error', () => {
    // ACT
    cy.get(loginSelectors.username).type(users.locked.username);
    cy.get(loginSelectors.password).type(users.locked.password, { log: false });
    cy.get(loginSelectors.loginButton).click();

    // ASSERT
    cy.url().should('eq', Cypress.config().baseUrl); // Verify no redirect
    cy.get(loginSelectors.errorMessage)
      .should('be.visible')
      .and('contain', 'Sorry, this user has been locked out.'); // Verify error message
  });

  it('validates required fields', () => {
    // ACT: Submit empty form
    cy.get(loginSelectors.loginButton).click();

    // ASSERT
    cy.get(loginSelectors.errorMessage)
      .should('be.visible')
      .and('contain', 'Username is required'); // Username required message
  });
});
