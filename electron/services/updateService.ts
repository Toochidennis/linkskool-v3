import { autoUpdater } from 'electron-updater';
import { ipcMain } from 'electron';
import log from 'electron-log';
import { UpdateStatus } from '../preload';

export class UpdaterService {
    private mainWindow: Electron.BrowserWindow;

    constructor(mainWindow: Electron.BrowserWindow) {
        this.mainWindow = mainWindow;
        log.transports.file.level = 'info';
        autoUpdater.logger = log

        this.registerListeners();
    }

    private registerListeners() {
        autoUpdater.on('checking-for-update', () => {
            this.sendStatus({ type: 'checking-for-update' })
        })

        autoUpdater.on('update-available', info => {
            this.sendStatus({ type: 'update-available', version: info.version })
        })

        autoUpdater.on('download-progress', (progress) => {
            this.sendStatus({ type: 'download-progress', progress: progress.percent })
        });

        autoUpdater.on('update-downloaded', info => {
            this.sendStatus({ type: 'update-downloaded', version: info.version })
        });

        autoUpdater.on('update-not-available', () => {
            this.sendStatus({ type: 'update-not-available' })
        });

        autoUpdater.on('error', (err) => {
            this.sendStatus({ type: 'error', message: err == null ? "unknown" : (err.message || String(err)) });
            log.error('Error during update:', err)
        });

        ipcMain.on('install-update', () => {
            autoUpdater.quitAndInstall()
        });
    }

    private sendStatus(status: UpdateStatus) {
        if (this.mainWindow) {
            this.mainWindow.webContents.send('update-status', status)
        }
    }

    public checkNow() {
        autoUpdater.checkForUpdates()
    }

    // public startInterval() {
    //     setInterval(() => {
    //         this.checkNow();
    //     }, this.intervalMs);
    //     log.info(`Updater interval started (every ${this.intervalMs / 60000} minutes).`);
    // }
}
