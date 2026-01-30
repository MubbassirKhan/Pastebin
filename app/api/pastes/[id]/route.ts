import { NextRequest, NextResponse } from 'next/server';
import { getPaste, incrementViewCount, isPasteExpired, getRemainingViews, getCurrentTime, deletePaste } from '@/lib/db';
import { headers } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get current time (supports TEST_MODE)
    const headersList = await headers();
    const testNowMs = headersList.get('x-test-now-ms');
    const currentTime = getCurrentTime(testNowMs);
    
    // Get paste from database
    const paste = await getPaste(id);
    
    if (!paste) {
      return NextResponse.json(
        { error: 'Paste not found' },
        { status: 404 }
      );
    }
    
    // Check if paste is expired (by TTL or view count)
    if (isPasteExpired(paste, currentTime)) {
      // Clean up expired paste
      await deletePaste(id);
      return NextResponse.json(
        { error: 'Paste not found' },
        { status: 404 }
      );
    }
    
    // Increment view count
    const updatedPaste = await incrementViewCount(id);
    
    if (!updatedPaste) {
      return NextResponse.json(
        { error: 'Paste not found' },
        { status: 404 }
      );
    }
    
    // Calculate remaining views after increment
    let remainingViews: number | null = null;
    if (updatedPaste.max_views !== null) {
      remainingViews = Math.max(0, updatedPaste.max_views - updatedPaste.view_count);
    }
    
    // Format expires_at as ISO string or null
    let expiresAtIso: string | null = null;
    if (updatedPaste.expires_at !== null) {
      expiresAtIso = new Date(updatedPaste.expires_at).toISOString();
    }
    
    return NextResponse.json({
      content: updatedPaste.content,
      remaining_views: remainingViews,
      expires_at: expiresAtIso,
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching paste:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
