'use client';

import { useEffect, useState } from 'react';
import { isElectron } from '@toppingxp/shared';

declare global {
  interface Window {
    electronAPI?: {
      showContextMenu: () => void;
      setWindowSize: (width: number, height: number) => void;
      setAlwaysOnTop: (flag: boolean) => void;
      toggleClickThrough: () => void;
    };
  }
}

export default function DragHandle() {
  const [inElectron, setInElectron] = useState(false);

  useEffect(() => {
    setInElectron(isElectron());
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.electronAPI) {
      window.electronAPI.showContextMenu();
    }
  };

  if (!inElectron) return null;

  return (
    <div
      className="drag-handle"
      onContextMenu={handleContextMenu}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '32px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
        WebkitAppRegion: 'drag',
        zIndex: 9999,
        cursor: 'move',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.6)',
        userSelect: 'none'
      } as React.CSSProperties}
    >
      ⋮⋮⋮ Drag to move · Right-click for options
    </div>
  );
}
