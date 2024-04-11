describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should successfully log in with valid credentials', () => {
      cy.get('#username').type('abdo');
      cy.get('#password').type('123');
  

      cy.get('#onSubmit').click();
  
      cy.url().should('include', '/home');
    });
  
    it('should display an error message for invalid credentials', () => {
 
      cy.get('#username').type('invalid');
      cy.get('#password').type('999');
  

      cy.get('#onSubmit').click();
  
  
      cy.get('.error-message').should('be.visible');
    });
  });
  
  