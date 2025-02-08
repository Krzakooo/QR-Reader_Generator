import React from 'react';
import QRCodeReader from './components/QRCodeReader';
import QRCodeGenerator from './components/QRCodeGenerator';
import './styles/App.css';

const App: React.FC = () => {
    return (
        <div className="app-container">
            <h1>QR Code Reader and Generator</h1>
            <QRCodeGenerator />
            <QRCodeReader />
        </div>
    );
};

export default App;