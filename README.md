### Pré-requisitos

1. **Ruby on Rails**: Certifique-se de ter o Ruby e o Rails instalados.

   - Instale o Ruby via `rbenv` ou `rvm` e depois o Rails com o comando:
     ```bash
     gem install rails
     ```

2. **Node.js**: Certifique-se de ter o Node.js e o Yarn instalados para rodar o frontend.

   - Instale o Node.js: [Node.js download](https://nodejs.org)
   - Instale o Yarn:
     ```bash
     npm install -g yarn
     ```

3. **SQLite3**: O projeto usa o SQLite como banco de dados. Certifique-se de tê-lo instalado.

### Passo a Passo

#### 1. Configurar o Backend (Rails)

1. **Instalar dependências do backend**
   Navegue até a pasta raiz do projeto Ruby on Rails e instale as gems:

   ```bash
   bundle install
   ```

2. **Executar Migrações do Banco de Dados**
   Aplique as migrações para configurar o banco de dados:

   ```bash
   rails db:migrate
   ```

3. **Iniciar o Servidor Rails**
   Execute o comando para iniciar o servidor do backend:

   ```bash
   rails s
   ```

   O servidor estará rodando em [http://localhost:3000](http://localhost:3000).

#### 2. Configurar o Frontend (Vite)

1. **Instalar dependências do frontend**
   Navegue até a pasta `frontend` dentro do projeto e instale as dependências com Yarn:

   ```bash
   cd frontend
   yarn install
   ```

2. **Rodar o servidor de desenvolvimento do frontend**
   Inicie o servidor do Vite com o comando:

   ```bash
   yarn dev
   ```

   O servidor estará rodando em [http://localhost:5173](http://localhost:5173).

#### 3. Acessar o Projeto

- **Backend (API)**: Acesse [http://localhost:3000](http://localhost:3000).
- **Frontend**: Acesse [http://localhost:5173](http://localhost:5173) para ver a aplicação rodando com o frontend.

### Variáveis de Ambiente

- No frontend, o arquivo `.env` ou `.env.local` deve conter a URL da API:
  ```bash
  VITE_API_URL=http://localhost:3000/api/v1/courses
  ```

Isso permitirá que o frontend se comunique com a API do backend localmente.
