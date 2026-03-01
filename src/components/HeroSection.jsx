import { useNavigate } from 'react-router-dom';

function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className="hero" id="hero">
            <div className="hero__content">
                <div className="hero__badge">The Future of Freelancing</div>
                <h1 className="hero__title">
                    Clients find talent everywhere.{' '}
                    <br />
                    Why not on <span className="highlight">Verilance</span>?
                </h1>
                <p className="hero__subtitle">
                    Where top clients meet top freelancers. AI-powered matching,
                    secure payments, and real-time collaboration — all in one platform.
                </p>
                <div className="hero__actions">
                    <button className="btn btn-primary" onClick={() => navigate('/marketplace')}>Hire Talent →</button>
                    <button className="btn btn-secondary" onClick={() => navigate('/marketplace')}>Start Freelancing</button>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;

