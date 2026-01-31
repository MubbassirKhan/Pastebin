import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { supabaseServer } from '@/lib/supabase/server';
import { getCurrentTime, isPasteExpired } from '@/lib/utils/time';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PastePage({ params }: PageProps) {
  const { id } = await params;
  const headersList = await headers();

  // Fetch paste from database (HTML view doesn't increment view count)
  const { data: paste, error } = await supabaseServer
    .from('pastes')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !paste) {
    notFound();
  }

  // Type assertion for paste data
  type PasteData = {
    id: string;
    content: string;
    created_at: string;
    expires_at: string | null;
    max_views: number | null;
    view_count: number;
  };
  
  const pasteData = paste as PasteData;

  // Check if paste is expired or view limit exceeded (supports TEST_MODE)
  const currentTime = getCurrentTime(headersList);
  const isExpired = isPasteExpired(pasteData.expires_at, currentTime);
  const viewLimitExceeded = pasteData.max_views !== null && pasteData.view_count >= pasteData.max_views;

  if (isExpired || viewLimitExceeded) {
    notFound();
  }

  const copyToClipboard = `
    function copyContent() {
      const content = document.getElementById('paste-content').textContent;
      navigator.clipboard.writeText(content).then(() => {
        const btn = document.getElementById('copy-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = originalText; }, 2000);
      });
    }
  `;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{`Paste - ${id}`}</title>
        <script dangerouslySetInnerHTML={{ __html: copyToClipboard }} />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f6f7fb;
            color: #0f172a;
          }
          .navbar {
            background: rgba(255,255,255,0.9);
            backdrop-filter: saturate(180%) blur(6px);
            border-bottom: 1px solid #e5e7eb;
            padding: 16px 24px;
          }
          .navbar-content {
            max-width: 1000px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .logo {
            font-size: 20px;
            font-weight: 600;
            text-decoration: none;
            color: #0f172a;
          }
          .new-btn {
            padding: 10px 16px;
            background: #000000;
            color: #ffffff;
            border-radius: 10px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
          }
          .main {
            max-width: 1000px;
            margin: 36px auto;
            padding: 0 24px;
          }
          .meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 18px;
            flex-wrap: wrap;
            gap: 12px;
          }
          .paste-id {
            font-size: 14px;
            color: #6b7280;
          }
          .card {
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 6px 12px rgba(16, 24, 40, 0.04);
          }
          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            background: #fafafa;
            border-bottom: 1px solid #e5e7eb;
          }
          .card-title {
            font-size: 13px;
            font-weight: 600;
            color: #6b7280;
          }
          .copy-btn {
            padding: 8px 12px;
            background: #000000;
            color: #ffffff;
            border: none;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
          }
          .copy-btn:hover {
            background: #111111;
          }
          .content {
            padding: 20px;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 14px;
            line-height: 1.6;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
        `}</style>
      </head>
      <body>
        <nav className="navbar">
          <div className="navbar-content">
            <a href="/" className="logo">Pastebin Lite</a>
            <a href="/" className="new-btn">New Paste</a>
          </div>
        </nav>
        <main className="main">
          <div className="meta">
            <div className="paste-id">Paste ID: <strong>{id}</strong></div>
          </div>
          <div className="card">
            <div className="card-header">
              <span className="card-title">Content</span>
              <button id="copy-btn" className="copy-btn" type="button">
                Copy
              </button>
            </div>
            <pre className="content" id="paste-content">{pasteData.content}</pre>
          </div>
        </main>
      </body>
    </html>
  );
}
  