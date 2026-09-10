import { garagePage } from '../pages/GaragePage';
import { expensesPage } from '../pages/ExpensesPage';

describe('Garage and Fuel Expenses E2E Flow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.header_signin').click();
    cy.get('#signinEmail').type(Cypress.env('userEmail'));
    cy.get('#signinPassword').type(Cypress.env('userPassword'));
    cy.get('.modal-content .btn-primary').contains('Login').click();
    cy.url().should('include', '/panel/garage');
  });

  it('should successfully add a car in Garage', () => {
    garagePage.addCar('BMW', 'X5', '12000');
    garagePage.carItem.first().should('contain.text', 'BMW X5');
  });

  it('should successfully add a fuel expense for the created car', () => {
  // 1. Add car and explicitly wait for it to render in the garage DOM
  garagePage.addCar('BMW', 'X5', '12000');
  garagePage.carItem.first().should('be.visible').and('contain.text', 'BMW X5');

  // 2. Navigate to Fuel Expenses
  cy.contains('a', 'Fuel expenses').click();
  cy.url().should('include', '/panel/expenses');

  // 3. Ensure the 'Add an expense' button becomes enabled before clicking
  expensesPage.addExpenseButton.should('not.be.disabled');

  // 4. Proceed with adding expense
  expensesPage.addFuelExpense('BMW X5', '12500', '50', '100');

  // 5. Assert table record
  cy.get('table.table').should('be.visible');
  cy.get('tbody tr').first().should('contain.text', '12500');
});
});