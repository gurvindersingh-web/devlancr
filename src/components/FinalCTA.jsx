import { useEffect, useRef } from 'react';

function FinalCTA() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const els = entry.target.querySelectorAll(
                            '.final-cta__title, .final-cta__subtitle, .final-cta__actions'
                        );
                        els.forEach((el) => el.classList.add('visible'));
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="final-cta" id="cta" ref={sectionRef}>
            <div className="final-cta__content">
                <h2 className="final-cta__title">
                    Build your career. <br />
                    Build your team. <br />
                    Build on <span className="gradient-text">Verilancer</span>.
                </h2>
                <p className="final-cta__subtitle">
                    Join thousands of clients and freelancers who are already building the future together.
                </p>
                <div className="final-cta__actions">
                    <button className="btn btn-primary">Get Started Free →</button>
                    <button className="btn btn-secondary">Schedule a Demo</button>
                </div>
            </div>
        </section>
    );
}

export default FinalCTA;
