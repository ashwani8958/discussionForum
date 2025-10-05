# discussionForum

A minimal Express + MongoDB server for a discussion forum. It includes user registration, basic request validation, and a starting point for storing discussions and comments.

This README explains how to configure, run and test the project locally.

## Features

- Express server with route organization (routes/controllers/services).
- Joi validation for user input (see `validations/user.validator.js`).
- MongoDB (Mongoose) models for user data.

## Requirements

- Node.js (v16+ recommended)
- pnpm or npm
- MongoDB (local or Atlas)

## Environment variables

Create a `.env` file in the `discussionForum` folder (you can copy `.env.example` if present). The server reads these variables:

- `MONGO_ATLAS_URI` — MongoDB Atlas connection string (optional).
- `MONGO_LOCAL_URI` — Local MongoDB connection string (optional).
- `MONGO_DB_NAME` — Optional: override the database name (useful if you don't include DB in the connection string).
- `HOST` — Host/IP to bind server to (default: `127.0.0.1`). Use `0.0.0.0` to listen on all interfaces.
- `PORT` — Port to run the server on (e.g. `3000`).

Example `.env`:

```
MONGO_LOCAL_URI=mongodb://localhost:27017
MONGO_DB_NAME=discussion_forum
HOST=127.0.0.1
PORT=3000
```

If you use Atlas you can instead set `MONGO_ATLAS_URI` and optionally `MONGO_DB_NAME`.

## Install

```bash
cd discussionForum
pnpm install
# or
npm install
```

## Run

```bash
# development (with nodemon)
pnpm start
# or
npm run start

# run directly with node
node index.js
```

Open the server at `http://HOST:PORT` (e.g. http://127.0.0.1:3000).

## API (examples)

All routes are mounted under `/user`.

1) Register user

- Endpoint: `POST /user/register`
- Body (JSON):

```json
{
	"fullname": "John Doe",
	"username": "johnd",
	"email": "john@example.com"
}
```

- Responses:
	- `201 Created` — returns created user object
	- `400 Bad Request` — validation errors (see `validations/user.validator.js`)
	- `409 Conflict` — when username or email already exists (returns `{ message: 'Failed to create new user', reason: 'Already Exists in DB' }`)

Example curl:

```bash
curl -X POST http://127.0.0.1:3000/user/register \
	-H "Content-Type: application/json" \
	-d '{"fullname":"John Doe","username":"johnd","email":"john@example.com"}'
```

2) Other routes

- `GET /user/all` — placeholder in current scaffold
- `GET /user/:username` — placeholder for fetching profile

## Notes & Recommendations

- Validation: Joi is used for incoming request validation. The `validateUser` middleware sanitizes `req.body` and blocks invalid input.
- Passwords: this scaffold currently does not accept passwords for registration; add secure password handling (bcrypt) before storing credentials.
- Error handling: services throw structured errors and controllers map them to HTTP status codes — keep this pattern for consistency.
- Add unit tests and integration tests for important flows (registration, duplicates, DB connectivity).

## Troubleshooting

- If the server reports `Error connecting to MongoDB`, verify your connection string and network access (Atlas whitelist / firewall).
- If your DB shows collections in the `test` database, provide `MONGO_DB_NAME` to connect to your desired database name.

## Next steps (optional)

- Add authentication (JWT) and login flow.
- Add endpoints for creating discussions and comments and model relationships.
- Add CI tests and linting.
