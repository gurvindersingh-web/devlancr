import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import ClientCard from '../components/ClientCard';
import JsonLd from '../components/JsonLd';
import { FREELANCERS } from '../data/freelancers';
import { CLIENTS } from '../data/clients';
import './ServiceDetail.css';

/* ── Subcategory data for each master category ── */
const CATEGORY_DATA = {
    'Programming & Tech': {
        tagline: 'You think it. A programmer develops it.',
        gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
        quickLinks: ['Website Dev', 'Mobile App', 'WordPress', 'Shopify', 'AI Developer', 'Wix', 'Game Development', 'Python'],
        subcategories: [
            {
                title: 'Website Development',
                color: '#6366f1',
                items: ['Website Development', 'Website Maintenance', 'WordPress', 'Shopify', 'Custom Websites', 'Landing Pages'],
            },
            {
                title: 'Application Development',
                color: '#8b5cf6',
                items: ['Web Applications', 'Desktop Applications', 'Game Development', 'Chatbot Development', 'Browser Extensions'],
            },
            {
                title: 'Software Development',
                color: '#06b6d4',
                items: ['Software Development', 'AI Development', 'APIs & Integrations', 'Scripting', 'Plugins Development'],
            },
            {
                title: 'Mobile Apps',
                color: '#ec4899',
                items: ['Mobile App Development', 'Cross-platform Apps', 'Android App Development', 'iOS App Development', 'App Maintenance'],
            },
            {
                title: 'Vibe Coding',
                color: '#f59e0b',
                items: ['Development & MVP', 'Troubleshooting & Improvements', 'Deployments & DevOps', 'Consultation & Training'],
            },
            {
                title: 'Blockchain & Cryptocurrency',
                color: '#10b981',
                items: ['Blockchain Development', 'Decentralized Apps (dApps)', 'Coin Design & Tokenization', 'Smart Contracts', 'Exchange Platforms'],
            },
            {
                title: 'Support & Cybersecurity',
                color: '#ef4444',
                items: ['Support & IT', 'Cloud Computing', 'DevOps Engineering', 'Cybersecurity', 'Convert Files'],
            },
            {
                title: 'Data Science',
                color: '#14b8a6',
                items: ['Data Analysis', 'Machine Learning', 'Data Visualization', 'Data Engineering', 'Database Administration'],
            },
        ],
    },
    'Graphics & Design': {
        tagline: 'Designs that make lasting first impressions.',
        gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #f97316 100%)',
        quickLinks: ['Logo Design', 'Brand Style', 'Web Design', 'Illustration', 'UX Design', 'Packaging'],
        subcategories: [
            {
                title: 'Logo & Brand Identity',
                color: '#ec4899',
                items: ['Logo Design', 'Brand Style Guides', 'Business Cards', 'Fonts & Typography', 'Brand Identity'],
            },
            {
                title: 'Web & App Design',
                color: '#f43f5e',
                items: ['Website Design', 'App Design', 'UX Design', 'Landing Page Design', 'Icon Design'],
            },
            {
                title: 'Art & Illustration',
                color: '#f97316',
                items: ['Illustration', 'NFT Art', 'Character Design', 'Comics & Storyboards', 'Pattern Design'],
            },
            {
                title: 'Marketing Design',
                color: '#a855f7',
                items: ['Social Media Design', 'Email Design', 'Infographics', 'Print Design', 'Flyer Design'],
            },
            {
                title: 'Visual Design',
                color: '#6366f1',
                items: ['Image Editing', 'Presentation Design', 'Packaging Design', 'Book Design', 'Album Cover Design'],
            },
            {
                title: '3D Design',
                color: '#06b6d4',
                items: ['3D Modeling', '3D Rendering', 'Product Design', '3D Animation', '3D Printing'],
            },
        ],
    },
    'Digital Marketing': {
        tagline: 'Build it. Grow it. Scale it.',
        gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)',
        quickLinks: ['SEO', 'Social Media', 'Email Marketing', 'PPC', 'Content Marketing', 'Analytics'],
        subcategories: [
            {
                title: 'Search Engine Optimization',
                color: '#10b981',
                items: ['SEO Strategy', 'On-Page SEO', 'Technical SEO', 'Link Building', 'Local SEO'],
            },
            {
                title: 'Social Media Marketing',
                color: '#06b6d4',
                items: ['Social Media Management', 'Content Creation', 'Paid Social Ads', 'Influencer Marketing', 'Community Management'],
            },
            {
                title: 'Paid Advertising',
                color: '#3b82f6',
                items: ['Google Ads', 'Facebook Ads', 'Instagram Ads', 'LinkedIn Ads', 'YouTube Ads'],
            },
            {
                title: 'Content Marketing',
                color: '#8b5cf6',
                items: ['Blog Writing', 'Copywriting', 'Content Strategy', 'Email Marketing', 'Newsletter Design'],
            },
            {
                title: 'Analytics & Tracking',
                color: '#f59e0b',
                items: ['Google Analytics', 'Data Tracking', 'Conversion Optimization', 'A/B Testing', 'Marketing Reports'],
            },
        ],
    },
    'Writing & Translation': {
        tagline: 'Words that captivate, content that converts.',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)',
        quickLinks: ['Articles', 'Blog Posts', 'Copywriting', 'Translation', 'Proofreading', 'Ghostwriting'],
        subcategories: [
            {
                title: 'Content Writing',
                color: '#f59e0b',
                items: ['Articles & Blog Posts', 'Website Content', 'Product Descriptions', 'Press Releases', 'Creative Writing'],
            },
            {
                title: 'Copywriting',
                color: '#ef4444',
                items: ['Sales Copy', 'Ad Copy', 'Email Copy', 'Social Media Copy', 'UX Writing'],
            },
            {
                title: 'Translation',
                color: '#ec4899',
                items: ['General Translation', 'Technical Translation', 'Legal Translation', 'Localization', 'Subtitling'],
            },
            {
                title: 'Editing & Proofreading',
                color: '#8b5cf6',
                items: ['Proofreading', 'Editing', 'Book Editing', 'Academic Editing', 'Beta Reading'],
            },
        ],
    },
    'Video & Animation': {
        tagline: 'Bring your story to life, frame by frame.',
        gradient: 'linear-gradient(135deg, #ef4444 0%, #ec4899 50%, #a855f7 100%)',
        quickLinks: ['Video Editing', 'Animation', 'Motion Graphics', 'Explainers', 'Intros', 'Shorts'],
        subcategories: [
            {
                title: 'Video Editing',
                color: '#ef4444',
                items: ['Video Editing', 'Visual Effects', 'Color Grading', 'Video Templates', 'Subtitles & Captions'],
            },
            {
                title: 'Animation',
                color: '#ec4899',
                items: ['2D Animation', '3D Animation', 'Whiteboard Animation', 'Logo Animation', 'Character Animation'],
            },
            {
                title: 'Motion Graphics',
                color: '#a855f7',
                items: ['Intros & Outros', 'Social Media Videos', 'Lyric Videos', 'Slideshow Videos', 'App & Web Previews'],
            },
            {
                title: 'Video Production',
                color: '#6366f1',
                items: ['Explainer Videos', 'Product Videos', 'Corporate Videos', 'Music Videos', 'Testimonials'],
            },
        ],
    },
    'AI Services': {
        tagline: 'Harness the power of Artificial Intelligence.',
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 50%, #8b5cf6 100%)',
        quickLinks: ['AI Chatbots', 'Machine Learning', 'AI Art', 'Data Science', 'NLP', 'Computer Vision'],
        subcategories: [
            {
                title: 'AI Development',
                color: '#06b6d4',
                items: ['AI Chatbots', 'AI Agents', 'Machine Learning Models', 'Deep Learning', 'Natural Language Processing'],
            },
            {
                title: 'AI for Business',
                color: '#6366f1',
                items: ['AI Consulting', 'AI Integration', 'Process Automation', 'Prediction Models', 'AI Strategy'],
            },
            {
                title: 'AI Creative',
                color: '#8b5cf6',
                items: ['AI Art Generation', 'AI Video Generation', 'AI Music', 'AI Writing Tools', 'AI Voice & Speech'],
            },
            {
                title: 'Data & Analytics',
                color: '#10b981',
                items: ['Data Science', 'Computer Vision', 'AI Data Annotation', 'Data Pipelines', 'AI Model Training'],
            },
        ],
    },
    'Music & Audio': {
        tagline: 'Sounds that resonate, music that inspires.',
        gradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #ec4899 100%)',
        quickLinks: ['Mixing', 'Voice Over', 'Beats', 'Jingles', 'Sound Effects', 'Podcasts'],
        subcategories: [
            {
                title: 'Music Production',
                color: '#f97316',
                items: ['Music Production', 'Beat Making', 'Songwriting', 'Jingles & Intros', 'Music Composition'],
            },
            {
                title: 'Audio Engineering',
                color: '#ef4444',
                items: ['Mixing & Mastering', 'Sound Design', 'Audio Editing', 'Sound Effects', 'Audio Restoration'],
            },
            {
                title: 'Voice Services',
                color: '#ec4899',
                items: ['Voice Over', 'Voice Acting', 'Audiobook Narration', 'Podcast Editing', 'IVR Recording'],
            },
        ],
    },
    'Business': {
        tagline: 'From strategy to execution, we mean business.',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)',
        quickLinks: ['Business Plans', 'Financial Planning', 'Legal', 'Virtual Assistant', 'Project Management'],
        subcategories: [
            {
                title: 'Business Strategy',
                color: '#3b82f6',
                items: ['Business Plans', 'Business Consulting', 'Market Research', 'Competitive Analysis', 'Pitch Decks'],
            },
            {
                title: 'Finance & Accounting',
                color: '#6366f1',
                items: ['Financial Consulting', 'Bookkeeping', 'Tax Consulting', 'Financial Analysis', 'Budget Planning'],
            },
            {
                title: 'Operations & Productivity',
                color: '#8b5cf6',
                items: ['Virtual Assistant', 'Project Management', 'Data Entry', 'Supply Chain', 'HR Consulting'],
            },
            {
                title: 'Legal Services',
                color: '#10b981',
                items: ['Legal Consulting', 'Contracts', 'Terms of Service', 'Trademark Registration', 'Patent Services'],
            },
        ],
    },
    'Consulting': {
        tagline: 'Expert advice when you need it most.',
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #10b981 100%)',
        quickLinks: ['Tech Consulting', 'Career Coaching', 'Startups', 'Mentoring', 'Strategy'],
        subcategories: [
            {
                title: 'Technology Consulting',
                color: '#8b5cf6',
                items: ['Tech Stack Consulting', 'Architecture Review', 'Code Review', 'Cloud Consulting', 'Security Audit'],
            },
            {
                title: 'Career & Personal',
                color: '#06b6d4',
                items: ['Career Coaching', 'Resume Review', 'Interview Prep', 'Mentoring', 'Personal Branding'],
            },
            {
                title: 'Startup Consulting',
                color: '#10b981',
                items: ['Startup Strategy', 'MVP Planning', 'Fundraising Advice', 'Growth Hacking', 'Product-Market Fit'],
            },
        ],
    },
};

