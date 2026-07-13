describe('Qauto Application - Header and Footer Elements', () => {
  
  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
  });

  it('find all header elements', () => {
    cy.get('header').within(() => {
      cy.get('.header_logo').should('be.visible');
      cy.get('.btn.header-link').should('be.visible');
      // cy.get('button')
      cy.contains('Home').should('be.visible');
      cy.contains('About').should('be.visible');
      cy.contains('Contacts').should('be.visible');
      cy.contains('Guest log in').should('be.visible');
      cy.contains('Sign In').should('be.visible');
});
  });

  it('find all footer social links and contacts', () => {
    cy.get('#contactsSection').within(() => {
      cy.get('a[href*="facebook"]').should('be.visible');
      cy.get('a[href*="t.me"]').should('be.visible');
      cy.get('a[href*="youtube"]').should('be.visible');
      cy.get('a[href*="instagram"]').should('be.visible');
      cy.get('a[href*="linkedin"]').should('be.visible');
      cy.contains('a', 'ithillel.ua').should('be.visible');
      cy.contains('a', 'support@ithillel.ua').should('be.visible');
    });
  });

}); 