import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './Dashboard.css';

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const updateField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await authAPI.login(form);
            login(res.data);
            const roles = res.data?.roles || [];
            if (roles.includes('ROLE_ADMIN')) navigate('/admin');
            else if (roles.includes('ROLE_CLIENT')) navigate('/client-dashboard');
            else navigate('/freelancer-dashboard');
        } catch (err) {
            setError(err.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            <div className="auth-page">
                <div className="auth-card">
                    <h1>Welcome Back</h1>
                    <p className="subtitle">Sign in to your account</p>

                    {error && (
                        <div className="error-msg" role="alert" aria-live="polite">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="login-email">Email</label>
                            <input
                                id="login-email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                autoComplete="username"
                                value={form.email}
                                onChange={updateField('email')}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password">Password</label>
                            <div className="input-with-toggle">
                                <input
                                    id="login-password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
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
                                        /* Eye-off icon */
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        /* Eye icon */
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
                                    Signing in...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </form>
                    <div className="auth-link">
                        Don&apos;t have an account? <Link to="/register">Sign Up</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
