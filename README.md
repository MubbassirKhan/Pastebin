# Pastebin Lite

A simple, lightweight pastebin application built with Next.js and Upstash Redis for persistent storage.

## Features

- Create text pastes with optional TTL (time-to-live) and view limits
- Share pastes via unique URLs
- Automatic expiration based on time or view count
- Safe content rendering (XSS protection)
- RESTful API
- Minimal UI for creating and viewing pastes

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Runtime**: Node.js
- **Persistence**: Upstash Redis (via Vercel integration)
- **Deployment**: Vercel

## Persistence Layer

This application uses **Upstash Redis** for persistent storage. Upstash Redis provides:
- Low-latency key-value storage
- Automatic TTL support for paste expiration
- Durable storage across deployments
- Serverless-friendly REST API

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

### View Paste (HTML)
```
GET /p/:id
```
Returns an HTML page displaying the paste content.

## Running Locally

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Redis instance (local or remote)

### Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd pastebin-lite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   
   Create a `.env.local` file with your Upstash Redis credentials:
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
