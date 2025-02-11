import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [qrCodeValue, setQrCodeValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setError('');
    };

    const handleGenerateQRCode = () => {
        if (!inputValue.trim()) {
            setError('Please enter some text or URL');
            return;
        }
        setQrCodeValue(inputValue);
    };

    return (
        <div className="qr-code-generator">
            <h2>QR Code Generator</h2>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter text or URL"
                />
                <button onClick={handleGenerateQRCode}>Generate QR Code</button>
            </div>
            {error && <div className="error">{error}</div>}
            {qrCodeValue && (
                <div className="qr-code">
                    <QRCodeCanvas 
                        value={qrCodeValue}
                        size={256}
                        level="H"
                    />
                </div>
            )}
        </div>
    );
};

export default QRCodeGenerator;