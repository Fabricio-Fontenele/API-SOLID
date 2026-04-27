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
    <img alt="Tests" src="https://github.com/Fabricio-Fontenele/API-SOLID/actions/workflows/run-unit-tests.yml/badge.svg" />
  </p>
</div>

## 📋 Sobre o Projeto

Este projeto é uma aplicação inspirada no GymPass. A API permite que usuários façam check-ins em academias, com validação de distância e regras de negócio específicas para garantir a integridade dos dados.

### ✨ Funcionalidades Principais

- 🔐 Autenticação JWT com refresh token
- 👥 Sistema de roles (ADMIN/MEMBER)
- 📍 Busca de academias por proximidade (geolocalização)
- ✅ Sistema de check-ins com validação de distância
- 📊 Métricas e histórico de check-ins
- 🧪 Cobertura completa de testes (unitários + E2E)
- 🏗️ Arquitetura em camadas (SOLID principles)
- 🐳 Docker para desenvolvimento

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset JavaScript com tipagem estática
- **Fastify** - Framework web rápido e eficiente
- **Prisma** - ORM moderno para Node.js e TypeScript
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de schemas e tipos
- **bcryptjs** - Hash de senhas
- **JWT** - Autenticação via JSON Web Tokens
- **Docker** - Containerização da aplicação
- **Vitest** - Framework de testes unitários e E2E
- **Supertest** - Testes de API HTTP

## 📦 Instalação

```bash
# Clonar o repositório
git clone [<url-do-repositorio>](https://github.com/Fabricio-Fontenele/API-SOLID.git)
cd api-solid

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Subir o banco de dados com Docker
docker-compose up -d

# Executar migrations
npx prisma migrate dev

# Gerar Prisma Client
npx prisma generate

# Popular dados de demonstração
npm run seed

# Iniciar servidor de desenvolvimento
npm run dev
```

> **🚀 Servidor rodando em:** `http://localhost:3333`

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
NODE_ENV=dev
PORT=3333
DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"
JWT_SECRET="sua-chave-secreta-super-segura"
```

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `NODE_ENV` | Ambiente de execução (`dev`, `test`, `production`) | `dev` |
| `PORT` | Porta do servidor | `3333` |
| `DATABASE_URL` | URL de conexão do PostgreSQL | - |
| `JWT_SECRET` | Chave secreta para assinar tokens JWT | - |

## 🔧 Scripts Disponíveis

```bash
npm run dev             # Inicia o servidor em modo desenvolvimento
npm run build           # Compila o projeto para produção
npm run start           # Inicia o servidor em modo produção
npm run seed            # Popula dados de demonstração

npm run test:unit       # Executa os testes unitários
npm run test:watch      # Executa os testes em modo watch
npm run test:e2e        # Executa os testes E2E (end-to-end)
npm run test:coverage   # Gera relatório de cobertura de testes
npm run test:ui         # Abre interface UI do Vitest

npm run lint            # Verifica problemas no código
npm run lint:fix        # Corrige problemas automaticamente
```

## 🎬 Dados para Demonstração

Depois de rodar `npm run seed`, use estes acessos no Insomnia:

| Perfil | E-mail | Senha |
|--------|--------|-------|
| ADMIN | `admin@email.com` | `123456` |
| MEMBER | `member@email.com` | `123456` |

Dados úteis para testar check-in e busca de academias:

```txt
Academia próxima: Academia Demo Centro
Gym ID: 33333333-3333-3333-3333-333333333333
Latitude: -3.731862
Longitude: -38.526670
```

## 📝 Requisitos Funcionais (RFs)

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil do usuário logado
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [x] Deve ser possível o usuário obter seu histórico de check-ins
- [x] Deve ser possível o usuário buscar academias próximas (até 10km)
- [x] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário realizar check-in em uma academia
- [x] Deve ser possível validar o check-in de um usuário
- [x] Deve ser possível cadastrar uma academia

## 📌 Regras de Negócio (RNs)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [x] O check-in só pode ser validado até 20 minutos após criado
- [x] O check-in só pode ser validado por administradores
- [x] A academia só pode ser cadastrada por administradores

## 🔒 Requisitos Não-Funcionais (RNFs)

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [x] O usuário deve ser identificado por um JWT (JSON Web Token)

## 🔐 Autenticação e Permissões

A API utiliza **JWT (JSON Web Token)** para autenticação. Após o login, você receberá dois tokens:

- **Access Token**: Usado nas requisições (válido por 10 minutos)
- **Refresh Token**: Usado para renovar o access token (válido por 7 dias)

### Roles de Usuário

- **MEMBER**: Usuário comum (padrão)
- **ADMIN**: Administrador (pode validar check-ins e cadastrar academias)

### Como usar o token

Adicione o token no header de todas as requisições protegidas:

```bash
Authorization: Bearer <seu-access-token>
```

## 📡 Endpoints da API

### 👤 Usuários

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `POST` | `/users` | Cadastrar novo usuário | ❌ |
| `POST` | `/sessions` | Autenticar usuário | ❌ |
| `PATCH` | `/token/refresh` | Renovar access token | ❌ |
| `GET` | `/me` | Obter perfil do usuário logado | ✅ |

### 🏋️ Academias

| Método | Endpoint | Descrição | Autenticação | Role |
|--------|----------|-----------|--------------|------|
| `POST` | `/gyms` | Cadastrar academia | ✅ | ADMIN |
| `GET` | `/gyms/search` | Buscar academias por nome | ✅ | - |
| `GET` | `/gyms/nearby` | Buscar academias próximas | ✅ | - |

### ✅ Check-ins

| Método | Endpoint | Descrição | Autenticação | Role |
|--------|----------|-----------|--------------|------|
| `POST` | `/gyms/:gymId/check-ins` | Fazer check-in em uma academia | ✅ | - |
| `PATCH` | `/check-ins/:checkInId/validate` | Validar check-in | ✅ | ADMIN |
| `GET` | `/check-ins/history` | Histórico de check-ins do usuário | ✅ | - |
| `GET` | `/check-ins/metrics` | Métricas (total de check-ins) | ✅ | - |

<details>
<summary>📋 Exemplos de Requisições</summary>

### Cadastrar Usuário

```bash
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Autenticar

