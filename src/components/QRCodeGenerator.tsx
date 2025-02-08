import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [qrCodeValue, setQrCodeValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleGenerateQRCode = () => {
        setQrCodeValue(inputValue);
    };

    return (
        <div className="qr-code-generator">
            <h2>QR Code Generator</h2>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter text or URL"
            />
            <button onClick={handleGenerateQRCode}>Generate QR Code</button>
            {qrCodeValue && (
                <div className="qr-code">
                    <QRCode value={qrCodeValue} />
                </div>
            )}
        </div>
    );
};

export default QRCodeGenerator;