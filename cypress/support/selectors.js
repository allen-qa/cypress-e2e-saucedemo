// cypress/support/selectors.js
export const loginSelectors = {
    username: '#user-name',
    password: '#password',
    loginButton: '#login-button',
    errorMessage: '[data-test="error"]'
};

export const inventorySelectors = {
    title: '.title',
    cartIcon: '.shopping_cart_link'
};