/// <reference types="cypress" />

describe('Login test with fixture', function() {
    
    beforeEach(function() {
        cy.fixture('credentials').then((credentials) => {
            this.credentials = credentials
        });        
    });

    it('Should visit website', function() {
        cy.visit('https://www.saucedemo.com/', {timeout: 10000})
        cy.url().should('include', 'saucedemo.com')
    });

    it('Should be able login for user without problems', function() {
        this.credentials.users.forEach((user) =>{
        cy.visit('https://www.saucedemo.com/', {timeout: 10000})
            cy.get('#user-name').type(user.username)
            cy.get('#password').type(user.password)
            cy.get('#login-button').click()
            })
            cy.url().should('include', '/inventory.html')
            cy.get('.app_logo').contains('Swag Labs')
            cy.get('.shopping_cart_link').should('be.visible')
            cy.get('.title').contains('Products')
            cy.get('.inventory_item_label').should('be.visible')
            cy.get('.inventory_item_img').should('be.visible')
            cy.get('.pricebar').should('be.visible')
        });
});

