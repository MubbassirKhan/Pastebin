'use client';

import Lottie from 'lottie-react';
import animationData from '@/public/404_paste.json';
export default function NotFoundPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Paste Not Found</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <nav className="bg-white/80 backdrop-blur border-b border-neutral-200 px-6 py-4">
            <div className="max-w-5xl mx-auto">
              <a href="/" className="text-2xl font-semibold tracking-tight text-slate-900 no-underline">
                Pastebin Lite
              </a>
            </div>
          </nav>
          <main className="flex-1 flex items-center justify-center px-6 py-10">
            <div className="text-center max-w-md">
              <div className="w-64 h-64 mx-auto mb-4">
                  <Lottie animationData={animationData} loop={true} />
                </div>
              <h1 className="text-2xl font-semibold text-slate-900 mb-2">Paste Not Found</h1>
              <p className="text-slate-500 text-sm mb-6">
                The paste you're looking for doesn't exist, has expired, or has reached its view limit.
              </p>
              <a href="/" className="inline-block px-6 py-3 bg-black text-white no-underline text-sm font-semibold rounded-xl hover:bg-neutral-800 transition-colors shadow-sm">
                Create New Paste
              </a>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
