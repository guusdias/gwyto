# Gwyto - The right place to learn about entrepreneurship


Instruções para Rodar o Projeto

#### 1. **Clone o repositório**

```
git clone https://github.com/guusdias/gwyto.git
cd gwyto
```

#### 2. **Configurar Variáveis de Ambiente**

Crie o arquivo `.env` na raiz do projeto, com as variáveis de ambiente necessárias. Exemplo:

```
RAILS_ENV=production
VITE_API_URL=http://localhost:3000/api/v1/courses
```

#### 3. **Build da Imagem Docker**

Para construir a imagem Docker, execute o comando:

```bash
docker build -t my-app .
```

#### 4. **Rodar as Migrações**

Depois que a imagem for construída, é necessário rodar as migrações do banco de dados:

```bash
docker run -it --rm my-app bundle exec rails db:migrate
```

#### 5. **Iniciar o Container**

Agora você pode iniciar o container do projeto:

```bash
docker run -p 3000:3000 my-app
```

Isso iniciará o servidor Rails na porta 3000, e o frontend estará disponível na mesma porta.

#### 6. **Acessar o Projeto**

Abra o navegador e acesse:

```
http://localhost:3000
```

## Resolução de Problemas: Erro 500

Se você receber a mensagem de erro no frontend como:

```bash
Erro ao storage: Request failed with status code 500
Erro ao carregar cursos: Request failed with status code 500
```

Esse erro pode estar relacionado a migrações pendentes no banco de dados ou a permissões de diretórios de logs e armazenamento. Aqui estão os passos para resolver:

### 1. Verificar Logs do Container

Primeiro, verifique os logs do container para ver detalhes do erro:

```bash
docker logs my-app
```

Isso ajudará a identificar o problema específico que está causando o erro no servidor.

### 2. Executar Migrações Pendentes

Certifique-se de que todas as migrações do banco de dados estão aplicadas. Para isso, entre no container do Rails e execute as migrações:

```bash
docker exec -it my-app bash
```

Dentro do container, execute o comando:

```bash
bin/rails db:migrate
```

Isso vai aplicar todas as migrações pendentes. 

### 3. Verificar Permissões das Pastas

Certifique-se de que as pastas `log`, `storage` e `tmp` têm as permissões corretas para serem escritas:

Entre no container do Rails:

```bash
docker exec -it my-app bash
```

E então corrija as permissões com o comando:

```bash
chown -R 1000:1000 log storage tmp
```

### 4. Reiniciar o Container

Após aplicar as migrações e corrigir as permissões, reinicie o container para garantir que as alterações sejam aplicadas:

```bash
docker restart my-app
```

## Funcionalidades

### Cursos

- **GET /api/v1/courses**: Retorna uma lista de cursos com paginação.
- **GET /api/v1/courses/:id**: Retorna os detalhes de um curso específico, incluindo suas aulas.
- **POST /api/v1/courses**: Cria um novo curso.
- **PATCH/PUT /api/v1/courses/:id**: Atualiza um curso existente.
- **DELETE /api/v1/courses/:id**: Exclui um curso.
- **GET /api/v1/courses/totalVideoSum**: Retorna a soma total do tamanho dos vídeos de todos os cursos.

### Aulas

- **GET /api/v1/courses/:course_id/lessons**: Retorna a lista de aulas de um curso específico.
- **GET /api/v1/courses/:course_id/lessons/:id**: Retorna os detalhes de uma aula específica.
- **POST /api/v1/courses/:course_id/lessons**: Cria uma nova aula para um curso específico.
- **PATCH/PUT /api/v1/courses/:course_id/lessons/:id**: Atualiza uma aula existente.
- **DELETE /api/v1/courses/:course_id/lessons/:id**: Exclui uma aula.

## Estrutura do Projeto

- **Controllers**:
  - `Api::V1::CoursesController`: Gerencia as operações CRUD relacionadas a cursos.
  - `Api::V1::LessonsController`: Gerencia as operações CRUD relacionadas a aulas.
- **Models**:
  - `Course`: Representa os cursos, que possuem título, descrição, datas e o tamanho total dos vídeos.
  - `Lesson`: Representa as aulas, que possuem URL e tamanho do vídeo, associadas a um curso.