```bash
POST /sessions
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Buscar Academias Próximas

```bash
GET /gyms/nearby?latitude=-23.5505&longitude=-46.6333
Authorization: Bearer <token>
```

### Fazer Check-in

```bash
POST /gyms/550e8400-e29b-41d4-a716-446655440000/check-ins
Authorization: Bearer <token>
Content-Type: application/json

{
  "latitude": -23.5505,
  "longitude": -46.6333
}
```

</details>

## 🏗️ Estrutura do Projeto

```
.
├── prisma/
│   ├── migrations/                       # Histórico de migrations do banco
│   ├── vitest-environment-prisma/        # Ambiente Prisma para testes E2E
│   └── schema.prisma                     # Schema do banco de dados
├── src/
│   ├── @types/                           # Definições de tipos TypeScript
│   ├── application/
│   │   ├── repositories/                 # Contratos dos repositórios
│   │   │   └── dtos/                     # DTOs usados pelos contratos
│   │   ├── use-cases/                    # Casos de uso e regras de negócio
│   │   │   └── errors/                   # Erros customizados dos casos de uso
│   │   └── get-distance-between-coordinates.ts
│   ├── domain/
│   │   └── entities/                     # Entidades de domínio
│   ├── infra/
│   │   ├── database/
│   │   │   ├── in-memory/                # Repositórios em memória para testes
│   │   │   └── prisma/                   # Cliente Prisma e repositórios reais
│   │   ├── env/                          # Validação de variáveis de ambiente
│   │   ├── factories/                    # Factories para instanciar casos de uso
│   │   ├── http/
│   │   │   ├── controllers/              # Controllers organizados por domínio
│   │   │   │   ├── check-ins/
│   │   │   │   ├── gyms/
│   │   │   │   └── users/
│   │   │   └── middlewares/              # Middlewares de autenticação e autorização
│   │   ├── lib/                          # Configurações de bibliotecas externas
│   │   └── utils/                        # Utilitários de infraestrutura e testes
│   ├── app.ts                            # Configuração do Fastify
│   └── server.ts                         # Inicialização do servidor
├── docker-compose.yml                    # Banco PostgreSQL para desenvolvimento
├── prisma.config.ts                      # Configuração do Prisma
└── vite.config.mjs                       # Configuração dos testes
```

## 🗃️ Modelo de Dados

### User
- `id` - UUID
- `name` - String
- `email` - String (único)
- `password_hash` - String
- `role` - Enum (ADMIN, MEMBER)
- `created_at` - DateTime

### Gym
- `id` - UUID
- `title` - String
- `description` - String (opcional)
- `phone` - String (opcional)
- `latitude` - Decimal
- `longitude` - Decimal

### CheckIn
- `id` - UUID
- `created_at` - DateTime
- `validated_at` - DateTime (opcional)
- `user_id` - UUID (FK → User)
- `gym_id` - UUID (FK → Gym)

## 🧪 Testes

O projeto possui cobertura de testes unitários e E2E:

- **Testes Unitários**: Testam os casos de uso isoladamente usando repositórios in-memory
- **Testes E2E**: Testam os endpoints da API com banco de dados real

```bash
# Rodar testes unitários
npm run test

# Rodar testes E2E (requer Docker)
npm run test:e2e

# Ver cobertura de testes
npm run test:coverage

# Modo watch para desenvolvimento
npm run test:watch

# Interface visual do Vitest
npm run test:ui
```

## 🐳 Docker

O projeto utiliza Docker Compose para subir o PostgreSQL:

```bash
# Subir o banco de dados
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar o banco
docker-compose down

# Parar e remover volumes (limpa o banco)
docker-compose down -v
```

## 📄 Licença

Este projeto está sob a licença MIT.

---

<div align="center">
  <p>
    <a href="#top">⬆️ Voltar ao topo</a>
  </p>
</div>
