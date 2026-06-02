# RoomieMatch

RoomieMatch is a full-stack web app for finding compatible roommates and exploring apartments together.  
Instead of matching only by budget, it uses lifestyle preferences (sleep schedule, cleanliness, smoking, pets, and housing situation) to help users discover better-fit people before choosing a home.

## What The App Does

- User registration and login
- Profile management (including profile photo)
- Roommate discovery feed and filter-based search
- Compatibility scoring between users
- Apartment browsing with filters and map view
- Save/unsave apartments and view liked apartments in profile

## Tech Stack

### Frontend (`client/`)

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion (animations)
- React Router
- Leaflet + React Leaflet (map and markers)
- Lucide React (icons)

### Backend (`server/`)

- Node.js + Express
- Prisma ORM
- PostgreSQL
- Prisma seed/migrations for demo data
- JWT / bcrypt dependencies prepared for auth workflows

## Project Structure

```text
roomiematch/
  client/   # React frontend
  server/   # Express + Prisma backend
```

## Getting Started

### 1) Install dependencies

```bash
# frontend
cd client
npm install

# backend
cd ../server
npm install
```

### 2) Configure environment variables

Create `server/.env` with your database connection:

```env
DATABASE_URL="postgresql://<user>@127.0.0.1:5432/<database>?schema=public"
PORT=5001
```

### 3) Run database migrations and seed

From `server/`:

```bash
npx prisma migrate deploy
npx prisma db seed
```

### 4) Start the app

In separate terminals:

```bash
# backend
cd server
npm run dev
```

```bash
# frontend
cd client
npm run dev
```

Then open: `http://localhost:5173`

## Available Scripts

### Frontend

- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run lint` - lint frontend code
- `npm run preview` - preview production build

### Backend

- `npm run dev` - start API with nodemon
- `npm run start` - start API in production mode
- `npm run prisma:migrate` - create/apply Prisma migrations (dev)
- `npm run prisma:seed` - seed demo users/apartments
- `npm run prisma:studio` - open Prisma Studio

## API Overview

- `GET /api/health` - health check
- `GET /api/apartments` - list apartments (supports filter query params)
- `POST /api/apartments` - create apartment
- `GET /api/users` - list users for roommate matching

## Notes

- Roommate search and profile session behavior in the UI currently relies on local storage for the logged-in user session.
- The backend provides apartment and user data via Prisma/PostgreSQL.

---

If you want, I can also add a section with sample screenshots and a short product demo flow.
