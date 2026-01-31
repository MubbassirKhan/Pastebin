# Pastebin Lite

A simple, lightweight pastebin application built with Next.js and Supabase PostgreSQL for persistent storage.

## Features

- Create text pastes with optional TTL (time-to-live) and view limits
- Share pastes via unique URLs
- Automatic expiration based on time or view count
- Safe content rendering (XSS protection)
- RESTful API
- Clean, modern UI for creating and viewing pastes

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime**: Node.js
- **Persistence**: Supabase PostgreSQL
- **Deployment**: Vercel

## Persistence Layer

This application uses **Supabase PostgreSQL** for persistent storage. Supabase provides:
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

- Node.js 18+ 
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
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open http://localhost:3000 in your browser

## Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Connect your repository to Vercel:
   - Go to https://vercel.com
   - Import your GitHub repository
   - Add environment variables from `.env.local`
   - Deploy

3. Update `NEXT_PUBLIC_APP_URL` in Vercel environment variables to your deployed URL

## Design Decisions

### 1. **Supabase PostgreSQL for Persistence**
   - Chose PostgreSQL over Redis/KV for better relational data handling
   - Supabase provides auto-generated REST APIs and real-time capabilities
   - Free tier is generous for small projects
   - Built-in authentication ready for future user accounts feature

### 2. **View Count Logic**
   - Only API calls (`/api/pastes/:id`) increment view count
   - HTML page views (`/p/:id`) do not count to avoid accidental consumption
   - View limit is checked BEFORE incrementing to ensure exact limit enforcement

### 3. **TTL Implementation**
   - TTL stored as absolute timestamp (`expires_at`) rather than duration
   - Supports deterministic testing via `x-test-now-ms` header when `TEST_MODE=1`
   - Expired pastes return 404 immediately (no cleanup job needed)

### 4. **Safe Content Rendering**
   - Paste content is rendered in `<pre>` tags with proper escaping
   - React automatically escapes content to prevent XSS attacks
   - No syntax highlighting to keep implementation simple

### 5. **Anonymous Pastes**
   - No authentication required for creating/viewing pastes
   - Simpler user experience for quick sharing
   - Can be extended with Supabase Auth in future

### 6. **ID Generation**
   - Using `nanoid` with 10 characters for URL-friendly IDs
   - Short, unique, and collision-resistant
   - Better UX than UUIDs for sharing

### 7. **Error Handling**
   - All errors return proper HTTP status codes (400, 404, 500)
   - Consistent JSON error format: `{ "message": "error description" }`
   - 404 for all unavailable cases (not found, expired, view limit)

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

## Testing

The application supports deterministic time testing:

1. Set `TEST_MODE=1` environment variable
2. Send `x-test-now-ms` header with milliseconds since epoch
3. Expiry logic will use the header value as current time

Example:
```bash
curl -X POST https://your-app.vercel.app/api/pastes \
  -H "Content-Type: application/json" \
  -H "x-test-now-ms: 1609459200000" \
  -d '{"content": "test", "ttl_seconds": 60}'
```

## License

MIT
   ```env
   KV_REST_API_URL=https://your-redis.upstash.io
   KV_REST_API_TOKEN=your-token
   ```

   You can get these from the Upstash console or Vercel integration.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Test Mode

For deterministic testing, set `TEST_MODE=1` and use the `x-test-now-ms` header to control the current time for expiry logic:

```bash
TEST_MODE=1 npm run dev
```

Then make requests with the custom time header:
```bash
curl -H "x-test-now-ms: 1700000000000" http://localhost:3000/api/pastes/abc123
```

## Deployment to Vercel

1. Push your code to GitHub

2. Import the project in Vercel

3. Add a KV database:
   - Go to your project dashboard in Vercel
   - Navigate to Storage → Create Database → KV
   - Connect it to your project

4. Deploy! Vercel will automatically:
   - Build the Next.js application
   - Configure environment variables for Redis
   - Deploy to the edge

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `KV_REST_API_URL` | Upstash Redis REST API URL | Yes |
| `KV_REST_API_TOKEN` | Upstash Redis REST API token | Yes |
| `UPSTASH_REDIS_REST_URL` | Alternative to KV_REST_API_URL | No |
| `UPSTASH_REDIS_REST_TOKEN` | Alternative to KV_REST_API_TOKEN | No |
| `TEST_MODE` | Enable test mode (set to `1`) | No |

## License

MIT
