// steps ou pasos comuns a mais de uma feature

Given(/^que acesso o site$/, () => {
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
});
