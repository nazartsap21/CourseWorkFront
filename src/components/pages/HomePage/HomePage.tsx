import React from 'react';
import Hero from "../../features/Hero/Hero.tsx";
import Metrics from "../../features/Metrics/Metrics.tsx";
import Steps from "../../features/Steps/Steps.tsx";

const HomePage = () => {
    return (
        <>
            <Hero />
            <Metrics />
            <Steps />
        </>
    );
};

export default HomePage;