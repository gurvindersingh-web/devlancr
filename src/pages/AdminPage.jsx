import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import Navbar from '../components/Navbar';
import './Dashboard.css';

export default function AdminPage() {
    const [tab, setTab] = useState('analytics');
    const [analytics, setAnalytics] = useState(null);
    const [users, setUsers] = useState([]);
    const [disputes, setDisputes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { load(); }, []);

    async function load() {
        try {
            const [a, u, d] = await Promise.all([
                adminAPI.getAnalytics(), adminAPI.getUsers(), adminAPI.getDisputes()
            ]);
            setAnalytics(a.data);
            setUsers(u.data || []);
            setDisputes(d.data || []);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    }

    async function toggleUser(id) {
        await adminAPI.toggleUserStatus(id);
        load();
    }

    if (loading) return <><Navbar /><div className="loading-screen"><div className="spinner"></div></div></>;

    return (
        <>
            <Navbar />
            <div className="admin-page">
                <h1 style={{ color: '#fff', marginBottom: '1.5rem' }}>🛡️ Admin Panel</h1>
                <div className="admin-tabs">
                    {['analytics', 'users', 'disputes'].map(t => (
                        <div key={t} className={`admin-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </div>
                    ))}
                </div>
                {tab === 'analytics' && analytics && (
                    <div className="stats-grid">
                        <div className="stat-card"><div className="stat-value">{analytics.totalUsers}</div><div className="stat-label">Total Users</div></div>
                        <div className="stat-card"><div className="stat-value">{analytics.totalProjects}</div><div className="stat-label">Total Projects</div></div>
                        <div className="stat-card"><div className="stat-value">{analytics.activeContracts}</div><div className="stat-label">Active Contracts</div></div>
                        <div className="stat-card"><div className="stat-value">{analytics.totalFreelancers}</div><div className="stat-label">Freelancers</div></div>
                        <div className="stat-card"><div className="stat-value">{analytics.totalClients}</div><div className="stat-label">Clients</div></div>
                        <div className="stat-card"><div className="stat-value">{analytics.openDisputes}</div><div className="stat-label">Open Disputes</div></div>
                        <div className="stat-card"><div className="stat-value">${analytics.totalPlatformRevenue?.toFixed(2) || '0'}</div><div className="stat-label">Revenue</div></div>
                    </div>
                )}
                {tab === 'users' && (
                    <table className="users-table">
                        <thead><tr><th>Name</th><th>Email</th><th>Roles</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td>{u.firstName} {u.lastName}</td>
                                    <td>{u.email}</td>
                                    <td>{u.roles?.join(', ')}</td>
                                    <td>{u.isActive ? '✅ Active' : '❌ Disabled'}</td>
                                    <td><button className={`btn-sm ${u.isActive ? 'btn-danger' : 'btn-success'}`} onClick={() => toggleUser(u.id)}>
                                        {u.isActive ? 'Disable' : 'Enable'}
                                    </button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {tab === 'disputes' && (
                    disputes.length === 0 ? <div className="empty-state"><h3>No disputes</h3></div> :
                        disputes.map(d => (
                            <div className="proposal-card" key={d.id}>
                                <h4>Dispute #{d.id}</h4>
                                <p className="cover-letter">{d.reason}</p>
                                <span className="meta-tag">{d.status}</span>
                            </div>
                        ))
                )}
            </div>
        </>
    );
}
