import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function GET() {
  try {
    // Test database connection by running a simple query
    const { error } = await supabaseServer
      .from('pastes')
      .select('id')
      .limit(1);
    
    if (error) {
      return NextResponse.json({ ok: false }, { status: 200 });
    }
    
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
