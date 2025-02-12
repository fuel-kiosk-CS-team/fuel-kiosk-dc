// cypress/e2e/totalizer.spec.js

describe('Fuel Kiosk Totalizer Verification Flow', () => {
    beforeEach(() => {
        // TODO: login functionality
        cy.visit('/sites/site-2');
    });

    it('navigates from fuel type selection to totalizer verification', () => {
        cy.contains('Select Fuel Type').should('be.visible');

        cy.contains('DSL').click();

        cy.contains('Verify Totalizer').should('be.visible');

        cy.contains('0.3').should('be.visible');
    });

    it('proceeds to fuel entry form when YES is clicked', () => {
        cy.contains('DSL').click();

        cy.contains('YES').click();

        cy.contains('Fuel Site Entry Log').should('be.visible');
    });

    it('alerts and stays on verification page when NO is clicked', () => {
        cy.contains('DSL').click();

        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        cy.contains('NO').click().then(() => {
            expect(alertStub).to.have.been.calledWith('Please contact administrator for assistance');
        });

        cy.contains('Verify Totalizer').should('be.visible');
    });

    it('returns to fuel type selection when BACK is clicked', () => {
        cy.contains('DSL').click();

        cy.contains('BACK').click();

        cy.contains('Select Fuel Type').should('be.visible');
    });
});