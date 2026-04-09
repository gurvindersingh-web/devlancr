import { useEffect } from 'react';

/**
 * Injects JSON-LD structured data into the document head.
 * Since we're using Vite (no SSR), this is done via DOM manipulation.
 * Google's crawler can still read dynamically-injected JSON-LD.
 *
 * @param {Object} props
 * @param {Object} props.data - The JSON-LD data object
 */
export default function JsonLd({ data }) {
    useEffect(() => {
        if (!data) return;

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        script.id = `jsonld-${Math.random().toString(36).slice(2, 9)}`;
        document.head.appendChild(script);

        return () => {
            const existing = document.getElementById(script.id);
            if (existing) document.head.removeChild(existing);
        };
    }, [data]);

    return null; // No visual output
}
