import { Suspense, lazy, forwardRef, useCallback } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

const SplineScene = forwardRef(function SplineScene({ onSplineLoad }, ref) {
    const handleLoad = useCallback(
        (splineApp) => {
            // Store the app on the ref so parent can access it
            if (ref) {
                if (typeof ref === 'function') ref(splineApp);
                else ref.current = splineApp;
            }

            // ✅ OPTIMIZED: Cap DPR for performance on high-DPI screens
            const canvas = splineApp.canvas;
            if (canvas) {
                const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x
                canvas.style.maxWidth = '100%';
                canvas.style.maxHeight = '100%';
            }

            if (onSplineLoad) onSplineLoad(splineApp);
        },
        [ref, onSplineLoad]
    );

    return (
        <div className="spline-wrapper" id="spline-scene">
            <Suspense
                fallback={
                    <div className="spline-loading">
                        <div className="spline-loading-spinner" />
                    </div>
                }
            >
                <Spline
                    scene="https://prod.spline.design/OQqvY93KKDsMH7l6/scene.splinecode"
                    onLoad={handleLoad}
                />
            </Suspense>
        </div>
    );
});

export default SplineScene;
