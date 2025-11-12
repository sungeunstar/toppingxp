import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  toggleClickThrough: () => ipcRenderer.send('toggle-click-through'),
  showContextMenu: () => ipcRenderer.send('show-context-menu'),
  setWindowSize: (width: number, height: number) => ipcRenderer.send('set-window-size', width, height),
  setAlwaysOnTop: (flag: boolean) => ipcRenderer.send('set-always-on-top', flag)
});
