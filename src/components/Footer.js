import React from 'react';


const Footer = ({ backgroundColor }) => {
    const footerStyle = {
        backgroundColor: backgroundColor || '#d0e3ff',
        color: '#fff',
        textAlign: 'center',
        padding: '20px',
        width: '100%',
    };

    return (
        <footer style={footerStyle}>
            <p>&copy; 2023 nanazgl. All Rights Reserved.</p>
            <p>Contact me: 31530@iitu.edu.kz</p>
        </footer>
    );
};

export default Footer;
