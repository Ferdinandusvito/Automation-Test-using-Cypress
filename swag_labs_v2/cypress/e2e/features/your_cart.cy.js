/// <reference types="cypress" />

describe('Your Cart Feature Test', function() {
    
    beforeEach(function() {
        cy.visit('https://www.saucedemo.com/', {timeout: 10000})
        cy.url().should('include', 'saucedemo.com')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        });        

    it('Should visit Your Cart page', function() {
        cy.get('.shopping_cart_link').click()
        cy.url().should('include', 'cart.html')
        cy.get('.app_logo').contains('Swag Labs')
            cy.get('.shopping_cart_link').should('be.visible')
            cy.get('.title').contains('Your Cart')
            cy.get('.cart_list').should('be.visible')
            cy.get('#continue-shopping').contains('Continue Shopping').should('be.visible')
            cy.get('#checkout').contains('Checkout').should('be.visible')
    });

    it('Should display selected items', function() {
        cy.fixture('items').then((data) => {
            data.items.forEach((item) => {
                cy.get(`[data-test="${item.data}"]`).click()
            })
            cy.fixture('items').then((data) => {
                data.items.forEach((item) => {
                    cy.get('.shopping_cart_link').click()
                cy.contains('.inventory_item_name', item.name).should('exist')
                })
        });    
    });
    });

    it('Should remove selected items', function() {
        cy.fixture('items').then((data) => {
            data.items.forEach((item) => {
                cy.get(`[data-test="${item.data}"]`).click()
            })
            cy.get('.shopping_cart_link').click()
            data.items.forEach((item) => {
                cy.get(`[data-test="${item.remove}"]`).click();
            cy.contains('.inventory_item_name', item.name).should('not.exist')
            })
    });
    });

    it('Should visit product list page', () => {
        cy.get('#continue-shopping').click()
        cy.url().should('include', 'inventory.html')
    });
});
