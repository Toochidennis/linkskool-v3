export { }

declare global {
    interface Window {
        electronAPI: {
            onUpdateStatus: (listener: (status: UpdateStatus) => void) => void;
            triggerUpdateCheck: () => void;
            triggerUpdateInstall: () => void;
        }
    }
}