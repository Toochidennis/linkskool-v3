import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
  onUpdateStatus(listener: (status: UpdateStatus) => void) {
    ipcRenderer.on('update-status', (_event, status) => {
      listener(status)
    })
  },
  triggerUpdateCheck() {
    ipcRenderer.send('check-for-updates')
  },
  triggerUpdateInstall() {
    ipcRenderer.send('install-update')
  }
})

export type UpdateStatus =
  | { 'type': 'checking-for-update' }
  | { 'type': 'update-available', version: string }
  | { 'type': 'download-progress', progress: number }
  | { 'type': 'update-downloaded', version: string }
  | { 'type': 'update-not-available' }
  | { 'type': 'error', 'message': string }


