'use client';

import { useState, useEffect } from 'react';
import { isElectron } from '@toppingxp/shared';
import Link from 'next/link';

export default function Home() {
  const [inElectron, setInElectron] = useState(false);

  useEffect(() => {
    setInElectron(isElectron());
  }, []);

  return (
    <main className="container">
      <h1>ToppingXP</h1>

      {inElectron && (
        <div className="electron-badge">
          Running in Electron Widget
        </div>
      )}

      <p>Welcome to ToppingXP - Your productivity companion</p>

      <div className="links">
        <Link href="/download">Download Widget</Link>
      </div>
    </main>
  );
}
