import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { getPaste, incrementViewCount, isPasteExpired, getCurrentTime, deletePaste } from '@/lib/db';

// Escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Fira+Code:wght@400;500&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f8fafc;
    min-height: 100vh;
    color: #1e293b;
  }
  
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .navbar {
    background: #fff;
    border-bottom: 1px solid #e2e8f0;
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
    font-size: 18px;
    font-weight: 600;
    color: #0f172a;
    text-decoration: none;
  }
  
  .new-paste-btn {
    padding: 8px 16px;
    background: #3b82f6;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    text-decoration: none;
    transition: background 0.2s;
  }
  
  .new-paste-btn:hover {
    background: #2563eb;
  }
  
  .main {
    flex: 1;
    padding: 32px 24px;
  }
  
  .container {
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .meta-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .paste-id {
    font-size: 14px;
    color: #64748b;
  }
  
  .paste-id code {
    font-family: 'Fira Code', monospace;
    background: #e2e8f0;
    padding: 2px 8px;
    border-radius: 4px;
    color: #0f172a;
  }
  
  .meta-items {
    display: flex;
    gap: 16px;
  }
  
  .meta-item {
    font-size: 13px;
    color: #64748b;
  }
  
  .meta-item strong {
    color: #0f172a;
  }
  
  .card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .card-title {
    font-size: 13px;
    font-weight: 500;
    color: #64748b;
  }
  
  .content {
    padding: 20px;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 14px;
    line-height: 1.6;
    color: #1e293b;
    max-height: 70vh;
    overflow-y: auto;
  }
`;

export default async function PastePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const headersList = await headers();
  const testNowMs = headersList.get('x-test-now-ms');
  const currentTime = getCurrentTime(testNowMs);
  
  const paste = await getPaste(id);
  
  if (!paste) {
    notFound();
  }
  
  if (isPasteExpired(paste, currentTime)) {
    await deletePaste(id);
    notFound();
  }
  
  const updatedPaste = await incrementViewCount(id);
  
  if (!updatedPaste) {
    notFound();
  }
  
  let remainingViews: number | null = null;
  if (updatedPaste.max_views !== null) {
    remainingViews = Math.max(0, updatedPaste.max_views - updatedPaste.view_count);
  }
  
  let expiresAtDisplay: string | null = null;
  if (updatedPaste.expires_at !== null) {
    expiresAtDisplay = new Date(updatedPaste.expires_at).toLocaleString();
  }
  
  const safeContent = escapeHtml(updatedPaste.content);
  
  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-content">
            <a href="/" className="logo">Pastebin Lite</a>
            <a href="/" className="new-paste-btn">New Paste</a>
          </div>
        </nav>

        <main className="main">
          <div className="container">
            <div className="meta-bar">
              <div className="paste-id">Paste ID: <code>{id}</code></div>
              <div className="meta-items">
                {remainingViews !== null && (
                  <div className="meta-item">Views remaining: <strong>{remainingViews}</strong></div>
                )}
                {expiresAtDisplay && (
                  <div className="meta-item">Expires: <strong>{expiresAtDisplay}</strong></div>
                )}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <span className="card-title">Content</span>
              </div>
              <pre className="content">{safeContent}</pre>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
