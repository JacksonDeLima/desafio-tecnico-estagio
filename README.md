# Sistema de Controle de Gastos Residenciais 

Projeto de teste técnico focado na simplicidade, legibilidade e nas boas práticas de desenvolvimento (SOLID e Clean Code).
O sistema é um gerenciador financeiro onde é possível gerenciar pessoas e contabilizar transações financeiras (receitas e despesas) atreladas a elas.

##  Tecnologias Utilizadas

O projeto foi dividido em duas partes perfeitamente desacopladas:

1. **Back-end (`/backend`)**
   - Desenvolvido em **.NET 8 (C#)**.
   - Utiliza **Entity Framework Core** como ORM para gerenciar o banco de dados.
   - Banco de Dados **SQLite** (escolhido pela praticidade, pois salva os dados localmente no projeto, garantindo persistência imediata sem configurações complexas de servidores).
   - Documentação da API feita com Swagger.

2. **Front-end (`/frontend`)**
   - Desenvolvido em **React** com **TypeScript** e build via **Vite**.
   - Estilização construída puramente em **Vanilla CSS** (sem frameworks externos) focando em um visual moderno, com micro-animações, cores responsivas e design clean.
   - Rotas construídas com `react-router-dom`.
   - Requisições feitas via `axios`.

##  Funcionalidades Principais

- **Consulta de Totais (Dashboard):** Visão geral exibindo saldo líquido, total de despesas e receitas gerais. Listagem detalhada dos totais financeiros individuais de cada morador.
- **Cadastro de Pessoas:** Permite adicionar moradores e listar os existentes. A exclusão de uma pessoa exclui automaticamente todo o histórico de transações atreladas a ela (Cascade Delete).
- **Cadastro de Transações:** Permite registrar receitas e despesas. Possui uma trava na API que impede menores de 18 anos de registrar receitas.

## 🚀 Como Executar Localmente

### 1. Rodando a API (Back-end)
Navegue até a pasta `backend` e inicie o projeto:
```bash
cd backend
dotnet run
```
*A API será iniciada e o banco de dados (`banco_desafio.db`) será gerado automaticamente. O Swagger poderá ser acessado para testes diretos.*

### 2. Rodando o Site (Front-end)
Navegue até a pasta `frontend`, instale as dependências e inicie a interface:
```bash
cd frontend
npm install
npm run dev
```
*Acesse o link gerado no terminal (ex: `http://localhost:5173`) no seu navegador.*

---
Desenvolvido com dedicação e focado na qualidade de entrega! 
