# Vacation Management Interface — Getting Started

This guide explains how to run the app locally. It covers both the API (server) and Web UI (client).

Requirements
- Node.js 18+

Backend (API)
- cd server
- npm install
- npm run migrate
- npm run seed
- npm run dev

Notes
- API listens on http://localhost:3001
- SQLite DB file is created at server/db/dev.sqlite3
- Seed users: Requester id=1, Validator id=2

Frontend (Web UI)
- cd client
- npm install
- npm run dev
- Open http://localhost:5173 (Vite proxies /api → http://localhost:3001)

Usage
- Requester: /requester — submit a request (user id 1), view your list
- Validator: /validator — filter by status, approve/reject with optional comment

API Overview
- GET /api/health — health check
- POST /api/requests — create request { user_id, start_date, end_date, reason? }
- GET /api/requests — list requests (query: user_id?, status?)
- POST /api/requests/:id/approve — approve
- POST /api/requests/:id/reject — reject { comments? }

Tests (Backend)
- cd server
- npm install
- npm test

Switch to PostgreSQL (Optional)
- Install driver: in `server/` run `npm i pg`
- Config: `server/knexfile.js` has a `production` profile using env vars:
  - `PG_HOST`, `PG_PORT`, `PG_DATABASE`, `PG_USER`, `PG_PASSWORD` (and optional SSL)
- Use env: set `NODE_ENV=production` when running migrate/seed/server
  - PowerShell: `$env:NODE_ENV='production'`
  - CMD: `set NODE_ENV=production`
  - Bash: `NODE_ENV=production`
- Migrate/seed on Postgres:
  - `NODE_ENV=production npm run migrate`
  - `NODE_ENV=production npm run seed`
- Start server on Postgres:
  - `NODE_ENV=production npm run dev`

Known Limitations
- No authentication (user id entered manually for demo)
- No pagination (keep dataset small); can be added via query params

Author
- Yehudit Shapira — https://github.com/yeudit20
