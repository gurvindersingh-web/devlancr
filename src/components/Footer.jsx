import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__content">
                <div className="footer__top">
                    <div className="footer__column footer__column--left">
                        <div className="footer__logo">
                            <span className="gradient-text">Verilance</span> <span className="footer__logo-suffix">AI</span>
                        </div>
                        <p className="footer__description">
                            Verilance builds reliable, high-performance AI matching systems that help businesses
                            automate hiring, gain clearer insights from talent data, and move
                            faster without adding complexity. Built for the future of work.
                        </p>
                    </div>

                    <div className="footer__column footer__column--center">
                        <nav className="footer__nav">
                            <a href="#" className="footer__link">HOME</a>
                            <a href="#whatwedo" className="footer__link">HOW IT WORKS</a>
                            <a href="#platform" className="footer__link">PLATFORM</a>
                            <a href="/blog" className="footer__link">BLOG</a>
                            <a href="#" className="footer__link">ABOUT US</a>
                            <a href="#" className="footer__link">CONTACT</a>
                        </nav>
                    </div>

                    <div className="footer__column footer__column--right">
                        <h3 className="footer__heading">
                            Powering the Next Chapter of Intelligent Freelancing
                        </h3>
                        <p className="footer__description">
                            We make freelance hiring practical, dependable, and accessible for organizations
                            that want to innovate without complexity. Our strength comes from a
                            deep foundation in student talent, paired with the agility of AI that
                            enjoys pushing boundaries. Verilance is where experience meets innovation.
                        </p>
                    </div>
                </div>

                <div className="footer__bottom">
                    <div className="footer__copyright">
                        © Verilance 2026, all rights reserved.
                    </div>
                    <div className="footer__socials">
                        <a href="#" className="footer__social-link" aria-label="YouTube">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                        </a>
                        <a href="#" className="footer__social-link" aria-label="LinkedIn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                        <a href="#" className="footer__social-link" aria-label="Twitter">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-3.86-1.55C13.63 3.42 11.9 5.8 12.37 8.5 7.63 8.35 3.53 6 1.45 3.05 1.13 4.65 1.7 6.37 2.95 7.6 1.95 7.57 1 7.28.3 6.9c.04 2.5 1.77 4.5 4.15 5.05-.65.17-1.34.2-2.03.02.58 2.1 2.52 3.57 4.7 3.6-1.92 1.54-4.34 2.15-6.73 1.9A11 11 0 0 0 6.29 19c8.2 0 12.65-7.3 11.83-14.93A8.8 8.8 0 0 0 23 3z"></path></svg>
                        </a>
                    </div>
                    <div className="footer__right-text">
                        An affiliated platform of Verilance Inc.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
