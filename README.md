# Requisitos

- npm
- node.js

# Como iniciar o front-end

Após clonar o projeto basta executar o comando abaixo para instalar as dependências e iniciar o projeto:

```
npm install
npm start
```

Após executar este comando basta colar no navegador o link informado pelo terminal. Pode ser que ele informe que a porta 3000 já está ocupada pela API, e oferecerá para rodar em outra porta, aceite e continue.

# Sobre o sistema

## O que não mudou

As regras de negócio observadas na aplicação template (Rails) não foram alteradas, isto é, coisas como as listadas abaixo continuam em vigor no sistema: 

- apenas usuário admin poderá criar usuário
- após criar uma conta o usuário faz login nela automaticamente
- todos usuários podem criar filmes
- etc...

![use_case_diagram](https://github.com/samuelfilipefaria/desafio-full-stack-oxeanbits-front-end/assets/102987906/a3ce2c48-7f16-4c74-a1eb-87e6a1b1d750)

*Diagrama de casos de uso*

# Os desafios

Utilizei um script do próprio Kendo para gerar o projeto, sendo assim, já tive acesso logo de cara aos componentes. Apesar da marca d´água, a ferramenta pareceu ser muito boa e parece ser bem documentada, então não foi um grande desafio encontrar informações e componentes. A funcionalidade de filtro no grid foi relativamente fácil de implementar seguindo a documentação.

# Detalhes adicionais

- Utilizei a lib `axios` para fazer as requisições para a API
- Para os commits/branches utilizei a especificação "Conventional Commits" (https://www.conventionalcommits.org/en/v1.0.0-beta.4/#summary) com a ferramenta better-commits
