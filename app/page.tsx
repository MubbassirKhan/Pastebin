'use client';

import { useState } from 'react';

export default function HomePage() {
  const [content, setContent] = useState('');
  const [ttlSeconds, setTtlSeconds] = useState('');
  const [maxViews, setMaxViews] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createdUrl, setCreatedUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCreatedUrl('');
    setLoading(true);

    try {
      const body: any = { content };
      
      if (ttlSeconds) {
        const ttl = parseInt(ttlSeconds, 10);
        if (isNaN(ttl) || ttl < 1) {
          setError('TTL must be a positive integer');
          setLoading(false);
          return;
        }
        body.ttl_seconds = ttl;
      }
      
      if (maxViews) {
        const views = parseInt(maxViews, 10);
        if (isNaN(views) || views < 1) {
          setError('Max views must be a positive integer');
          setLoading(false);
          return;
        }
        body.max_views = views;
      }

      const response = await fetch('/api/pastes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to create paste');
        return;
      }

      setCreatedUrl(data.url);
      setContent('');
      setTtlSeconds('');
      setMaxViews('');
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(createdUrl);
  };

  return (
    <div className="min-h-screen">
      <nav className="bg-white/80 backdrop-blur border-b border-neutral-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-2xl font-semibold tracking-tight">Pastebin Lite</span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-[1fr,320px] gap-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Paste Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full h-96 px-4 py-3 border border-neutral-200 rounded-xl shadow-sm bg-white font-mono text-sm resize-none focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
            <p className="text-xs text-slate-500 mt-2">{content.length} characters</p>
          </div>

          <div className="space-y-5">
            <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">Options</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    TTL (seconds)
                  </label>
                  <input
                    type="number"
                    value={ttlSeconds}
                    onChange={(e) => setTtlSeconds(e.target.value)}
                    placeholder="Optional"
                    min="1"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <p className="text-xs text-slate-500 mt-1">Auto-expire after N seconds</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Max Views
                  </label>
                  <input
                    type="number"
                    value={maxViews}
                    onChange={(e) => setMaxViews(e.target.value)}
                    placeholder="Optional"
                    min="1"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <p className="text-xs text-slate-500 mt-1">Limit number of views</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="w-full bg-black text-white py-3 px-4 rounded-xl font-semibold tracking-wide hover:bg-neutral-900 disabled:bg-neutral-300 disabled:text-neutral-600 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating...' : 'Create Paste'}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm shadow-sm">
                {error}
              </div>
            )}

            {createdUrl && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
                <p className="text-sm font-medium text-green-900 mb-2">Paste created!</p>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={createdUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-neutral-200 rounded-lg text-sm"
                  />
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold hover:bg-neutral-900"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
 