import { NextResponse } from 'next/server';
import { checkDbConnection } from '@/lib/db';

export async function GET() {
  try {
    const dbOk = await checkDbConnection();
    
    if (!dbOk) {
      return NextResponse.json(
        { ok: false, error: 'Database connection failed' },
        { status: 503 }
      );
    }
    
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
