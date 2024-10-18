# KANBAN

## BACKLOG

- **Diferencial 3** Configurar um sistema de alerta se tem algum falho durante o Sync dos produtos;
- criar mongodb validação para collection products
- **Diferencial 1** Configuração de um endpoint de busca com Elastic Search ou similares;
- Preparar Readme do projeto

## DONE

- **Diferencial 2** Configurar Docker no Projeto para facilitar o Deploy da equipe de DevOps;
- setup SQLite to avoid unnecessary requests to the database
- Retornar dados na rota padrão / ( Conexão com Database, Ultima execução do Cron, Tempo Online e uso de memoria)
- Salvar dados de importação em uma collection
- Adcionar arquivo de configuraçães
- **Diferencial 6** Escrever um esquema de segurança utilizando `API KEY` nos endpoints.
- **Diferencial 4** Descrever a documentação da API utilizando o conceito de Open API 3.0;
- **Diferencial 5** Escrever Unit Tests para os endpoints  GET e PUT do CRUD;
- set mongodb index
- `DELETE /products/:code`: Mudar o status do produto para `trash`
- `GET /products/:code`: Obter a informação somente de um produto da base de dados
- `GET /products`: Listar todos os produtos da base de dados, adicionar sistema de paginação para não sobrecarregar o `REQUEST`.
- `PUT /products/:code`: Será responsável por receber atualizações do Projeto Web
- Formatar objeto antes de inserir no banco
- Criar Banco de Dados no MongoAtlas
- Integrar API com Banco de Dados
- Download Files
- Get N objects do arquivo json.gz
- Insert fields imported_t e status nos objetos
- Insert Objects no Banco de Dados
- Delete files
