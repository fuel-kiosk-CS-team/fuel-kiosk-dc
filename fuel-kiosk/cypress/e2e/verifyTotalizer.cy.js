// cypress/e2e/totalizer.spec.js

describe('Fuel Kiosk Totalizer Verification Flow', () => {
  // Adjust the URL as needed. For example, if your page is at /sites/:siteId:
  beforeEach(() => {
    cy.visit('/sites/site-2');
  });

  it('navigates from fuel type selection to totalizer verification', () => {
    // Verify we're on the fuel type selection stage.
    cy.contains('Select Fuel Type').should('be.visible');

    // Click a fuel type (e.g., "DSL").
    cy.contains('DSL').click();

    // Verify that the totalizer verification stage is shown.
    // It might contain text like "Verify Totalizer" or "Verify Totalizer Start:"
    cy.contains('Verify Totalizer').should('be.visible');

    // Optionally, verify the totalizer value is shown (assuming default is "0.3")
    cy.contains('0.3').should('be.visible');
  });

  it('proceeds to fuel entry form when YES is clicked', () => {
    // Select a fuel type to reach totalizer verification stage.
    cy.contains('DSL').click();

    // Click the YES button.
    cy.contains('YES').click();

    // Verify that the fuel entry form is displayed.
    // For example, the fuel entry form might have a heading like "Fuel Site Entry Log".
    cy.contains('Fuel Site Entry Log').should('be.visible');
  });

  it('alerts and stays on verification page when NO is clicked', () => {
    // Select a fuel type to reach the verification stage.
    cy.contains('DSL').click();

    // Stub the window alert.
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    // Click the NO button.
    cy.contains('NO').click().then(() => {
      // Verify that the alert is shown with the expected message.
      expect(alertStub).to.have.been.calledWith('Please contact administrator for assistance');
    });

    // Verify that you remain on the totalizer verification stage.
    cy.contains('Verify Totalizer').should('be.visible');
  });

  it('returns to fuel type selection when BACK is clicked', () => {
    // Select a fuel type to reach verification stage.
    cy.contains('DSL').click();

    // Click the BACK button.
    cy.contains('BACK').click();

    // Verify that the fuel type selection stage is displayed again.
    cy.contains('Select Fuel Type').should('be.visible');
  });
});