import React from 'react';

const ClientCard = ({ client }) => {
    return (
        <div className="client-card" style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            transition: 'all 0.3s ease',
            height: '100%'
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={client.avatar} alt={client.name} style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid rgba(255,255,255,0.1)'
                }} />
                <div>
                    <h4 style={{ margin: 0, color: '#f8fafc', fontSize: '1rem' }}>{client.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{client.role} at {client.company}</span>
                </div>
            </div>

            <p style={{
                margin: 0,
                fontSize: '0.95rem',
                lineHeight: '1.6',
                color: '#cbd5e1',
                fontStyle: 'italic',
                flex: 1
            }}>
                "{client.review}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.floor(client.rating) ? "#fbbf24" : "none"} stroke="#fbbf24" strokeWidth="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                    ))}
                </div>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Spent <span style={{ color: '#fff', fontWeight: '600' }}>{client.spent}</span></span>
            </div>
        </div>
    );
};

export default ClientCard;
