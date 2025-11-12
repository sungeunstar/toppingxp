import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  toggleClickThrough: () => ipcRenderer.send('toggle-click-through')
});
