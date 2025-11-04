import { WindowManager } from "./windowManager"
import { UpdaterService } from './services/updateService'

export class MainApp {
    private windowManager: WindowManager
    private updaterService!: UpdaterService

    constructor() {
        this.windowManager = new WindowManager();
    }

    public async init() {
        this.windowManager.createWindow()

        this.updaterService = new UpdaterService(this.windowManager.getWindow()!)
        this.updaterService.checkNow()
    }

    public activate() {
        if (!this.windowManager.hasWindow()) {
            this.windowManager.createWindow()
        }
    }

    public focusWindow() {
        this.windowManager.focus()
    }
}
