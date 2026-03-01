import { useEffect, useRef } from 'react';

const services = [
    {
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="4" y="8" width="32" height="24" rx="4" stroke="#6b7280" strokeWidth="1.5" fill="none" />
                <circle cx="20" cy="20" r="6" stroke="#6b7280" strokeWidth="1.5" fill="none" />
                <path d="M14 14l12 12M26 14L14 26" stroke="#6b7280" strokeWidth="1" opacity="0.4" />
                <circle cx="12" cy="10" r="3" fill="#c4b5fd" opacity="0.6" />
                <path d="M8 28l6-4 4 2 6-6 8 4" stroke="#10b981" strokeWidth="1.5" fill="none" />
            </svg>
        ),
        label: '3D Industrial Design',
    },
    {
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="6" y="4" width="28" height="32" rx="3" stroke="#6b7280" strokeWidth="1.5" fill="none" />
                <rect x="10" y="10" width="8" height="6" rx="1" fill="#a7f3d0" opacity="0.6" />
                <rect x="10" y="20" width="20" height="2" rx="1" fill="#d1d5db" opacity="0.5" />
                <rect x="10" y="25" width="16" height="2" rx="1" fill="#d1d5db" opacity="0.4" />
                <circle cx="28" cy="12" r="4" fill="#6ee7b7" opacity="0.5" />
                <path d="M26 12l1.5 1.5 3-3" stroke="#065f46" strokeWidth="1.2" fill="none" />
            </svg>
        ),
        label: 'E-commerce Website Development',
    },
    {
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="4" y="8" width="32" height="22" rx="3" stroke="#6b7280" strokeWidth="1.5" fill="none" />
                <path d="M4 14h32" stroke="#6b7280" strokeWidth="1" opacity="0.3" />
                <circle cx="14" cy="22" r="4" fill="#fbbf24" opacity="0.3" />
                <rect x="22" y="18" width="10" height="2" rx="1" fill="#d1d5db" opacity="0.5" />
                <rect x="22" y="22" width="8" height="2" rx="1" fill="#d1d5db" opacity="0.4" />
                <circle cx="32" cy="8" r="4" fill="#f87171" opacity="0.4" />
                <path d="M8 34l4-4h16l4 4" stroke="#6b7280" strokeWidth="1" opacity="0.3" />
            </svg>
        ),
        label: 'Email Marketing',
    },
    {
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="8" y="4" width="24" height="32" rx="2" stroke="#6b7280" strokeWidth="1.5" fill="none" />
                <rect x="12" y="8" width="16" height="2" rx="1" fill="#d1d5db" opacity="0.6" />
                <rect x="12" y="13" width="16" height="2" rx="1" fill="#d1d5db" opacity="0.5" />
                <rect x="12" y="18" width="12" height="2" rx="1" fill="#d1d5db" opacity="0.4" />
                <rect x="12" y="23" width="16" height="2" rx="1" fill="#d1d5db" opacity="0.3" />
                <path d="M16 30h8" stroke="#f87171" strokeWidth="2" opacity="0.5" />
            </svg>
        ),
        label: 'Press Releases',
    },
    {
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="14" stroke="#6b7280" strokeWidth="1.5" fill="none" />
                <path d="M14 16c0-3 2.5-5 6-5s6 2 6 5-2 4-6 6" stroke="#6b7280" strokeWidth="1.5" fill="none" />
                <path d="M16 24l4-2 4 2 4-4" stroke="#10b981" strokeWidth="1.5" fill="none" />
            </svg>
        ),
        label: 'Logo Design',
    },
];

const valueProps = [
    {
        icon: (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="4" y="4" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <rect x="20" y="4" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <rect x="4" y="20" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M23 23h6M26 20v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        text: 'Access a pool of top talent across 700 categories',
    },
    {
        icon: (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="13" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M13 18l3.5 3.5L23 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
        ),
        text: 'Enjoy a simple, easy-to-use matching experience',
    },
    {
        icon: (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="6" y="6" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M18 12v8l5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M14 26l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
        ),
        text: 'Get quality work done quickly and within budget',
    },
    {
        icon: (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M8 30c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="28" cy="24" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M27 24l1 1 2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
        ),
        text: "Only pay when you're happy",
    },
];

function TrustedServicesSection() {
    const sectionRef = useRef(null);
    const servicesRef = useRef(null);
    const propsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.15 }
        );

        // Observe service cards
        const cards = servicesRef.current?.querySelectorAll('.ts__service-card');
        cards?.forEach((card, i) => {
            card.style.transitionDelay = `${i * 0.08}s`;
            observer.observe(card);
        });

        // Observe value prop items
        const items = propsRef.current?.querySelectorAll('.ts__prop-item');
        items?.forEach((item, i) => {
            item.style.transitionDelay = `${i * 0.1}s`;
            observer.observe(item);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="trusted-services" ref={sectionRef}>
            <div className="ts__container">
                {/* Trusted Services */}
                <div className="ts__services-block">
                    <h2 className="ts__title">
                        <span className="ts__title-brand">Verilance's</span> trusted services
                    </h2>
                    <div className="ts__services-grid" ref={servicesRef}>
                        {services.map((s, i) => (
                            <div className="ts__service-card" key={i}>
                                <div className="ts__service-icon">{s.icon}</div>
                                <span className="ts__service-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Value Propositions */}
                <div className="ts__props-block">
                    <h2 className="ts__props-title">
                        Make it all happen with freelancers
                    </h2>
                    <div className="ts__props-grid" ref={propsRef}>
                        {valueProps.map((vp, i) => (
                            <div className="ts__prop-item" key={i}>
                                <div className="ts__prop-icon">{vp.icon}</div>
                                <p className="ts__prop-text">{vp.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TrustedServicesSection;
