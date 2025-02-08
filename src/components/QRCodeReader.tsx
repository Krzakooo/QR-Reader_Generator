import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

const QRCodeReader: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [decodedText, setDecodedText] = useState<string | null>(null);
    const codeReader = new BrowserMultiFormatReader();

    useEffect(() => {
        const startVideo = async () => {
            if (videoRef.current) {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                videoRef.current.srcObject = stream;
                videoRef.current.setAttribute('playsinline', 'true'); // required to tell iOS Safari we don't want fullscreen
                videoRef.current.play();
                decodeQRCode();
            }
        };

        const decodeQRCode = () => {
            if (videoRef.current) {
                codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
                    if (result) {
                        setDecodedText(result.getText());
                    }
                    if (err && !(err instanceof NotFoundException)) {
                        console.error(err);
                    }
                });
            }
        };

        startVideo();

        return () => {
            codeReader.reset();
        };
    }, [codeReader]);

    return (
        <div>
            <video ref={videoRef} style={{ width: '100%', height: 'auto' }} />
            {decodedText && <p>Decoded QR Code: {decodedText}</p>}
        </div>
    );
};

export default QRCodeReader;