/* Fallback for unrecognized categories */
const DEFAULT_CATEGORY = {
    tagline: 'Find the right experts for your project.',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    quickLinks: [],
    subcategories: [],
};

const formatDisplayName = (name) => {
    if (!name) return '';
    return name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export default function ServiceDetailPage() {
    const { serviceName } = useParams();
    const navigate = useNavigate();
    const decodedName = decodeURIComponent(serviceName);

    // Normalize logic: slug "vibe-coding" -> "Vibe Coding" to match keys in objects
    const displayName = formatDisplayName(decodedName);

    // Attempt lookup with formatted name, fallback to raw decoded
    const categoryData = CATEGORY_DATA[displayName] || CATEGORY_DATA[decodedName] || DEFAULT_CATEGORY;

    // SEO: Update page title dynamically
    useEffect(() => {
        document.title = `${displayName} | Verilancer — Freelance Marketplace`;
        return () => { document.title = 'Verilancer — Freelance Marketplace'; };
    }, [displayName]);

    // SEO: Structured data for search engines
    const jsonLdData = useMemo(() => ({
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': displayName,
        'description': categoryData.tagline,
        'provider': {
            '@type': 'Organization',
            'name': 'Verilancer',
            'url': 'https://verilancer.com'
        },
        'serviceType': displayName,
        'areaServed': 'Worldwide',
    }), [displayName, categoryData.tagline]);

    return (
        <>
            <JsonLd data={jsonLdData} />
            <Navbar />
            <main className="sd__page">
                {/* Hero Banner */}
                <section className="sd__hero" style={{ background: categoryData.gradient }}>
                    <button className="sd__back-btn" onClick={() => navigate('/marketplace')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        Back to Marketplace
                    </button>
                    <h1 className="sd__hero-title">{displayName}</h1>
                    <p className="sd__hero-subtitle">{categoryData.tagline}</p>
                </section>

                {/* Quick Links / Ace your projects */}
                {categoryData.quickLinks.length > 0 && (
                    <section className="sd__quicklinks">
                        <h2 className="sd__section-title">Ace your projects with experts</h2>
                        <p className="sd__section-desc">
                            Get smart about your projects with freelancers who specialize across various fields.
                        </p>
                        <div className="sd__quicklinks-grid">
                            {categoryData.quickLinks.map((link) => (
                                <button key={link} className="sd__quicklink-chip" onClick={() => navigate('/find-expert')}>
                                    <span className="sd__quicklink-dot" />
                                    <span>{link}</span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {/* Explore Subcategories */}
                <section className="sd__explore">
                    <h2 className="sd__section-title">Explore {displayName}</h2>
                    <div className="sd__explore-grid">
                        {categoryData.subcategories.map((sub) => (
                            <div key={sub.title} className="sd__subcat-card">
                                <div className="sd__subcat-header" style={{ borderColor: sub.color }}>
                                    <div className="sd__subcat-dot" style={{ background: sub.color }} />
                                    <h3 className="sd__subcat-title">{sub.title}</h3>
                                </div>
                                <ul className="sd__subcat-list">
                                    {sub.items.map((item) => (
                                        <li key={item} className="sd__subcat-item" onClick={() => navigate('/find-expert')}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Top Freelancers */}
                <section className="sd__freelancers" style={{
                    padding: '80px clamp(16px, 3vw, 40px) 80px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <h2 className="sd__section-title" style={{ marginBottom: '40px' }}>Top {displayName} Freelancers</h2>
                    <div className="sd__freelancers-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '24px'
                    }}>
                        {/* Filter freelancers that match the category or have relevant skills */}
                        {(() => {
                            const filteredFreelancers = FREELANCERS.filter(f =>
                                f.serviceCategory.some(cat =>
                                    cat.toLowerCase() === displayName.toLowerCase() ||
                                    cat.toLowerCase() === decodedName.toLowerCase()
                                )
                            );

                            if (filteredFreelancers.length === 0) {
                                return (
                                    <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#94a3b8', padding: '40px' }}>
                                        <p>No freelancers found specifically for this category yet. Check back soon!</p>
                                    </div>
                                );
                            }

                            return filteredFreelancers.map(f => (
                                <ProfileCard key={f.name} freelancer={f} />
                            ));
                        })()}
                    </div>
                </section>

                {/* Client Profiles */}
                <section className="sd__clients" style={{
                    padding: '0 clamp(16px, 3vw, 40px) 80px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <h2 className="sd__section-title" style={{ marginBottom: '40px' }}>Trusted by Clients</h2>
                    <div className="sd__clients-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '24px'
                    }}>
                        {CLIENTS.map((client, index) => (
                            <ClientCard key={index} client={client} />
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="sd__cta">
                    <h2 className="sd__cta-title">
                        Ready to get started with <span className="sd__highlight">{displayName}</span>?
                    </h2>
                    <p className="sd__cta-desc">
                        Tell us what you need and get matched with top experts in minutes.
                    </p>
                    <button className="sd__cta-btn" onClick={() => navigate('/find-expert')}>
                        Find an expert with AI
                    </button>
                </section>
            </main>
        </>
    );
}
