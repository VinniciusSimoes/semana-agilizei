#language: pt
Funcionalidade: Listagem

    Como usuario, desejo acessar a Listagem
    Para que eu possa visualizar meus dados de cadastro

Cenario: Listagem sem registros

Dado que o site não possui registros
Quando acessa a listagem
Entao devo visualizar a listagem vazia

Cenario: Listagem com apenas um registro

Dado que o site possui apenas um registro
Quando acessa a listagem
Entao devo visualizar a listagem com apenas um registro