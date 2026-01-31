import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { generatePasteId } from '@/lib/utils/paste-id';
import { validateCreatePasteRequest } from '@/lib/utils/validation';
import { getCurrentTime, calculateExpiryDate } from '@/lib/utils/time';
import { APP_URL } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    let body: any;
    
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: 'Invalid JSON body' },
        { status: 400 }
      );
    }
    
    // Validate request
    const validation = validateCreatePasteRequest(body);
    if (!validation.valid) {
      return NextResponse.json(
        { message: validation.error.message },
        { status: 400 }
      );
    }
    
    const { content, ttl_seconds, max_views } = validation.data;
    
    // Generate unique ID
    const id = generatePasteId();
    
    // Get current time (supports TEST_MODE)
    const currentTime = getCurrentTime(request.headers);
    
    // Calculate expiry time
    let expiresAt: string | null = null;
    if (ttl_seconds) {
      const expiryDate = calculateExpiryDate(ttl_seconds, currentTime);
      expiresAt = expiryDate.toISOString();
    }
    
    // Insert paste into database
    const { error } = await supabaseServer
      .from('pastes')
      .insert({
        id,
        content,
        created_at: currentTime.toISOString(),
        expires_at: expiresAt,
        max_views: max_views ?? null,
        view_count: 0
      } as any);
    
    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { message: 'Failed to create paste' },
        { status: 500 }
      );
    }
    
    // Return response
    const url = `${APP_URL}/p/${id}`;
    return NextResponse.json(
      { id, url },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
