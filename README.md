# User Management API (Coursera Project)

This project is a Node.js + Express API for managing users with full CRUD operations, input validation, and middleware.

## Features

- CRUD endpoints:
  - `GET /users` - list all users
  - `GET /users/:id` - get one user by id
  - `POST /users` - create a user (protected by API key + validation)
  - `PUT /users/:id` - update a user (protected by API key + validation)
  - `DELETE /users/:id` - delete a user (protected by API key)
- Validation middleware:
  - Validates `name`, `email`, and `age`
- Middleware implemented:
  - Request logging middleware
  - API-key authentication middleware
- Automated tests with Jest + Supertest

## Rubric Mapping (25 points)

1. **GitHub repository created (5 pts)**  
   You can push this folder to your existing public GitHub repository.

2. **CRUD endpoints implemented (5 pts)**  
   Implemented in `src/routes/users.js`.

3. **Used Copilot to debug code (5 pts)**  
   Add a short note in your submission text like:  
   "I used GitHub Copilot suggestions while debugging route validation and middleware flow."

4. **Validation for valid user data (5 pts)**  
   Implemented in `src/middleware/validateUser.js`.

5. **Middleware implemented (5 pts)**  
   Implemented in:
   - `src/middleware/logger.js`
   - `src/middleware/auth.js`

## Run Locally

```bash
npm install
npm test
npm run dev
```

API base URL: `http://localhost:3000`

Use header for protected routes:

- `x-api-key: coursera-secret-key`

## Project Structure

- `src/app.js` - express app setup
- `src/server.js` - server start file
- `src/routes/users.js` - CRUD route handlers
- `src/middleware/logger.js` - logging middleware
- `src/middleware/auth.js` - API key auth middleware
- `src/middleware/validateUser.js` - payload validation middleware
- `tests/users.test.js` - API test cases

## GitHub Push Steps

If your repository already exists, run:

```bash
git init
git add .
git commit -m "Initial commit - user management API project"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

If `origin` already exists, use:

```bash
git remote set-url origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

After push, your submission URL is:

`https://github.com/<your-username>/<your-repo-name>`
