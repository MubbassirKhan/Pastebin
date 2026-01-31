import { nanoid } from 'nanoid';

/**
 * Generate a unique paste ID
 * Using nanoid with 10 characters for URL-friendly IDs
 */
export function generatePasteId(): string {
  return nanoid(10);
}
