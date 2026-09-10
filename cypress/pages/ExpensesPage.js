export class ExpensesPage {
  // --- Element Selectors ---
  get addExpenseButton() {
  return cy.contains('button.btn-primary', 'Add an expense');
}

  get vehicleSelect() {
    return cy.get('#addExpenseCar');
  }

  get mileageInput() {
    return cy.get('#addExpenseMileage');
  }

  get litersInput() {
    return cy.get('#addExpenseLiters');
  }

  get totalCostInput() {
    return cy.get('#addExpenseTotalCost');
  }

  get submitButton() {
    return cy.get('.modal-footer .btn-primary');
  }

  // --- Actions ---
  openAddExpenseModal() {
    this.addExpenseButton.click();
  }

  /**
   * Selects a car from the dropdown safely.
   * Accepts either a string (car name) or a number (zero-based index).
   */
  selectCar(carNameOrIndex) {
    if (typeof carNameOrIndex === 'number') {
      // Select by index position
      this.vehicleSelect.find('option').eq(carNameOrIndex).then(($option) => {
        this.vehicleSelect.select($option.val());
      });
    } else {
      // Find the first matching option by visible text and select its value
      this.vehicleSelect
        .contains('option', carNameOrIndex)
        .first()
        .then(($option) => {
          this.vehicleSelect.select($option.val());
        });
    }
  }

  /**
   * Fills out and submits the fuel expense form.
   * @param {string|number} carIdentifier - The visible name of the car or index (0-based)
   * @param {string} mileage 
   * @param {string} liters 
   * @param {string} totalCost 
   */
  addFuelExpense(carIdentifier, mileage, liters, totalCost) {
    this.openAddExpenseModal();
    
    this.selectCar(carIdentifier);

    this.mileageInput.clear().type(mileage);
    this.litersInput.clear().type(liters);
    this.totalCostInput.clear().type(totalCost);

    this.submitButton.click();
  }
}

export const expensesPage = new ExpensesPage();