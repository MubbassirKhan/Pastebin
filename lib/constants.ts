// Environment detection
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// App URL with proper defaults based on environment
// Priority: NEXT_PUBLIC_APP_URL > VERCEL_PROJECT_PRODUCTION_URL > VERCEL_URL > localhost
export const APP_URL = 
  process.env.NEXT_PUBLIC_APP_URL || 
  (IS_PRODUCTION 
    ? process.env.VERCEL_PROJECT_PRODUCTION_URL 
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` 
      : process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : '' 
    : 'http://localhost:3000');

// Paste configuration
export const PASTE_ID_LENGTH = 10;

// Test mode flag
export const TEST_MODE = process.env.TEST_MODE === '1';
