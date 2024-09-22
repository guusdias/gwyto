Aqui está um exemplo de um README simples para o seu projeto:

---

# Course and Lessons Management API

Este projeto é uma API construída em Ruby on Rails para gerenciamento de cursos e suas respectivas aulas. A API permite a criação, atualização, exclusão e visualização de cursos e aulas, bem como o cálculo do total de tamanho de vídeo de cada curso.

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

## Instalação

1. Clone este repositório:

   ```bash
   git clone git@github.com:guusdias/gwyto.git
   cd gwyto
   ```

2. Instale as dependências do projeto:

   ```bash
   bundle install
   ```

3. Configure o banco de dados:

   ```bash
   rails db:create
   rails db:migrate
   ```

4. Inicie o servidor:

   ```bash
   rails server
   ```

5. A API estará disponível em: `http://localhost:3000/api/v1`

## Estrutura do Projeto

- **Controllers**:
  - `Api::V1::CoursesController`: Gerencia as operações CRUD relacionadas a cursos.
  - `Api::V1::LessonsController`: Gerencia as operações CRUD relacionadas a aulas.
- **Models**:
  - `Course`: Representa os cursos, que possuem título, descrição, datas e o tamanho total dos vídeos.
  - `Lesson`: Representa as aulas, que possuem URL e tamanho do vídeo, associadas a um curso.
