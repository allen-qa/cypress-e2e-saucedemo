// cypress/support/selectors.js
export const loginSelectors = {
    username: '#user-name',
    password: '#password',
    loginButton: '#login-button',
    errorMessage: '[data-test="error"]'
};

export const inventorySelectors = {
    title: '.title',
    inventoryList: '.inventory_list',
    inventoryItem: '.inventory_item',
    inventoryItemName: '.inventory_item_name',
    inventoryItemPrice: '.inventory_item_price',
    sortDropdown: '.product_sort_container',
};

export const headerSelectors = {
    logo: '.app_logo',
    menuButton: '#react-burger-menu-btn',
    logoutButton: '#logout_sidebar_link',
    cartIcon: '.shopping_cart_link'
};