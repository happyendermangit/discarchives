import CloseIcon from './CloseIcon.jsx';

export default function SettingsDialog({ modalRef, setPreviewAvatarUrl }) {
    function setPreviewAvatar(file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        if (!file.type.startsWith('image/')) {
            alert('Disallowed file type.');
            return;
        }
        fileReader.onload = () => {
            const base64 = fileReader.result;
            localStorage.preview_avatar = base64;
            setPreviewAvatarUrl(base64);
        };

        fileReader.onerror = (error) => {
            alert(error);
        };
    }
    function closeModal() {
        if (modalRef.current) modalRef.current.close();
    }

    return (
        <dialog ref={modalRef} className="modal">
            <div>
                <button className="close-button" onClick={closeModal}>
                    <CloseIcon></CloseIcon>
                </button>{' '}
                <h1 className="text-white">Settings</h1>
                <div>
                    <h4 className="text-white">Set the preview avatar:</h4>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => setPreviewAvatar(event.target.files[0])}
                    ></input>
                </div>
                <br />
                <button
                    onClick={() => {
                        localStorage.removeItem('preview_avatar');
                        setPreviewAvatarUrl(Symbol());
                    }}
                    style={{ width: '200px' }}
                >
                    Reset back to default.
                </button>
            </div>
        </dialog>
    );
}
