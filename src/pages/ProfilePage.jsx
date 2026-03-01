import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userAPI, reviewAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './Dashboard.css';

export default function ProfilePage() {
    const { userId } = useParams();
    const { user: currentUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const targetId = userId || currentUser?.id;

    useEffect(() => {
        if (targetId) load();
    }, [targetId]);

    async function load() {
        try {
            const res = userId ? await userAPI.getUser(userId) : await userAPI.getMe();
            setProfile(res.data);
            const revRes = await reviewAPI.getForUser(res.data.id);
            setReviews(revRes.data || []);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    }

    if (loading) return <><Navbar /><div className="loading-screen"><div className="spinner"></div></div></>;
    if (!profile) return <><Navbar /><div className="profile-page"><div className="empty-state"><h3>Not found</h3></div></div></>;

    const fp = profile.freelancerProfile;
    const cp = profile.clientProfile;

    return (
        <>
            <Navbar />
            <div className="profile-page">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {profile.firstName?.[0]}{profile.lastName?.[0]}
                    </div>
                    <div className="profile-info">
                        <h1>{profile.firstName} {profile.lastName}</h1>
                        <p>{fp?.title || cp?.companyName || profile.email}</p>
                    </div>
                </div>
                {fp && (
                    <div className="detail-section">
                        <h2>Freelancer Profile</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', color: 'rgba(255,255,255,0.7)' }}>
                            <div><strong>Rate:</strong> ${fp.hourlyRate}/hr</div>
                            <div><strong>Level:</strong> {fp.experienceLevel}</div>
                            <div><strong>Rating:</strong> ⭐ {fp.avgRating} ({fp.totalReviews} reviews)</div>
                            <div><strong>Earned:</strong> ${fp.totalEarnings}</div>
                        </div>
                        {fp.bio && <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '1rem', lineHeight: '1.6' }}>{fp.bio}</p>}
                        {fp.skills?.size > 0 && (
                            <div className="skill-tags" style={{ marginTop: '1rem' }}>
                                {[...fp.skills].map(s => <span className="skill-tag" key={s}>{s}</span>)}
                            </div>
                        )}
                    </div>
                )}
                {cp && (
                    <div className="detail-section">
                        <h2>Client Profile</h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                            {cp.companyName && <><strong>Company:</strong> {cp.companyName}<br /></>}
                            <strong>Projects:</strong> {cp.totalProjectsPosted} • <strong>Spent:</strong> ${cp.totalSpent}
                        </p>
                    </div>
                )}
                {reviews.length > 0 && (
                    <div className="detail-section">
                        <h2>Reviews ({reviews.length})</h2>
                        {reviews.map(r => (
                            <div className="proposal-card" key={r.id}>
                                <div className="proposal-header">
                                    <span>{'⭐'.repeat(r.rating)}</span>
                                </div>
                                {r.comment && <p className="cover-letter">{r.comment}</p>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
