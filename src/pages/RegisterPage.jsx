import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './Dashboard.css';

export default function RegisterPage() {
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', password: '', role: 'CLIENT'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const updateField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        setLoading(true);
        try {
            const res = await authAPI.register(form);
            login(res.data);
            if (form.role === 'CLIENT') navigate('/client-dashboard');
            else navigate('/freelancer-dashboard');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            <div className="auth-page">
                <div className="auth-card">
                    <h1>Create Account</h1>
                    <p className="subtitle">Join the marketplace</p>

                    {error && (
                        <div className="error-msg" role="alert" aria-live="polite">
                            {error}
                        </div>
                    )}

                    <div className="role-selector" role="radiogroup" aria-label="Account type">
                        <div
                            className={`role-option ${form.role === 'CLIENT' ? 'active' : ''}`}
                            onClick={() => setForm((prev) => ({ ...prev, role: 'CLIENT' }))}
                            role="radio"
                            aria-checked={form.role === 'CLIENT'}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && setForm((prev) => ({ ...prev, role: 'CLIENT' }))}
                        >
                            <h3>💼 Client</h3>
                            <p>Hire talent</p>
                        </div>
                        <div
                            className={`role-option ${form.role === 'FREELANCER' ? 'active' : ''}`}
                            onClick={() => setForm((prev) => ({ ...prev, role: 'FREELANCER' }))}
                            role="radio"
                            aria-checked={form.role === 'FREELANCER'}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && setForm((prev) => ({ ...prev, role: 'FREELANCER' }))}
                        >
                            <h3>🚀 Freelancer</h3>
                            <p>Find work</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="reg-firstname">First Name</label>
                                <input id="reg-firstname" type="text" required placeholder="John"
                                    value={form.firstName} onChange={updateField('firstName')} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reg-lastname">Last Name</label>
                                <input id="reg-lastname" type="text" required placeholder="Doe"
                                    value={form.lastName} onChange={updateField('lastName')} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="reg-email">Email</label>
                            <input id="reg-email" type="email" required placeholder="you@example.com"
                                autoComplete="username"
                                value={form.email} onChange={updateField('email')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reg-password">Password</label>
                            <div className="input-with-toggle">
                                <input
                                    id="reg-password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="Min 6 characters"
                                    minLength={6}
                                    autoComplete="new-password"
                                    value={form.password}
                                    onChange={updateField('password')}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <button className="btn-primary" type="submit" disabled={loading}>
                            {loading ? (
                                <span className="btn-loading">
                                    <span className="btn-spinner" />
                                    Creating Account...
                                </span>
                            ) : 'Create Account'}
                        </button>
                    </form>
                    <div className="auth-link">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
