import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Navbar({ showSearch = true }) {
    const [scrolled, setScrolled] = useState(false);
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
            <div
                className="navbar__logo"
                onClick={() => navigate('/')}
                role="button"
                tabIndex={0}
                aria-label="Go to homepage"
                onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
                style={{ cursor: 'pointer' }}
            >
                <span className="gradient-text">Verilance</span>
            </div>

            {/* Search Bar */}
            <div className={`navbar__search ${showSearch ? '' : 'navbar__search--hidden'}`}>
                <input
                    type="search"
                    className="navbar__search-input"
                    placeholder="What service are you looking for today?"
                    aria-label="Search services"
                    onKeyDown={(e) => { if (e.key === 'Enter') navigate('/marketplace'); }}
                />
                <button className="navbar__search-btn" aria-label="Search" onClick={() => navigate('/marketplace')}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242.656a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" fill="currentColor" />
                    </svg>
                </button>
            </div>

            {/* Nav Links — ✅ FIX: proper button/role elements, not bare <a> */}
            <ul className="navbar__links" role="list">
                <li className="navbar__dropdown">
                    <button className="navbar__link-btn">
                        Verilance Pro <span className="navbar__caret" aria-hidden="true">›</span>
                    </button>
                    <div className="navbar__dropdown-menu">
                        <button className="navbar__dropdown-item" onClick={() => navigate('/premium?type=client')}>
                            <div className="navbar__dropdown-icon navbar__dropdown-icon--hire">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="3" />
                                    <circle cx="10" cy="10" r="3" />
                                    <path d="M21 21l-4.35-4.35" />
                                    <path d="M7 17l1-1.5 2 1 2-3 2 2 1.5-1" />
                                </svg>
                            </div>
                            <div className="navbar__dropdown-text">
                                <span className="navbar__dropdown-title">I'm looking to hire</span>
                                <span className="navbar__dropdown-desc">My team needs vetted freelance talent and a premium business solution.</span>
                            </div>
                        </button>
                        <button className="navbar__dropdown-item" onClick={() => navigate('/premium?type=freelancer')}>
                            <div className="navbar__dropdown-icon navbar__dropdown-icon--offer">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="8" r="5" />
                                    <path d="M20 21a8 8 0 0 0-16 0" />
                                    <path d="M15 6l1.5 1.5" />
                                    <circle cx="17" cy="5" r="1.5" fill="currentColor" stroke="none" />
                                </svg>
                            </div>
                            <div className="navbar__dropdown-text">
                                <span className="navbar__dropdown-title">I want to offer Pro services</span>
                                <span className="navbar__dropdown-desc">I'd like to work on business projects as a Pro freelancer or agency.</span>
                            </div>
                        </button>
                    </div>
                </li>
                <li>
                    <button className="navbar__link-btn" onClick={() => navigate('/marketplace')}>
                        Explore <span className="navbar__caret" aria-hidden="true">›</span>
                    </button>
                </li>
                <li>
                    <button className="navbar__link-btn" onClick={() => navigate('/blog')}>
                        Blog
                    </button>
                </li>
                <li>
                    <button className="navbar__link-btn navbar__lang">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M1 8h14M8 1c2 2.5 2 10.5 0 14M8 1c-2 2.5-2 10.5 0 14" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                        English
                    </button>
                </li>
                <li>
                    <button className="navbar__link-btn" onClick={() => navigate('/find-expert')}>Become a Seller</button>
                </li>
            </ul>

            {/* AI Chat Button */}
            <button className="navbar__ai-btn" onClick={() => navigate('/find-expert')} aria-label="Chat with AI">
                <svg className="navbar__ai-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>AI</span>
            </button>

            {/* Theme Toggle */}
            <button className="navbar__theme-toggle" onClick={toggleTheme} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
                {isDark ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                )}
            </button>
        </nav>
    );
}

export default Navbar;
