export default function NotFoundPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Paste Not Found</title>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            color: #1e293b;
          }
          .container {
            text-align: center;
            padding: 40px;
          }
          h1 {
            font-size: 48px;
            color: #0f172a;
            margin-bottom: 16px;
          }
          p {
            font-size: 16px;
            color: #64748b;
            margin-bottom: 24px;
          }
          a {
            display: inline-block;
            padding: 10px 20px;
            background: #3b82f6;
            color: white;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 500;
          }
          a:hover {
            background: #2563eb;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <h1>404</h1>
          <p>Paste not found, expired, or view limit exceeded.</p>
          <a href="/">Create New Paste</a>
        </div>
      </body>
    </html>
  );
}
