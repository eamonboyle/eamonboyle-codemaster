# CodeMaster

CodeMaster is an interactive coding learning system featuring challenges, courses, and code execution capabilities.

## Tech Stack

- [Create T3 App](https://create.t3.gg/) - The best way to start a full-stack, typesafe Next.js app
- [Next.js](https://nextjs.org/) - The React Framework for the Web
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- [Clerk](https://clerk.com) - Authentication

## Features

- [ ] Interactive coding challenges
- [ ] Comprehensive courses
- [x] Real-time code execution
- [ ] User progress tracking

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start Postgres locally: `docker compose up -d` (uses the default `DATABASE_URL` in `.env.example`, or set your own in `.env`)
4. Run `cp .env.example .env` and set `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (from the [Clerk dashboard](https://dashboard.clerk.com)); keep `DATABASE_URL` as in the example if you use the Docker Compose service
5. Generate the Prisma client: `npx prisma generate` (also runs on `npm install` and `npm run build`)
6. Apply the database: `npx prisma migrate dev` (or `npx prisma db push` for a quick local setup) — Prisma 7 no longer auto-runs generate on migrate; use `npx prisma migrate deploy` in production
7. Optional seed data: `npx prisma db seed` (migrations no longer auto-seed; run this explicitly)
8. Start the dev server: `npm run dev`

## Contributing

Contributions are welcome! Please read our contributing guidelines for details.

## License

This project is licensed under the MIT License - see the LICENSE file for details.