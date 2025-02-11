import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar: React.FC = () => {
    return (
        <nav>
            <Link to="/generate">Generate QR Code</Link>
            <Link to="/scan">Scan QR Code</Link>
        </nav>
    );
};

export default NavigationBar;
