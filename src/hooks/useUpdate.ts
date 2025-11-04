import { useEffect, useState } from "react"
import { UpdateStatus } from "../../electron/preload"

type status = UpdateStatus

export function useUpdate() {
    const [status, setStatus] = useState({ type: 'update-not-available' } as status);

    useEffect(() => {
        window.electronAPI.onUpdateStatus((newStatus: status) => {
            setStatus(newStatus);
        });
    }, []);

    const checkForUpdates = () => window.electronAPI.triggerUpdateCheck();

    const installUpdate = () => window.electronAPI.triggerUpdateInstall();

    return {
        status,
        checkForUpdates,
        installUpdate
    }
}