import { useRef, useCallback } from 'react';
import SplineScene from '../components/SplineScene';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PixelBlast from '../components/src/component/PixelBlast';

function LandingPage() {
    const appRef = useRef(null);
    const splineRef = useRef(null);

    const handleSplineLoad = useCallback(
        (splineApp) => {
            splineRef.current = splineApp;
        },
        []
    );

    return (
        <div className="app" ref={appRef}>
            {/* PixelBlast Background */}
            <div className="pixelblast-bg">
                <PixelBlast
                    variant="circle"
                    pixelSize={8}
                    color="#7c5cfc"
                    patternScale={2.5}
                    patternDensity={0.8}
                    speed={0.3}
                    edgeFade={0.6}
                    enableRipples={true}
                    rippleSpeed={0.25}
                    rippleThickness={0.08}
                    transparent={true}
                />
            </div>

            {/* 3D Spline Scene */}
            <SplineScene ref={splineRef} onSplineLoad={handleSplineLoad} />

            {/* Navigation */}
            <Navbar />

            {/* Hero */}
            <HeroSection />
        </div>
    );
}

export default LandingPage;


