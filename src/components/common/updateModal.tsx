import { useUpdate } from '#/hooks/useUpdate'

const UpdateModal: React.FC = () => {
    const { status, checkForUpdates, installUpdate } = useUpdate();

    return (
        <div>
            {status.type === 'update-available' && (
                <div>
                    New version {status.version} available. <button onClick={checkForUpdates}>Download</button>
                </div>
            )}
            {status.type === 'download-progress' && (
                <div>Downloading: {status.progress?.toFixed(1)}%</div>
            )}
            {status.type === 'update-downloaded' && (
                <div>
                    Update downloaded. <button onClick={installUpdate}>Install now</button>
                </div>
            )}
            {status.type === 'error' && (
                <div>Error: {status.message}</div>
            )}
            {/* etc */}
        </div>
    );

}
export default UpdateModal;