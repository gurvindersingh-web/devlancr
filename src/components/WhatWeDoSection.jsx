import { useEffect, useRef } from 'react';

const features = [
    {
        icon: '🤖',
        title: 'AI-Powered Matching',
        desc: 'Our intelligent algorithm connects clients with the perfect student professionals based on skills, experience, and project requirements.',
        accent: 'purple',
    },
    {
        icon: '🔒',
        title: 'Escrow Payments',
        desc: 'Secure, escrow-protected transactions ensure freelancers get paid and clients get quality work. Every single time.',
        accent: 'cyan',
    },
    {
        icon: '⚡',
        title: 'Real-Time Collaboration',
        desc: 'Built-in messaging, file sharing, and project tracking — everything you need in one seamless workspace.',
        accent: 'blue',
    },
    {
        icon: '🎯',
        title: 'Skill-Based Discovery',
        desc: 'Advanced search and filtering lets clients find exactly the right talent for any project, any technology stack.',
        accent: 'purple',
    },
    {
        icon: '🚀',
        title: 'Fast Onboarding',
        desc: 'Get started in minutes. Students build profiles showcasing their skills, and clients post projects instantly.',
        accent: 'cyan',
    },
    {
        icon: '📊',
        title: 'Smart Analytics',
        desc: 'Track project progress, performance metrics, and spending with beautiful, real-time dashboards.',
        accent: 'blue',
    },
];

const stats = [
    { value: '10K+', label: 'Student Professionals' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '5K+', label: 'Projects Delivered' },
    { value: '< 24h', label: 'Avg. Match Time' },
];

function WhatWeDoSection() {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);
    const statsRef = useRef(null);
    const descRef = useRef(null);
    const ctaRef = useRef(null);

    // ✅ OPTIMIZED: Batched IntersectionObserver with will-change hints
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Batch DOM reads/writes for better performance
                const updates = [];
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        updates.push(entry.target);
                    }
                });

                // Apply all updates in a single animation frame
                if (updates.length > 0) {
                    requestAnimationFrame(() => {
                        updates.forEach((target) => {
                            target.classList.add('visible');

                            // Clean up will-change after animation completes
                            setTimeout(() => {
                                target.style.willChange = 'auto';
                            }, 700); // Match animation duration
                        });
                    });
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        );

        // Observe grid items with GPU hints
        const items = gridRef.current?.querySelectorAll('.whatwedo__item');
        items?.forEach((item, i) => {
            item.style.transitionDelay = `${i * 0.1}s`;
            item.style.willChange = 'transform, opacity'; // ✅ GPU acceleration
            observer.observe(item);
        });

        // Observe stats items
        const statItems = statsRef.current?.querySelectorAll('.whatwedo__stat');
        statItems?.forEach((item, i) => {
            item.style.transitionDelay = `${i * 0.12}s`;
            item.style.willChange = 'transform, opacity';
            observer.observe(item);
        });

        // Observe description block
        if (descRef.current) {
            descRef.current.style.willChange = 'transform, opacity';
            observer.observe(descRef.current);
        }

        // Observe CTA
        if (ctaRef.current) {
            ctaRef.current.style.willChange = 'transform, opacity';
            observer.observe(ctaRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="whatwedo" id="whatwedo" ref={sectionRef}>
            {/* Decorative glow orbs */}
            <div className="whatwedo__orb whatwedo__orb--1" />
            <div className="whatwedo__orb whatwedo__orb--2" />

            <div className="whatwedo__header">
                <span className="whatwedo__label">What We Do</span>
                <h2 className="whatwedo__title">
                    The <span className="gradient-text">intelligent</span> freelancing platform
                </h2>
                <p className="whatwedo__subtitle">
                    Everything you need to hire, collaborate, and deliver — powered by AI.
                </p>
            </div>

            {/* Description Block */}
            <div className="whatwedo__desc-block" ref={descRef}>
                <div className="whatwedo__desc-glow" />
                <p className="whatwedo__description">
                    Verilancer is a next-generation freelancing platform that connects clients with
                    talented student professionals for real-world projects. We make hiring fast,
                    secure, and intelligent through smart talent matching, seamless collaboration
                    tools, and escrow-based payments. Our mission is to empower students with
                    practical opportunities while helping businesses get high-quality work done
                    efficiently and affordably.
                </p>
            </div>

            {/* Stats Row */}
            <div className="whatwedo__stats" ref={statsRef}>
                {stats.map((s, i) => (
                    <div className="whatwedo__stat" key={i}>
                        <span className="whatwedo__stat-value gradient-text">{s.value}</span>
                        <span className="whatwedo__stat-label">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* Glowing separator */}
            <div className="whatwedo__separator">
                <div className="whatwedo__separator-line" />
            </div>

            {/* Feature Grid */}
            <div className="whatwedo__grid" ref={gridRef}>
                {features.map((f, i) => (
                    <div className={`whatwedo__item whatwedo__item--${f.accent}`} key={i}>
                        <div className="whatwedo__item-glow" />
                        <div className="whatwedo__icon">{f.icon}</div>
                        <h3>{f.title}</h3>
                        <p>{f.desc}</p>
                        <div className="whatwedo__item-arrow">→</div>
                    </div>
                ))}
            </div>

            {/* CTA Block */}
            <div className="whatwedo__cta" ref={ctaRef}>
                <h3 className="whatwedo__cta-title">
                    Ready to <span className="gradient-text">transform</span> the way you work?
                </h3>
                <p className="whatwedo__cta-text">
                    Join thousands of students and businesses already building the future together.
                </p>
                <div className="whatwedo__cta-actions">
                    <a href="#" className="btn btn-primary">Get Started Free</a>
                    <a href="#platform" className="btn btn-secondary">Explore Platform</a>
                </div>
            </div>
        </section>
    );
}

export default WhatWeDoSection;
