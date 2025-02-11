import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import QRCodeReader from './components/QRCodeReader';
import QRCodeGenerator from './components/QRCodeGenerator';
import NavigationBar from './components/NavigationBar';
import './styles/App.css';

const App: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <BrowserRouter>
                <div className="app-container">
                    <h1>QR Code Reader and Generator</h1>
                    <NavigationBar />
                    <Routes>
                        <Route path="/generate" element={<QRCodeGenerator />} />
                        <Route path="/scan" element={<QRCodeReader />} />
                        <Route path="/" element={<Navigate to="/generate" replace />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;