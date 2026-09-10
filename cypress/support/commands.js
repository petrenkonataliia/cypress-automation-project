Cypress.Commands.add('createExpenseViaApi', (carId, mileage, liters, totalCost, reportedAt = new Date().toISOString().split('T')[0]) => {
  return cy.request({
    method: 'POST',
    url: 'https://qauto.forstudy.space/api/expenses',
    headers: {
      accept: 'application/json'
    },
    body: {
      carId: carId,
      reportedAt: reportedAt,
      mileage: mileage,
      liters: liters,
      totalCost: totalCost,
      forceMileage: false
    }
  });
});