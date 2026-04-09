import { useRef, useCallback, lazy, Suspense } from 'react';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

// ✅ Lazy-load heavy WebGL components — not in initial bundle
const SplineScene = lazy(() => import('../components/SplineScene'));
const PixelBlast = lazy(() => import('../components/src/component/PixelBlast'));

function LandingPage() {
    const appRef = useRef(null);
    const splineRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();

    // Only mount 3D scenes when they enter the viewport
    const [sceneRef, sceneInView] = useInView({ threshold: 0.1, once: true });

    const handleSplineLoad = useCallback(
        (splineApp) => {
            splineRef.current = splineApp;
        },
        []
    );

    return (
        <div className="app" ref={appRef}>
            {/* Scene container — observed for viewport entry */}
            <div ref={sceneRef}>
                {/* PixelBlast Background — only mount when in view & motion allowed */}
                {sceneInView && !prefersReducedMotion && (
                    <div className="pixelblast-bg">
                        <Suspense fallback={null}>
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
                        </Suspense>
                    </div>
                )}

                {/* 3D Spline Scene — lazy loaded with poster fallback */}
                {sceneInView && !prefersReducedMotion ? (
                    <Suspense
                        fallback={
                            <div className="spline-poster" aria-hidden="true">
                                <div className="spline-poster__glow" />
                            </div>
                        }
                    >
                        <SplineScene ref={splineRef} onSplineLoad={handleSplineLoad} />
                    </Suspense>
                ) : (
                    <div className="spline-poster" aria-hidden="true">
                        <div className="spline-poster__glow" />
                    </div>
                )}
            </div>

            {/* Navigation */}
            <Navbar />

            {/* Hero */}
            <HeroSection />
        </div>
    );
}

export default LandingPage;
