export class GaragePage {
  get addCarButton() {
    return cy.contains('button', 'Add car');
  }
  get brandSelect() {
    return cy.get('#addCarBrand');
  }
  get modelSelect() {
    return cy.get('#addCarModel');
  }
  get mileageInput() {
    return cy.get('#addCarMileage');
  }
  get submitAddCarButton() {
    return cy.get('.modal-footer .btn-primary');
  }
  get carItem() {
    return cy.get('.car-item');
  }

  addCar(brand, model, mileage) {
    this.addCarButton.click();
    this.brandSelect.select(brand);
    this.modelSelect.select(model);
    this.mileageInput.type(mileage);
    this.submitAddCarButton.click();
  }
}

export const garagePage = new GaragePage();