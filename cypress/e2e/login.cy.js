// login.cy.js
import { users } from '../fixtures/users';
import { loginSelectors, inventorySelectors } from '../support/selectors';

describe('SauceDemo Login Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully logs in with valid credentials (Happy Path)', () => {
    // ACT: Login with valid credentials
    cy.get(loginSelectors.username).type(users.standard.username);
    cy.get(loginSelectors.password).type(users.standard.password, { log: false }); // Hide password in logs
    cy.get(loginSelectors.loginButton).click();

    // ASSERT: Verify successful login
    cy.url().should('include', '/inventory.html'); // Verify redirect
    cy.get(inventorySelectors.title).should('contain', 'Products'); // Verify UI update
    cy.getCookie('session-username').should('exist'); // Verify session cookie
  });

  it('displays error for invalid password', () => {
    // ACT: Login with invalid password
    cy.get(loginSelectors.username).type(users.standard.username);
    cy.get(loginSelectors.password).type('invalid_password');
    cy.get(loginSelectors.loginButton).click();

    // ASSERT: Verify error message and no redirect
    cy.url().should('eq', Cypress.config().baseUrl)
    cy.get(loginSelectors.errorMessage)
      .should('be.visible')
      .and('contain', 'Username and password do not match'); 
  });

  it('blocks locked-out users with descriptive error', () => {
    // ACT: Login with locked-out user credentials
    cy.get(loginSelectors.username).type(users.locked.username);
    cy.get(loginSelectors.password).type(users.locked.password, { log: false });
    cy.get(loginSelectors.loginButton).click();

    // ASSERT: Verify error message and no redirect
    cy.url().should('eq', Cypress.config().baseUrl);
    cy.get(loginSelectors.errorMessage)
      .should('be.visible')
      .and('contain', 'Sorry, this user has been locked out.'); 
  });

  it('validates required fields', () => {
    // ACT: Submit empty form
    cy.get(loginSelectors.loginButton).click();

    // ASSERT: Verify error message for empty username and password
    cy.get(loginSelectors.errorMessage)
      .should('be.visible')
      .and('contain', 'Username is required');
  });
});
