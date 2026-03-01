import React from 'react';

const ProfileCard = ({ freelancer }) => {
    return (
        <div className="profile-card" style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* Header: Avatar + Info */}
            <div className="profile-card__header" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="profile-card__avatar" style={{
                    minWidth: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: freelancer.avatarGradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                    {freelancer.initials}
                </div>
                <div className="profile-card__info">
                    <h3 style={{
                        margin: 0,
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#f8fafc',
                        lineHeight: '1.3'
                    }}>
                        {freelancer.name}
                    </h3>
                    <div className="profile-card__badge-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                        {freelancer.badge && (
                            <span style={{
                                fontSize: '0.75rem',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                background: freelancer.badgeType === 'top' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                                color: freelancer.badgeType === 'top' ? '#34d399' : '#60a5fa',
                                fontWeight: '500',
                                border: `1px solid ${freelancer.badgeType === 'top' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`
                            }}>
                                {freelancer.badge}
                            </span>
                        )}
                        <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>{freelancer.rating}</span>
                            <span style={{ color: '#64748b' }}>({freelancer.reviews})</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Bio */}
            <p style={{
                margin: 0,
                fontSize: '0.9rem',
                lineHeight: '1.5',
                color: '#cbd5e1',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                flex: 1
            }}>
                {freelancer.bio}
            </p>

            {/* Skills */}
            <div className="profile-card__skills" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {freelancer.skills.slice(0, 3).map((skill) => (
                    <span key={skill} style={{
                        fontSize: '0.75rem',
                        padding: '4px 8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '6px',
                        color: '#94a3b8'
                    }}>
                        {skill}
                    </span>
                ))}
                {freelancer.extraSkills > 0 && (
                    <span style={{
                        fontSize: '0.75rem',
                        padding: '4px 8px',
                        color: '#64748b'
                    }}>
                        +{freelancer.extraSkills} more
                    </span>
                )}
            </div>

            {/* Footer: Price & CTA */}
            <div className="profile-card__footer" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 'auto',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Starting at</span>
                    <span style={{ fontSize: '1rem', fontWeight: '600', color: '#f8fafc' }}>
                        ${freelancer.startingPrice || 30}<span style={{ fontSize: '0.8rem', fontWeight: '400', color: '#64748b' }}>/hr</span>
                    </span>
                </div>
                <button className="btn-sm" style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.borderColor = '#fff';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                >
                    View Profile
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;
