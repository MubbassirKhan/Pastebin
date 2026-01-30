const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
  
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
  }
  
  .logo {
    font-size: 18px;
    font-weight: 600;
    color: #0f172a;
    text-decoration: none;
  }
  
  .main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
  }
  
  .content {
    text-align: center;
    max-width: 400px;
  }
  
  .error-code {
    font-size: 72px;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 16px;
  }
  
  .title {
    font-size: 24px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 8px;
  }
  
  .message {
    color: #64748b;
    font-size: 15px;
    margin-bottom: 24px;
  }
  
  .home-link {
    display: inline-block;
    padding: 12px 24px;
    background: #3b82f6;
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    border-radius: 6px;
    transition: background 0.2s;
  }
  
  .home-link:hover {
    background: #2563eb;
  }
`;

export default function NotFound() {
  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-content">
            <a href="/" className="logo">Pastebin Lite</a>
          </div>
        </nav>

        <main className="main">
          <div className="content">
            <div className="error-code">404</div>
            <h1 className="title">Paste Not Found</h1>
            <p className="message">The paste you're looking for doesn't exist, has expired, or has reached its view limit.</p>
            <a href="/" className="home-link">Create New Paste</a>
          </div>
        </main>
      </div>
    </>
  );
}
