import React from 'react';
import './Footer.scss';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <p>&copy; 2025 CourseWork. All rights reserved.</p>
                <div className="footer-links">
                    <a href={'tel:+380971234567'}>+380971234567</a>
                    <a href="mailto:coursework@gmail.com">coursework@gmail.com</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;