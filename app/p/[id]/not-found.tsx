'use client';

import Lottie from 'lottie-react';
import animationData from '@/public/404_paste.json';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      {/* Header */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <a href="/" className="flex items-center gap-3 no-underline w-fit">
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
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="text-center max-w-md">
          <div className="w-64 h-64 mx-auto mb-6">
            <Lottie animationData={animationData} loop={true} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Paste Not Found</h2>
          <p className="text-slate-600 mb-8">
            The paste you're looking for doesn't exist, has expired, or has reached its view limit.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white no-underline text-sm font-semibold rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Paste
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <p className="text-center text-sm text-slate-500">
            Built with ❤️ • Pastebin Lite © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
