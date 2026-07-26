// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Overwrite the default 'type' command to mask sensitive input data
// Overwrite the default 'type' command to mask sensitive input data in logs
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  }

  return originalFn(element, text, options)
})

// Custom command to perform user login via UI
Cypress.Commands.add('login', (email, password) => {
  // If Registration modal is open from beforeEach, close it first
  cy.get('body').then(($body) => {
    if ($body.find('.modal-header .close').length > 0) {
      cy.get('.modal-header .close').click()
    }
  })

  // Open Log in modal
  cy.get('.header_signin').click()

  // Fill in login credentials
  cy.get('#signinEmail').type(email)
  cy.get('#signinPassword').type(password, { sensitive: true })

  // Submit login form
  cy.get('.modal-footer .btn-primary').contains('Login').click()
})
