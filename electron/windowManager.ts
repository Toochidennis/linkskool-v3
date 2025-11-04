import { BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';


//const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

export class WindowManager {
    private mainWindow?: BrowserWindow;

    public createWindow() {
        this.mainWindow = new BrowserWindow({
            icon: path.join(process.env.VITE_PUBLIC, 'logo.svg'),
            webPreferences: {
                contextIsolation: true,
                nodeIntegration: false,
                preload: path.join(__dirname, 'preload.mjs'),
            },
        })

        this.mainWindow.setMenu(null);
        this.mainWindow.maximize();

        // // Test active push message to Renderer-process.
        // this.mainWindow?.webContents.on('did-finish-load', () => {
        //     this.mainWindow?.webContents.send('main-process-message', (new Date).toLocaleString())
        // })

        if (VITE_DEV_SERVER_URL) {
            this.mainWindow.loadURL(VITE_DEV_SERVER_URL)
            this.mainWindow.webContents.openDevTools();
        } else {
            // this.mainWindow.loadFile('dist/index.html')
            this.mainWindow.loadFile(path.join(RENDERER_DIST, 'index.html'))
        }
    }

    public getWindow(): BrowserWindow | undefined {
        return this.mainWindow;
    }

    public hasWindow(): boolean {
        return !!this.mainWindow;
    }

    public focus() {
        if (this.mainWindow) {
            if (this.mainWindow.isMinimized()) {
                this.mainWindow.restore();
            }
            this.mainWindow.show();
            this.mainWindow.focus();
        }
    }
}
