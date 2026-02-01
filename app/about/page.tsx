'use client';

import { useState } from 'react';

export default function AboutPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

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
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full p-1 shadow-2xl">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MK
              </span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Mubbassir Khan Jahagirdar</h1>
          <p className="text-xl text-slate-600 mb-4">Full Stack Developer</p>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Passionate developer creating modern web applications with cutting-edge technologies. 
            Building Pastebin Lite to make sharing code snippets simple and elegant.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {/* Email */}
          <div 
            onClick={() => copyToClipboard('mubbassirkhanj96@gmail.com', 'email')}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-1">Email</p>
                <p className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                  mubbassirkhanj96@gmail.com
                </p>
              </div>
              <div className="text-slate-400 group-hover:text-slate-600">
                {copied === 'email' ? (
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Phone */}
          <div 
            onClick={() => copyToClipboard('+91 7619175596', 'phone')}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-1">Phone</p>
                <p className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                  +91 7619175596
                </p>
              </div>
              <div className="text-slate-400 group-hover:text-slate-600">
                {copied === 'phone' ? (
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Connect With Me</h2>
          </div>
          <div className="p-6 grid sm:grid-cols-3 gap-4">
            {/* GitHub */}
            <a
              href="https://github.com/MubbassirKhan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all no-underline group"
            >
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">GitHub</p>
                <p className="text-xs text-slate-500">@MubbassirKhan</p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/mubbassir-khan-jahagirdar-081715271"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all no-underline group"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">LinkedIn</p>
                <p className="text-xs text-slate-500">Connect</p>
              </div>
            </a>

            {/* Portfolio */}
            <a
              href="https://mubbassirkhan.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all no-underline group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">Portfolio</p>
                <p className="text-xs text-slate-500">View Work</p>
              </div>
            </a>
          </div>
        </div>

        {/* About the Project */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">About Pastebin Lite</h2>
          </div>
          <div className="p-6">
            <p className="text-slate-600 mb-4">
              Pastebin Lite is a modern, lightweight text sharing application built with cutting-edge technologies:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">N</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">Next.js 16</p>
                  <p className="text-xs text-slate-500">React Framework</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">S</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">Supabase</p>
                  <p className="text-xs text-slate-500">PostgreSQL Database</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">T</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">Tailwind CSS</p>
                  <p className="text-xs text-slate-500">Styling</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">▲</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">Vercel</p>
                  <p className="text-xs text-slate-500">Deployment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <p className="text-center text-sm text-slate-500">
            Built with ❤️ by Mubbassir Khan Jahagirdar • Pastebin Lite © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
