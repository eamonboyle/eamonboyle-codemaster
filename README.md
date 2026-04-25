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
3. Run `cp .env.example .env` and set `DATABASE_URL`, `CLERK_SECRET_KEY`, and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (from the [Clerk dashboard](https://dashboard.clerk.com))
4. Apply the database: `npx prisma migrate deploy` (or `npx prisma db push` for a quick local setup)
5. Optional seed data: `npx prisma db seed`
6. Start the dev server: `npm run dev`

## Contributing

Contributions are welcome! Please read our contributing guidelines for details.

## License

This project is licensed under the MIT License - see the LICENSE file for details.