import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectAPI } from '../services/api';
import Navbar from '../components/Navbar';
import './Dashboard.css';

export default function ProjectListPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ keyword: '', status: 'OPEN', level: '', minBudget: '', maxBudget: '' });
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => { search(); }, [page]);

    async function search() {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.keyword) params.append('keyword', filters.keyword);
            if (filters.status) params.append('status', filters.status);
            if (filters.level) params.append('level', filters.level);
            if (filters.minBudget) params.append('minBudget', filters.minBudget);
            if (filters.maxBudget) params.append('maxBudget', filters.maxBudget);
            params.append('page', page);
            params.append('size', 12);

            const res = await projectAPI.getAll(params.toString());
            setProjects(res.data?.content || []);
            setTotalPages(res.data?.totalPages || 0);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    }

    return (
        <>
            <Navbar />
            <div className="dashboard-page">
                <h1 style={{ color: '#fff', marginBottom: '1.5rem' }}>🔍 Browse Projects</h1>

                <div className="filters-bar">
                    <input placeholder="Search projects..." value={filters.keyword}
                        onChange={e => setFilters({ ...filters, keyword: e.target.value })} />
                    <select value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })}>
                        <option value="">All Status</option>
                        <option value="OPEN">Open</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                    <select value={filters.level} onChange={e => setFilters({ ...filters, level: e.target.value })}>
                        <option value="">All Levels</option>
                        <option value="ENTRY">Entry</option>
                        <option value="INTERMEDIATE">Intermediate</option>
                        <option value="EXPERT">Expert</option>
                    </select>
                    <input type="number" placeholder="Min $" style={{ width: '100px' }} value={filters.minBudget}
                        onChange={e => setFilters({ ...filters, minBudget: e.target.value })} />
                    <input type="number" placeholder="Max $" style={{ width: '100px' }} value={filters.maxBudget}
                        onChange={e => setFilters({ ...filters, maxBudget: e.target.value })} />
                    <button className="btn-filter" onClick={() => { setPage(0); search(); }}>Search</button>
                </div>

                {loading ? (
                    <div className="loading-screen" style={{ minHeight: '300px' }}><div className="spinner"></div></div>
                ) : projects.length === 0 ? (
                    <div className="empty-state">
                        <h3>No projects found</h3>
                        <p>Try adjusting your filters.</p>
                    </div>
                ) : (
                    <>
                        <div className="projects-grid">
                            {projects.map(project => (
                                <Link to={`/project/${project.id}`} key={project.id} className="project-card">
                                    <div className="project-meta">
                                        <span className="meta-tag status">{project.status}</span>
                                        <span className="meta-tag">{project.projectType}</span>
                                        <span className="meta-tag">{project.experienceLevel}</span>
                                    </div>
                                    <h3>{project.title}</h3>
                                    <p className="project-desc">{project.description}</p>
                                    <div className="skill-tags">
                                        {project.skills && [...project.skills].slice(0, 5).map(s => (
                                            <span className="skill-tag" key={s}>{s}</span>
                                        ))}
                                    </div>
                                    <div className="project-footer">
                                        <span className="meta-tag budget">${project.budgetMin} - ${project.budgetMax}</span>
                                        <span>{project.totalProposals} proposals • by {project.clientName}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {totalPages > 1 && (
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button key={i}
                                        className={`btn-sm ${i === page ? 'btn-primary' : ''}`}
                                        style={i === page ? { background: '#6c63ff', color: '#fff', borderRadius: '8px' } : { background: 'rgba(255,255,255,0.05)', color: '#fff', borderRadius: '8px' }}
                                        onClick={() => setPage(i)}>
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
