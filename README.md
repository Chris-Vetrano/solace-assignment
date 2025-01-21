## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

## Database Setup

The project uses PostgreSQL for data storage. You have two options:

### Option 1: Using Docker (Recommended)

1. Start the PostgreSQL container:

```bash
docker compose up -d
```

2. Run database migrations:

```bash
npm run migrate:up
```

3. Seed the database:

```bash
npm run seed
```

### Option 2: Using Your Own PostgreSQL Instance

1. Create a database named `solaceassignment`

2. Update the `DATABASE_URL` in your `.env` file to point to your PostgreSQL instance

3. Run database migrations:

```bash
npm run migrate:up
```

4. Seed the database:

```bash
npm run seed
```
