/// <reference types="cypress" />

describe('Inventory page test',() =>{

    beforeEach(() =>{
        cy.visit('https://www.saucedemo.com/', {timeout: 10000})
        cy.url().should('include', 'saucedemo.com')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
    });

    it('Should display items', () => {
        cy.get('#react-burger-menu-btn').click()
        cy.get('#inventory_sidebar_link').click()
        cy.url().should('include', '/inventory.html')
    });

    it('Should be back to login page', () => {
        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').click()
        cy.url().should('include', 'saucedemo.com')
    });

    it('Should display about page', () => {
        cy.get('#react-burger-menu-btn').click()
        cy.get('#about_sidebar_link').click()
        cy.visit('https://saucelabs.com/')
    });
});