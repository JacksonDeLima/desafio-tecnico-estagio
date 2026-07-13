# Controle de Gastos Residenciais - Front-end 💰

Este é o projeto Front-end desenvolvido como parte do Desafio Técnico para a vaga de estágio. 
A aplicação foi construída visando simplicidade, legibilidade e a utilização das melhores práticas.

## Tecnologias Utilizadas

- **React**: Biblioteca principal para a interface do usuário.
- **TypeScript**: Adiciona tipagem estática, garantindo menos erros e um código mais previsível.
- **Vite**: Ferramenta de build super rápida e moderna, utilizada para iniciar o projeto.
- **Vanilla CSS**: Toda a estilização foi feita na mão, utilizando variáveis e recursos modernos do CSS para criar uma interface agradável e "premium" sem precisar de dependências pesadas.
- **Axios**: Para realizar as requisições HTTP (comunicação com a API do Back-end).
- **React Router DOM**: Para a navegação limpa entre as páginas sem precisar recarregar o site.
- **Lucide React**: Biblioteca leve de ícones para deixar a interface mais amigável.

## Funcionalidades

- **Dashboard**: Exibe uma tabela com todas as pessoas cadastradas e seus saldos, além de exibir painéis com a matemática geral do sistema (Total de Receitas, Despesas e Saldo Líquido).
- **Gerenciamento de Pessoas**: Permite cadastrar e deletar moradores (a deleção apaga as transações associadas através da API).
- **Gerenciamento de Transações**: Permite lançar novas receitas ou despesas, validando automaticamente no Back-end a regra de que menores de 18 anos só podem ter despesas registradas.

## Como Executar o Projeto

1. Certifique-se de que a API (Back-end em .NET) já está rodando.
2. Na pasta `frontend`, abra o seu terminal.
3. Instale as dependências executando:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Abra o link gerado no terminal (geralmente `http://localhost:5173`) no seu navegador de preferência.

## Arquitetura e Organização

- `src/components/`: Componentes reaproveitáveis, como o layout de base (`Layout.tsx`).
- `src/pages/`: As telas principais da aplicação (`Dashboard`, `Pessoas` e `Transacoes`).
- `src/api/`: Centraliza as configurações de requisições, como a base do `axios.ts`.
- `src/index.css`: Arquivo com todas as variáveis, paletas de cores, transições e regras de responsividade.

---
Desenvolvido com muita atenção aos detalhes para a vaga de Estágio em Desenvolvimento! 🚀
