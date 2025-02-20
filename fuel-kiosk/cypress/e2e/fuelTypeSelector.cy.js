describe('Fuel Type Selector', () => {
    beforeEach(() => {
        // sign-in to page
        cy.request('POST', '/api/auth/login', {
            userId: 'CBARC-M',
            password: '5678'
        }).then((response) => {
                expect(response.status).to.eq(200);
        });

        cy.visit('/sites/CBARC-M');
    });

    it('displays all expected fuel type labels', () => {
        cy.contains('Select Fuel Type').should('be.visible');

        cy.contains('UNL').should('exist');
        cy.contains('DSL').should('exist');
        cy.contains('DSL OFF ROAD').should('exist');
        cy.contains('CLEAR GAS').should('exist');
    });
});
