import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to detect when an element enters the viewport.
 * Used to lazy-load heavy components (WebGL, 3D scenes) only when visible.
 *
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Margin around viewport
 * @param {boolean} options.once - If true, stops observing after first intersection
 * @returns {[React.RefObject, boolean]} - [ref to attach, isInView boolean]
 */
export function useInView({ threshold = 0.1, rootMargin = '0px', once = true } = {}) {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    if (once) {
                        observer.unobserve(element);
                    }
                } else if (!once) {
                    setIsInView(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => observer.unobserve(element);
    }, [threshold, rootMargin, once]);

    return [ref, isInView];
}
