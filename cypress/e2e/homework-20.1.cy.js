describe('Registration form tests', () => {
  const user = {
    name: 'John',
    lastName: 'Doe',
    email: `aqa_${Date.now()}@test.com`,
    password: 'Password1',
  }

  const redBorderColor = 'rgb(220, 53, 69)'

  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/')
    cy.get('button.hero-descriptor_btn').contains('Sign up').click()
  })

  // --- UI & GENERAL TESTS (1-2) ---
  it('1. should display "Registration" header in the modal', () => {
    cy.get('.modal-title').should('have.text', 'Registration')
  })

  it('2. should have disabled "Register" button by default', () => {
    cy.get('.modal-footer .btn-primary').contains('Register').should('be.disabled')
  })

  // --- NAME FIELD VALIDATION (3-8) ---
  it('3. Name: should show error when field is empty', () => {
    cy.get('#signupName').focus().blur()
    cy.get('#signupName').parent().find('.invalid-feedback').should('have.text', 'Name required')
  })

  it('4. Name: should show red border when invalid', () => {
    cy.get('#signupName').focus().blur()
    cy.get('#signupName').should('have.css', 'border-color', redBorderColor)
  })

  it('5. Name: should show error when length is less than 2 characters', () => {
    cy.get('#signupName').type('A').blur()
    cy.get('#signupName').parent().find('.invalid-feedback')
      .should('have.text', 'Name has to be from 2 to 20 characters long')
  })

  it('6. Name: should show error when length is more than 20 characters', () => {
    cy.get('#signupName').type('A'.repeat(21)).blur()
    cy.get('#signupName').parent().find('.invalid-feedback')
      .should('have.text', 'Name has to be from 2 to 20 characters long')
  })

  it('7. Name: should show error when numbers or special characters are entered', () => {
    cy.get('#signupName').type('John123').blur()
    cy.get('#signupName').parent().find('.invalid-feedback').should('have.text', 'Name is invalid')
  })

  it('8. Name: should handle spaces input', () => {
    cy.get('#signupName').type('  John  ').blur()
    cy.get('#signupName').should('have.value', '  John  ')
  })

  // --- LAST NAME FIELD VALIDATION (9-14) ---
  it('9. Last Name: should show error when field is empty', () => {
    cy.get('#signupLastName').focus().blur()
    cy.get('#signupLastName').parent().find('.invalid-feedback').should('have.text', 'Last name required')
  })

  it('10. Last Name: should show red border when invalid', () => {
    cy.get('#signupLastName').focus().blur()
    cy.get('#signupLastName').should('have.css', 'border-color', redBorderColor)
  })

  it('11. Last Name: should show error when length is less than 2 characters', () => {
    cy.get('#signupLastName').type('D').blur()
    cy.get('#signupLastName').parent().find('.invalid-feedback')
      .should('have.text', 'Last name has to be from 2 to 20 characters long')
  })

  it('12. Last Name: should show error when length is more than 20 characters', () => {
    cy.get('#signupLastName').type('D'.repeat(21)).blur()
    cy.get('#signupLastName').parent().find('.invalid-feedback')
      .should('have.text', 'Last name has to be from 2 to 20 characters long')
  })

  it('13. Last Name: should show error when numbers or special characters are entered', () => {
    cy.get('#signupLastName').type('Doe!').blur()
    cy.get('#signupLastName').parent().find('.invalid-feedback').should('have.text', 'Last name is invalid')
  })

  it('14. Last Name: should handle spaces input', () => {
    cy.get('#signupLastName').type('  Doe  ').blur()
    cy.get('#signupLastName').should('have.value', '  Doe  ')
  })

  // --- EMAIL FIELD VALIDATION (15-20) ---
  it('15. Email: should show error when field is empty', () => {
    cy.get('#signupEmail').focus().blur()
    cy.get('#signupEmail').parent().find('.invalid-feedback').should('have.text', 'Email required')
  })

  it('16. Email: should show red border when invalid', () => {
    cy.get('#signupEmail').focus().blur()
    cy.get('#signupEmail').should('have.css', 'border-color', redBorderColor)
  })

  it('17. Email: should show error for missing @ symbol', () => {
    cy.get('#signupEmail').type('testemail.com').blur()
    cy.get('#signupEmail').parent().find('.invalid-feedback').should('have.text', 'Email is incorrect')
  })

  it('18. Email: should show error for missing domain part', () => {
    cy.get('#signupEmail').type('test@').blur()
    cy.get('#signupEmail').parent().find('.invalid-feedback').should('have.text', 'Email is incorrect')
  })

  it('19. Email: should show error for missing TLD (.com, .org)', () => {
    cy.get('#signupEmail').type('test@domain').blur()
    cy.get('#signupEmail').parent().find('.invalid-feedback').should('have.text', 'Email is incorrect')
  })

  it('20. Email: should accept valid email format', () => {
    cy.get('#signupEmail').type('valid.email@example.com').blur()
    cy.get('#signupEmail').parent().find('.invalid-feedback').should('not.exist')
  })

  // --- PASSWORD FIELD VALIDATION (21-26) ---
  it('21. Password: should show error when field is empty', () => {
    cy.get('#signupPassword').focus().blur()
    cy.get('#signupPassword').parent().find('.invalid-feedback').should('have.text', 'Password required')
  })

  it('22. Password: should show red border when invalid', () => {
    cy.get('#signupPassword').focus().blur()
    cy.get('#signupPassword').should('have.css', 'border-color', redBorderColor)
  })

  it('23. Password: should show error when shorter than 8 characters', () => {
    cy.get('#signupPassword').type('Pass1', { sensitive: true }).blur()
    cy.get('#signupPassword').parent().find('.invalid-feedback')
      .should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
  })

  it('24. Password: should show error when longer than 15 characters', () => {
    cy.get('#signupPassword').type('Password123456789', { sensitive: true }).blur()
    cy.get('#signupPassword').parent().find('.invalid-feedback')
      .should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
  })

  it('25. Password: should show error when missing a capital letter', () => {
    cy.get('#signupPassword').type('password1', { sensitive: true }).blur()
    cy.get('#signupPassword').parent().find('.invalid-feedback')
      .should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
  })

  it('26. Password: should show error when missing a number', () => {
    cy.get('#signupPassword').type('Password', { sensitive: true }).blur()
    cy.get('#signupPassword').parent().find('.invalid-feedback')
      .should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
  })

  // --- REPEAT PASSWORD FIELD VALIDATION (27-30) ---
  it('27. Repeat Password: should show error when field is empty', () => {
    cy.get('#signupRepeatPassword').focus().blur()
    cy.get('#signupRepeatPassword').parent().find('.invalid-feedback').should('have.text', 'Re-enter password required')
  })

  it('28. Repeat Password: should show red border when invalid', () => {
    cy.get('#signupRepeatPassword').focus().blur()
    cy.get('#signupRepeatPassword').should('have.css', 'border-color', redBorderColor)
  })

  it('29. Repeat Password: should show error when passwords do not match', () => {
    cy.get('#signupPassword').type('Password1', { sensitive: true })
    cy.get('#signupRepeatPassword').type('Password2', { sensitive: true }).blur()
    cy.get('#signupRepeatPassword').parent().find('.invalid-feedback').should('have.text', 'Passwords do not match')
  })

  it('30. Repeat Password: should enable Register button when all fields are valid', () => {
    cy.get('#signupName').type(user.name)
    cy.get('#signupLastName').type(user.lastName)
    cy.get('#signupEmail').type(user.email)
    cy.get('#signupPassword').type(user.password, { sensitive: true })
    cy.get('#signupRepeatPassword').type(user.password, { sensitive: true })

    cy.get('.modal-footer .btn-primary').contains('Register').should('not.be.disabled')
  })

  // --- REGISTRATION & LOGIN FLOW (31-32) ---
  it('31. E2E: should successfully register a new user', () => {
    cy.get('#signupName').type(user.name)
    cy.get('#signupLastName').type(user.lastName)
    cy.get('#signupEmail').type(user.email)
    cy.get('#signupPassword').type(user.password, { sensitive: true })
    cy.get('#signupRepeatPassword').type(user.password, { sensitive: true })
    cy.get('.modal-footer .btn-primary').contains('Register').click()

    cy.url().should('include', '/panel/garage')
  })

  it('32. E2E: should successfully login using custom cy.login() command', () => {
    // Authenticate using user credentials created in Test #31
    cy.login(user.email, user.password)
    cy.url().should('include', '/panel/garage')
  })
})