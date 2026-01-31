import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { getCurrentTime, isPasteExpired } from '@/lib/utils/time';

type PasteData = {
  id: string;
  content: string;
  created_at: string;
  expires_at: string | null;
  max_views: number | null;
  view_count: number;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get current time (supports TEST_MODE)
    const currentTime = getCurrentTime(request.headers);
    
    // Get paste from database
    const { data: paste, error } = await supabaseServer
      .from('pastes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !paste) {
      return NextResponse.json(
        { message: 'Paste not found' },
        { status: 404 }
      );
    }

    const pasteData = paste as PasteData;
    
    // Check if paste is expired by TTL
    if (isPasteExpired(pasteData.expires_at, currentTime)) {
      return NextResponse.json(
        { message: 'Paste not found' },
        { status: 404 }
      );
    }
    
    // Check if view limit exceeded BEFORE incrementing
    if (pasteData.max_views !== null && pasteData.view_count >= pasteData.max_views) {
      return NextResponse.json(
        { message: 'Paste not found' },
        { status: 404 }
      );
    }
    
    // Increment view count atomically
    const updateData: any = { view_count: pasteData.view_count + 1 };
    const { data: updatedPaste, error: updateError } = await (supabaseServer
      .from('pastes') as any)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (updateError || !updatedPaste) {
      return NextResponse.json(
        { message: 'Failed to fetch paste' },
        { status: 500 }
      );
    }

    const updatedPasteData = updatedPaste as PasteData;
    
    // Calculate remaining views after increment
    let remainingViews: number | null = null;
    if (updatedPasteData.max_views !== null) {
      remainingViews = Math.max(0, updatedPasteData.max_views - updatedPasteData.view_count);
    }
    
    return NextResponse.json({
      content: updatedPasteData.content,
      remaining_views: remainingViews,
      expires_at: updatedPasteData.expires_at,
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching paste:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
