/**
 * Mock Redis implementation for local development
 * Falls back to in-memory storage when Redis is not configured
 */

interface SetOptions {
  ex?: number;
}

class MockRedis {
  private store: Map<string, { data: string; expiresAt?: number }> = new Map();
  private checkInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Periodically clean up expired entries every 10 seconds
    this.checkInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, value] of this.store.entries()) {
        if (value.expiresAt && now >= value.expiresAt) {
          this.store.delete(key);
        }
      }
    }, 10000);
  }

  async set(key: string, value: string, options?: SetOptions): Promise<string> {
    let expiresAt: number | undefined;
    if (options?.ex) {
      expiresAt = Date.now() + options.ex * 1000;
    }

    this.store.set(key, { data: value, expiresAt });
    return 'OK';
  }

  async get<T = string>(key: string): Promise<T | null> {
    const entry = this.store.get(key);
    if (!entry) {
      return null;
    }

    // Check if expired
    if (entry.expiresAt && Date.now() >= entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    try {
      return JSON.parse(entry.data) as T;
    } catch {
      return entry.data as T;
    }
  }

  async del(key: string): Promise<number> {
    const existed = this.store.has(key);
    this.store.delete(key);
    return existed ? 1 : 0;
  }

  async ping(): Promise<string> {
    return 'PONG';
  }

  destroy(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }
}

export default MockRedis;
