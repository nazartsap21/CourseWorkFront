import React from 'react';
import './Steps.scss';

const Steps = () => {
    const steps = [
        "Step 1: Turn on the device.",
        "Step 2: Place it in the desired location.",
        "Step 3: Connect to Wi-Fi.",
        "Step 4: Monitor the readings on the display or web app.",
    ];

    return (
        <section className="steps">
            {steps.map((step, index) => (
                <div key={index} className={`step ${index % 2 === 0 ? 'left' : 'right'}`}>
                    <p>{step}</p>
                </div>
            ))}
        </section>
    );
};

export default Steps;