import React from 'react';
import './ErrorPage.scss';

const ErrorPage = () => {
    return (
        <div className={'error-page'}>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <a href="/">Go back to Home</a>
        </div>
    );
};

export default ErrorPage;