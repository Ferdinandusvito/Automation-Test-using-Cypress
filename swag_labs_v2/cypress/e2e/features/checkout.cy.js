/// <reference types="cypress" />

describe('Your Cart Feature Test', function() {
    
    beforeEach(function() {
        cy.visit('https://www.saucedemo.com/', {timeout: 10000})
        cy.url().should('include', 'saucedemo.com')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.get('.shopping_cart_link').click()
        cy.get('#checkout').click()
        cy.url().should('include', 'checkout-step-one.html')
        });        

    it('Should visit Checkout Information page', function() {
        cy.get('.app_logo').contains('Swag Labs')
            cy.get('.shopping_cart_link').should('be.visible')
            cy.get('.title').contains('Checkout: Your Information')
            cy.get('#first-name').should('be.visible')
            cy.get('#last-name').should('be.visible')
            cy.get('#postal-code').should('be.visible')
            cy.get('#cancel').contains('Cancel').should('be.visible')
            cy.get('#continue').contains('Continue').should('be.visible')
    });

    it('Should not be able to continue', function() {
        cy.get('#continue').click()
        cy.get('.error-message-container error').should('have.text', 'Error: First Name is required')
    });

    it('Should not be able to continue without input last name', function() {
        cy.get('#first-name').type('vito')
        cy.get('#postal-code').type(50552)
        cy.get('#continue').click()
        cy.get('.error-message-container error').should('have.text', 'Error: Last Name is required')
    });

    it('Should not be able to continue without input postal code', function() {
        cy.get('#first-name').type('vito')
        cy.get('#last-name').type('janu')
        cy.get('#continue').click()
        cy.get('.error-message-container error').should('have.text', 'Error: Postal Code is required')
    });

    it('Should be able to continue', function() {
        cy.get('#first-name').type('vito')
        cy.get('#last-name').type('janu')
        cy.get('#postal-code').type(50552)
        cy.get('#continue').click()
        cy.url().should('include', 'checkout-step-two.html')
        cy.get('.app_logo').contains('Swag Labs')
        cy.get('.shopping_cart_link').should('be.visible')
        cy.get('.title').contains('Checkout: Overview')
        cy.get('.cart_list').should('be.visible')
        cy.get('.summary_info').should('be.visible')
        cy.get('#cancel').should('be.visible')
        cy.get('#finish').should('be.visible')
    });

    it('Should be able to visit checkout complete page', function() {
        cy.get('#first-name').type('vito')
        cy.get('#last-name').type('janu')
        cy.get('#postal-code').type(50552)
        cy.get('#continue').click()
        cy.get('#finish').click()
        cy.url().should('include', 'checkout-complete.html')
        cy.get('.app_logo').contains('Swag Labs')
        cy.get('.shopping_cart_link').should('be.visible')
        cy.get('.title').contains('Checkout: Complete!')
        cy.get('#checkout_complete_container').should('be.visible')
        cy.get('#back-to-products').should('be.visible')
    });
});
