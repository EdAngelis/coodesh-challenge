# API do projeto Fitness Foods LC

## Introdução

A API desenvolvida para o projeto Fitness Foods LC tem como objetivo auxiliar a equipe de nutricionistas da empresa a revisar rapidamente as informações nutricionais dos alimentos que os usuários submetem pela aplicação móvel.

A API utiliza a base de dados da Open Food Facts para armazenar em nosso banco de dados informações nutricionais dos produtos, permitindo consultas personalizadas e edições diretas.

### Tecnologias

A api foi construída utilizando

- Node (22.9.0)
- express
- MongoDB
- Elastic

#### Outras Ferramentas e Bibliotecas

- axios: Para chamadas HTTP

- mailersend: Para envio de Notificação

- swagger-ui-express: Para realizar chamadas nos end-points diretamente pelo browser

E para realizar os testes

- chai
- mocha
- supertest
- sinon

### Inicializando a API

#### Apenas com Node

1. Instale as dependências:

``` bash
npm install
```

2. Inicie a API:

``` bash
npm run start
```

#### Executando com Docker

1. Construa e inicie o container

```terminal
docker-compose up --build
```

Para executar através de um container é preciso ter o Docker instalado no seu pc.
Em ambos os casos a api estará disponível através do endereço [http://localhost:3000](http://localhost:3000)

### Sistema do CRON

Quando a Api é iniciada ela chama uma função cron que é executada 1 vez por dia as 5:00 am ou em um intervalo determinado externamente através da variável de ambiente CRON_TIME.

``` .env
CRON_TIME="* * 8 * * *"
```

A função cron realiza uma chamada para API da Open Food Facts, realizando o download dos arquivos zipados que contem os json com os dados nutricionais dos produtos, extraímos os dados dos produtos e salvamos em nosso Banco de Dados sempre que a função cron é chamada.

Quando a API é inicializada a função que baixa os arquivos da base de dados da Open Food Facts é executada inicialmente, e só é executada novamente no intervalo determinado, caso queira evitar essa primeira execução quando a API é inicializada, basta alterar a propriedade cron_first_time no arquivo config.js para false, ou configurar a variável de ambiente CRON_FIRST_TIME como false.

```.env
CRON_FIRST_TIME=false
```

### A REST API

Os end-points da API estão documentados no arquivo docs/api.yml e pode ser visualizado no browser através da rota /api-docs, utilizando o swaggerUi junto com o api.yml, podemos realizar requests e testar os end-points diretamente através do browser.

- API-KEY:

Para fazer uma chamada para as rotas é preciso enviar o header x-api-key com o valor da API-KEY, o valor da API-KEY pode ser configurado diretamente através do arquivo de configuração config.js ou externamente através da variável de ambiente API_KEY.

``` 
API_KEY="my-api-key"
```

### TESTES

Para rodar os tests, basta executar no terminal:

```bash
npm run test
```

### E-MAIL DE NOTIFICAÇÃO

Para configurar um e-mail para receber as notificações de falha, forneça um e-mail valido no arquivo de configuração, usando a propriedade notification_recipient_email:

```javascript
notification_recipient_email: "seuemail@aqui.com"
```

ou configure um email externamente usando a variável de ambiente NOTIFICATION_RECIPIENT_EMAIL

```
NOTIFICATION_RECIPIENT_EMAIL=seuemail@aqui.com
```

Caso queira simular um erro, você pode alterar a url da Open Food Facts, usando um url invalida, então um erro será lançado e você receberá a notificação no e-mail fornecido.

### ELASTIC SEARCH

Podemos fazer busca através do end-point **/elastic?query=query**, que utiliza o Elastic Search como mecanismo de busca, a aplicação sincroniza em tempo real o Elastic Search com nosso banco de dados no Mongodb Atlas, sempre que um documento é inserido, modificado ou deletado, caso queira sincronizar todo banco com o Elastic Search quando a aplicação é iniciada, basta inserir uma variável de ambiente com o nome SYNC_ELASTIC, com o valor de true, ou alterar a propriedade sync_elastic no arquivo de configuração config.js para true.

O valor que queira buscar deve vir inserido como uma query de valor query, como no exemplo:

```
elastic?query=food
```

### CONSIDERAÇÕES

- URI Banco de Dados

Criei um Banco no Mongodb Atlas e deixei a URI já configurada no projeto apenas pra facilitar a inicialização e o uso da API.

- SQLite

Optei pelo uso do SQLite para guardar em paralelo os dados de execução do cron, pra economizar requisições caso a rota padrão fosse usada para monitorar a saúde da api em tempo real, para esse projeto em questão o SQLite poderia ser substituído por apenas uma variável global, mas optei pelo uso do SQLite pois queria testar essa nova feature do Node.

- Tests

Optei por realizar apenas 1 teste para cada rota, testei apenas em caso de sucesso, sei que numa situação real muitas outras situações deveriam ser testadas, usei o supertest para realizar request para as rotas e o sinon para simular respostas das funções que se conectam ao banco de dados, não havendo a necessidade assim de estabelecer conexão com o banco durante os testes.

[Link De Apresentação]()

This is a challenge by [Coodesh](https://coodesh.com/)