import { Redis } from '@upstash/redis';

// In-memory storage for local development (when Redis is not configured)
const memoryStore = new Map<string, { data: string; expiresAt: number | null }>();

// Check if Redis is configured
const isRedisConfigured = !!(
  (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) &&
  (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN)
);

// Initialize Redis client only if configured
const redis = isRedisConfigured
  ? new Redis({
      url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '',
      token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
    })
  : null;

// Memory store helper functions
function memoryGet(key: string): string | null {
  const item = memoryStore.get(key);
  if (!item) return null;
  if (item.expiresAt && Date.now() >= item.expiresAt) {
    memoryStore.delete(key);
    return null;
  }
  return item.data;
}

function memorySet(key: string, value: string, ttlSeconds?: number): void {
  const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : null;
  memoryStore.set(key, { data: value, expiresAt });
}

function memoryDel(key: string): void {
  memoryStore.delete(key);
}

export interface Paste {
  id: string;
  content: string;
  created_at: number; // timestamp in ms
  expires_at: number | null; // timestamp in ms or null
  max_views: number | null;
  view_count: number;
}

/**
 * Get the current time in milliseconds.
 * In TEST_MODE, uses x-test-now-ms header if provided.
 */
export function getCurrentTime(testNowMs?: string | null): number {
  if (process.env.TEST_MODE === '1' && testNowMs) {
    const parsed = parseInt(testNowMs, 10);
    if (!isNaN(parsed)) {
      return parsed;
    }
  }
  return Date.now();
}

/**
 * Check if a paste has expired based on TTL or view count
 */
export function isPasteExpired(paste: Paste, currentTime: number): boolean {
  // Check TTL expiry
  if (paste.expires_at !== null && currentTime >= paste.expires_at) {
    return true;
  }
  
  // Check view count expiry
  if (paste.max_views !== null && paste.view_count >= paste.max_views) {
    return true;
  }
  
  return false;
}

/**
 * Get remaining views for a paste
 */
export function getRemainingViews(paste: Paste): number | null {
  if (paste.max_views === null) {
    return null;
  }
  return Math.max(0, paste.max_views - paste.view_count);
}

/**
 * Create a new paste in the database
 */
export async function createPaste(paste: Paste): Promise<void> {
  const key = `paste:${paste.id}`;
  
  // Calculate TTL in seconds for Redis expiry (if applicable)
  let ttlSeconds: number | undefined;
  if (paste.expires_at !== null) {
    const now = Date.now();
    ttlSeconds = Math.ceil((paste.expires_at - now) / 1000);
    if (ttlSeconds <= 0) {
      ttlSeconds = 1; // Minimum 1 second
    }
  }
  
  if (redis) {
    if (ttlSeconds) {
      await redis.set(key, JSON.stringify(paste), { ex: ttlSeconds });
    } else {
      await redis.set(key, JSON.stringify(paste));
    }
  } else {
    // Use in-memory store for local development
    memorySet(key, JSON.stringify(paste), ttlSeconds);
  }
}

/**
 * Get a paste by ID
 */
export async function getPaste(id: string): Promise<Paste | null> {
  const key = `paste:${id}`;
  
  let data: string | null;
  if (redis) {
    data = await redis.get<string>(key);
  } else {
    data = memoryGet(key);
  }
  
  if (!data) {
    return null;
  }
  
  // Handle both string and object responses from Redis
  if (typeof data === 'string') {
    return JSON.parse(data) as Paste;
  }
  return data as unknown as Paste;
}

/**
 * Increment view count for a paste (atomic operation)
 */
export async function incrementViewCount(id: string): Promise<Paste | null> {
  const key = `paste:${id}`;
  
  // Get current paste
  const paste = await getPaste(id);
  if (!paste) {
    return null;
  }
  
  // Increment view count
  paste.view_count += 1;
  
  // Calculate remaining TTL
  let ttlSeconds: number | undefined;
  if (paste.expires_at !== null) {
    const now = Date.now();
    ttlSeconds = Math.ceil((paste.expires_at - now) / 1000);
    if (ttlSeconds <= 0) {
      // Already expired, delete it
      await deletePaste(id);
      return null;
    }
  }
  
  // Update with remaining TTL
  if (redis) {
    if (ttlSeconds) {
      await redis.set(key, JSON.stringify(paste), { ex: ttlSeconds });
    } else {
      await redis.set(key, JSON.stringify(paste));
    }
  } else {
    memorySet(key, JSON.stringify(paste), ttlSeconds);
  }
  
  return paste;
}

/**
 * Delete a paste by ID
 */
export async function deletePaste(id: string): Promise<void> {
  const key = `paste:${id}`;
  if (redis) {
    await redis.del(key);
  } else {
    memoryDel(key);
  }
}

/**
 * Check database connectivity
 */
export async function checkDbConnection(): Promise<boolean> {
  if (!redis) {
    // In-memory mode for local development
    console.log('Using in-memory storage (no Redis configured)');
    return true;
  }
  try {
    await redis.ping();
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

export { redis };
