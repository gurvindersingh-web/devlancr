import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectAPI, proposalAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './Dashboard.css';

export default function ClientDashboardPage() {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const res = await projectAPI.getMyProjects();
            setProjects(res.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const activeProjects = projects.filter(p => p.status === 'IN_PROGRESS');
    const openProjects = projects.filter(p => p.status === 'OPEN');

    return (
        <>
            <Navbar />
            <div className="dashboard-page">
                <div className="dashboard-header">
                    <h1>👋 Welcome, {user?.firstName}</h1>
                    <Link to="/post-project" className="btn-primary" style={{ width: 'auto', padding: '0.7rem 1.5rem' }}>
                        + Post Project
                    </Link>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">📋</div>
                        <div className="stat-value">{projects.length}</div>
                        <div className="stat-label">Total Projects</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🟢</div>
                        <div className="stat-value">{openProjects.length}</div>
                        <div className="stat-label">Open Projects</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⚡</div>
                        <div className="stat-value">{activeProjects.length}</div>
                        <div className="stat-label">In Progress</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">✅</div>
                        <div className="stat-value">{projects.filter(p => p.status === 'COMPLETED').length}</div>
                        <div className="stat-label">Completed</div>
                    </div>
                </div>

                <h2 className="section-title">📁 Your Projects</h2>
                {loading ? (
                    <div className="loading-screen" style={{ minHeight: '200px' }}><div className="spinner"></div></div>
                ) : projects.length === 0 ? (
                    <div className="empty-state">
                        <h3>No projects yet</h3>
                        <p>Post your first project and find amazing freelancers.</p>
                    </div>
                ) : (
                    <div className="projects-grid">
                        {projects.map(project => (
                            <Link to={`/project/${project.id}`} key={project.id} className="project-card">
                                <div className="project-meta">
                                    <span className="meta-tag status">{project.status}</span>
                                    <span className="meta-tag">{project.projectType}</span>
                                </div>
                                <h3>{project.title}</h3>
                                <p className="project-desc">{project.description}</p>
                                <div className="skill-tags">
                                    {project.skills && [...project.skills].slice(0, 4).map(s => (
                                        <span className="skill-tag" key={s}>{s}</span>
                                    ))}
                                </div>
                                <div className="project-footer">
                                    <span className="meta-tag budget">
                                        ${project.budgetMin} - ${project.budgetMax}
                                    </span>
                                    <span>{project.totalProposals} proposals</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
