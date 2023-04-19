# Endpoints

## POST /user

O endpoint /user é responsável por autenticar um usuário no sistema. Para isso, o endpoint recebe o email e a senha do usuário na requisição POST, e salva um token JWT para autenticação em outros endpoints.

### Parâmetros

email: email do usuario cadastrado no sistema.
password: senha do usuario cadastrado no sistema

#### Exemplos

```
{
    "email": "new@email.com",
    "password": "123"
}
```

### Respostas

OK ! 200 <br>
Caso essa resposta aconteça, vai autenticar o usuário no sistema

Exemplo de resposta:

```
{
    "login": true,
    "token": "token-criado"
}
```

Password is not correct ! 404
Caso essa resposta aconteça, significa que a autenticação não foi concluida devido a senha estar incorreta

Exemplo de resposta:
