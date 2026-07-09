# 💰 Expense Tracker API

**Project URL:** https://roadmap.sh/projects/expense-tracker-api

A RESTful API for managing personal expenses built with **Node.js**, **TypeScript**, **Express**, **MySQL**, and **TypeORM**.

The API provides secure authentication using **JWT**, allowing users to manage their own expenses. Each authenticated user can create, retrieve, update, delete, and filter expenses while ensuring data isolation between users.

---

# 🚀 Features

## Authentication

- User registration
- User login
- JWT authentication
- Password hashing using bcrypt
- Protected routes

## Expense Management

- Create an expense
- Retrieve all expenses
- Retrieve an expense by UUID
- Update an expense
- Delete an expense
- Filter expenses by:
  - Past week
  - Past month
  - Last 3 months
  - Custom date range

## Validation

- Request validation using class-validator
- Request transformation using class-transformer

## Database

- MySQL
- TypeORM
- Database migrations

---

# 🛠 Technologies Used

## Backend

- Node.js
- TypeScript
- Express.js

## Database

- MySQL
- TypeORM

## Authentication

- JWT
- bcrypt

## Validation

- class-validator
- class-transformer

---

# 🏗 Architecture

The project follows a layered architecture that separates responsibilities into independent layers.

```text
                 Client
                    │
                    ▼
               Express Routes
                    │
                    ▼
              Middlewares
       (Authentication • Validation)
                    │
                    ▼
               Controllers
                    │
                    ▼
                Services
                    │
                    ▼
             Repositories
                    │
                    ▼
          MySQL Database (TypeORM)
```

## Layer Responsibilities

| Layer | Responsibility |
|--------|----------------|
| Routes | Define API endpoints |
| Middlewares | Authenticate users and validate requests |
| Controllers | Handle HTTP requests and responses |
| Services | Implement business logic |
| Repositories | Perform database operations |
| Database | Persist application data |

---

# 📂 Project Structure

```text
expense-tracker-api/
│
├── src/
│   ├── config/
│   ├── constants/
│   ├── database/
│   │   ├── entities/
│   │   ├── migrations/
│   │   ├── data-source.ts
│   │   └── initialize.ts
│   │
│   ├── enums/
│   ├── exceptions/
│   ├── middlewares/
│   │
│   ├── modules/
│   │   ├── auth/
│   │   └── expense/
│   │
│   ├── repositories/
│   ├── routes/
│   ├── types/
│   ├── utils/
│   │
│   ├── app.ts
│   └── server.ts
│
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

# ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000
NODE_ENV=dev

DB_HOST=localhost
DB_PORT=3306
DB_NAME=expense_tracker_db
DB_USER=root
DB_PASSWORD=

JWT_SECRET_KEY=your-secret-key
```

---

# ▶ Local Development

## Install dependencies

```bash
npm install
```

## Run database migrations

```bash
npm run migration:run
```

## Start the development server

```bash
npm run dev
```

The API will be available at:

```
http://localhost:3000
```

---

# 🔐 Authentication

Base Route

```
/api/auth
```

---

## Register

Creates a new user account.

### Request

```http
POST /api/auth/sign-up
```

### Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

### Successful Response

```json
{
  "uuid": "7a36...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "<jwt>"
}
```

### Status Code

```
201 Created
```

---

## Login

Authenticates an existing user.

### Request

```http
POST /api/auth/sign-in
```

### Body

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

### Successful Response

```json
{
  "token": "<jwt>"
}
```

### Status Code

```
200 OK
```

---

# 🔒 Protected Endpoints

Every expense endpoint requires authentication.

Include the access token in the request header.

```http
Authorization: Bearer <jwt-token>
```

---

# 💰 Expense API

Base Route

```
/api/expenses
```

---

## Create Expense

### Request

```http
POST /api/expenses
```

### Body

```json
{
  "title": "Groceries",
  "description": "Weekly shopping",
  "amount": 120.50,
  "category": "Groceries",
  "expense_date": "2026-07-09"
}
```

### Successful Response

```json
{
  "uuid": "...",
  "title": "Groceries",
  "description": "Weekly shopping",
  "amount": 120.5,
  "category": "Groceries",
  "expense_date": "2026-07-09"
}
```

---

## Get All Expenses

Returns all expenses belonging to the authenticated user.

```http
GET /api/expenses
```

---

## Filter Expenses

### Past Week

```http
GET /api/expenses?filter=past_week
```

---

### Past Month

```http
GET /api/expenses?filter=past_month
```

---

### Last Three Months

```http
GET /api/expenses?filter=last_three_months
```

---

### Custom Date Range

```http
GET /api/expenses?filter=custom&start=2026-05-01&end=2026-07-09
```

---

## Get Expense By UUID

```http
GET /api/expenses/:uuid
```

---

## Update Expense

```http
PATCH /api/expenses/:uuid
```

Only the provided fields are updated.

Example body:

```json
{
  "amount": 250.00
}
```

---

## Delete Expense

```http
DELETE /api/expenses/:uuid
```

### Successful Response

```
204 No Content
```

---

# 📄 Expense Model

```ts
{
    uuid: string;
    title: string;
    description?: string;
    amount: number;
    category: ExpenseCategory;
    expense_date: string;
}
```

---

# 📂 Expense Categories

The API supports the following categories:

- Groceries
- Leisure
- Electronics
- Utilities
- Clothing
- Health
- Others

---

# 🔎 Available Filters

| Filter | Description |
|---------|-------------|
| past_week | Expenses from the last 7 days |
| past_month | Expenses from the last month |
| last_three_months | Expenses from the last 3 months |
| custom | Expenses between the provided start and end dates |

---

# ✅ Request Validation

Incoming requests are validated using **class-validator** before reaching the business logic.

## User Registration

| Field | Validation |
|--------|------------|
| name | Required, max length 100 |
| email | Required, valid email, max length 100 |
| password | Required, max length 100 |

---

## Expense

| Field | Validation |
|--------|------------|
| title | Required, max length 255 |
| description | Optional, max length 500 |
| amount | Required, minimum 0.01, maximum 2 decimal places |
| category | Required |
| expense_date | Required, valid ISO date |

---

# ❌ Error Handling

The API returns consistent JSON responses for errors.

## Validation Error

```json
{
    "message": "Validation failed"
}
```

---

## Unauthorized

```json
{
    "message": "Unauthorized"
}
```

---

## Not Found

```json
{
    "message": "Expense not found"
}
```

---

## Conflict

```json
{
    "message": "Email already exists"
}
```

---

## Internal Server Error

```json
{
    "message": "Internal Server Error"
}
```

---

# 🗄 Database Migrations

Generate a migration:

```bash
npm run migration:generate -- src/database/migrations/MigrationName
```

Run migrations:

```bash
npm run migration:run
```

Revert the latest migration:

```bash
npm run migration:revert
```

---

# 🔒 Security

The API includes the following security features:

- JWT authentication
- Password hashing using bcrypt
- Protected routes
- Users can only access their own expenses
- Request validation
- Centralized error handling

---

# 💡 Future Improvements

Possible enhancements include:

- Expense pagination
- Sorting by date or amount
- Search by title
- Monthly statistics
- Budget management
- Swagger / OpenAPI documentation
- Docker support
- Automated tests
- CI/CD pipeline

---

# 👨‍💻 Author

**Tommy Contreras**

GitHub: https://github.com/tommycontreras11

---

# 📄 License

This project is licensed under the **MIT License**.
