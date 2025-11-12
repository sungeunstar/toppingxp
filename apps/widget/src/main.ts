import { app, BrowserWindow, Tray, Menu, ipcMain, screen } from 'electron';
import * as path from 'path';

const PROD_URL = process.env.VERCEL_PROD_URL || 'https://toppingxp.vercel.app';

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let isClickThrough = false;
let isLocked = true; // Always on top by default

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    x: width - 420,
    y: 20,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadURL(PROD_URL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function updateWindowSize(width: number, height: number) {
  if (mainWindow) {
    const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
    mainWindow.setSize(width, height);
    // Keep widget positioned at top-right
    mainWindow.setPosition(screenWidth - width - 20, 20);
  }
}

function createDragBarContextMenu() {
  return Menu.buildFromTemplate([
    {
      label: isLocked ? '🔓 Unlock (Disable Always on Top)' : '🔒 Lock (Enable Always on Top)',
      click: () => {
        isLocked = !isLocked;
        if (mainWindow) {
          mainWindow.setAlwaysOnTop(isLocked);
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Window Size',
      submenu: [
        {
          label: 'Small (350 × 500)',
          click: () => updateWindowSize(350, 500)
        },
        {
          label: 'Medium (400 × 600)',
          click: () => updateWindowSize(400, 600)
        },
        {
          label: 'Large (500 × 800)',
          click: () => updateWindowSize(500, 800)
        },
        {
          label: 'Extra Large (600 × 900)',
          click: () => updateWindowSize(600, 900)
        }
      ]
    },
    { type: 'separator' },
    {
      label: 'Toggle Click-Through',
      type: 'checkbox',
      checked: isClickThrough,
      click: () => {
        isClickThrough = !isClickThrough;
        if (mainWindow) {
          mainWindow.setIgnoreMouseEvents(isClickThrough, { forward: true });
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Reload',
      click: () => {
        if (mainWindow) {
          mainWindow.reload();
        }
      }
    },
    {
      label: 'Hide',
      click: () => {
        if (mainWindow) {
          mainWindow.hide();
        }
      }
    }
  ]);
}

function createTray() {
  const iconPath = path.join(__dirname, '../assets/icon.png');
  tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Toggle Click-Through',
      type: 'checkbox',
      checked: isClickThrough,
      click: () => {
        isClickThrough = !isClickThrough;
        if (mainWindow) {
          mainWindow.setIgnoreMouseEvents(isClickThrough, { forward: true });
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Window Size',
      submenu: [
        {
          label: 'Small (350 × 500)',
          click: () => updateWindowSize(350, 500)
        },
        {
          label: 'Medium (400 × 600)',
          click: () => updateWindowSize(400, 600)
        },
        {
          label: 'Large (500 × 800)',
          click: () => updateWindowSize(500, 800)
        },
        {
          label: 'Extra Large (600 × 900)',
          click: () => updateWindowSize(600, 900)
        }
      ]
    },
    { type: 'separator' },
    {
      label: 'Show',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
        }
      }
    },
    {
      label: 'Hide',
      click: () => {
        if (mainWindow) {
          mainWindow.hide();
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Reload',
      click: () => {
        if (mainWindow) {
          mainWindow.reload();
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.quit();
      }
    }
  ]);

  tray.setToolTip('ToppingXP Widget');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
      }
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('toggle-click-through', () => {
  isClickThrough = !isClickThrough;
  if (mainWindow) {
    mainWindow.setIgnoreMouseEvents(isClickThrough, { forward: true });
  }
});

ipcMain.on('show-context-menu', () => {
  if (mainWindow) {
    const menu = createDragBarContextMenu();
    menu.popup({ window: mainWindow });
  }
});

ipcMain.on('set-window-size', (_, width: number, height: number) => {
  updateWindowSize(width, height);
});

ipcMain.on('set-always-on-top', (_, flag: boolean) => {
  isLocked = flag;
  if (mainWindow) {
    mainWindow.setAlwaysOnTop(flag);
  }
});

ipcMain.on('close-window', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});
