<div align="center">
  <h1>🏋️ GymPass Style API</h1>
  <p>
    <strong>API RESTful para gerenciamento de check-ins em academias</strong>
  </p>
  <p>
    <img alt="Node.js" src="https://img.shields.io/badge/Node.js-v22-green?logo=node.js" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript" />
    <img alt="Fastify" src="https://img.shields.io/badge/Fastify-5.7-black?logo=fastify" />
    <img alt="Prisma" src="https://img.shields.io/badge/Prisma-7.1-2D3748?logo=prisma" />
    <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-16-316192?logo=postgresql" />
  </p>
</div>

## 📋 Sobre o Projeto

Este projeto é uma aplicação inspirada no GymPass, desenvolvida durante o curso da RocketSeat. A API permite que usuários façam check-ins em academias, com validação de distância e regras de negócio específicas para garantir a integridade dos dados.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset JavaScript com tipagem estática
- **Fastify** - Framework web rápido e eficiente
- **Prisma** - ORM moderno para Node.js e TypeScript
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de schemas e tipos
- **bcryptjs** - Hash de senhas
- **Docker** - Containerização da aplicação

## 📦 Instalação

```bash
# Clonar o repositório
git clone <url-do-repositorio>

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Subir o banco de dados com Docker
docker-compose up -d

# Executar migrations
npx prisma migrate dev

# Iniciar servidor de desenvolvimento
npm run dev
```

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor em modo desenvolvimento
npm run build        # Compila o projeto para produção
npm run start        # Inicia o servidor em modo produção
npm run test         # Executa os testes
npm run lint         # Verifica problemas no código
npm run lint:fix     # Corrige problemas automaticamente
```

## 📝 Requisitos Funcionais (RFs)

- [ ] Deve ser possível se cadastrar
- [ ] Deve ser possível se autenticar
- [ ] Deve ser possível obter o perfil do usuário logado
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [ ] Deve ser possível o usuário obter seu histórico de check-ins
- [ ] Deve ser possível o usuário buscar academias próximas (até 10km)
- [ ] Deve ser possível o usuário buscar academias pelo nome
- [ ] Deve ser possível o usuário realizar check-in em uma academia
- [ ] Deve ser possível validar o check-in de um usuário
- [ ] Deve ser possível cadastrar uma academia

## 📌 Regras de Negócio (RNs)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [ ] O check-in só pode ser validado até 20 minutos após criado
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

## 🔒 Requisitos Não-Funcionais (RNFs)

- [ ] A senha do usuário precisa estar criptografada
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)

## 🏗️ Estrutura do Projeto

```
src/
├── http/
│   ├── controllers/     # Controladores das rotas
│   └── routes.ts        # Definição das rotas
├── services/            # Lógica de negócio
├── lib/                 # Configurações de bibliotecas
├── env/                 # Validação de variáveis de ambiente
├── app.ts              # Configuração do Fastify
└── server.ts           # Inicialização do servidor
```

## 🗃️ Modelo de Dados

### User

- id
- name
- email
- password_hash
- created_at

### Gym

- id
- title
- description
- phone
- latitude
- longitude

### CheckIn

- id
- created_at
- validated_at
- user_id
- gym_id

## 📄 Licença

Este projeto está sob a licença MIT.

---
