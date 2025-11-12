import { app, BrowserWindow, Tray, Menu, ipcMain, screen } from 'electron';
import * as path from 'path';

const PROD_URL = process.env.VERCEL_PROD_URL || 'https://YOUR-APP.vercel.app';

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let isClickThrough = false;

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
  // createTray(); // Disabled until proper icon is added

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
