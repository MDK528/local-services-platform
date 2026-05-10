# Urbidore

A full-stack platform that connects customers with local service professionals and manages the complete job lifecycle — from booking to review.

---

## Project Approach

Built schema-first. Every architectural decision started at the database level before a single route was written. The data model drove the API design, which drove the frontend structure. This order prevented the most common cause of mid-project rewrites — discovering a schema can't support the feature you're building.

**Order of development:**
1. ER diagram and schema design
2. Drizzle models and migrations
3. Backend modules (auth → categories → services → providers → bookings → reviews → admin)
4. Frontend (customer UI → provider dashboard → admin panel)


---

## Tech Stack

**Backend**
- Node.js + Express 5
- TypeScript (strict mode)
- PostgreSQL 17 (Docker) - Development
- Supabase Connection String - Production
- Drizzle ORM

**Frontend**
- React + TypeScript
- Tailwind CSS
- shadcn/ui

**Auth**
- JWT (access + refresh token pattern)
- HTTP-only cookies
- 3-role system: `customer`, `provider`, `admin`

**Dev Tools**
- Docker (PostgreSQL only — not used for production)
- Drizzle Studio (database inspection)
- Postman (API testing)

---

## Architecture

Modular folder structure. Each feature is a self-contained module with its own controller, service, routes, DTOs, and model.

```
src/
├── common/
│   ├── config/         # DB connection, mail transport
│   ├── dto/            # Base DTO class (Zod)
│   ├── middleware/      # validate, authenticate, authorize
│   └── utils/          # ApiError, ApiResponse, JWT helpers
├── modules/
│   ├── auth/
│   ├── categories/
│   ├── services/
│   ├── providers/
│   ├── bookings/
│   ├── reviews/
│   └── admin/          # No model — operates on other modules' tables
├── app.ts
└── server.ts
```

---

## Database Schema

**Key design decisions:**

**`providers` uses a shared primary key** — `providerId` is both a PK and a FK pointing to `auth.id`. A provider is a user first. No separate UUID is generated; the identity is shared across both tables. This enforces a strict 1-to-1 relationship at the database level.

**`provider_services` is a junction table** — providers and services have a many-to-many relationship. A provider can offer multiple services; a service can be offered by multiple providers. The composite PK `(providerId, serviceId)` enforces that a provider can only register the same service once.

**`bookings.status` is a state machine enum** — booking states are mutually exclusive, not independent flags. A booking moves through exactly one state at a time:

```
requested → confirmed → in_progress → completed → cancelled
```

**`bookings.bookingPrice` is a price snapshot** — service prices are platform-defined and can change. The price at the time of booking is recorded directly on the booking row so historical records stay accurate regardless of future price updates.

**`reviews` are tied to bookings** — a review requires a `bookingId` FK. This enforces that only customers with a real completed booking can leave a review, preventing unverified reviews at the database level.

---

## Modules

### Auth
JWT-based authentication with access and refresh tokens stored in HTTP-only cookies. Supports email verification and password reset via tokenized email links.

Routes: `POST /sign-up`, `POST /sign-in`, `POST /sign-out`, `GET /get-me`, `POST /refresh-accesstoken`, `POST /forgot-password`, `PATCH /reset-password`, `PATCH /verify-email`

### Categories & Services
Platform-defined service catalog managed by admins. Customers browse by category (Electrician, Plumbing, Cleaning) then select specific services (AC Repair, Pipe Fitting). Services carry a fixed platform price.

### Providers
Provider profiles are extensions of the auth table. Providers register as users first, then a provider profile is created. Providers select which platform services they offer via `provider_services`.

### Bookings
Full booking lifecycle with state machine transitions. Customers create bookings by selecting a provider and service. Price is snapshotted at creation time. Optional before/after images are stored in a separate `booking_images` table.

### Reviews
Customers can leave multiple reviews for the same provider across different bookings. Each review is tied to a specific `bookingId` to enforce verified reviews only.

### Admin
No dedicated model. Admin manages categories and services (full CRUD), views all bookings with force-cancel capability, and can verify or unverify providers (toggle). All admin routes are protected via `authenticate` + `authorize('admin')` middleware.

---

## Key Learnings

**Schema design is the most important phase.** Mistakes made in the data model surface as the hardest bugs to fix later — not TypeScript errors, not logic bugs, but structural gaps that require migrations and cascading changes across the entire codebase.

**State machines belong in enums, not boolean columns.** Modeling booking status as five separate boolean columns (`isRequested`, `isConfirmed`, etc.) is a common mistake. Mutually exclusive states should be a single enum column — one source of truth, impossible to be in two states simultaneously.

**Drizzle reads SQL column names, not TypeScript keys.** The string passed to `uuid('column_name')` is what Drizzle compares during migration generation. Renaming only the TypeScript property generates no migration. Both must change together.

**Junction tables enforce relational constraints that application code shouldn't.** The `provider_services` composite PK makes duplicate service registrations impossible at the database level — no validation code required.

---

## Local Setup

**Prerequisites:** Node.js, Docker, pnpm

```bash
# Clone the repository
git clone https://github.com/MDK528/urbidore
cd urbidore

# Install dependencies
pnpm install

# Start PostgreSQL
docker compose up -d

# Configure environment
cp .env.example .env
# Fill in POSTGRES_URL, JWT secrets, SMTP credentials

# Run migrations
pnpm db:generate
pnpm db:migrate or npx drizzle-kit push

# Start development server
pnpm dev
```

---

## Environment Variables

```env
PORT=
POSTGRES_URL=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

---

---
[Frontend Repo](https://github.com/MDK528/urbidore-frontend)
---

---

## Author

**Md Khalid Hossain**  
GitHub: [@MDK528](https://github.com/MDK528)