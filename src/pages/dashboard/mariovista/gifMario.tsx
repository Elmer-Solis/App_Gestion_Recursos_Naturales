

export const GifMario = () => {
    return (
        <div style={{ width: '100%', height: '0', paddingBottom: '100%', position: 'relative' }}>
            <iframe
                src="https://giphy.com/embed/JcFUHp7b9mnj5a01AN"
                width="100%"
                height="100%"
                style={{ position: 'absolute' }}
                frameBorder="0"
                allowFullScreen
                title="GIF de Giphy"
            ></iframe>
        </div>
    )
}