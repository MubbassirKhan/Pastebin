import { TEST_MODE } from '../constants';

/**
 * Get current time for expiry logic
 * Supports deterministic time via x-test-now-ms header when TEST_MODE=1
 */
export function getCurrentTime(headers?: Headers): Date {
  const isTestMode = TEST_MODE;
  
  if (isTestMode && headers) {
    const testNowMs = headers.get('x-test-now-ms');
    if (testNowMs) {
      const timestamp = parseInt(testNowMs, 10);
      if (!isNaN(timestamp)) {
        return new Date(timestamp);
      }
    }
  }
  
  return new Date();
}

/**
 * Calculate expiry date from TTL seconds
 */
export function calculateExpiryDate(ttlSeconds: number, currentTime: Date): Date {
  return new Date(currentTime.getTime() + ttlSeconds * 1000);
}

/**
 * Check if a paste has expired
 */
export function isPasteExpired(expiresAt: string | null, currentTime: Date): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt) <= currentTime;
}
