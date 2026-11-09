# Restaurant API

API para gerenciar os pedidos das mesas de um restaurante. Permite cadastrar produtos, abrir e fechar a sessão de uma mesa, registrar pedidos e consultar o total da conta.

## Tecnologias

- Node.js
- Express
- TypeScript
- Knex (query builder e migrations)
- SQLite
- Zod (validação de dados)
- tsx (execução do TypeScript em desenvolvimento)

## Pré-requisitos

- Node.js instalado (versão LTS recomendada)
- npm

## Como executar

1. Clone o repositório e entre na pasta do projeto:

```bash
git clone <url-do-repositorio>
cd restaurant-api
```

2. Instale as dependências:

```bash
npm install
```

3. Crie a estrutura do banco de dados executando as migrations:

```bash
npm run knex -- migrate:latest
```

4. Popule o banco com produtos e mesas de exemplo:

```bash
npm run knex -- seed:run
```

5. Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor ficará disponível em `http://localhost:3333`.

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor com recarregamento automático |
| `npm run knex -- <comando>` | Executa comandos do Knex (migrations e seeds) |

Comandos úteis do Knex:

```bash
npm run knex -- migrate:make nome-da-migration   # cria uma nova migration
npm run knex -- migrate:latest                   # aplica as migrations pendentes
npm run knex -- migrate:rollback                 # desfaz a última leva de migrations
npm run knex -- seed:run                         # executa os seeds
```

## Endpoints

### Products

| Método | Rota | Descrição |
|---|---|---|
| GET | `/products` | Lista os produtos (aceita o filtro `?name=`) |
| POST | `/products` | Cria um produto |
| PUT | `/products/:id` | Atualiza um produto |
| DELETE | `/products/:id` | Remove um produto |

Exemplo de corpo para criar ou atualizar:

```json
{
  "name": "Sorvete de chocolate",
  "price": 15
}
```

### Tables

| Método | Rota | Descrição |
|---|---|---|
| GET | `/tables` | Lista as mesas |

### Tables Sessions

Uma sessão representa o período em que uma mesa está ocupada.

| Método | Rota | Descrição |
|---|---|---|
| POST | `/tables-sessions` | Abre uma sessão para uma mesa |
| GET | `/tables-sessions` | Lista as sessões |
| PATCH | `/tables-sessions/:id` | Fecha a sessão |

Exemplo de corpo para abrir uma sessão:

```json
{
  "table_id": 4
}
```

### Orders

| Método | Rota | Descrição |
|---|---|---|
| POST | `/orders` | Registra um pedido em uma sessão |
| GET | `/orders/table-session/:table_session_id` | Lista os pedidos de uma sessão |
| GET | `/orders/table-session/:table_session_id/total` | Retorna o total da conta de uma sessão |

Exemplo de corpo para criar um pedido:

```json
{
  "table_session_id": 4,
  "product_id": 34,
  "quantity": 2
}
```

## Estrutura do projeto

```
docs/                Collection do Insomnia
src/
  controllers/       Lógica de cada rota
  database/
    migrations/      Histórico de alterações do banco
    seeds/           Dados iniciais (produtos e mesas)
    types/           Tipos TypeScript das tabelas
    knex.ts          Instância de conexão com o banco
  middlewares/       Tratamento de erros
  routes/            Definição das rotas
  utils/             Classes auxiliares (ex.: AppError)
  server.ts          Ponto de entrada da aplicação
knexfile.ts          Configuração do Knex
tsconfig.json        Configuração do TypeScript
```

## Tratamento de erros

- Erros de negócio são lançados com a classe `AppError`, que carrega a mensagem e o código HTTP.
- Erros de validação do Zod retornam status 400.
- Qualquer outro erro retorna status 500.

## Testando a API

A pasta `docs` contém a collection do Insomnia com todas as requisições. Para usar:

1. Abra o Insomnia e importe o arquivo `docs/insomnia.yaml`. [ajustar o caminho e o nome]
2. Selecione o ambiente `Dev`, que já define `BASE_URL` como `localhost:3333`.

## Licença

ISC