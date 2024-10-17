# KANBAN

## BACKLOG

- Salvar dados de importação em uma collection
- Desenvolver tests Unitários
- Formatar objeto antes de inserir no banco  
- criar mongodb validação para collection products
- Retornar dados na rota padrão / ( Conexão com Database, Ultima execução do Cron, Tempo Online e uso de memoria)
- `PUT /products/:code`: Será responsável por receber atualizações do Projeto Web
- `DELETE /products/:code`: Mudar o status do produto para `trash`
- `GET /products/:code`: Obter a informação somente de um produto da base de dados
- `GET /products`: Listar todos os produtos da base de dados, adicionar sistema de paginação para não sobrecarregar o `REQUEST`.

- **Diferencial 1** Configuração de um endpoint de busca com Elastic Search ou similares;
- **Diferencial 2** Configurar Docker no Projeto para facilitar o Deploy da equipe de DevOps;
- **Diferencial 3** Configurar um sistema de alerta se tem algum falho durante o Sync dos produtos;
- **Diferencial 4** Descrever a documentação da API utilizando o conceito de Open API 3.0;
- **Diferencial 5** Escrever Unit Tests para os endpoints  GET e PUT do CRUD;
- **Diferencial 6** Escrever um esquema de segurança utilizando `API KEY` nos endpoints. Ref: [https://learning.postman.com/docs/sending-requests/authorization/#api-key]

- Preparar Readme do projeto

## DONE

- Criar Banco de Dados no MongoAtlas
- Integrar API com Banco de Dados
- Download Files
- Get N objects do arquivo json.gz
- Insert fields imported_t e status nos objetos
- Insert Objects no Banco de Dados
- Delete files
