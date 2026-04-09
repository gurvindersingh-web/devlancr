import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { projectAPI, proposalAPI, walletAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import EmptyState from '../components/EmptyState';
import './Dashboard.css';

export default function FreelancerDashboardPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [wallet, setWallet] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { loadData(); }, []);

    async function loadData() {
        try {
            const [projRes, propRes, walRes] = await Promise.all([
                projectAPI.getAll('status=OPEN&size=6'),
                proposalAPI.getMyProposals(),
                walletAPI.getWallet(),
            ]);
            setProjects(projRes.data?.content || []);
            setProposals(propRes.data || []);
            setWallet(walRes.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    }

    const accepted = proposals.filter(p => p.status === 'ACCEPTED').length;
    const pending = proposals.filter(p => p.status === 'PENDING').length;

    return (
        <>
            <Navbar />
            <div className="dashboard-page">
                <div className="dashboard-header">
                    <h1>🚀 Welcome, {user?.firstName}</h1>
                    <Link to="/projects" className="btn-primary" style={{ width: 'auto', padding: '0.7rem 1.5rem' }}>
                        Browse Projects
                    </Link>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">📝</div>
                        <div className="stat-value">{proposals.length}</div>
                        <div className="stat-label">Total Proposals</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⏳</div>
                        <div className="stat-value">{pending}</div>
                        <div className="stat-label">Pending</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🎉</div>
                        <div className="stat-value">{accepted}</div>
                        <div className="stat-label">Accepted</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">💰</div>
                        <div className="stat-value">${wallet?.balance?.toFixed(2) || '0.00'}</div>
                        <div className="stat-label">Wallet Balance</div>
                    </div>
                </div>

                <h2 className="section-title">🔥 Open Projects</h2>
                {loading ? (
                    <div className="loading-screen" style={{ minHeight: '200px' }}><div className="spinner"></div></div>
                ) : projects.length === 0 ? (
                    <EmptyState
                        icon="🔍"
                        title="No open projects"
                        description="There are no open projects right now. Check back soon for new opportunities!"
                        action={{ label: 'Browse All Projects', onClick: () => navigate('/projects') }}
                    />
                ) : (
                    <div className="projects-grid">
                        {projects.map(project => (
                            <Link to={`/project/${project.id}`} key={project.id} className="project-card">
                                <div className="project-meta">
                                    <span className="meta-tag">{project.projectType}</span>
                                    <span className="meta-tag">{project.experienceLevel}</span>
                                </div>
                                <h3>{project.title}</h3>
                                <p className="project-desc">{project.description}</p>
                                <div className="skill-tags">
                                    {project.skills && [...project.skills].slice(0, 4).map(s => (
                                        <span className="skill-tag" key={s}>{s}</span>
                                    ))}
                                </div>
                                <div className="project-footer">
                                    <span className="meta-tag budget">${project.budgetMin} - ${project.budgetMax}</span>
                                    <span>by {project.clientName}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {proposals.length > 0 && (
                    <>
                        <h2 className="section-title" style={{ marginTop: '2rem' }}>📋 Your Proposals</h2>
                        {proposals.slice(0, 5).map(p => (
                            <div className="proposal-card" key={p.id}>
                                <div className="proposal-header">
                                    <h4>{p.projectTitle}</h4>
                                    <span className={`meta-tag ${p.status === 'ACCEPTED' ? 'budget' : ''}`}>{p.status}</span>
                                </div>
                                <div className="proposal-meta">
                                    <span>💰 ${p.bidAmount}</span>
                                    <span>📅 {p.deliveryDays} days</span>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
}
