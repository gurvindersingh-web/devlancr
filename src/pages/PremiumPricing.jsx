import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './PremiumPricing.css';

const freelancerPlans = [
    {
        name: 'Starter',
        price: { monthly: 0, yearly: 0 },
        desc: 'Get started with basic tools',
        features: [
            'Basic profile listing',
            '5 proposals per month',
            'Standard job alerts',
            'Community support',
        ],
        cta: 'Current Plan',
        disabled: true,
    },
    {
        name: 'Pro',
        price: { monthly: 499, yearly: 4790 },
        desc: 'Unlock AI-powered growth tools',
        features: [
            'AI Proposal Generator with win prediction',
            'AI Portfolio Analyzer',
            'Smart Profile Boost (targeted visibility)',
            'Advanced Earnings Analytics',
            'Priority Job Alerts',
        ],
        cta: 'Upgrade Now',
        popular: false,
    },
    {
        name: 'Elite',
        price: { monthly: 999, yearly: 9590 },
        desc: 'Dominate the platform with top-tier features',
        features: [
            'Everything in Pro',
            'Verified Freelancer Badge',
            'AI Skill Gap Detector',
            'Top Search Ranking',
            'Higher proposal limit',
        ],
        cta: 'Upgrade Now',
        popular: true,
    },
];

const clientPlans = [
    {
        name: 'Starter',
        price: { monthly: 0, yearly: 0 },
        desc: 'Post projects and find talent',
        features: [
            'Post up to 3 projects',
            'Browse freelancer profiles',
            'Basic messaging',
            'Standard support',
        ],
        cta: 'Current Plan',
        disabled: true,
    },
    {
        name: 'Business',
        price: { monthly: 999, yearly: 9590 },
        desc: 'AI tools to hire smarter',
        features: [
            'AI Hiring Assistant',
            'Talent Recommendation Engine',
            'Featured Job Post',
            'AI Budget Estimator',
        ],
        cta: 'Start Hiring Smarter',
        popular: false,
    },
    {
        name: 'Enterprise',
        price: { monthly: 1999, yearly: 19190 },
        desc: 'Full-scale team building suite',
        features: [
            'Everything in Business',
            'AI Team Builder',
            'Project Success Analytics',
            'Auto Contract & Milestones',
            'Dedicated priority support',
        ],
        cta: 'Start Hiring Smarter',
        popular: true,
    },
];

const featureIcons = {
    'AI Proposal Generator with win prediction': '🤖',
    'AI Portfolio Analyzer': '📊',
    'Smart Profile Boost (targeted visibility)': '🚀',
    'Advanced Earnings Analytics': '📈',
    'Priority Job Alerts': '🔔',
    'Everything in Pro': '⭐',
    'Verified Freelancer Badge': '✅',
    'AI Skill Gap Detector': '🎯',
    'Top Search Ranking': '🔝',
    'Higher proposal limit': '📝',
    'AI Hiring Assistant': '🤖',
    'Talent Recommendation Engine': '💡',
    'Featured Job Post': '📌',
    'AI Budget Estimator': '💰',
    'Everything in Business': '⭐',
    'AI Team Builder': '👥',
    'Project Success Analytics': '📊',
    'Auto Contract & Milestones': '📋',
    'Dedicated priority support': '🛡️',
    'Basic profile listing': '👤',
    '5 proposals per month': '📝',
    'Standard job alerts': '🔔',
    'Community support': '💬',
    'Post up to 3 projects': '📂',
    'Browse freelancer profiles': '🔍',
    'Basic messaging': '💬',
    'Standard support': '📞',
};

