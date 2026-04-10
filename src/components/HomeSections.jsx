import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../hooks/useRole';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Sparkles,
    Landmark,
    MessageSquare,
    ShieldCheck,
    FileText,
    Lock,
    Quote,
    Star,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const clientSteps = [
    { num: '01', title: 'Post your project', desc: 'Describe your needs, budget, and timeline in minutes.' },
    { num: '02', title: 'Get AI-matched', desc: 'Our engine surfaces the top freelancers for your specific project.' },
    { num: '03', title: 'Hire & collaborate', desc: 'Review proposals, chat in real-time, and release milestone payments securely.' },
];

const freelancerSteps = [
    { num: '01', title: 'Build your profile', desc: 'Showcase your skills, portfolio, and hourly rate.' },
    { num: '02', title: 'Get matched to projects', desc: 'AI surfaces high-value projects that fit your expertise.' },
    { num: '03', title: 'Deliver & get paid', desc: 'Submit work, hit milestones, and receive secure payments instantly.' },
];

const features = [
    { Icon: Sparkles, title: 'AI-Powered Matching', desc: 'Instantly pairs clients with freelancers based on skills, budget, and project type using our trained matching engine.' },
    { Icon: Landmark, title: 'Milestone Payments', desc: 'Funds are held securely in escrow and released only when work is approved — no disputes, no delays.' },
    { Icon: MessageSquare, title: 'Real-Time Collaboration', desc: 'Built-in chat, file sharing, and live project boards powered by WebSockets keep every project on track.' },
    { Icon: ShieldCheck, title: 'Verified Freelancers', desc: 'Every freelancer on Verilancer is skill-verified and review-backed. No guesswork when hiring.' },
    { Icon: FileText, title: 'Smart Proposals', desc: 'Freelancers submit structured proposals with timelines and pricing — clients compare and decide with full context.' },
    { Icon: Lock, title: 'JWT-Secured Accounts', desc: 'Enterprise-grade JWT authentication and encrypted transactions protect every user on the platform.' },
];

const testimonials = [
    { quote: 'Verilancer matched me with a backend dev in under 10 minutes. The milestone system gave me total peace of mind.', name: 'Sarah K.', role: 'Product Lead at Stackora' },
    { quote: "I've tried every freelance platform. Verilancer is the only one that sends me projects I actually want to work on.", name: 'Arjun M.', role: 'Full-Stack Developer' },
    { quote: "The AI matching isn't a gimmick — it genuinely understands what we need. We've hired 4 freelancers through Verilancer this quarter.", name: 'Lena B.', role: 'CTO at Formflow' },
];

const stats = [
    { value: '50,000+', label: 'Active Freelancers' },
    { value: '120,000+', label: 'Projects Completed' },
    { value: '$14M+', label: 'Paid to Freelancers' },
    { value: '4.9 / 5', label: 'Average Rating' },
];

/* ═══════════════════════════════════════════
   SECTION 1 — HOW IT WORKS
   ═══════════════════════════════════════════ */

