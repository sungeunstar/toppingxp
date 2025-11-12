'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Download() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setInstallable(false);
    }
  };

  return (
    <main className="container">
      <h1>Download ToppingXP</h1>

      <div className="download-container">
        <h2>Desktop Widget (Windows)</h2>
        <p>Download the desktop widget for always-on-top productivity.</p>
        <div style={{ marginTop: '1rem' }}>
          <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            위젯이 아직 빌드되지 않았습니다. 릴리즈를 만들려면:
          </p>
          <ol style={{ color: '#666', fontSize: '0.875rem', marginLeft: '1.5rem' }}>
            <li>위젯을 빌드하거나</li>
            <li>Git 태그를 생성하여 자동 빌드 (예: git tag v1.0.0)</li>
          </ol>
          <a
            href="https://github.com/sungeunstar/toppingxp/releases"
            className="download-button"
            style={{ opacity: 0.6, marginTop: '1rem', display: 'inline-block' }}
          >
            GitHub Releases 보기
          </a>
        </div>
      </div>

      <div className="download-container" style={{ marginTop: '2rem' }}>
        <h2>Progressive Web App</h2>
        <p>Install as a web app on any device.</p>

        {installable ? (
          <button
            onClick={handleInstallPWA}
            className="install-pwa-button"
          >
            Install PWA
          </button>
        ) : (
          <p style={{ color: '#666', fontSize: '0.875rem' }}>
            Open this page in a browser to install the PWA
          </p>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link href="/">← Back to Home</Link>
      </div>
    </main>
  );
}
