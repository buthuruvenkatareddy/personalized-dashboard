describe('Dashboard Page', () => {
  it('loads homepage and shows header', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Personalized News').should('exist');
  });

  it('can search for something', () => {
    cy.get('input[placeholder*="Search"]').type('AI');
  });

  it('can toggle dark mode', () => {
    cy.contains('Dark').click();
  });
});
