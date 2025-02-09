import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

const QRCodeReader: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const stopCamera = async () => {
        console.log('Stopping camera...');
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        if (codeReaderRef.current) {
            codeReaderRef.current.reset();
            codeReaderRef.current = null;
        }
        setIsCameraActive(false);
    };

    const initializeCamera = async () => {
        console.log('Initializing camera...');
        try {
            const permissions = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });
            console.log('Camera permissions granted:', permissions);
            return permissions;
        } catch (error) {
            console.error('Camera permission error:', error);
            throw error;
        }
    };

    const startVideo = async () => {
        setIsLoading(true);
        setError('');
        
        try {
            await stopCamera();
            
            // Set camera active first to render video element
            setIsCameraActive(true);
            
            // Wait for video element to be available in the DOM
            await new Promise(resolve => setTimeout(resolve, 100));
            
            if (!videoRef.current) {
                console.error('Video element not found in DOM');
                throw new Error('Video element not found');
            }

            const stream = await initializeCamera();
            
            codeReaderRef.current = new BrowserMultiFormatReader();
            videoRef.current.srcObject = stream;
            videoRef.current.setAttribute('playsinline', 'true');

            // Clear any existing error when video starts playing
            videoRef.current.onloadedmetadata = () => {
                console.log('Video metadata loaded');
                setError('');
            };

            await videoRef.current.play();
            console.log('Video element is playing');

            if (codeReaderRef.current) {
                codeReaderRef.current.decodeFromVideoDevice(
                    null, 
                    videoRef.current, 
                    (result, err) => {
                        if (result) {
                            console.log('QR Code detected:', result.getText());
                            stopCamera();
                            window.location.href = result.getText();
                        }
                        if (err && !(err instanceof NotFoundException)) {
                            console.error('Decode error:', err);
                        }
                    }
                );
            }
        } catch (error) {
            console.error('Start video error:', error);
            await stopCamera();
            setIsCameraActive(false);
            setError('Camera access failed. Please ensure you have granted camera permissions.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    return (
        <div className='video-container'>
            {error && (
                <div className='error'>
                    {error}
                </div>
            )}
            {!isCameraActive ? (
                <button 
                    onClick={startVideo}
                    disabled={isLoading}
                    style={{
                        opacity: isLoading ? 0.7 : 1
                    }}
                >
                    {isLoading ? 'Starting Camera...' : 'Click to Scan QR Code'}
                </button>
            ) : (
                <video 
                    ref={videoRef} 
                    playsInline
                />
            )}
        </div>
    );
};

export default QRCodeReader;