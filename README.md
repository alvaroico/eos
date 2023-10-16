## Description

O projeto foi criado com [Nest](https://github.com/nestjs/nest) framework TypeScript.

## Requisitos

- NodeJS 18.18.1
- Docker
- Docker Compose
- Postgres

## Execução do código em container

```bash
# Se o container cair rode novamente o contêiner visto que
# o banco de dados não está em um volume
$ docker compose up -d --force-recreate --build
```

<video width="320" height="240" controls>
  <source src="/anexos/gravacao-de-tela-de-2023-10-15-20-44-02.webm" type="video/webm">
</video>

# run

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# test coverage
$ npm run test:cov
TODO: Teste não totalizado em todas as rotas
```

## Stay in touch

- Alvaroico - [Álvaro Ribeiro Pereira](https://github.com/alvaroico)

## License

Nest is [MIT licensed](LICENSE).
