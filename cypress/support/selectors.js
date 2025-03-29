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

export const headerSelectors = {
    logo: '.app_logo',
    menuButton: '#react-burger-menu-btn',
    logoutButton: '#logout_sidebar_link'
};