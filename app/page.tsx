'use client';

import { useState } from 'react';

export default function HomePage() {
  const [content, setContent] = useState('');
  const [ttlSeconds, setTtlSeconds] = useState('');
  const [maxViews, setMaxViews] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createdUrl, setCreatedUrl] = useState('');
  const [copied, setCopied] = useState(false);

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
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Pastebin Lite</h1>
                <p className="text-xs text-slate-500">Share text snippets instantly</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="/about" className="text-sm text-slate-600 hover:text-slate-900 transition-colors no-underline hidden sm:block">
                About
              </a>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium text-xs hidden sm:block">● Online</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Share Code & Text <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Instantly</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Create secure, shareable links for your text content with optional expiration and view limits.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 pb-12">
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr,380px] gap-8">
          {/* Editor Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/50 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-sm font-medium text-slate-600">New Paste</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">{content.length} chars</span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="// Paste your code or text here...\n\nYour content will be securely stored and shareable via a unique link."
                className="w-full h-[420px] px-5 py-4 bg-white font-mono text-sm text-slate-800 resize-none focus:outline-none placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Options Card */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/50 overflow-hidden">
              <div className="px-5 py-4 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Paste Settings
                </h2>
              </div>
              
              <div className="p-5 space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Expiration Time
                  </label>
                  <input
                    type="number"
                    value={ttlSeconds}
                    onChange={(e) => setTtlSeconds(e.target.value)}
                    placeholder="Enter seconds (e.g., 3600 = 1 hour)"
                    min="1"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
                    <span>💡</span> Leave empty for no expiration
                  </p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Limit
                  </label>
                  <input
                    type="number"
                    value={maxViews}
                    onChange={(e) => setMaxViews(e.target.value)}
                    placeholder="Max number of views"
                    min="1"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
                    <span>🔒</span> Auto-delete after reaching limit
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white py-4 px-6 rounded-xl font-semibold text-sm shadow-lg shadow-slate-300 hover:shadow-xl hover:shadow-slate-400 hover:from-slate-800 hover:to-slate-700 disabled:from-slate-300 disabled:to-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Paste...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Paste
                </>
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-800">Error</p>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            )}

            {/* Success Message */}
            {createdUrl && (
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Paste Created!</p>
                    <p className="text-xs text-emerald-700">Your link is ready to share</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-3 border border-emerald-200 mb-4">
                  <p className="text-xs text-slate-500 mb-1">Shareable Link</p>
                  <p className="text-sm font-mono text-slate-800 break-all">{createdUrl}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        Copy URL
                      </>
                    )}
                  </button>
                  <a
                    href={createdUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-sm font-semibold text-white hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md no-underline"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open Paste
                  </a>
                </div>
              </div>
            )}

            {/* Info Card */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <h3 className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Quick Tips
              </h3>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Pastes without TTL never expire</li>
                <li>• Set view limits for sensitive content</li>
                <li>• Links are unique and secure</li>
              </ul>
            </div>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <p className="text-center text-sm text-slate-500">
            Built with ❤️ • Pastebin Lite © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
 