# E-commerce User Interest Tracker with Auth

This project is an e-commerce website that allows users to sign up, log in, and mark categories they are interested in. It features a paginated list of categories and uses Next.js with tRPC for type-safe API calls.

## Features

- User Authentication:
  - Sign up with email and password
  - Login with email and password
  - Logout functionality
  - Persistent login sessions using JWT
- Email Verification:
  - OTP (One-Time Password) sent to user's email
  - Ability to resend OTP
  - Account activation upon successful verification
- Protected Routes:
  - Secure pages accessible only to authenticated users
- Category Interest Selection:
  - Paginated list of product categories
  - Users can select and save their interests
  - Interests persist across sessions
- Responsive Design:
  - Mobile-friendly interface
  - Adapts to various screen sizes
- Error Handling:
  - Informative error messages for user actions
  - Toast notifications for success and error states
- Security Features:
  - Password hashing
  - HTTP-only cookie

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [tRPC](https://trpc.io/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Prerequisites

- Node.js (v14 or later)
- npm or yarn or pnpm
- PostgreSQL database

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/VinayakaHegade/e-commerce-auth.git
cd e-commerce-auth
```

### 2. Install dependencies

```bash
pnpm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following variables:

```
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
JWT_SECRET="your_jwt_secret_key"
EMAIL_HOST=your-smtp-host
EMAIL_SERVICE=your-email-service-like-gmail
EMAIL_PORT=465
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=youremailpassword
EMAIL_USER_NAME=yourname
```

Replace the placeholders with your actual database credentials and secret keys.

### 4. Set up the database

```bash
npx prisma db push
```

### 5. Seed the database with categories

```bash
pnpm run db:seed
# or
yarn db:seed
```

### 6. Run the development server

```bash
pnpm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/pages`: Next.js pages
- `src/components`: React components
- `src/server/api`: tRPC API routes and utilities
- `src/lib`: Utility functions and schemas
- `prisma`: Database schema and migrations
