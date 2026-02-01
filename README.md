# Pastebin Lite

A modern, lightweight pastebin application built with Next.js and Supabase PostgreSQL for persistent storage.

![Pastebin Lite](https://img.shields.io/badge/Next.js-16-black) ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green) ![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)

## ✨ Features

- 📝 Create text pastes with optional TTL (time-to-live) and view limits
- 🔗 Share pastes via unique URLs
- ⏰ Automatic expiration based on time or view count
- 🛡️ Safe content rendering (XSS protection)
- 🚀 RESTful API
- 🎨 Clean, modern UI with professional design
- 📱 Fully responsive design

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime**: Node.js
- **Database**: Supabase PostgreSQL
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MubbassirKhan/Pastebin)

### Environment Variables for Vercel

Add these environment variables in your Vercel project settings:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key | ✅ |
| `NEXT_PUBLIC_APP_URL` | Your production URL (e.g., https://your-app.vercel.app) | Optional |

## 📦 Database Setup

This application uses **Supabase PostgreSQL** for persistent storage.
- Reliable PostgreSQL database
- Real-time capabilities
- Row-level security
- Auto-generated REST APIs
- Built-in authentication (expandable for future features)

### Database Schema

The application uses a single `pastes` table:

```sql
CREATE TABLE pastes (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  max_views INTEGER,
  view_count INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_pastes_expires_at ON pastes(expires_at);
```

## API Endpoints

### Health Check
```
GET /api/healthz
```
Returns `{ "ok": true }` with HTTP 200 if the service and database are healthy.

### Create Paste
```
POST /api/pastes
Content-Type: application/json

{
  "content": "Your paste content here",
  "ttl_seconds": 3600,    // Optional: expire after N seconds
  "max_views": 10         // Optional: expire after N views
}
```

Response:
```json
{
  "id": "abc123xyz",
  "url": "https://your-domain.vercel.app/p/abc123xyz"
}
```

### Get Paste (API)
```
GET /api/pastes/:id
```

Response:
```json
{
  "content": "Your paste content here",
  "remaining_views": 9,           // null if no view limit
  "expires_at": "2024-01-01T00:00:00.000Z"  // null if no TTL
}
```

**Note**: Each successful API fetch increments the view count.

### View Paste (HTML)
```
GET /p/:id
```
Returns an HTML page displaying the paste content with a copy button.

## Running Locally

### Prerequisites

- Node.js 22+ 
- npm or yarn
- Supabase account (free tier available at https://supabase.com)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/MubbassirKhan/Pastebin.git
   cd Pastebin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   
   - Create a new project at https://supabase.com
   - Go to SQL Editor and run the database schema (see Database Schema section above)
   - Get your API credentials from Settings > API

4. Set up environment variables:
   
   Create a `.env.local` file with your Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   TEST_MODE=1
   NODE_ENV=development  
   ```

   **For Production (Vercel):** Set `NEXT_PUBLIC_APP_URL=https://pastylink.vercel.app` in Vercel dashboard.  
   See [VERCEL_SETUP.md](./VERCEL_SETUP.md) for detailed instructions.

it 
5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open http://localhost:3000 in your browser

## Project Structure

```
Pastebin/
├── app/
│   ├── api/
│   │   ├── healthz/
│   │   │   └── route.ts           # Health check endpoint
│   │   └── pastes/
│   │       ├── route.ts           # POST create paste
│   │       └── [id]/
│   │           └── route.ts       # GET fetch paste
│   ├── p/
│   │   └── [id]/
│   │       ├── page.tsx           # HTML paste viewer
│   │       └── not-found.tsx      # 404 page
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page (create paste)
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Supabase client (browser)
│   │   ├── server.ts              # Supabase server client
│   │   └── types.ts               # Database type definitions
│   ├── utils/
│   │   ├── paste-id.ts            # ID generation
│   │   ├── time.ts                # Time/expiry utilities
│   │   └── validation.ts          # Request validation
│   └── constants.ts               # App constants
├── types/
│   └── paste.ts                   # TypeScript interfaces
├── .env.example                   # Example environment variables
├── package.json
├── tsconfig.json
└── README.md
```