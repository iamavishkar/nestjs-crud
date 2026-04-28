# NestJS CRUD API

A professional, industry-standard NestJS CRUD starter application featuring TypeORM, Swagger, validation, global exception handling, and more.

## Prerequisites

- Node.js 18+
- npm 9+

## Installation

```bash
npm install
```

## Configuration

Copy the example environment file and adjust as needed:

```bash
cp .env.example .env
```

By default the app uses **SQLite** (zero-config). To switch to PostgreSQL update the relevant `DATABASE_*` variables in `.env`.

## Running the App

```bash
# Development (watch mode)
npm run start:dev

# Production build & start
npm run build
npm run start:prod
```

## API Documentation

Once the app is running, Swagger UI is available at:

```
http://localhost:3000/api/docs
```

## Running Tests

```bash
# Unit tests
npm run test

# Unit tests with coverage
npm run test:cov

# End-to-end tests
npm run test:e2e
```

## Linting & Formatting

```bash
npm run lint
npm run format
```

## Endpoints

All endpoints are prefixed with `/api/v1`.

| Method | Path              | Description              | Status |
|--------|-------------------|--------------------------|--------|
| POST   | /api/v1/users     | Create a user            | 201    |
| GET    | /api/v1/users     | List users (paginated)   | 200    |
| GET    | /api/v1/users/:id | Get a single user by id  | 200    |
| PATCH  | /api/v1/users/:id | Update a user            | 200    |
| DELETE | /api/v1/users/:id | Delete a user            | 204    |
| GET    | /health           | Health check             | 200    |

## Example curl Requests

```bash
# Create a user
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","name":"John Doe","age":30}'

# List users (with pagination)
curl "http://localhost:3000/api/v1/users?page=1&limit=10"

# Get a user by ID
curl http://localhost:3000/api/v1/users/<uuid>

# Update a user
curl -X PATCH http://localhost:3000/api/v1/users/<uuid> \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe"}'

# Delete a user
curl -X DELETE http://localhost:3000/api/v1/users/<uuid>

# Health check
curl http://localhost:3000/health
```

## Project Structure

```
nestjs-crud/
├── src/
│   ├── main.ts                          # Bootstrap (Helmet, CORS, Swagger, ValidationPipe, versioning)
│   ├── app.module.ts                    # Root module
│   ├── common/
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts # Global exception filter
│   │   └── interceptors/
│   │       └── transform.interceptor.ts # Global response transform
│   ├── config/
│   │   ├── configuration.ts             # Config factory
│   │   └── env.validation.ts            # Joi env validation schema
│   ├── database/
│   │   └── database.module.ts           # TypeORM async config (SQLite / Postgres)
│   └── users/
│       ├── users.module.ts
│       ├── users.controller.ts
│       ├── users.service.ts
│       ├── entities/user.entity.ts
│       ├── dto/
│       │   ├── create-user.dto.ts
│       │   ├── update-user.dto.ts
│       │   └── pagination-query.dto.ts
│       └── tests/
│           ├── users.service.spec.ts
│           └── users.controller.spec.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── .gitignore
├── nest-cli.json
├── tsconfig.json
├── tsconfig.build.json
├── package.json
└── README.md
```
