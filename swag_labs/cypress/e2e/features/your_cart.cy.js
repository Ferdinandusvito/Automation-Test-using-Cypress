/// <reference types="cypress" />

describe('Shopping cart test',() =>{

    beforeEach(() =>{
        cy.visit('https://www.saucedemo.com/', {timeout: 10000})
        cy.url().should('include', 'saucedemo.com')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
    });

    it('Should increase the badge number of Your Cart', () => {
        cy.fixture('items').then((data) => {
            let itemCount = 0
            data.items.forEach((item, index) => {
                cy.get(`[data-test="${item.data}"]`).click()             
                itemCount++
                cy.get('[data-test="shopping-cart-badge"]').should('have.text', itemCount.toString())
            });
        });
    });

    it('Should decrease the badge number of Your Cart', () => {
        cy.fixture('items').then((data) => {
            data.items.forEach((item) => {
                cy.get(`[data-test="${item.data}"]`).click();
            })
            cy.get('[data-test="shopping-cart-badge"]').should('have.text', data.items.length.toString());

            data.items.forEach((item, index) => {
                cy.get(`[data-test="${item.remove}"]`).click();
                const remainingCount = data.items.length - (index + 1);
                if (remainingCount > 0) {
                    cy.get('[data-test="shopping-cart-badge"]').should('have.text', remainingCount.toString());
                } else {
                    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
                }
            });
        });
    });
})