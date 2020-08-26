# GoBarber - API Rest

This api provides all needed between barber and customers to organize appointments.

Customers can pick the best time available to them.

Providers look after all their appointments, manage times and clients.

## Techs and Tools

- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/#/)
- [PostgreSQL](https://www.postgresql.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Multer](https://www.npmjs.com/package/multer)
- [JWT-token](https://www.npmjs.com/package/jsonwebtoken)
- [BCrypt](https://www.npmjs.com/package/bcrypt)
- [uuidV4](https://www.npmjs.com/package/uuidv4)
- [Date-fns](https://date-fns.org/)
- [Jest](https://jestjs.io/)
- [Editor Config](https://editorconfig.org/)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [Babel](https://babeljs.io/)
- [aws-sdk](https://aws.amazon.com/pt/sdk-for-node-js/)
- [ClassTransformer](https://www.npmjs.com/package/class-transformer)
- [Celebrate](https://www.npmjs.com/package/celebrate)
- [ioredis](https://ioredis.readthedocs.io/en/latest/API/)
- [tsyringe](https://www.npmjs.com/package/tsyringe)

### Getting Started

>Yarn and NPM and a instance of PostgreSQL **REQUIRED**.
>
>for postgreSQL prefere: **Docker**(uses ormconfig.json to get it).

```bash
  # Clone this repository.
  $ git clone https://github.com/cezarcozta/backend-go-barber.git

  # Access repository cloned folder
  $ cd backend-go-barber

  # Install all dependencies
  $ yarn

  # Run Database migrations
  $ yarn typeorm migration:run

  # Run development server
  $ yarn dev:server
```

#### End Point

- Sessions

  ```bash
    POST: /sessions
  ```

- Appointments

  ```bash
    GET:  /appointments/schedule
    POST: /appointments
  ```

- Providers

  ```bash
    GET:  /providers/:provider_id/month-availability
    GET:  /providers/:provider_id/day-availability
  ```

- Users

  ```bash
    POST:   /users
    POST:   /password/forgot
    POST:   /password/reset
    PATCH:  /profile
  ```

#### Developed by

- César Augusto Costa :sunglasses: :sunglasses: :sunglasses:
  - [cezarcozta.com](https://cezarcozta.com)
  - cezarcozta@gmail.com
  - [Linkedin/cezarcozta](www.linkedin.com/in/cezarcozta)
  - [Twitter@cezarcozta](www.twitter.com/cezarcozta)
  - [Instagram@cezarcozta](www.instagram.com/cezarcozta)
  - [Facebook/cezarcozta](www.facebook.com/cezarcozta)
