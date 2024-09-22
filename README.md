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
