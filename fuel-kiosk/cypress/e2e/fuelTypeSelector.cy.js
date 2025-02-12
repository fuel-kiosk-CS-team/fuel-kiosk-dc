describe('Fuel Type Selector', () => {
    beforeEach(() => {
        // TODO: login functionality
        cy.visit('/sites/site-2');
    });

    it('displays all expected fuel type labels', () => {
        cy.contains('Select Fuel Type').should('be.visible');

        cy.contains('UNL').should('exist');
        cy.contains('DSL').should('exist');
        cy.contains('DSL OFF ROAD').should('exist');
        cy.contains('CLEAR GAS').should('exist');
    });
});
