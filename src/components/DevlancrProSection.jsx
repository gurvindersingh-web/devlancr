import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function VerilancerProSection() {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (contentRef.current) observer.observe(contentRef.current);
        if (cardRef.current) observer.observe(cardRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section className="devpro" ref={sectionRef}>
            <div className="devpro__container">
                <div className="devpro__inner">
                    {/* Left content */}
                    <div className="devpro__content" ref={contentRef}>
                        <span className="devpro__label">verilancer pro</span>
                        <h2 className="devpro__title">
                            High-quality work,<br />
                            or your <em className="devpro__highlight">money back</em>
                        </h2>
                        <p className="devpro__desc">
                            On Verilancer Pro, you can bring your vision to life risk free. Every
                            project with vetted Pro freelancers is backed by our money-back
                            guarantee, so you can accomplish any high-stakes project with total
                            confidence.
                        </p>
                        <button
                            className="devpro__cta"
                            onClick={() => navigate('/marketplace')}
                        >
                            Try now
                        </button>
                    </div>

                    {/* Right guarantee card */}
                    <div className="devpro__card" ref={cardRef}>
                        <div className="devpro__card-inner">
                            <div className="devpro__card-icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <path d="M24 4L6 12v12c0 11.1 7.68 21.48 18 24 10.32-2.52 18-12.9 18-24V12L24 4z" stroke="rgba(124,92,252,0.4)" strokeWidth="2" fill="rgba(124,92,252,0.06)" />
                                    <path d="M18 24l4 4 8-8" stroke="var(--accent-light)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                </svg>
                            </div>
                            <h3 className="devpro__card-title">
                                Money-back<br />guarantee
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default VerilancerProSection;
