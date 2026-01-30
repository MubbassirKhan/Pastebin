import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { createPaste, getCurrentTime, Paste } from '@/lib/db';
import { headers } from 'next/headers';

interface CreatePasteRequest {
  content?: unknown;
  ttl_seconds?: unknown;
  max_views?: unknown;
}

export async function POST(request: NextRequest) {
  try {
    let body: CreatePasteRequest;
    
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      );
    }
    
    // Validate content
    if (body.content === undefined || body.content === null) {
      return NextResponse.json(
        { error: 'content is required' },
        { status: 400 }
      );
    }
    
    if (typeof body.content !== 'string') {
      return NextResponse.json(
        { error: 'content must be a string' },
        { status: 400 }
      );
    }
    
    if (body.content.length === 0) {
      return NextResponse.json(
        { error: 'content cannot be empty' },
        { status: 400 }
      );
    }
    
    // Validate ttl_seconds (optional)
    let ttlSeconds: number | null = null;
    if (body.ttl_seconds !== undefined && body.ttl_seconds !== null) {
      if (typeof body.ttl_seconds !== 'number' || !Number.isInteger(body.ttl_seconds)) {
        return NextResponse.json(
          { error: 'ttl_seconds must be an integer' },
          { status: 400 }
        );
      }
      if (body.ttl_seconds < 1) {
        return NextResponse.json(
          { error: 'ttl_seconds must be >= 1' },
          { status: 400 }
        );
      }
      ttlSeconds = body.ttl_seconds;
    }
    
    // Validate max_views (optional)
    let maxViews: number | null = null;
    if (body.max_views !== undefined && body.max_views !== null) {
      if (typeof body.max_views !== 'number' || !Number.isInteger(body.max_views)) {
        return NextResponse.json(
          { error: 'max_views must be an integer' },
          { status: 400 }
        );
      }
      if (body.max_views < 1) {
        return NextResponse.json(
          { error: 'max_views must be >= 1' },
          { status: 400 }
        );
      }
      maxViews = body.max_views;
    }
    
    // Generate unique ID
    const id = nanoid(10);
    
    // Get current time (supports TEST_MODE)
    const headersList = await headers();
    const testNowMs = headersList.get('x-test-now-ms');
    const now = getCurrentTime(testNowMs);
    
    // Calculate expiry time
    let expiresAt: number | null = null;
    if (ttlSeconds !== null) {
      expiresAt = now + (ttlSeconds * 1000);
    }
    
    // Create paste object
    const paste: Paste = {
      id,
      content: body.content,
      created_at: now,
      expires_at: expiresAt,
      max_views: maxViews,
      view_count: 0,
    };
    
    // Save to database
    await createPaste(paste);
    
    // Build response URL
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host') || 'localhost:3000';
    const url = `${protocol}://${host}/p/${id}`;
    
    return NextResponse.json(
      { id, url },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating paste:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
