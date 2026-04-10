import { useState, useEffect, useCallback } from 'react';

/**
 * Shared hook to read the current role from localStorage.
 * Stays in sync with the HeroSection toggle via a 'storage' event listener
 * and a custom 'verilancer-role-change' event for same-tab updates.
 */
export function useRole() {
    const [role, setRole] = useState(() => {
        return localStorage.getItem('verilancer-role') || 'client';
    });

    useEffect(() => {
        // Listen for changes from other tabs
        const handleStorage = (e) => {
            if (e.key === 'verilancer-role' && e.newValue) {
                setRole(e.newValue);
            }
        };

        // Listen for same-tab custom event dispatched by HeroSection
        const handleCustom = () => {
            setRole(localStorage.getItem('verilancer-role') || 'client');
        };

        window.addEventListener('storage', handleStorage);
        window.addEventListener('verilancer-role-change', handleCustom);

        // Poll as a fallback (every 300ms) — cheap since it's just a localStorage read
        const interval = setInterval(() => {
            const current = localStorage.getItem('verilancer-role') || 'client';
            setRole((prev) => (prev !== current ? current : prev));
        }, 300);

        return () => {
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener('verilancer-role-change', handleCustom);
            clearInterval(interval);
        };
    }, []);

    const isClient = role === 'client';

    return { role, isClient };
}
