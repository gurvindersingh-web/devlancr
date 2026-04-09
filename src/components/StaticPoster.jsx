/**
 * StaticPoster — Zero-dependency CSS-only fallback shown while
 * the Spline 3D scene loads. Mimics the scene's purple glow
 * aesthetic using radial gradients and subtle animation.
 */
export default function StaticPoster() {
    return (
        <div className="spline-poster" aria-hidden="true">
            <div className="spline-poster__glow" />
        </div>
    );
}