function HowItWorks({ isClient }) {
    const steps = isClient ? clientSteps : freelancerSteps;
    const accent = isClient ? '#7F77DD' : '#1D9E75';

    return (
        <section className="hs-section" id="how-it-works">
            <div className="hs-container">
                <div className="hs-header">
                    <h2 className="hs-heading">Get started in 3 steps</h2>
                    <p className="hs-subheading">
                        {isClient
                            ? 'From posting to paying — it only takes a few minutes.'
                            : "From sign-up to your first payment — it's fast and simple."}
                    </p>
                </div>
                <div className="hs-grid hs-grid--3">
                    {steps.map((step) => (
                        <div className="hs-card" key={step.num}>
                            <span className="hs-step-num" style={{ color: accent }}>{step.num}</span>
                            <h3 className="hs-card-title">{step.title}</h3>
                            <p className="hs-card-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════
   SECTION 2 — KEY FEATURES
   ═══════════════════════════════════════════ */

function KeyFeatures({ isClient }) {
    const hoverColor = isClient ? 'rgba(127,119,221,0.4)' : 'rgba(29,158,117,0.4)';
    const iconColor = isClient ? '#7F77DD' : '#1D9E75';

    return (
        <section className="hs-section" id="features">
            <div className="hs-container">
                <div className="hs-header">
                    <h2 className="hs-heading">Everything you need in one platform</h2>
                    <p className="hs-subheading">Built for serious clients and top-tier freelancers.</p>
                </div>
                <div className="hs-grid hs-grid--3">
                    {features.map((f) => (
                        <div
                            className="hs-card hs-card--feature"
                            key={f.title}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = hoverColor)}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                        >
                            <f.Icon size={28} strokeWidth={1.5} className="hs-card-icon" style={{ color: iconColor }} />
                            <h3 className="hs-card-title">{f.title}</h3>
                            <p className="hs-card-desc">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════
   SECTION 3 — TESTIMONIALS
   ═══════════════════════════════════════════ */

function Testimonials() {
    return (
        <section className="hs-section" id="testimonials">
            <div className="hs-container">
                <div className="hs-header">
                    <h2 className="hs-heading">Trusted by thousands of teams and freelancers</h2>
                </div>
                <div className="hs-grid hs-grid--3">
                    {testimonials.map((t) => (
                        <div className="hs-card hs-card--testimonial" key={t.name}>
                            <div className="hs-stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="#EF9F27" stroke="none" />
                                ))}
                            </div>
                            <Quote size={28} strokeWidth={1.5} className="hs-quote-icon" />
                            <p className="hs-quote-text">&ldquo;{t.quote}&rdquo;</p>
                            <div className="hs-quote-author">
                                <p className="hs-quote-name">{t.name}</p>
                                <p className="hs-quote-role">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════
   SECTION 4 — STATS BANNER
   ═══════════════════════════════════════════ */

function StatsBanner() {
    return (
        <section className="hs-section hs-section--stats" id="stats">
            <div className="hs-container">
                <div className="hs-stats-row">
                    {stats.map((s, i) => (
                        <div className="hs-stat" key={s.label}>
                            <p className="hs-stat-value">{s.value}</p>
                            <p className="hs-stat-label">{s.label}</p>
                            {i < stats.length - 1 && <div className="hs-stat-divider" />}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════
   SECTION 5 — FINAL CTA
   ═══════════════════════════════════════════ */

function FinalCtaBanner({ isClient }) {
    const navigate = useNavigate();
    const accent = isClient ? '#7F77DD' : '#1D9E75';
    const glowColor = isClient ? 'rgba(127,119,221,0.15)' : 'rgba(29,158,117,0.15)';

    return (
        <section className="hs-section hs-section--cta" id="final-cta-banner">
            <div className="hs-cta-glow" style={{ background: glowColor }} />
            <div className="hs-container hs-cta-content">
                <h2 className="hs-heading">
                    {isClient ? 'Ready to hire smarter?' : 'Ready to find your next big project?'}
                </h2>
                <p className="hs-subheading">
                    {isClient
                        ? 'Post your first project for free and get matched with top freelancers within minutes.'
                        : 'Join 50,000+ freelancers already growing their careers on Verilancer.'}
                </p>
                <div className="hs-cta-actions">
                    <button
                        className="hs-cta-btn"
                        style={{ background: accent }}
                        onClick={() => navigate('/marketplace')}
                    >
                        {isClient ? 'Post a Project →' : 'Start Freelancing →'}
                    </button>
                    <button
                        className="hs-cta-link"
                        onClick={() => navigate('/marketplace')}
                    >
                        {isClient ? 'Browse freelancers' : 'Browse open projects'}
                    </button>
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════
   MASTER COMPONENT + GSAP ANIMATIONS
   ═══════════════════════════════════════════ */

export default function HomeSections() {
    const { isClient } = useRole();
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const ctx = gsap.context(() => {
            /* ── Section headings — clip-path wipe reveal ── */
            const headings = container.querySelectorAll('.hs-heading');
            headings.forEach((h) => {
                gsap.fromTo(h,
                    { opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' },
                    {
                        opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)',
                        duration: 1, ease: 'power4.out',
                        scrollTrigger: { trigger: h, start: 'top 88%', once: true },
                    }
                );
            });

            /* ── Subheadings — gentle fade + slide ── */
            const subs = container.querySelectorAll('.hs-subheading');
            subs.forEach((s) => {
                gsap.fromTo(s,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out',
                        scrollTrigger: { trigger: s, start: 'top 90%', once: true },
                    }
                );
            });

            /* ── How It Works cards — stagger slide-up + scale + blur reveal ── */
            const howGrid = container.querySelector('#how-it-works .hs-grid');
            if (howGrid) {
                gsap.fromTo(howGrid.children,
                    { opacity: 0, y: 80, scale: 0.9, filter: 'blur(8px)' },
                    {
                        opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
                        duration: 0.9, stagger: 0.15, ease: 'power3.out',
                        scrollTrigger: { trigger: howGrid, start: 'top 82%', once: true },
                    }
                );
            }

            /* ── Step numbers — counting pop-in ── */
            const stepNums = container.querySelectorAll('#how-it-works .hs-step-num');
            stepNums.forEach((n, i) => {
                gsap.fromTo(n,
                    { opacity: 0, scale: 0.3, rotate: -15 },
                    {
                        opacity: 0.3, scale: 1, rotate: 0,
                        duration: 0.7, delay: 0.3 + i * 0.15,
                        ease: 'back.out(2)',
                        scrollTrigger: { trigger: n, start: 'top 85%', once: true },
                    }
                );
            });

            /* ── Feature cards — stagger from alternating sides ── */
            const featureGrid = container.querySelector('#features .hs-grid');
            if (featureGrid) {
                Array.from(featureGrid.children).forEach((card, i) => {
                    const fromX = i % 2 === 0 ? -60 : 60;
                    gsap.fromTo(card,
                        { opacity: 0, x: fromX, y: 30, scale: 0.95 },
                        {
                            opacity: 1, x: 0, y: 0, scale: 1,
                            duration: 0.8, delay: i * 0.1, ease: 'power3.out',
                            scrollTrigger: { trigger: featureGrid, start: 'top 82%', once: true },
                        }
                    );
                });
            }

            /* ── Feature icons — spin in ── */
            const featureIcons = container.querySelectorAll('#features .hs-card-icon');
            featureIcons.forEach((icon, i) => {
                gsap.fromTo(icon,
                    { opacity: 0, scale: 0, rotate: -180 },
                    {
                        opacity: 1, scale: 1, rotate: 0,
                        duration: 0.7, delay: 0.3 + i * 0.08,
                        ease: 'back.out(1.5)',
                        scrollTrigger: { trigger: icon, start: 'top 88%', once: true },
                    }
                );
            });

            /* ── Testimonial cards — fan in from bottom with rotation ── */
            const testimonialGrid = container.querySelector('#testimonials .hs-grid');
            if (testimonialGrid) {
                Array.from(testimonialGrid.children).forEach((card, i) => {
                    const rotation = (i - 1) * 4; // -4, 0, 4 degrees
                    gsap.fromTo(card,
                        { opacity: 0, y: 100, rotate: rotation, scale: 0.85 },
                        {
                            opacity: 1, y: 0, rotate: 0, scale: 1,
                            duration: 1, delay: i * 0.12, ease: 'power4.out',
                            scrollTrigger: { trigger: testimonialGrid, start: 'top 82%', once: true },
                        }
                    );
                });
            }

            /* ── Stars twinkle in ── */
            const stars = container.querySelectorAll('#testimonials .hs-stars svg');
            stars.forEach((star, i) => {
                gsap.fromTo(star,
                    { opacity: 0, scale: 0, rotate: 72 },
                    {
                        opacity: 1, scale: 1, rotate: 0,
                        duration: 0.4, delay: 0.5 + (i % 5) * 0.06,
                        ease: 'back.out(3)',
                        scrollTrigger: { trigger: star.closest('.hs-card'), start: 'top 82%', once: true },
                    }
                );
            });

            /* ── Stats — counter pop-in with elastic bounce ── */
            const statValues = container.querySelectorAll('#stats .hs-stat-value');
            statValues.forEach((sv, i) => {
                gsap.fromTo(sv,
                    { opacity: 0, y: 50, scale: 0.5 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 0.8, delay: i * 0.12,
                        ease: 'elastic.out(1, 0.5)',
                        scrollTrigger: { trigger: sv, start: 'top 90%', once: true },
                    }
                );
            });

            const statLabels = container.querySelectorAll('#stats .hs-stat-label');
            statLabels.forEach((sl, i) => {
                gsap.fromTo(sl,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.5, delay: 0.3 + i * 0.1,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: sl, start: 'top 92%', once: true },
                    }
                );
            });

            /* ── Stat dividers — grow from center ── */
            const statDividers = container.querySelectorAll('#stats .hs-stat-divider');
            statDividers.forEach((d, i) => {
                gsap.fromTo(d,
                    { scaleY: 0, opacity: 0 },
                    {
                        scaleY: 1, opacity: 1,
                        duration: 0.6, delay: 0.4 + i * 0.1,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: d, start: 'top 90%', once: true },
                    }
                );
            });

            /* ── Final CTA — dramatic scale-up entrance ── */
            const ctaContent = container.querySelector('#final-cta-banner .hs-cta-content');
            if (ctaContent) {
                gsap.fromTo(ctaContent,
                    { opacity: 0, y: 80, scale: 0.85 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 1.1, ease: 'power4.out',
                        scrollTrigger: { trigger: ctaContent, start: 'top 85%', once: true },
                    }
                );
            }

            /* ── CTA glow pulse on reveal ── */
            const ctaGlow = container.querySelector('#final-cta-banner .hs-cta-glow');
            if (ctaGlow) {
                gsap.fromTo(ctaGlow,
                    { opacity: 0, scale: 0.3 },
                    {
                        opacity: 1, scale: 1,
                        duration: 1.8, ease: 'power2.out',
                        scrollTrigger: { trigger: ctaGlow, start: 'top 90%', once: true },
                    }
                );
            }

            /* ── CTA buttons — stagger slide-up ── */
            const ctaBtns = container.querySelectorAll('#final-cta-banner .hs-cta-actions > *');
            ctaBtns.forEach((btn, i) => {
                gsap.fromTo(btn,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.6, delay: 0.5 + i * 0.15,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: btn.parentElement, start: 'top 88%', once: true },
                    }
                );
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="hs-wrapper">
            <HowItWorks isClient={isClient} />
            <KeyFeatures isClient={isClient} />
            <Testimonials />
            <StatsBanner />
            <FinalCtaBanner isClient={isClient} />
        </div>
    );
}
