describe('Fuel Entry Form', () => {
    beforeEach(() => {
        // sign-in to page
        cy.request('POST', '/api/auth/login', {
            userId: 'CBARC-M',
            password: '5678'
        }).then((response) => {
                expect(response.status).to.eq(200);
        });

        cy.visit('/sites/CBARC-M');

        cy.contains('Select Fuel Type').should('be.visible');
        cy.contains('DSL').click();

        cy.contains('YES').click();

        cy.contains('Fuel Site Entry Log').should('be.visible');
    });

    it('allows the user to fill out and submit the fuel entry form', () => {
        cy.contains('label', 'EQ License or Desc.')
            .parent()
            .find('input')
            .clear()
            .type('License123');

        cy.contains('label', 'Name, initials, etc.')
            .parent()
            .find('input')
            .clear()
            .type('ABCD');

        cy.contains('label', 'Odometer (If Required)')
            .parent()
            .find('input')
            .clear()
            .type('12345');

        cy.contains('label', 'Gallons Pumped (xx.x)')
            .parent()
            .find('input')
            .clear()
            .type('12.3');

        cy.contains('label', 'Exp. Category: (Required)')
            .parent()
            .find('input')
            .click();
        cy.get('div[role="listbox"]').contains('Research').click();

        cy.contains('label', 'Project or Unit')
            .parent()
            .find('input')
            .clear()
            .type('ProjectX');

        cy.contains('label', 'EQ License or Desc.')
            .parent()
            .find('input')
            .should('have.value', 'License123');
        cy.contains('label', 'Name, initials, etc.')
            .parent()
            .find('input')
            .should('have.value', 'ABCD');
        cy.contains('label', 'Odometer (If Required)')
            .parent()
            .find('input')
            .should('have.value', '12345');
        cy.contains('label', 'Gallons Pumped (xx.x)')
            .parent()
            .find('input')
            .should('have.value', '12.3');
        cy.contains('label', 'Project or Unit')
            .parent()
            .find('input')
            .should('have.value', 'ProjectX');

        cy.contains('Submit').click();
        // TODO: Verify we get to 'Submission confirmed' page
    });
});
