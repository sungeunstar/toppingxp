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
      closeWindow: () => void;
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

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.electronAPI) {
      window.electronAPI.closeWindow();
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
      <span>⋮⋮⋮ Drag to move · Right-click for options</span>
      <button
        onClick={handleClose}
        style={{
          position: 'absolute',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '20px',
          height: '20px',
          border: 'none',
          background: 'rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.7)',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: 'bold',
          transition: 'all 0.2s',
          WebkitAppRegion: 'no-drag',
          padding: 0
        } as React.CSSProperties}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,0,0,0.8)';
          e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
        }}
      >
        ×
      </button>
    </div>
  );
}
