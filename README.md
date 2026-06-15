# AI-Powered Coding Interview Platform

A modern Next.js application built to help developers prepare for technical interviews with real coding practice, user authentication, email verification, and problem submission evaluation.

## 🚀 Project Overview

This platform is designed to support interactive interview preparation with:
- User sign-up, sign-in, and account verification
- OAuth login with GitHub and Google
- Problem exploration and search/filtering
- Secure code submission and test case validation
- MongoDB-backed user management and progress tracking

## 🧩 Key Features

- **Authentication**
  - Email/password credentials
  - GitHub and Google OAuth
  - Verified user flow with OTP email verification
- **Problem browsing**
  - Search and filter by difficulty
  - Problem list with difficulty labels
- **Code execution**
  - Submit solutions to backend test case runner
  - TypeScript transpilation supported for submissions
- **Account verification**
  - OTP generation and expiry handling
  - Resend verification code endpoint
- **Modern UI**
  - Tailwind-style dark interface with responsive components
  - Built with Chakra UI, Lucide icons, and Framer Motion support

## 📁 Project Structure

- `app/` — Next.js app routes, UI pages, providers, and API endpoints
- `app/api/` — Backend API routes for auth, signup, verify, submission, and email handling
- `app/components/` — Reusable UI components for editor, auth forms, and problem display
- `lib/` — Database connectors, execution helpers, problem/test case data, and email client setup
- `models/` — Mongoose user model and schema definitions
- `helpers/` — Email helper for resend verification messages
- `Schemas/` — Input validation schemas using Zod
- `types/` — NextAuth type augmentations

## 🛠️ Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS / `@tailwindcss/postcss`
- MongoDB + Mongoose
- NextAuth.js for authentication
- Resend for transactional email delivery
- `bcrypt` for password hashing
- `react-hook-form` / Zod for validation
- Monaco / Ace editor integrations for code editing

## ⚙️ Environment Variables

Create a `.env.local` file with the following variables:

```bash
MONGODB_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
GITHUB_ID=your_github_oauth_client_id
GITHUB_SECRET=your_github_oauth_client_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

> Note: `NEXTAUTH_URL` should match the running app URL. For production, update the value accordingly.

## 🧪 Local Setup

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## 🔐 Authentication Flow

1. User signs up with email, username, and password.
2. Platform stores a 6-digit OTP and expiry timestamp.
3. User receives verification code by email.
4. User enters OTP to verify their account.
5. Authenticated users can submit coding problems and track progress.

## ✅ Usage

- `GET /` — Landing page
- `GET /signin` — Sign in page
- `GET /signup` — Sign up page
- `GET /verify` — Verify account page
- `GET /explore` — Browse problems
- `GET /question/[id]` — Problem detail and code editor
- `POST /api/signup` — Register new users
- `POST /api/verify-code` — Verify OTP codes
- `POST /api/ManageVerification` — Resend verification email
- `POST /api/submit` — Run code against test cases and record success

## 🔧 Notes for Developers

- The backend submission route uses `@/lib/runCode` for executing user code.
- `app/api/submit/route.ts` validates session before running tests.
- User verification relies on `verifyCode` and `verifyCode_Expiry` fields in MongoDB.
- OAuth still requires valid provider credentials and setup in GitHub/Google.

## 📌 Future Improvements

- Add full problem detail page with editor + expected output preview
- Improve code execution security and sandboxing
- Add user dashboard and progress analytics
- Expand problem bank and categories
- Add comments, discussions, and interview-style timed sessions

## 📝 License

This repository is available for customization and improvement.

---

If you need help configuring the environment or extending the platform, feel free to ask.
