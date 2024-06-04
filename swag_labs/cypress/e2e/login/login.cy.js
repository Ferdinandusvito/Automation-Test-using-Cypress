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
        });
});

