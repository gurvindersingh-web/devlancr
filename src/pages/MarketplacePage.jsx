import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import './Marketplace.css';

// ✅ Lazy-load heavy WebGL component — only used in promo section below the fold
const Orb = lazy(() => import('../component/Orb'));

const CATEGORIES_NAV = [
    'Trending 🔥', 'Graphics & Design', 'Programming & Tech', 'Digital Marketing',
    'Video & Animation', 'Writing & Translation', 'Music & Audio', 'Business',
    'Finance', 'AI Services', 'Personal Growth',
];

const SERVICE_TAGS = [
    'Website Development', 'Architecture & Interior Design', 'UGC Videos',
    'Video Editing', 'Book Publishing',
];

const TRUSTED_LOGOS = ['Meta', 'Google', 'NETFLIX', 'P&G', 'PayPal', 'Payoneer'];

/* SVG icon paths for category cards */
const CATEGORY_CARDS = [
    {
        name: 'Programming & Tech',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
    {
        name: 'Graphics & Design',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
            </svg>
        ),
    },
    {
        name: 'Digital Marketing',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        ),
    },
    {
        name: 'Writing & Translation',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
        ),
    },
    {
        name: 'Video & Animation',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
        ),
    },
    {
        name: 'AI Services',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" /><path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z" /><line x1="9" y1="22" x2="9" y2="20" /><line x1="15" y1="22" x2="15" y2="20" />
            </svg>
        ),
    },
    {
        name: 'Music & Audio',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
            </svg>
        ),
    },
    {
        name: 'Business',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
        ),
    },
    {
        name: 'Consulting',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
];

const FREELANCERS = [
    {
        name: 'Arjun Mehta',
        initials: 'AM',
        avatarGradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        badge: 'Top Rated',
        badgeType: 'top',
        languages: 'English, Hindi, Gujarati',
        bio: 'Full-stack developer with 6+ years of experience in React, Node.js, and cloud architecture. Specializing in scalable web applications.',
        skills: ['React', 'Node.js', 'Next.js', 'TypeScript', 'AWS'],
        extraSkills: 12,
        reviews: 447,
        rating: 5.0,
    },
    {
        name: 'Sofia Chen',
        initials: 'SC',
        avatarGradient: 'linear-gradient(135deg, #ec4899, #a855f7)',
        badge: 'Level 2',
        badgeType: 'level2',
        languages: 'English, Mandarin, French',
        bio: 'Creative UI/UX designer & frontend developer. I transform ideas into stunning digital experiences with pixel-perfect precision.',
        skills: ['JavaScript', 'HTML', 'Figma', 'Graphic Design'],
        extraSkills: 17,
        reviews: 260,
        rating: 4.7,
    },
    {
        name: 'Priyank Gandhi',
        initials: 'PG',
        avatarGradient: 'linear-gradient(135deg, #06b6d4, #6366f1)',
        badge: 'Top Rated',
        badgeType: 'top',
        languages: 'English, Hindi',
        bio: 'Expert iOS and Android developer with around 5 years of experience in native app development and cross-platform solutions.',
        skills: ['iOS Development', 'Android', 'Swift', 'Flutter'],
        extraSkills: 1,
        reviews: 354,
        rating: 4.9,
    },
    {
        name: 'Francis Gregori',
        initials: 'FG',
        avatarGradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
        badge: 'Level 2',
        badgeType: 'level2',
        languages: 'English, Portuguese',
        bio: 'Software engineer from Brazil. I design and build high-performance web apps using modern JavaScript frameworks and tools.',
        skills: ['JavaScript', 'Node.js', 'React', 'Tailwind CSS', 'Firebase', 'Next.js'],
        extraSkills: 19,
        reviews: 88,
        rating: 5.0,
    },
    {
        name: 'Mobeen Ikhtiar',
        initials: 'MI',
        avatarGradient: 'linear-gradient(135deg, #10b981, #3b82f6)',
        badge: 'Level 2',
        badgeType: 'level2',
        languages: 'English',
        bio: 'With over 8 years of experience in web and mobile app development. Passionate about clean code and great user experiences.',
        skills: ['JavaScript', 'React', 'Full Stack Web Development'],
        extraSkills: 25,
        reviews: 242,
        rating: 4.9,
    },
    {
        name: 'Dipesh Shrestha',
        initials: 'DS',
        avatarGradient: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
        badge: 'Top Rated',
        badgeType: 'top',
        languages: 'English, Hindi, Nepali',
        bio: 'Senior Full-Stack Engineer with 7+ years of expertise in building secure and scalable web applications and microservices.',
        skills: ['React', 'Node.js', 'JavaScript', 'Next.js', 'React Native', 'HTML5', 'CSS3'],
        extraSkills: 17,
        reviews: 207,
        rating: 5.0,
    },
];

