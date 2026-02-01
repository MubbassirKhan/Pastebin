import { notFound } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase/server';
import PasteContent from './paste-content';

interface PageProps {
  params: Promise<{ id: string }>;
}

interface PasteData {
  id: string;
  content: string;
  created_at: string;
  expires_at: string | null;
  max_views: number | null;
  view_count: number;
}

export default async function PastePage({ params }: PageProps) {
  const { id } = await params;

  const { data: paste, error } = await supabaseServer
    .from('pastes')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !paste) {
    notFound();
  }

  const data = paste as PasteData;

  // Check if paste is expired or view limit exceeded
  const now = new Date();
  const isExpired = data.expires_at && new Date(data.expires_at) < now;
  const viewLimitExceeded = data.max_views !== null && data.view_count >= data.max_views;

  if (isExpired || viewLimitExceeded) {
    notFound();
  }

  return <PasteContent pasteId={id} content={data.content} />;
}
  