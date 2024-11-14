// src/hooks/useResponsiveChart.js
import { useState, useEffect } from 'react';

const useResponsiveChart = (widthMultiplier = 0.8, fixedHeight = 200) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        handleResize(); // Set initial size on mount
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const chartWidth = windowWidth * widthMultiplier;
    const chartHeight = fixedHeight;

    return { chartWidth, chartHeight };
};

export default useResponsiveChart;
