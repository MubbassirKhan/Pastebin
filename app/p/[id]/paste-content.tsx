'use client';

import { useState } from 'react';

interface PasteContentProps {
  pasteId: string;
  content: string;
}

export default function PasteContent({ pasteId, content }: PasteContentProps) {
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyLinkToClipboard = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const lineCount = content.split('\n').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 no-underline">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Pastebin Lite</h1>
                <p className="text-xs text-slate-500">Share text snippets instantly</p>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <a href="/about" className="text-sm text-slate-600 hover:text-slate-900 transition-colors no-underline hidden sm:block">
                About
              </a>
              <a
                href="/"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl text-sm font-semibold no-underline hover:from-slate-800 hover:to-slate-700 transition-all shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Paste
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              <span className="text-sm text-slate-600">ID: <span className="font-mono font-semibold text-slate-800">{pasteId}</span></span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              <span className="text-sm text-slate-600">{lineCount} lines • {content.length} chars</span>
            </div>
          </div>
          
          <button
            onClick={copyLinkToClipboard}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            {copiedLink ? (
              <>
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Link Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Link
              </>
            )}
          </button>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/50 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <span className="text-sm font-medium text-slate-600">Content</span>
            </div>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-lg text-sm font-semibold hover:from-slate-800 hover:to-slate-700 transition-all shadow-sm"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Content
                </>
              )}
            </button>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-50 border-r border-slate-200 flex flex-col items-end pr-3 pt-5 text-xs text-slate-400 font-mono select-none">
              {content.split('\n').map((_, i) => (
                <div key={i} className="leading-relaxed">{i + 1}</div>
              ))}
            </div>
            <pre className="pl-16 pr-5 py-5 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words m-0 text-slate-800 min-h-[200px]">
              {content}
            </pre>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6 justify-center">
          <a
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm no-underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Paste
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 mt-12">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <p className="text-center text-sm text-slate-500">
            Built with ❤️ • Pastebin Lite © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
