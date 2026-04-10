import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MorphButton from './pixel-perfect/morph-button';

/* ── Inline SVG icons (no emoji) ── */
const BriefcaseIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
);

const RocketIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 3 0 3 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-3 0-3" />
    </svg>
);

function HeroSection() {
    const navigate = useNavigate();

    // Role toggle persisted to localStorage
    const [role, setRole] = useState(() => {
        return localStorage.getItem('verilancer-role') || 'client';
    });

    const handleRoleChange = useCallback((newRole) => {
        setRole(newRole);
        localStorage.setItem('verilancer-role', newRole);
        window.dispatchEvent(new Event('verilancer-role-change'));
    }, []);

    const isClient = role === 'client';

    return (
        <section className="hero" id="hero">
            <div className="hero__content">
                <div className="hero__badge">The future of freelancing</div>

                {/* Role Toggle — personalizes CTAs */}
                <div className="hero__role-toggle" role="radiogroup" aria-label="I am a">
                    <button
                        className={`hero__role-btn ${isClient ? 'hero__role-btn--active' : ''}`}
                        onClick={() => handleRoleChange('client')}
                        role="radio"
                        aria-checked={isClient}
                    >
                        <BriefcaseIcon /> Client
                    </button>
                    <button
                        className={`hero__role-btn ${!isClient ? 'hero__role-btn--active' : ''}`}
                        onClick={() => handleRoleChange('freelancer')}
                        role="radio"
                        aria-checked={!isClient}
                    >
                        <RocketIcon /> Freelancer
                    </button>
                </div>

                <h1 className="hero__title">
                    {isClient ? (
                        <>Clients find 
                        talent everywhere.{' '}<br /><span className="highlight">Why not on Verilancer?</span></>
                    ) : (
                        <>Find projects that{' '}<br /><span className="highlight">match your talent.</span></>
                    )}
                </h1>
                <p className="hero__subtitle">
                    {isClient
                        ? 'Where top clients meet top freelancers. AI-powered matching, secure payments, and real-time collaboration — all in one platform.'
                        : 'Build your freelance career with high-value projects, secure milestone payments, and AI-powered matching to find your ideal clients.'}
                </p>

                {/* Trust Signals */}
                <div className="hero__trust-signals">
                    <div className="hero__trust-stat">
                        <span className="hero__trust-number">50k+</span>
                        <span className="hero__trust-label">Freelancers</span>
                    </div>
                    <div className="hero__trust-divider" aria-hidden="true" />
                    <div className="hero__trust-stat">
                        <span className="hero__trust-number">4.9★</span>
                        <span className="hero__trust-label">Avg. rating</span>
                    </div>
                    <div className="hero__trust-divider" aria-hidden="true" />
                    <div className="hero__trust-stat">
                        <span className="hero__trust-number">120k</span>
                        <span className="hero__trust-label">Projects done</span>
                    </div>
                </div>

                <div className="hero__actions">
                    <MorphButton
                        className="bg-[#7F77DD] text-white hover:bg-[#6c65bd] border-none px-8 py-4 rounded-full font-semibold text-lg min-w-[200px]"
                        onClick={() => navigate('/marketplace')}
                    >
                        {isClient ? 'Hire Talent →' : 'Find Projects →'}
                    </MorphButton>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