function PremiumPricing() {
    const [searchParams] = useSearchParams();
    const initialType = searchParams.get('type') === 'client' ? 'client' : 'freelancer';
    const [userType, setUserType] = useState(initialType);
    const [billing, setBilling] = useState('monthly');
    const [animating, setAnimating] = useState(false);

    const plans = userType === 'freelancer' ? freelancerPlans : clientPlans;

    const handleTypeSwitch = (type) => {
        if (type === userType) return;
        setAnimating(true);
        setTimeout(() => {
            setUserType(type);
            setAnimating(false);
        }, 300);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pp-page">
            <Navbar showSearch={false} />
            <div className="pp-container">
                {/* Header */}
                <div className="pp-header">
                    <div className="pp-badge">✨ Premium Plans</div>
                    <h1 className="pp-title">
                        Upgrade to <span className="gradient-text">Premium</span>
                    </h1>
                    <p className="pp-subtitle">
                        Powerful AI tools to get hired faster and hire smarter
                    </p>
                </div>

                {/* User Type Toggle */}
                <div className="pp-type-toggle">
                    <button
                        className={`pp-type-btn ${userType === 'freelancer' ? 'active' : ''}`}
                        onClick={() => handleTypeSwitch('freelancer')}
                    >
                        <span className="pp-type-icon">👨‍💻</span> Freelancer
                    </button>
                    <button
                        className={`pp-type-btn ${userType === 'client' ? 'active' : ''}`}
                        onClick={() => handleTypeSwitch('client')}
                    >
                        <span className="pp-type-icon">🧑‍💼</span> Client
                    </button>
                </div>

                {/* Billing Toggle */}
                <div className="pp-billing-toggle">
                    <span className={billing === 'monthly' ? 'active' : ''}>Monthly</span>
                    <button
                        className={`pp-toggle-switch ${billing === 'yearly' ? 'on' : ''}`}
                        onClick={() => setBilling(b => b === 'monthly' ? 'yearly' : 'monthly')}
                        aria-label="Toggle billing period"
                    >
                        <div className="pp-toggle-knob" />
                    </button>
                    <span className={billing === 'yearly' ? 'active' : ''}>
                        Yearly <span className="pp-save-badge">Save 20%</span>
                    </span>
                </div>

                {/* Cards */}
                <div className={`pp-cards ${animating ? 'pp-cards--exit' : 'pp-cards--enter'}`}>
                    {plans.map((plan, i) => (
                        <div
                            className={`pp-card ${plan.popular ? 'pp-card--popular' : ''} ${plan.disabled ? 'pp-card--free' : ''}`}
                            key={`${userType}-${plan.name}`}
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            {plan.popular && (
                                <div className="pp-card-badge">🔥 Most Popular</div>
                            )}
                            <div className="pp-card-header">
                                <h3 className="pp-plan-name">{plan.name}</h3>
                                <p className="pp-plan-desc">{plan.desc}</p>
                            </div>
                            <div className="pp-price">
                                {plan.price[billing] === 0 ? (
                                    <span className="pp-price-amount">Free</span>
                                ) : (
                                    <>
                                        <span className="pp-price-currency">₹</span>
                                        <span className="pp-price-amount">
                                            {billing === 'monthly'
                                                ? plan.price.monthly.toLocaleString()
                                                : Math.round(plan.price.yearly / 12).toLocaleString()}
                                        </span>
                                        <span className="pp-price-period">/mo</span>
                                    </>
                                )}
                            </div>
                            {billing === 'yearly' && plan.price.yearly > 0 && (
                                <div className="pp-billed-yearly">
                                    Billed ₹{plan.price.yearly.toLocaleString()}/year
                                </div>
                            )}
                            <ul className="pp-features">
                                {plan.features.map((feat, j) => (
                                    <li key={j} className="pp-feature">
                                        <span className="pp-feature-icon">
                                            {featureIcons[feat] || '✔'}
                                        </span>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`pp-cta ${plan.disabled ? 'pp-cta--disabled' : ''} ${plan.popular ? 'pp-cta--popular' : ''}`}
                                disabled={plan.disabled}
                            >
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Why Premium */}
                <div className="pp-why">
                    <h2 className="pp-why-title">Why go <span className="gradient-text">Premium</span>?</h2>
                    <div className="pp-why-grid">
                        <div className="pp-why-item">
                            <div className="pp-why-icon">🚀</div>
                            <span>Get hired 3x faster</span>
                        </div>
                        <div className="pp-why-item">
                            <div className="pp-why-icon">🧠</div>
                            <span>AI-powered insights</span>
                        </div>
                        <div className="pp-why-item">
                            <div className="pp-why-icon">👁️</div>
                            <span>Priority visibility</span>
                        </div>
                        <div className="pp-why-item">
                            <div className="pp-why-icon">🛡️</div>
                            <span>Verified trust badges</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PremiumPricing;
