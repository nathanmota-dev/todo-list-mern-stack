# Todo List 

Todo List feito com Express, React e MongoDB com o objetivo de realizar as 4 operações de um CRUD utilizando um banco de dados não relacional, onde além do CRUD também foi feito a realização de um Sistema de Login Completo.

Busquei utilizar duas Brachs nesse projeto, a main e a login-feature, onde a main é a branch principal e a login-feature é a branch de desenvolvimento. Foi para um mim uma experiência nova onde tive que aprender a trabalhar com mesclagem de branches.

## Tecnologias utilizadas:

- `Node.js`
- `Express`
- `Vite`
- `React`
- `MongoDB`
- `Styled-Components`

## Funcionalidades

- Sistema de Login.
- Rota privada (todos).
- Acesso a rota privata com token.
- Bcrypt para criptografar Senhas.
- JsonWebToken para gerar token.
- MongoDB para armazenar os dados.
- Utilizado MongoDB (Node) para permitir criar a tabela todos dinamicamente sem modelar a tabela.
- Utizado Mongooose para criar os models de usuário.
- Tratamentos de erros refletidos no front-end.
- Utilizado Styled-Components para estilizar o projeto.

## Como Executar o Projeto

1. Clone o repositório para sua máquina local:

   ```bash
   git clone https://github.com/nathanmota-dev/todo-list-mern-stack
    ```

2. Navegue até o diretório do projeto:
   
   ```bash
   cd todo-list-mern-stack
   cd backend   
    ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

    ```bash
   npm run dev
    ```

5. Abra um novo terminal e navegue até o diretório do projeto:

   ```bash
   cd todo-list-mern-stack
   cd frontend
    ```

6. Instale as dependências:

   ```bash
   npm install
   ```

7. Inicie o servidor de desenvolvimento:

    ```bash
   npm run dev
    ```

8. Abra o navegador e acesse [http://localhost:5173/](http://localhost:5173/) para visualizar o projeto.

## Melhorias Futuras

- Utilizar ReactHookForm para melhorar a validação dos dados nos formulários de login e cadastro, além de melhorar a estilização do projeto.
- Componentizar códigos repetidos que foram utilizados styles-components, onde por ser um projeto curto (apenas duas páginas) não foi necessário.
- Ser mais detalhista no tratamento de erros no front-end.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorar este projeto.

## Licença

Este projeto está licenciado sob a [Licença MIT](/LICENSE).