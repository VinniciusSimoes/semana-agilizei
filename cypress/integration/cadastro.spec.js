/// <reference types="cypress" />

// Load Chance
let Chance = require('chance');

// Instantiate Chance so it can be used
let chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {


// rotas com mocks. 
// Necessário por enquanto, dado que a aplicação demoautomation está instável

        cy.server()
        cy.route({
        method: 'POST',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: {}
        }).as('postNewtable');

        cy.route({
            method: 'POST', 
            url: '**/api/1/databases/userdetails/collections/usertable?**', 
            status: 200, 
            response: {}
        }).as('postUsertable');

        cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: [{
          "_id": {
              "$oid": "52d5ef25940e46fc986b52e855a1b6d4"
          },
          "FirstName": "TesteFirst",
          "LastName": "TesteLast",
          "Email": "teste@email.com",
          "Phone": "1111111111",
          "Gender": "Male"
      }]
        }).as('getNewtable');

        //Base URL + Register.html
        cy.visit('Register.html');

        // type
        cy.get('input[placeholder="First Name"]').type(chance.first());
        cy.get('input[ng-model^=Last]').type(chance.last());
        cy.get('input[ng-model^=Email]').type(chance.email());
        cy.get('input[ng-model^=Phone]').type(chance.phone({ formatted:false }));

        // check --> radio's ou checkbox
        cy.get('input[value=FeMale]').check();
        cy.get('input[type=checkbox]').check('Cricket');
        cy.get('input[type=checkbox]').check('Hockey');

        // select --> select & select2(combos)

        cy.get('select#Skills').select('Javascript');
        cy.get('select#countries').select('Argentina');
        cy.get('select#country').select('Australia', {force:true});
        cy.get('select#yearbox').select('1999');
        cy.get('select[ng-model^= month]').select('January');
        cy.get('select#daybox').select('2');

        // input --> password
        cy.get('input#firstpassword').type('Agilizei@2020');
        cy.get('input#secondpassword').type('Agilizei@2020');


        // attachfile ->  upload file
        cy.get('input#imagesrc').attachFile('imagem-foto.png');
        
        // click
        cy.get('button#submitbtn').click();

        cy.wait('@postNewtable').then((resNewtable) => {
            // com o serve / route
            expect(resNewtable.status).to.eq(200)
          })
      
          cy.wait('@postUsertable').then((resUsertable) => {
            // com o server / route
            expect(resUsertable.status).to.eq(200)
          })
      
          cy.wait('@getNewtable').then((resNewtable) => {
            // com o server / route
            expect(resNewtable.status).to.eq(200)
          })

        cy.url().should('contain', 'WebTable');


    });
});

// Elementos
// input[placeholder="First Name"]
// Last Name
// input[ng-model^=Last]
// input[ng-model^=Email]
// input[ng-model^=Phone]
// input[value = FeMale] 
// input[type = checkbox] 
// select#Skills
// select#countries Argentina
// select#country
// select#yearbox
// select[ng-model^= month]
// select#daybox
// input#firstpassword
// input#secondpassword

