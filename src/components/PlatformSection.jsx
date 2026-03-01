import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
    {
        icon: '⬡',
        type: 'For Clients',
        title: 'Find Top Talent',
        desc: 'Post projects, review proposals, and hire vetted freelancers with AI-powered recommendations.',
        features: [
            'AI-matched freelancer suggestions',
            'Escrow-protected payments',
            'Real-time project dashboard',
            'Quality guarantee & dispute resolution',
        ],
    },
    {
        icon: '△',
        type: 'For Freelancers',
        title: 'Build Your Career',
        desc: 'Showcase your skills, win projects, and grow your reputation on a platform built for you.',
        features: [
            'Smart project recommendations',
            'Portfolio & skill verification',
            'Instant secure payouts',
            'Built-in time tracking & invoicing',
        ],
    },
    {
        icon: '◇',
        type: 'For Agencies',
        title: 'Scale Your Team',
        desc: 'Manage multiple freelancers, coordinate projects, and deliver at scale with enterprise tools.',
        features: [
            'Team management dashboard',
            'Multi-project coordination',
            'White-label client portal',
            'Advanced analytics & reporting',
        ],
    },
];

function PlatformSection() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const totalScroll = track.scrollWidth - window.innerWidth;

        const ctx = gsap.context(() => {
            gsap.to(track, {
                x: -totalScroll,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${totalScroll}`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section className="platform" id="platform" ref={sectionRef}>
            <div className="platform__inner">
                <div className="platform__header">
                    <span className="platform__label">Platform</span>
                    <h2 className="platform__title">
                        One platform, <span className="gradient-text">every role</span>
                    </h2>
                </div>
                <div className="platform__track-container">
                    <div className="platform__track" ref={trackRef}>
                        {/* Spacer for initial centering */}
                        <div style={{ width: 'calc(50vw - 190px)', flexShrink: 0 }} />
                        {cards.map((card, i) => (
                            <div className="platform-card" key={i}>
                                <div className="platform-card__icon">{card.icon}</div>
                                <span className="platform-card__type">{card.type}</span>
                                <h3 className="platform-card__title">{card.title}</h3>
                                <p className="platform-card__desc">{card.desc}</p>
                                <ul className="platform-card__features">
                                    {card.features.map((f, j) => (
                                        <li key={j}>{f}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        {/* Spacer for end */}
                        <div style={{ width: 'calc(50vw - 190px)', flexShrink: 0 }} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PlatformSection;
