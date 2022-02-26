# ebanx-api-test

### Principais tecnologias utilizadas:

* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [TypeDi](https://github.com/typestack/typedi)
* [Jest](https://jestjs.io/)
* [Routing-controllers](https://github.com/typestack/routing-controllers)

### Executando localmente:
- `npm install`
- `npm run dev`
### Executando testes:
- `npm run test`

### Funcionalidades:
* Depósito: Permite a inserção de dinheiro na conta do usuário
* Saque: Permite a retirada de dinheiro da conta do usuário
* Transferência: Permite que uma conta transfira uma quantia desejada para outras contas

### Exemplos de uso:
- Resetar as contas:
  - Requisição:
    ```http request
      curl --location --request POST 'localhost:3000/reset'
    ```
      
  - Retorno:
    ```OK```
- Depositar em uma conta:
  - Requisição:
    ```http request
    curl --location --request POST 'localhost:3000/event' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "type": "deposit",
    "amount": 60,
    "destination": "200"
    }'
    ```
  - Retorno:
    ```json
    {"destination": {"id": "200","balance": 60}}
    ```
- Visualizar Balanço:
  - Requisição:
    ```http request
    curl --location --request GET 'localhost:3000/balance?account_id=200' \
    --data-raw ''
    ```
  - Retorno:
    ```60```
- Saque em uma conta:
  - Requisição
    ```http request
       curl --location --request POST 'localhost:3000/event' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "type": "withdraw",
            "amount": 10,
            "origin": "200"
        }'
    ```
  
  - Retorno:
    ```json
     {"origin": { "id": "200","balance": 50}}
    ```
- Transferência entre contas:
  - Requisição:
    ```http request
    curl --location --request POST 'localhost:3000/event' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "type": "transfer",
        "amount": 10,
        "origin": "200",
        "destination": "300"
    }'
    ```
  - Retorno:
    ```json
    {
        "origin": {
            "id": "200",
            "balance": 40
        },
        "destination": {
            "id": "300",
            "balance": 10
        }
    }
    ```
