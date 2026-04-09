import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
    const navigate = useNavigate();

    // Role toggle persisted to localStorage
    const [role, setRole] = useState(() => {
        return localStorage.getItem('verilance-role') || 'client';
    });

    const handleRoleChange = useCallback((newRole) => {
        setRole(newRole);
        localStorage.setItem('verilance-role', newRole);
    }, []);

    const isClient = role === 'client';

    return (
        <section className="hero" id="hero">
            <div className="hero__content">
                <div className="hero__badge">The Future of Freelancing</div>

                {/* Role Toggle — personalizes CTAs */}
                <div className="hero__role-toggle" role="radiogroup" aria-label="I am a">
                    <button
                        className={`hero__role-btn ${isClient ? 'hero__role-btn--active' : ''}`}
                        onClick={() => handleRoleChange('client')}
                        role="radio"
                        aria-checked={isClient}
                    >
                        💼 I'm a Client
                    </button>
                    <button
                        className={`hero__role-btn ${!isClient ? 'hero__role-btn--active' : ''}`}
                        onClick={() => handleRoleChange('freelancer')}
                        role="radio"
                        aria-checked={!isClient}
                    >
                        🚀 I'm a Freelancer
                    </button>
                </div>

                <h1 className="hero__title">
                    {isClient ? (
                        <>Clients find talent everywhere.{' '}<br /><span className="highlight">Why not on Verilance?</span></>
                    ) : (
                        <>Find projects that{' '}<br /><span className="highlight">match your talent.</span></>
                    )}
                </h1>
                <p className="hero__subtitle">
                    {isClient
                        ? 'Where top clients meet top freelancers. AI-powered matching, secure payments, and real-time collaboration — all in one platform.'
                        : 'Build your freelance career with high-value projects, secure milestone payments, and AI-powered matching to find your ideal clients.'}
                </p>
                <div className="hero__actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate(isClient ? '/marketplace' : '/projects')}
                    >
                        {isClient ? 'Hire Talent →' : 'Find Projects →'}
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate(isClient ? '/find-expert' : '/register')}
                    >
                        {isClient ? 'Try AI Matching' : 'Start Freelancing'}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
