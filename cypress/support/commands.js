import { loginSelectors, inventorySelectors, headerSelectors, cartSelectors } from "./selectors";

Cypress.Commands.add('login', (username, password) => {
    cy.visit('/');
    cy.get(loginSelectors.username).type(username);
    cy.get(loginSelectors.password).type(password);
    cy.get(loginSelectors.loginButton).click();

    cy.url().should('include', '/inventory.html'); // Verify redirect
    cy.get(inventorySelectors.title).should('contain', 'Products'); // Verify UI update
    cy.getCookie('session-username').should('exist'); // Verify session cookie
});

Cypress.Commands.add('addItemToCart', (itemName) => {
    cy.log(`Adding item to cart: ${itemName}`);

    // Find the item by name and click the "Add to cart" button
    cy.contains(inventorySelectors.inventoryItemName, itemName)
        .parentsUntil(inventorySelectors.inventoryItem)
        .find(inventorySelectors.inventoryButton)
        .contains('Add to cart')
        .click();

    cy.contains(inventorySelectors.inventoryItemName, itemName)
        .parentsUntil(inventorySelectors.inventoryItem)
        .find(inventorySelectors.inventoryButton)
        .should('contain', 'Remove'); // Verify button text changes to "Remove"
});

Cypress.Commands.add('removeAllItemsFromCart', () => {
    cy.get(cartSelectors.removeButton).each($button => {
                cy.wrap($button).click();
            });
});

Cypress.Commands.add('visitCartPage', () => {
    cy.get(headerSelectors.cartIcon).click();
    cy.url().should('include', '/cart.html'); // Verify redirect to cart page
    cy.get('.cart_list').should('be.visible'); // Verify cart list is visible
});
