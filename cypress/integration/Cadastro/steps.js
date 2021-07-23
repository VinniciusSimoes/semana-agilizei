 // implemantação dos passos descritos na features

/// <reference types="cypress" />

// Load Chance
let Chance = require('chance');

// Instantiate Chance so it can be used
let chance = new Chance();
 

When(/^informar meus dados$/, () => {
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
});

When(/^salvar$/, () => {
    // click
    cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
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

