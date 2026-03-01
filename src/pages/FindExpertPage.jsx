import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Orb from '../component/Orb';
import './FindExpert.css';

const SUGGESTIONS = [
    '🎨 Find a UI/UX designer',
    '💻 Build a web app',
    '📱 Mobile app development',
    '🎬 Video editing expert',
    '🤖 AI & Machine Learning',
    '📊 Data analytics',
];

function FindExpertPage() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/marketplace?q=${encodeURIComponent(query.trim())}`);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        // Strip emoji prefix for the query
        const clean = suggestion.replace(/^[^\w]*/, '').trim();
        setQuery(clean);
    };

    return (
        <div className="fe">
            {/* Ambient Background */}
            <div className="fe__ambient">
                <div className="fe__ambient-orb fe__ambient-orb--1" />
                <div className="fe__ambient-orb fe__ambient-orb--2" />
            </div>

            {/* Sidebar */}
            <aside className="fe__sidebar">
                <div className="fe__sidebar-logo" onClick={() => navigate('/marketplace')}>
                    <span className="gradient-text">D</span>
                </div>

                {/* New Chat */}
                <button className="fe__sidebar-btn fe__sidebar-btn--active" aria-label="New chat" title="New chat">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                </button>

                {/* Search */}
                <button className="fe__sidebar-btn" aria-label="Search" title="Search">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>

                {/* Explore */}
                <button className="fe__sidebar-btn" aria-label="Explore" title="Explore">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                    </svg>
                </button>

                <div className="fe__sidebar-spacer" />

                {/* Avatar */}
                <div className="fe__sidebar-avatar" title="Profile">
                    DL
                </div>
            </aside>

            {/* Main Content */}
            <div className="fe__main">
                {/* Top Bar */}
                <div className="fe__topbar">
                    <div className="fe__topbar-model">
                        Verilance Expert
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </div>
                    <div className="fe__topbar-actions">
                        <button className="fe__topbar-btn" aria-label="Share" title="Share">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </button>
                        <button className="fe__topbar-btn" aria-label="Settings" title="Settings">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Centered Content */}
                <div className="fe__center">
                    {/* Orb — focal point */}
                    <div className="fe__orb-wrapper">
                        <Orb hue={260} hoverIntensity={0.3} rotateOnHover={true} />
                    </div>

                    <h1 className="fe__heading">What can I help with?</h1>

                    {/* Suggestion Chips */}
                    <div className="fe__suggestions">
                        {SUGGESTIONS.map((s) => (
                            <button
                                key={s}
                                className="fe__suggestion"
                                onClick={() => handleSuggestionClick(s)}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bottom Input Bar */}
                <div className="fe__input-area">
                    <form className="fe__input-bar" onSubmit={handleSubmit}>
                        <button type="button" className="fe__input-attach" aria-label="Attach file">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                        </button>

                        <input
                            type="text"
                            className="fe__input-field"
                            placeholder="Ask anything"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />

                        <div className="fe__input-actions">
                            <button type="button" className="fe__input-icon-btn" aria-label="Voice input">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
                                </svg>
                            </button>

                            <button type="submit" className="fe__input-send" aria-label="Send">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-5H7l5-7v5h4l-5 7z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                    <p className="fe__footer-text">
                        Verilance AI can help you find the perfect expert for your project.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default FindExpertPage;
