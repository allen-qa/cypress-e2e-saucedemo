// cart.cy.js
// @ts-nocheck
import { headerSelectors, inventorySelectors, loginSelectors, cartSelectors } from "../support/selectors";
import { users } from "../fixtures/users";
import { items } from "../fixtures/items";

const itemInfo = {
    name: 'Sauce Labs Backpack',
    description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    price: '$29.99'
};

describe('SauceDemo Cart Tests', () => {
    beforeEach(() => {
        // Login before each test
        cy.login(users.standard.username, users.standard.password);
    });
    
    it('adds a single item to the cart', () => {
        const itemName = 'Sauce Labs Backpack';
        
        // ACT: Add item to cart
        cy.addItemToCart(itemName);

        // ASSERT: Verify item is in cart
        cy.get(headerSelectors.shoppingCartBadge).should('be.visible').and('contain', '1');
        cy.visitCartPage();
        cy.contains(cartSelectors.cartItem, itemName)
            .should('be.visible')
            .parentsUntil(cartSelectors.cartItem)
            .should('contain', itemName)
            .and('contain', items[itemName].desc)
            .and('contain', items[itemName].price);
    });

    it('removes an item from the cart', () => {
        const itemName = 'Sauce Labs Backpack';

        // ACT: Add and then remove item from cart
        cy.addItemToCart(itemName);
        cy.visitCartPage();
        cy.get(cartSelectors.removeButton).click();

        // ASSERT: Verify item is removed from cart
        cy.get(headerSelectors.shoppingCartBadge).should('not.exist');
        cy.contains(cartSelectors.cartItem, itemName).should('not.exist');
    });

    it('adds multiple items to the cart', () => {
        const itemsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

        // ACT: Add multiple items to cart
        itemsToAdd.forEach(item => cy.addItemToCart(item));

        // ASSERT: Verify all items are in cart
        cy.get(headerSelectors.shoppingCartBadge).should('be.visible').and('contain', '3');
        cy.visitCartPage();
        itemsToAdd.forEach(item => {
            cy.contains(cartSelectors.cartItem, item)
            .should('be.visible')
            .parentsUntil(cartSelectors.cartItem)
            .should('contain', item)
            .and('contain', items[item].desc)
            .and('contain', items[item].price);
        });
    });

    it('removes all items from the cart', () => {
        const itemsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

        // ACT: Add multiple items to cart
        itemsToAdd.forEach(item => cy.addItemToCart(item));
        cy.visitCartPage();

        // Remove all items from cart
        cy.removeAllItemsFromCart();

        // ASSERT: Verify cart is empty
        cy.get(headerSelectors.shoppingCartBadge).should('not.exist');
        cy.get(cartSelectors.cartItem).should('not.exist');
    });
});