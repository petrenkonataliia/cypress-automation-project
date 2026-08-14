import { garagePage } from '../pages/GaragePage';

describe('Car Creation Interception & Fuel Expenses API/UI Flow', () => {
  const carData = {
    brand: 'Audi',
    model: 'TT',
    mileage: 15000
  };

  const expenseData = {
    mileage: 15500,
    liters: 45,
    totalCost: 90
  };

  beforeEach(() => {
    cy.visit('/');
    cy.get('button.header_signin').click();
    cy.get('#signinEmail').type(Cypress.env('userEmail'));
    cy.get('#signinPassword').type(Cypress.env('userPassword'));
    cy.get('.modal-content .btn-primary').contains('Login').click();
    cy.url().should('include', '/panel/garage');
  });

  it('should intercept car creation response, save carId, and validate list via API', () => {
    // 1. Setup intercept matching exact API path
    cy.intercept('POST', '**/api/cars').as('createCar');

    // 2. Add car via UI
    garagePage.addCar(carData.brand, carData.model, carData.mileage.toString());

    // 3. Wait for intercept and capture ID (POST /api/cars returns HTTP 201)
    cy.wait('@createCar').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      
      const carId = interception.response.body.data.id;
      expect(carId).to.exist;

      // Save carId globally across Cypress test execution context
      Cypress.env('createdCarId', carId);

      // 4. Query GET /api/cars (cy.request uses .status)
      cy.request({
        method: 'GET',
        url: 'https://qauto.forstudy.space/api/cars',
        headers: {
          accept: 'application/json'
        }
      }).then((res) => {
        expect(res.status).to.eq(200);
        const carList = res.body.data;
        const foundCar = carList.find((car) => car.id === carId);

        expect(foundCar).to.exist;
        expect(foundCar.brand).to.eq(carData.brand);
        expect(foundCar.model).to.eq(carData.model);
      });
    });
  });

  it('should create an expense via API custom command and validate response body', () => {
    const carId = Cypress.env('createdCarId');
    expect(carId, 'Car ID persisted from Test 1').to.exist;

    cy.createExpenseViaApi(
      carId,
      expenseData.mileage,
      expenseData.liters,
      expenseData.totalCost
    ).then((response) => {
      // Accepts both 200 OK or 201 Created depending on backend implementation
      expect([200, 201]).to.include(response.status);

      const responseData = response.body.data;
      expect(responseData.carId).to.eq(carId);
      expect(responseData.mileage).to.eq(expenseData.mileage);
      expect(responseData.liters).to.eq(expenseData.liters);
      expect(responseData.totalCost).to.eq(expenseData.totalCost);
    });
  });

  it('should find created expense in UI for the created car', () => {
    cy.contains('a', 'Fuel expenses').click();
    cy.url().should('include', '/panel/expenses');

    // Handle dropdown selection for created car
    const targetCar = `${carData.brand} ${carData.model}`;
    cy.get('#carSelectDropdown').then(($dropdown) => {
      if (!$dropdown.text().includes(targetCar)) {
        cy.wrap($dropdown).click();
        cy.get('.dropdown-menu .dropdown-item')
          .contains(targetCar)
          .click({ force: true });
      }
    });

    // Assert table content matches created expense
    cy.get('table.table').should('be.visible');
    cy.get('tbody tr').first().within(() => {
      cy.get('td').eq(1).should('contain.text', expenseData.mileage.toString());
      cy.get('td').eq(2).should('contain.text', `${expenseData.liters}L`);
      cy.get('td').eq(3).should('contain.text', `${expenseData.totalCost}.00 USD`);
    });
  });
});