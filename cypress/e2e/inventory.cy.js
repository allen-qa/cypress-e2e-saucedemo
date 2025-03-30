// inventory.cy.js
// @ts-nocheck
import { headerSelectors, inventorySelectors, loginSelectors } from "../support/selectors";
import { users } from "../fixtures/users";

const sortingOptions = {
    nameAZ: 'Name (A to Z)',
    nameZA: 'Name (Z to A)',
    priceLowHigh: 'Price (low to high)',
    priceHighLow: 'Price (high to low)'
};

const sortingUtils = {
    sortProductsBy: (sortOption) => {
        cy.get(inventorySelectors.sortDropdown).select(sortOption);
    },

    verifyProductOrder: (expectedItems) => {
        cy.get(inventorySelectors.inventoryItemName)
            .should('have.length', expectedItems.length)
            .then(($items) => {
                const actualItems = Cypress._.map($items, 'innerText');
                expect(actualItems).to.deep.equal(expectedItems);
            });
    },

    verifyPriceOrder: (expectedPrices) => {
        cy.get(inventorySelectors.inventoryItemPrice)
            .should('have.length', expectedPrices.length)
            .then(($prices) => {
                const priceTexts = Cypress._.map($prices, 'innerText');
                const actualPrices = priceTexts.map(text => {
                    const priceValue = parseFloat(text.replace('$', ''));
                    if (isNaN(priceValue)) {
                        throw new Error(`Failed to parse price from: "${text}"`);
                    }
                    return priceValue;
                });
                expect(actualPrices).to.deep.equal(expectedPrices);
            });
    }
};

describe('SauceDemo Inventory Tests', () => {
    beforeEach(() => {
        // Login before each test
        cy.login(users.standard.username, users.standard.password);
    });

    it('displays correct inventory page elements', () => {
        cy.get(inventorySelectors.title).should('contain', 'Products'); // Verify title
        cy.get(inventorySelectors.inventoryList).should('be.visible'); // Verify product list exists
        cy.get(inventorySelectors.inventoryItem).should('have.length.gt', 0); // Verify at least one product item exists
        cy.get(headerSelectors.cartIcon).should('be.visible'); // Verify cart icon exists
    });

    it('correctly sorts products by Name (A to Z)', () => {
        // ACT: Sort products by Name (A to Z)
        sortingUtils.sortProductsBy(sortingOptions.nameAZ);

        // ASSERT: Verify product order
        sortingUtils.verifyProductOrder([
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Onesie',
            'Test.allTheThings() T-Shirt (Red)'
        ]);
    });

    it('correctly sorts products by Name (Z to A)', () => {
        // ACT: Sort products by Name (Z to A)
        sortingUtils.sortProductsBy(sortingOptions.nameZA);

        // ASSERT: Verify product order
        sortingUtils.verifyProductOrder([
            'Test.allTheThings() T-Shirt (Red)',
            'Sauce Labs Onesie',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Bike Light',
            'Sauce Labs Backpack'
        ]);
    });

    it('correctly sorts products by Price (low to high)', () => {
        // ACT: Sort products by Price (low to high)
        sortingUtils.sortProductsBy(sortingOptions.priceLowHigh);

        // ASSERT: Verify product order
        sortingUtils.verifyPriceOrder([7.99, 9.99, 15.99, 15.99, 29.99, 49.99]);
    });

    it('correctly sorts products by Price (high to low)', () => {
        // ACT: Sort products by Price (high to low)
        sortingUtils.sortProductsBy(sortingOptions.priceHighLow);

        // ASSERT: Verify product order
        sortingUtils.verifyPriceOrder([49.99, 29.99, 15.99, 15.99, 9.99, 7.99]);
    });
});
