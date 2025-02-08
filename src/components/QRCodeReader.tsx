import React, { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

const QRCodeReader: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const codeReader = new BrowserMultiFormatReader();

    useEffect(() => {
        const startVideo = async () => {
            if (videoRef.current) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ 
                        video: { facingMode: 'environment' } 
                    });
                    videoRef.current.srcObject = stream;
                    videoRef.current.setAttribute('playsinline', 'true');
                    await videoRef.current.play();

                    codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
                        if (result) {
                            // Stop video and cleanup before navigation
                            stream.getTracks().forEach(track => track.stop());
                            codeReader.reset();
                            
                            // Navigate to the URL
                            window.location.href = result.getText();
                        }
                        if (err && !(err instanceof NotFoundException)) {
                            console.error(err);
                        }
                    });
                } catch (error) {
                    console.error('Error accessing camera:', error);
                }
            }
        };

        startVideo();

        // Cleanup function
        return () => {
            if (videoRef.current?.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
            codeReader.reset();
        };
    }, []);

    return (
        <div>
            <video ref={videoRef} style={{ width: '100%', height: 'auto' }} />
        </div>
    );
};

export default QRCodeReader;