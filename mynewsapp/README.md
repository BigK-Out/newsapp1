# ForPeople News

A local-news site built with Next.js 14 (App Router), React 18 and MongoDB (Mongoose).

Readers get a front page, latest stories, categories, search, and saved stories (kept in the browser's localStorage). Editors sign in to write, edit and delete stories.

## Setup

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev
```

Open http://localhost:3000.

| Variable | Purpose |
| --- | --- |
| `MONGO_URL` | MongoDB connection string. If the database can't be reached, the site serves read-only demo stories from `src/lib/seed.ts`. |
| `EDITOR_PASSWORD` | Password for `/login`. Signing in sets an httpOnly cookie that unlocks the editor pages and the write API. If unset, editing is open under `npm run dev` and disabled in production. |

## Layout

- `src/app/` – pages and API routes (`/api/postitems`, `/api/postitems/[id]`)
- `src/app/components/` – UI components
- `src/lib/` – data access (`posts.ts`), editor auth (`auth.ts`), formatting helpers, demo data
- `config/db.ts` – cached Mongo connection
- `models/` – Mongoose schema and request field whitelisting/validation

## API

| Method | Path | Auth |
| --- | --- | --- |
| `GET` | `/api/postitems` | public |
| `POST` | `/api/postitems` | editor |
| `GET` | `/api/postitems/[id]` | public |
| `PUT` | `/api/postitems/[id]` | editor |
| `DELETE` | `/api/postitems/[id]` | editor |

`title`, `img`, `category` and `brief` are required on create and can't be blanked on update.
