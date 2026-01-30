'use client';

import { useState } from 'react';

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
  
  .nav-link {
    font-size: 14px;
    color: #64748b;
    text-decoration: none;
  }
  
  .nav-link:hover {
    color: #3b82f6;
  }
  
  .main {
    flex: 1;
    padding: 32px 24px;
  }
  
  .container {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 24px;
  }
  
  @media (max-width: 900px) {
    .container {
      grid-template-columns: 1fr;
    }
  }
  
  .editor-section {
    display: flex;
    flex-direction: column;
  }
  
  .section-title {
    font-size: 14px;
    font-weight: 500;
    color: #64748b;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .editor-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .editor-header {
    padding: 12px 16px;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .editor-label {
    font-size: 13px;
    font-weight: 500;
    color: #475569;
  }
  
  .char-count {
    font-size: 12px;
    color: #94a3b8;
  }
  
  textarea {
    flex: 1;
    min-height: 400px;
    padding: 16px;
    border: none;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 14px;
    color: #1e293b;
    resize: none;
    line-height: 1.6;
    background: #fff;
  }
  
  textarea:focus {
    outline: none;
  }
  
  textarea::placeholder {
    color: #94a3b8;
  }
  
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 20px;
  }
  
  .card-title {
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 16px;
  }
  
  .form-group {
    margin-bottom: 16px;
  }
  
  .form-group:last-child {
    margin-bottom: 0;
  }
  
  label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: #475569;
    margin-bottom: 6px;
  }
  
  input[type="number"] {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 14px;
    color: #1e293b;
    font-family: 'Inter', sans-serif;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  
  input[type="number"]:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  input[type="number"]::placeholder {
    color: #94a3b8;
  }
  
  .hint {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 4px;
  }
  
  .submit-btn {
    width: 100%;
    padding: 12px 20px;
    background: #3b82f6;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .submit-btn:hover:not(:disabled) {
    background: #2563eb;
  }
  
  .submit-btn:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
  }
  
  .alert {
    padding: 14px 16px;
    border-radius: 6px;
    font-size: 14px;
  }
  
  .alert-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
  }
  
  .alert-success {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #16a34a;
  }
  
  .result-title {
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .result-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 12px;
    padding: 10px 12px;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
  }
  
  .result-url {
    font-family: 'Fira Code', monospace;
    font-size: 13px;
    color: #16a34a;
    text-decoration: none;
    word-break: break-all;
  }
  
  .result-url:hover {
    text-decoration: underline;
  }
  
  .copy-btn {
    padding: 6px 12px;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    color: #475569;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
  }
  
  .copy-btn:hover {
    background: #e2e8f0;
  }
  
  .copy-btn.copied {
    background: #dcfce7;
    border-color: #bbf7d0;
    color: #16a34a;
  }
`;

export default function HomePage() {
  const [content, setContent] = useState('');
  const [ttlSeconds, setTtlSeconds] = useState('');
  const [maxViews, setMaxViews] = useState('');
  const [result, setResult] = useState<{ id: string; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const body: Record<string, unknown> = { content };
      
      if (ttlSeconds.trim()) {
        const ttl = parseInt(ttlSeconds, 10);
        if (isNaN(ttl) || ttl < 1) {
          setError('TTL must be an integer >= 1');
          setLoading(false);
          return;
        }
        body.ttl_seconds = ttl;
      }
      
      if (maxViews.trim()) {
        const views = parseInt(maxViews, 10);
        if (isNaN(views) || views < 1) {
          setError('Max views must be an integer >= 1');
          setLoading(false);
          return;
        }
        body.max_views = views;
      }

      const response = await fetch('/api/pastes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create paste');
        return;
      }

      setResult(data);
      setContent('');
      setTtlSeconds('');
      setMaxViews('');
    } catch {
      setError('Failed to create paste. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (result?.url) {
      await navigator.clipboard.writeText(result.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-content">
            <a href="/" className="logo">Pastebin Lite</a>
            <a href="/api/healthz" className="nav-link">API Status</a>
          </div>
        </nav>

        <main className="main">
          <form className="container" onSubmit={handleSubmit}>
            <div className="editor-section">
              <div className="section-title">Content</div>
              <div className="editor-card">
                <div className="editor-header">
                  <span className="editor-label">Plain Text</span>
                  <span className="char-count">{content.length} characters</span>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your content here..."
                  required
                />
              </div>
            </div>

            <div className="sidebar">
              <div className="card">
                <div className="card-title">Settings</div>
                <div className="form-group">
                  <label htmlFor="ttl">Expiration (seconds)</label>
                  <input
                    type="number"
                    id="ttl"
                    value={ttlSeconds}
                    onChange={(e) => setTtlSeconds(e.target.value)}
                    placeholder="Optional"
                    min={1}
                    suppressHydrationWarning
                  />
                  <div className="hint">Leave empty for no expiration</div>
                </div>
                <div className="form-group">
                  <label htmlFor="maxViews">Max Views</label>
                  <input
                    type="number"
                    id="maxViews"
                    value={maxViews}
                    onChange={(e) => setMaxViews(e.target.value)}
                    placeholder="Optional"
                    min={1}
                    suppressHydrationWarning
                  />
                  <div className="hint">Leave empty for unlimited</div>
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading || !content.trim()}>
                {loading ? 'Creating...' : 'Create Paste'}
              </button>

              {error && (
                <div className="alert alert-error">{error}</div>
              )}

              {result && (
                <div className="alert alert-success">
                  <div className="result-title">Paste created successfully</div>
                  <div>ID: {result.id}</div>
                  <div className="result-row">
                    <a href={result.url} target="_blank" rel="noopener noreferrer" className="result-url">
                      {result.url}
                    </a>
                    <button type="button" className={`copy-btn ${copied ? 'copied' : ''}`} onClick={copyToClipboard}>
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
