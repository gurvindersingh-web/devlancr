import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the user prefers reduced motion.
 * All animations should be gated behind this check.
 *
 * Usage:
 *   const prefersReducedMotion = useReducedMotion();
 *   if (!prefersReducedMotion) { // run animation }
 *
 * @returns {boolean} true if user prefers reduced motion
 */
export function useReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        const handleChange = (event) => {
            setPrefersReducedMotion(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return prefersReducedMotion;
}