const POPULAR_SERVICES = [
    { name: 'Vibe Coding', color: '#1a472a', img: '/images/popular/vibe-coding.png' },
    { name: 'Website Development', color: '#2d4a3e', img: '/images/popular/web-dev.png' },
    { name: 'Video Editing', color: '#4a2d4a', img: '/images/popular/video-editing.png' },
    { name: 'Software Development', color: '#3d2d1a', img: '/images/popular/software-dev.png' },
    { name: 'Book Publishing', color: '#2d3d4a', img: '/images/popular/book-publishing.png' },
    { name: 'Architecture & Interior Design', color: '#4a3d2d', img: '/images/popular/architecture.png' },
    { name: 'UGC Videos', color: '#4a2d3d', img: '/images/popular/ugc-videos.png' },
    { name: 'Voice Over', color: '#3d3d1a', img: '/images/popular/voice-over.png' },
    { name: 'Social Media Marketing', color: '#1a3d3d', img: '/images/popular/social-media.png' },
    { name: 'AI Development', color: '#1a3d2d', img: '/images/popular/ai-dev.png' },
    { name: 'Logo Design', color: '#2d4a2d', img: '/images/popular/logo-design.png' },
];

const FEATURES = [
    {
        title: 'Access a pool of top talent across 700 categories',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
    },
    {
        title: 'Enjoy a simple, easy-to-use matching experience',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
    },
    {
        title: 'Get quality work done quickly and within budget',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
    },
    {
        title: "Only pay when you're happy",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
    },
];

const GUIDES = [
    { title: 'Start a side business', img: '/images/guides/side-business.png' },
    { title: 'Ecommerce business ideas', img: '/images/guides/ecommerce.png' },
    { title: 'Start an online business and work from home', img: '/images/guides/online-business.png' },
];

const FOOTER_COLS = {
    'Categories': [
        'Graphics & Design', 'Digital Marketing', 'Writing & Translation',
        'Video & Animation', 'Music & Audio', 'Programming & Tech',
        'AI Services', 'Consulting', 'Data', 'Business',
    ],
    'For Clients': [
        'How Verilancer Works', 'Customer Success Stories', 'Quality Guide',
        'Verilancer Guides', 'Verilancer Answers', 'Browse Freelance By Skill',
    ],
    'For Freelancers': [
        'Become a Verilancer Freelancer', 'Become an Agency',
        'Community Hub', 'Forum', 'Events',
    ],
    'Business Solutions': [
        'Verilancer Pro', 'Project Management Service', 'Expert Sourcing Service',
        'ClearVoice – Content Marketing', 'Dropshipping Tool',
        'Software Development', 'AI Store Builder', 'Contact Sales',
    ],
    'Company': [
        'About Verilancer', 'Help Center', 'Trust & Safety', 'Social Impact',
        'Careers', 'Terms of Service', 'Privacy Policy', 'Partnerships',
        'Creator Network', 'Affiliates', 'Press & News',
    ],
};

