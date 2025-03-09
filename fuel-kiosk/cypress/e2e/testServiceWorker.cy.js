describe('Fuel Entry Form (PWA Tests)', () => {
  beforeEach(() => {
    // 1. Sign in
    cy.request('POST', '/api/auth/login', {
      userId: 'CBARC-M',
      password: '5678'
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

    // Visit page
    cy.visit('/sites/CBARC-M');

    // Basic flow to confirm page loads
    cy.contains('Select Fuel Type').should('be.visible');
    cy.contains('DSL').click();
    cy.contains('YES').click();
    cy.contains('Fuel Site Entry Log').should('be.visible');
  });

  it('should register the service worker', () => {
    // Check that the Service Worker API is available
    cy.window().then((win) => {
      expect(win.navigator.serviceWorker).to.exist;
    });

    // Confirm that at least one service worker is registered
    cy.window()
      .then((win) => win.navigator.serviceWorker.getRegistrations())
      .should('have.length.greaterThan', 0);
  });

});
