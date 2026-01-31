import type { CreatePasteRequest } from '@/types/paste';

export interface ValidationError {
  message: string;
}

export function validateCreatePasteRequest(
  body: any
): { valid: true; data: CreatePasteRequest } | { valid: false; error: ValidationError } {
  // Check if content exists and is a non-empty string
  if (!body.content || typeof body.content !== 'string' || body.content.trim() === '') {
    return {
      valid: false,
      error: { message: 'content is required and must be a non-empty string' }
    };
  }

  // Validate ttl_seconds if present
  if (body.ttl_seconds !== undefined) {
    if (!Number.isInteger(body.ttl_seconds) || body.ttl_seconds < 1) {
      return {
        valid: false,
        error: { message: 'ttl_seconds must be an integer >= 1' }
      };
    }
  }

  // Validate max_views if present
  if (body.max_views !== undefined) {
    if (!Number.isInteger(body.max_views) || body.max_views < 1) {
      return {
        valid: false,
        error: { message: 'max_views must be an integer >= 1' }
      };
    }
  }

  return {
    valid: true,
    data: {
      content: body.content,
      ttl_seconds: body.ttl_seconds,
      max_views: body.max_views
    }
  };
}
