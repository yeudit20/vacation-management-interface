# Vacation Management Interface

A small web app for managing employee vacation requests, built for the Web Development Intern recruitment test.

- Frontend: Vue 3, Vue Router, Axios
- Backend: Node.js (Express)
- Database: SQLite (via Knex) for local development; optional PostgreSQL for production
- Tests: Jest + Supertest (backend)

---

## Overview

Two user roles and flows:
- Requester (Employee): submit a vacation request and view your requests and statuses.
- Validator (Manager): list all requests, filter by status, approve or reject with an optional comment.

The API follows RESTful conventions and includes basic input validation and error handling.

---

## How To Run (Local)

Requirements: Node.js 18+

1) Backend (API)
- `cd server`
- `npm install`
- `npm run migrate`
- `npm run seed`
- `npm run dev`

Notes
- API listens on `http://localhost:3001`
- SQLite DB will be created at `server/db/dev.sqlite3`
- Seed users: Requester id=1, Validator id=2

2) Frontend (Web UI)
- `cd client`
- `npm install`
- `npm run dev`
- Open `http://localhost:5173` (Vite proxies `/api` to `http://localhost:3001`)

---

## API Summary
- `GET /api/health` — health check
- `POST /api/requests` — create { user_id, start_date, end_date, reason? }
- `GET /api/requests` — list (query: `user_id?`, `status?`)
- `POST /api/requests/:id/approve` — approve
- `POST /api/requests/:id/reject` — reject { comments? }

---

## Database Schema
Tables created by Knex migrations:
- `users`: id (pk), name, role (Requester|Validator)
- `vacation_requests`: id (pk), user_id (fk users.id), start_date, end_date, reason, status (Pending|Approved|Rejected), comments, created_at

---

## Tests (Backend)

From the `server` directory:
- `npm install`
- `npm test`

This runs Jest + Supertest integration tests that cover the health endpoint and request lifecycle (create, approve, reject).

---

## Technical Choices
- Vue 3 + Vite: fast DX and simple router setup.
- Express + Knex: minimal API with straightforward migrations/seeds; SQLite locally, PostgreSQL optionally for production.
- Simple role model: demo-only — user id is entered manually on the Requester view to keep auth out of scope.

Optional PostgreSQL
- Install driver: in `server/` run `npm i pg`
- Configure environment variables (`PG_HOST`, `PG_PORT`, `PG_DATABASE`, `PG_USER`, `PG_PASSWORD`)
- Run with `NODE_ENV=production` for migrate/seed/start

---

## Known Limitations
- No authentication/authorization — demo uses a manual user id.
- No pagination — fine for small seed/test data.
- Minimal validation — dates are validated and ordering is enforced; richer business rules are out of scope.

---

## Repository

Code is hosted in a public Git repository (GitHub or Bitbucket are both acceptable per the assignment). Share your repo link with the reviewer.

---

## Author
Yehudit Shapira — https://github.com/yeudit20

