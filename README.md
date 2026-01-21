# App

Gympass style app.

## RFs (Requisitos funcionais)

- [ ] Deve ser possivel se cadastrar;
- [ ] Deve ser possivel se autenticar;
- [ ] Deve ser possivel obter o perfil do usuário logado;
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuário logado;
- [ ] Deve ser possivel o usuário obter seu histórico de check-ins;
- [ ] Deve ser possivel o usuário buscar academias proximas;
- [ ] Deve ser possivel o usuário buscar uma academia por nome;
- [ ] Deve ser possivel o usuário realizar um check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuário;
- [ ] Deve ser possivel cadastrar uma academia;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail já existente;
- [ ] O usuário não pode fazer mais de um check-in por dia;
- [ ] O usuário não pode fazer check-in em uma academia que esteja a mais de 100 metros de distância;
- [ ] O check-in deve ser validado em até 20 minutos após sua criação;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] o usuário deve ser identificado por um token JWT(JSON Web Token);
