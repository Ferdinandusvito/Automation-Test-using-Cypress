/// <reference types="cypress" />

describe('Sorting feature test', function() {

    beforeEach(() =>{
        cy.visit('https://www.saucedemo.com/', {timeout: 10000})
        cy.url().should('include', 'saucedemo.com')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.fixture('items').as('itemData');
    });

    it('Should sort products by Name from A to Z', function() {
        cy.get('[data-test="product-sort-container"]').select('az')
        cy.get('.inventory_item_name').then(($names) => {
            const names = [...$names].map(el => el.innerText)
            const sortedNames = this.itemData.items.map(p => p.name).sort();
            expect(names).to.deep.equal(sortedNames)
        });
    });

    it('Should sort products by Name from Z to A', function() {
        cy.get('[data-test="product-sort-container"]').select('za')
        cy.get('.inventory_item_name').then(($names) => {
            const names = [...$names].map(el => el.innerText)
            const sortedNames = this.itemData.items.map(p => p.name).sort().reverse()
            expect(names).to.deep.equal(sortedNames)
        });
    });

    it('Should sort products by price from low to high', function() {
        cy.get('[data-test="product-sort-container"]').select('lohi')
        cy.get('.inventory_item_price').then(($prices) => {
            const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')))
            const sortedPrices = this.itemData.items.map(p => p.price).sort((a, b) => a - b)
            expect(prices).to.deep.equal(sortedPrices)
        });
    });

    it('Should sort products by price from high to low', function() {
        cy.get('[data-test="product-sort-container"]').select('hilo')
        cy.get('.inventory_item_price').then(($prices) => {
            const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')))
            const sortedPrices = this.itemData.items.map(p => p.price).sort((a, b) => b - a)
            expect(prices).to.deep.equal(sortedPrices)
        });
    });
});
