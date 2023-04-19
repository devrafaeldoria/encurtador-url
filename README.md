# Encurtador de URL com Node.js, TypeScript e MongoDB

- Deploy - Em andamento!
- Documentação - [Clique Aqui!](./github/doc.md)

### Este é um projeto de encurtador de URL que utiliza as seguintes tecnologias

- Node.js
- TypeScript
- MongoDB
- Express
- UUID
- Bcrypt
- JWT

## Funcionalidades

O projeto permite que um usuário encurte uma URL longa para uma URL curta e salve essa informação no banco de dados. Além disso, o usuário pode acessar a URL curta e ser redirecionado para a URL longa correspondente.

## Como utilizar

Antes de iniciar o projeto, é necessário ter o Node.js instalado em sua máquina. Além disso, você deve ter acesso a um banco de dados MongoDB.

Para instalar as dependências do projeto, execute o seguinte comando:

```
  npm install
```

Em seguida, você deve criar um arquivo .env na raiz do projeto com as seguintes informações:

```
  MONGO_URL=<url-do-seu-banco-de-dados>
  MONGO_URL_TEST=<url-do-seu-banco-de-dados-para-teste>
  JWT_SECRET_KEY=<segredo-para-gerar-token-jwt>
```

Agora você pode iniciar o projeto com o seguinte comando:

```
  npm run start-dev
```

## Testes

O projeto foi desenvolvido utilizando a metodologia TDD (Test Driven Development). Para executar os testes, utilize o seguinte comando:

```
npm test-watch
```

## Considerações finais

Em conclusão, este projeto de encurtador de URL é uma demonstração de como utilizar as tecnologias Node.js, TypeScript, MongoDB, Express, UUID, Bcrypt e JWT para criar uma aplicação funcional e segura.

Este projeto pode ser utilizado como base para construir sistemas mais complexos e sofisticados. Por isso, sinta-se à vontade para explorar o código-fonte, fazer alterações e criar novas funcionalidades.

Se tiver alguma dúvida ou sugestão, fique à vontade para entrar em contato ou abrir uma issue no repositório. Obrigado por utilizar este projeto!
