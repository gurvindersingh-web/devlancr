import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectAPI, searchAPI } from '../services/api';
import Navbar from '../components/Navbar';
import './Dashboard.css';

export default function PostProjectPage() {
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const [form, setForm] = useState({
        title: '', description: '', projectType: 'FIXED',
        budgetMin: '', budgetMax: '', experienceLevel: 'INTERMEDIATE',
        deadline: '', skillIds: []
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        searchAPI.skills().then(r => setSkills(r.data || [])).catch(() => { });
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...form,
                budgetMin: parseFloat(form.budgetMin),
                budgetMax: parseFloat(form.budgetMax),
                skillIds: form.skillIds.map(Number),
            };
            await projectAPI.create(payload);
            navigate('/client-dashboard');
        } catch (err) { alert(err.message); }
        finally { setLoading(false); }
    }

    function toggleSkill(id) {
        setForm(f => ({
            ...f,
            skillIds: f.skillIds.includes(id)
                ? f.skillIds.filter(s => s !== id)
                : [...f.skillIds, id]
        }));
    }

    return (
        <>
            <Navbar />
            <div className="post-project-page">
                <h1>📝 Post a Project</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Project Title</label>
                        <input required placeholder="e.g. Build a React Dashboard"
                            value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea rows={5} required placeholder="Describe your project..."
                            value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Type</label>
                            <select value={form.projectType} onChange={e => setForm({ ...form, projectType: e.target.value })}>
                                <option value="FIXED">Fixed Price</option>
                                <option value="HOURLY">Hourly</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Experience Level</label>
                            <select value={form.experienceLevel} onChange={e => setForm({ ...form, experienceLevel: e.target.value })}>
                                <option value="ENTRY">Entry</option>
                                <option value="INTERMEDIATE">Intermediate</option>
                                <option value="EXPERT">Expert</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Min Budget ($)</label>
                            <input type="number" required min="1" value={form.budgetMin}
                                onChange={e => setForm({ ...form, budgetMin: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Max Budget ($)</label>
                            <input type="number" required min="1" value={form.budgetMax}
                                onChange={e => setForm({ ...form, budgetMax: e.target.value })} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Skills Required</label>
                        <div className="skill-tags" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
                            {skills.map(s => (
                                <span key={s.id}
                                    className={`skill-tag ${form.skillIds.includes(s.id) ? 'active' : ''}`}
                                    style={form.skillIds.includes(s.id) ? { background: 'rgba(108,99,255,0.2)', borderColor: '#6c63ff', color: '#8b5cf6', cursor: 'pointer' } : { cursor: 'pointer' }}
                                    onClick={() => toggleSkill(s.id)}>
                                    {s.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <button className="btn-primary" type="submit" disabled={loading}>
                        {loading ? 'Posting...' : 'Post Project'}
                    </button>
                </form>
            </div>
        </>
    );
}