function MarketplacePage() {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const popularRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showNavSearch, setShowNavSearch] = useState(false);

    const toggleVideo = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Scroll reveal with IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('ag-visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const reveals = document.querySelectorAll('.ag-reveal');
        reveals.forEach((el) => observer.observe(el));

        return () => reveals.forEach((el) => observer.unobserve(el));
    }, []);

    // Show navbar search bar when popular services section is reached
    useEffect(() => {
        const el = popularRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowNavSearch(entry.isIntersecting || entry.boundingClientRect.top < 0);
            },
            { threshold: 0 }
        );

        observer.observe(el);
        return () => observer.unobserve(el);
    }, []);

    return (
        <div className="mp">
            {/* Cosmic Ambient Background */}
            <div className="ag-cosmos">
                <div className="ag-orb ag-orb--1" />
                <div className="ag-orb ag-orb--2" />
                <div className="ag-orb ag-orb--3" />
            </div>

            <Navbar showSearch={showNavSearch} />

            {/* Category Sub-Nav */}
            <div className="mp__catnav">
                <div className="mp__catnav-inner">
                    {CATEGORIES_NAV.map((cat) => (
                        <a key={cat} className="mp__catnav-link" style={{ cursor: 'pointer' }}
                            onClick={() => document.querySelector('.mp__categories')?.scrollIntoView({ behavior: 'smooth' })}>{cat}</a>
                    ))}
                </div>
            </div>

            {/* Hero with Background Video */}
            <section className="mp__hero">
                <video
                    ref={videoRef}
                    className="mp__hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source
                        src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
                        type="video/mp4"
                    />
                </video>
                <div className="mp__hero-overlay" />

                {/* Floating Glass Fragments */}
                <div className="ag-fragment ag-fragment--1" />
                <div className="ag-fragment ag-fragment--2" />
                <div className="ag-fragment ag-fragment--3" />

                <div className="mp__hero-content">
                    <h1 className="mp__hero-title">
                        Our freelancers<br />
                        <span className="ag-glow-text">will take it from here</span>
                    </h1>
                    <div className="mp__hero-search">
                        <input
                            type="text"
                            placeholder="Search for any service..."
                            className="mp__hero-search-input"
                        />
                        <button className="mp__hero-search-btn" aria-label="Search">
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242.656a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                    <div className="mp__hero-tags">
                        {SERVICE_TAGS.map((tag) => (
                            <a key={tag} className="mp__hero-tag" style={{ cursor: 'pointer' }}
                                onClick={() => document.querySelector('.mp__popular')?.scrollIntoView({ behavior: 'smooth' })}>{tag} →</a>
                        ))}
                    </div>
                </div>

                {/* Trusted By — inside hero bottom */}
                <div className="mp__hero-trusted">
                    <span className="mp__trusted-label">Trusted by:</span>
                    <div className="mp__trusted-logos">
                        {TRUSTED_LOGOS.map((logo) => (
                            <span key={logo} className="mp__trusted-logo">{logo}</span>
                        ))}
                    </div>
                </div>

                {/* Play/Pause toggle */}
                <button className="mp__hero-playpause" onClick={toggleVideo} aria-label={isPlaying ? 'Pause video' : 'Play video'}>
                    {isPlaying ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                    ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                    )}
                </button>
            </section>

            {/* Category Cards */}
            <section className="mp__categories ag-reveal">
                <div className="mp__categories-grid">
                    {CATEGORY_CARDS.map((cat) => (
                        <a key={cat.name} className="mp__cat-card" style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/service/${encodeURIComponent(cat.name)}`)}>
                            <span className="mp__cat-card-icon">{cat.icon}</span>
                            <span className="mp__cat-card-name">{cat.name}</span>
                        </a>
                    ))}
                </div>
            </section>

            {/* Popular Services */}
            <section ref={popularRef} className="mp__popular ag-reveal">
                <h2 className="mp__section-title">Popular services</h2>
                <div className="mp__popular-wrapper">
                    <button
                        className="mp__popular-arrow mp__popular-arrow--left"
                        aria-label="Scroll left"
                        onClick={() => {
                            const el = document.querySelector('.mp__popular-scroll');
                            if (el) el.scrollBy({ left: -600, behavior: 'smooth' });
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <div className="mp__popular-scroll">
                        {POPULAR_SERVICES.map((svc) => (
                            <div
                                key={svc.name}
                                className="mp__popular-card"
                                style={{ background: svc.color, cursor: 'pointer' }}
                                onClick={() => navigate(`/service/${encodeURIComponent(svc.name.toLowerCase().replace(/\s+/g, '-'))}`)}
                            >
                                <span className="mp__popular-card-name">{svc.name}</span>
                                <div className="mp__popular-card-img">
                                    <img src={svc.img} alt={svc.name} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        className="mp__popular-arrow mp__popular-arrow--right"
                        aria-label="Scroll right"
                        onClick={() => {
                            const el = document.querySelector('.mp__popular-scroll');
                            if (el) el.scrollBy({ left: 600, behavior: 'smooth' });
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            </section>

            {/* Promo Banner */}
            <section className="mp__promo ag-reveal">
                <div className="mp__promo-inner">
                    <div className="mp__promo-text">
                        <h2 className="mp__promo-title">Need help with Vibe coding?</h2>
                        <p className="mp__promo-desc">
                            Get matched with the right expert to keep building and marketing your project
                        </p>
                        <button className="btn mp__promo-btn" onClick={() => navigate('/find-expert')}>Find an expert with AI</button>
                    </div>
                    <div className="mp__promo-visual">
                        <div className="mp__promo-orb-wrapper">
                            <Suspense fallback={<div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)' }} />}>
                                <Orb hue={260} hoverIntensity={0.5} />
                            </Suspense>
                        </div>
                        <img src="/images/popular/vibe-coding.png" alt="Vibe coding" />
                    </div>
                </div>
            </section>

            {/* About Verilancer Description */}
            <section className="mp__about ag-reveal">
                <div className="mp__about-inner">
                    <h2 className="mp__about-title">
                        Verilancer – <span className="gradient-text">The Future of Freelancing</span> Starts Here
                    </h2>
                    <p className="mp__about-desc">
                        Verilancer is a next-generation freelancing platform where businesses connect
                        with top-tier talent without limits. Powered by intelligent AI matching, the
                        platform helps clients discover the right professionals faster while enabling
                        freelancers to find meaningful, high-value work. With secure payments,
                        real-time collaboration tools, and a seamless user experience, Verilancer brings
                        everything needed for successful project delivery into one unified ecosystem.
                        Whether you're looking to hire expert talent or grow your freelance career,
                        Verilancer provides the speed, trust, and innovation to make it happen.
                    </p>
                </div>
            </section>



            {/* Make It Happen */}
            <section className="mp__features ag-reveal">
                <h2 className="mp__section-title">Make it all happen with freelancers</h2>
                <div className="mp__features-grid">
                    {FEATURES.map((f, i) => (
                        <div key={i} className={`mp__feature-item ag-reveal ag-reveal-delay-${i + 1}`}>
                            <div className="mp__feature-icon">{f.icon}</div>
                            <p className="mp__feature-text">{f.title}</p>
                        </div>
                    ))}
                </div>
                <div className="mp__features-cta">
                    <button className="btn btn-primary" onClick={() => navigate('/marketplace')}>Join now</button>
                </div>
            </section>

            {/* Guides */}
            <section className="mp__guides ag-reveal">
                <div className="mp__guides-header">
                    <h2 className="mp__section-title">Guides to help you grow</h2>
                    <a className="mp__guides-more" style={{ cursor: 'pointer' }} onClick={() => navigate('/marketplace')}>See more guides</a>
                </div>
                <div className="mp__guides-grid">
                    {GUIDES.map((g, i) => (
                        <div key={i} className={`mp__guide-card ag-reveal ag-reveal-delay-${i + 1}`}>
                            <div className="mp__guide-card-img">
                                <img src={g.img} alt={g.title} />
                            </div>
                            <p className="mp__guide-card-title">{g.title}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="mp__cta-banner ag-reveal">
                <h2 className="mp__cta-banner-title">
                    Freelance services at your <em>fingertips</em>
                </h2>
                <button className="btn btn-primary mp__cta-banner-btn" onClick={() => navigate('/find-expert')}>Verilancer Pro</button>
            </section>

            {/* Footer */}
            <footer className="mp__footer">
                <div className="mp__footer-cols">
                    {Object.entries(FOOTER_COLS).map(([heading, links]) => (
                        <div key={heading} className="mp__footer-col">
                            <h4 className="mp__footer-col-title">{heading}</h4>
                            <ul className="mp__footer-col-list">
                                {links.map((link) => (
                                    <li key={link}><a style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{link}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mp__footer-bottom">
                    <div className="mp__footer-brand">
                        <span className="gradient-text" style={{ fontSize: '1.3rem', fontWeight: 700 }}>Verilancer</span>
                        <span className="mp__footer-copy">© Verilancer International Ltd. 2026</span>
                    </div>
                    <div className="mp__footer-social">
                        <a href="#" aria-label="TikTok">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78c.27 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3 6.34 6.34 0 0 0 9.49 21.64 6.34 6.34 0 0 0 15.82 15.3V8.84a8.27 8.27 0 0 0 3.77.92V6.69z" /></svg>
                        </a>
                        <a href="#" aria-label="Instagram">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                        </a>
                        <a href="#" aria-label="LinkedIn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                        </a>
                        <a href="#" aria-label="Twitter">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default MarketplacePage;
