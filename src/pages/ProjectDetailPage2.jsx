import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { projectAPI, proposalAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './Dashboard.css';

export default function ProjectDetailPage2() {
    const { id } = useParams();
    const { user } = useAuth();
    const [project, setProject] = useState(null);
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ coverLetter: '', bidAmount: '', deliveryDays: '' });
    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const isFreelancer = user?.roles?.includes('ROLE_FREELANCER');
    const isOwner = project && user && project.clientUserId === user.id;

    const load = useCallback(async () => {
        try {
            const res = await projectAPI.getById(id);
            setProject(res.data);
            if (user) {
                const propRes = await proposalAPI.getForProject(id);
                setProposals(propRes.data || []);
            }
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    }, [id, user]);

    useEffect(() => {
        setLoading(true);
        load();
    }, [load]);

    async function submitProposal(e) {
        e.preventDefault();
        setSubmitting(true);
        try {
            await proposalAPI.submit({
                projectId: parseInt(id),
                coverLetter: form.coverLetter,
                bidAmount: parseFloat(form.bidAmount),
                deliveryDays: parseInt(form.deliveryDays),
            });
            setShowForm(false);
            load();
        } catch (err) { alert(err.message); }
        finally { setSubmitting(false); }
    }

    async function acceptProposal(pid) {
        if (!confirm('Accept this proposal?')) return;
        try { await proposalAPI.accept(pid); load(); }
        catch (err) { alert(err.message); }
    }

    if (loading) return <><Navbar /><div className="loading-screen"><div className="spinner"></div></div></>;
    if (!project) return <><Navbar /><div className="detail-page"><div className="empty-state"><h3>Not found</h3></div></div></>;

    return (
        <>
            <Navbar />
            <div className="detail-page">
                <div className="project-meta" style={{ marginBottom: '1rem' }}>
                    <span className="meta-tag status">{project.status}</span>
                    <span className="meta-tag">{project.projectType}</span>
                </div>
                <h1>{project.title}</h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>
                    by {project.clientName} • {new Date(project.createdAt).toLocaleDateString()}
                </p>

                <div className="detail-section">
                    <h2>Description</h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7' }}>{project.description}</p>
                </div>

                <div className="detail-section">
                    <h2>Details</h2>
                    <p style={{ color: '#10b981' }}>Budget: ${project.budgetMin} - ${project.budgetMax}</p>
                    <p style={{ color: '#fff' }}>Level: {project.experienceLevel}</p>
                    <div className="skill-tags" style={{ marginTop: '0.5rem' }}>
                        {project.skills && [...project.skills].map(s => <span className="skill-tag" key={s}>{s}</span>)}
                    </div>
                </div>

                {isFreelancer && project.status === 'OPEN' && !showForm && (
                    <button className="btn-primary" style={{ maxWidth: '250px' }} onClick={() => setShowForm(true)}>Submit Proposal</button>
                )}

                {showForm && (
                    <div className="detail-section">
                        <form onSubmit={submitProposal}>
                            <h2>Your Proposal</h2>
                            <div className="form-group">
                                <label>Cover Letter</label>
                                <textarea rows={4} required value={form.coverLetter}
                                    onChange={e => setForm({ ...form, coverLetter: e.target.value })} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Bid ($)</label>
                                    <input type="number" required min="1" value={form.bidAmount}
                                        onChange={e => setForm({ ...form, bidAmount: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Days</label>
                                    <input type="number" required min="1" value={form.deliveryDays}
                                        onChange={e => setForm({ ...form, deliveryDays: e.target.value })} />
                                </div>
                            </div>
                            <button className="btn-primary" type="submit" disabled={submitting}>
                                {submitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                )}

                {proposals.length > 0 && (
                    <div className="detail-section">
                        <h2>Proposals ({proposals.length})</h2>
                        {proposals.map(p => (
                            <div className="proposal-card" key={p.id}>
                                <div className="proposal-header">
                                    <h4>{p.freelancerName}</h4>
                                    <span className="meta-tag">{p.status}</span>
                                </div>
                                <p className="cover-letter">{p.coverLetter}</p>
                                <div className="proposal-meta">
                                    <span>${p.bidAmount}</span>
                                    <span>{p.deliveryDays} days</span>
                                </div>
                                {isOwner && p.status === 'PENDING' && (
                                    <button className="btn-accept" style={{ marginTop: '0.75rem' }} onClick={() => acceptProposal(p.id)}>Accept</button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
