import { useState, useRef, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindExpert.css';

// ✅ Lazy-load WebGL component
const Orb = lazy(() => import('../component/Orb'));

const GEMINI_API_KEY = 'AIzaSyAwBWvZHjHqkinfC4dNDxzHUWNwlDnnHDg';
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const SUGGESTIONS = [
    '🎨 Find a UI/UX designer',
    '💻 Build a web app',
    '📱 Mobile app development',
    '🎬 Video editing expert',
    '🤖 AI & Machine Learning',
    '📊 Data analytics',
];

const SRS_PROMPT = `You are a senior software project estimator and technical consultant. Analyze the following Software Requirements Specification (SRS) document and provide a detailed project cost estimation.

Return your response in the following JSON structure (and ONLY valid JSON, no markdown fences):
{
  "projectName": "Name of the project",
  "summary": "Brief 2-3 sentence summary of the project",
  "complexity": "Low | Medium | High | Very High",
  "estimatedCost": {
    "min": 0,
    "max": 0,
    "currency": "USD"
  },
  "phases": [
    {
      "name": "Phase name",
      "description": "What this phase covers",
      "durationWeeks": 0,
      "costMin": 0,
      "costMax": 0,
      "tasks": ["task1", "task2"]
    }
  ],
  "teamComposition": [
    {
      "role": "Role title",
      "count": 1,
      "hourlyRate": 0,
      "hours": 0
    }
  ],
  "techStack": ["tech1", "tech2"],
  "risks": [
    {
      "risk": "Risk description",
      "impact": "Low | Medium | High",
      "mitigation": "How to mitigate"
    }
  ],
  "timeline": {
    "totalWeeks": 0,
    "milestones": ["milestone1", "milestone2"]
  },
  "recommendations": ["recommendation1", "recommendation2"]
}

SRS Document:
`;

async function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

async function analyzeWithGemini(srsText) {
    const response = await fetch(GEMINI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: SRS_PROMPT + srsText }]
            }],
            generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 4096,
            }
        })
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`API Error: ${response.status} — ${err}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error('No response from AI');

    // Strip markdown fences if present
    const cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    return JSON.parse(cleaned);
}

/* ── Cost Result Card Components ── */
function CostOverview({ data }) {
    const complexityColor = {
        'Low': '#10b981', 'Medium': '#f59e0b',
        'High': '#ef4444', 'Very High': '#dc2626'
    };

    return (
        <div className="fe__result-card fe__result-overview">
            <div className="fe__result-header">
                <div className="fe__result-icon">💰</div>
                <div>
                    <h3 className="fe__result-title">{data.projectName}</h3>
                    <p className="fe__result-subtitle">{data.summary}</p>
                </div>
            </div>
            <div className="fe__cost-hero">
                <span className="fe__cost-label">Estimated Cost</span>
                <div className="fe__cost-range">
                    <span className="fe__cost-min">${data.estimatedCost.min.toLocaleString()}</span>
                    <span className="fe__cost-sep">—</span>
                    <span className="fe__cost-max">${data.estimatedCost.max.toLocaleString()}</span>
                </div>
                <span className="fe__cost-currency">{data.estimatedCost.currency}</span>
            </div>
            <div className="fe__meta-row">
                <div className="fe__meta-chip" style={{ borderColor: complexityColor[data.complexity] || '#888' }}>
                    <span className="fe__meta-dot" style={{ background: complexityColor[data.complexity] || '#888' }} />
                    {data.complexity} Complexity
                </div>
                <div className="fe__meta-chip">
                    ⏱ {data.timeline.totalWeeks} weeks
                </div>
            </div>
        </div>
    );
}

function PhasesCard({ phases }) {
    return (
        <div className="fe__result-card">
            <h3 className="fe__card-heading">📋 Development Phases</h3>
            <div className="fe__phases-list">
                {phases.map((phase, i) => (
                    <div key={i} className="fe__phase-item">
                        <div className="fe__phase-header">
                            <span className="fe__phase-num">{String(i + 1).padStart(2, '0')}</span>
                            <div className="fe__phase-info">
                                <h4 className="fe__phase-name">{phase.name}</h4>
                                <p className="fe__phase-desc">{phase.description}</p>
                            </div>
                            <div className="fe__phase-cost">
                                ${phase.costMin.toLocaleString()} – ${phase.costMax.toLocaleString()}
                                <span className="fe__phase-weeks">{phase.durationWeeks}w</span>
                            </div>
                        </div>
                        {phase.tasks?.length > 0 && (
                            <div className="fe__phase-tasks">
                                {phase.tasks.map((t, j) => (
                                    <span key={j} className="fe__phase-task-chip">{t}</span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function TeamCard({ team }) {
    return (
        <div className="fe__result-card">
            <h3 className="fe__card-heading">👥 Team Composition</h3>
            <div className="fe__team-grid">
                {team.map((member, i) => (
                    <div key={i} className="fe__team-member">
                        <div className="fe__team-avatar">{member.role.charAt(0)}</div>
                        <div className="fe__team-info">
                            <span className="fe__team-role">{member.role}</span>
                            <span className="fe__team-detail">
                                {member.count}× · ${member.hourlyRate}/hr · {member.hours}h
                            </span>
                        </div>
                        <span className="fe__team-cost">
                            ${(member.hourlyRate * member.hours * member.count).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TechStackCard({ techStack }) {
    return (
        <div className="fe__result-card">
            <h3 className="fe__card-heading">🛠 Recommended Tech Stack</h3>
            <div className="fe__tech-chips">
                {techStack.map((tech, i) => (
                    <span key={i} className="fe__tech-chip">{tech}</span>
                ))}
            </div>
        </div>
    );
}

function RisksCard({ risks }) {
    const impactColor = { 'Low': '#10b981', 'Medium': '#f59e0b', 'High': '#ef4444' };

    return (
        <div className="fe__result-card">
            <h3 className="fe__card-heading">⚠️ Risk Assessment</h3>
            <div className="fe__risks-list">
                {risks.map((risk, i) => (
                    <div key={i} className="fe__risk-item">
                        <div className="fe__risk-header">
                            <span className="fe__risk-dot" style={{ background: impactColor[risk.impact] || '#888' }} />
                            <span className="fe__risk-text">{risk.risk}</span>
                            <span className="fe__risk-badge" style={{ color: impactColor[risk.impact] || '#888' }}>
                                {risk.impact}
                            </span>
                        </div>
                        <p className="fe__risk-mitigation">💡 {risk.mitigation}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TimelineCard({ timeline }) {
    return (
        <div className="fe__result-card">
            <h3 className="fe__card-heading">🗓 Timeline & Milestones</h3>
            <div className="fe__timeline">
                {timeline.milestones.map((m, i) => (
                    <div key={i} className="fe__milestone">
                        <div className="fe__milestone-dot" />
                        <span className="fe__milestone-text">{m}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RecommendationsCard({ recommendations }) {
    return (
        <div className="fe__result-card">
            <h3 className="fe__card-heading">✅ Recommendations</h3>
            <ul className="fe__rec-list">
                {recommendations.map((r, i) => (
                    <li key={i} className="fe__rec-item">{r}</li>
                ))}
            </ul>
        </div>
    );
}

/* ═══════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════ */

function FindExpertPage() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'srs'
    const [srsText, setSrsText] = useState('');
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/marketplace?q=${encodeURIComponent(query.trim())}`);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const clean = suggestion.replace(/^[^\w]*/, '').trim();
        setQuery(clean);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);
        setError('');

        try {
            const text = await readFileAsText(file);
            setSrsText(text);
        } catch {
            setError('Could not read file. Please try a .txt or .pdf file.');
        }
    };

    const handleAnalyzeSRS = async () => {
        const text = srsText.trim();
        if (!text) {
            setError('Please upload an SRS document or paste its content.');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const data = await analyzeWithGemini(text);
            setResult(data);
        } catch (err) {
            console.error(err);
            setError('Failed to analyze SRS. Please check your document and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSrsText('');
        setFileName('');
        setResult(null);
        setError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="fe">
            {/* Ambient Background */}
            <div className="fe__ambient">
                <div className="fe__ambient-orb fe__ambient-orb--1" />
                <div className="fe__ambient-orb fe__ambient-orb--2" />
            </div>

            {/* Sidebar */}
            <aside className="fe__sidebar">
                <div className="fe__sidebar-logo" onClick={() => navigate('/marketplace')}>
                    <span className="gradient-text">D</span>
                </div>

                <button
                    className={`fe__sidebar-btn ${activeTab === 'chat' ? 'fe__sidebar-btn--active' : ''}`}
                    aria-label="AI Chat" title="AI Chat"
                    onClick={() => { setActiveTab('chat'); setResult(null); }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                </button>

                <button
                    className={`fe__sidebar-btn ${activeTab === 'srs' ? 'fe__sidebar-btn--active' : ''}`}
                    aria-label="SRS Cost Estimator" title="SRS Cost Estimator"
                    onClick={() => setActiveTab('srs')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                    </svg>
                </button>

                <button className="fe__sidebar-btn" aria-label="Search" title="Search">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>

                <div className="fe__sidebar-spacer" />

                <div className="fe__sidebar-avatar" title="Profile">DL</div>
            </aside>

            {/* Main Content */}
            <div className="fe__main">
                {/* Top Bar */}
                <div className="fe__topbar">
                    <div className="fe__topbar-model">
                        {activeTab === 'srs' ? '📄 SRS Cost Estimator · Premium AI' : 'Verilance Expert'}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </div>
                    <div className="fe__topbar-actions">
                        {activeTab === 'srs' && (
                            <span className="fe__premium-badge">✨ PREMIUM</span>
                        )}
                        <button className="fe__topbar-btn" aria-label="Settings" title="Settings">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ═══ CHAT TAB ═══ */}
                {activeTab === 'chat' && (
                    <>
                        <div className="fe__center">
                            <div className="fe__orb-wrapper">
                                <Suspense fallback={<div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)' }} />}>
                                    <Orb hue={260} hoverIntensity={0.3} rotateOnHover={true} />
                                </Suspense>
                            </div>
                            <h1 className="fe__heading">What can I help with?</h1>
                            <div className="fe__suggestions">
                                {SUGGESTIONS.map((s) => (
                                    <button key={s} className="fe__suggestion" onClick={() => handleSuggestionClick(s)}>
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="fe__input-area">
                            <form className="fe__input-bar" onSubmit={handleSubmit}>
                                <button type="button" className="fe__input-attach" aria-label="Attach file">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </button>
                                <input
                                    type="text" className="fe__input-field" placeholder="Ask anything"
                                    value={query} onChange={(e) => setQuery(e.target.value)}
                                />
                                <div className="fe__input-actions">
                                    <button type="button" className="fe__input-icon-btn" aria-label="Voice input">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
                                        </svg>
                                    </button>
                                    <button type="submit" className="fe__input-send" aria-label="Send">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-5H7l5-7v5h4l-5 7z" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                            <p className="fe__footer-text">
                                Verilance AI can help you find the perfect expert for your project.
                            </p>
                        </div>
                    </>
                )}

                {/* ═══ SRS COST ESTIMATOR TAB ═══ */}
                {activeTab === 'srs' && (
                    <div className="fe__srs-container">
                        {!result ? (
                            /* ── Upload / Input View ── */
                            <div className="fe__srs-upload-view">
                                <div className="fe__srs-header">
                                    <div className="fe__srs-icon-wrap">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#srsGrad)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                                            <defs>
                                                <linearGradient id="srsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#8b5cf6" />
                                                    <stop offset="100%" stopColor="#ec4899" />
                                                </linearGradient>
                                            </defs>
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                            <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                                        </svg>
                                    </div>
                                    <h1 className="fe__srs-title">SRS Cost Estimator</h1>
                                    <p className="fe__srs-desc">
                                        Upload your Software Requirements Specification document and let AI estimate the project cost, timeline, and team requirements.
                                    </p>
                                </div>

                                {/* Drop Zone */}
                                <div
                                    className="fe__srs-dropzone"
                                    onClick={() => fileInputRef.current?.click()}
                                    onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('fe__srs-dropzone--drag'); }}
                                    onDragLeave={(e) => e.currentTarget.classList.remove('fe__srs-dropzone--drag')}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        e.currentTarget.classList.remove('fe__srs-dropzone--drag');
                                        const file = e.dataTransfer.files[0];
                                        if (file) {
                                            const fakeEvent = { target: { files: [file] } };
                                            handleFileUpload(fakeEvent);
                                        }
                                    }}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".txt,.pdf,.doc,.docx,.md"
                                        onChange={handleFileUpload}
                                        style={{ display: 'none' }}
                                    />
                                    <div className="fe__srs-dropzone-icon">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="17 8 12 3 7 8" />
                                            <line x1="12" y1="3" x2="12" y2="15" />
                                        </svg>
                                    </div>
                                    {fileName ? (
                                        <p className="fe__srs-filename">📄 {fileName}</p>
                                    ) : (
                                        <>
                                            <p className="fe__srs-drop-text">Drop your SRS document here</p>
                                            <p className="fe__srs-drop-hint">or click to browse · .txt, .pdf, .doc, .md</p>
                                        </>
                                    )}
                                </div>

                                {/* Or paste text */}
                                <div className="fe__srs-divider">
                                    <span>or paste your SRS content</span>
                                </div>

                                <textarea
                                    className="fe__srs-textarea"
                                    placeholder="Paste your Software Requirements Specification here..."
                                    value={srsText}
                                    onChange={(e) => setSrsText(e.target.value)}
                                    rows={8}
                                />

                                {error && <p className="fe__srs-error">⚠ {error}</p>}

                                <div className="fe__srs-actions">
                                    <button
                                        className="fe__srs-analyze-btn"
                                        onClick={handleAnalyzeSRS}
                                        disabled={loading || !srsText.trim()}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="fe__srs-spinner" />
                                                Analyzing with AI...
                                            </>
                                        ) : (
                                            <>✨ Estimate Project Cost</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* ── Results View ── */
                            <div className="fe__srs-results">
                                <div className="fe__srs-results-header">
                                    <h2 className="fe__srs-results-title">📊 Cost Estimation Report</h2>
                                    <button className="fe__srs-reset-btn" onClick={handleReset}>
                                        ↻ New Analysis
                                    </button>
                                </div>
                                <div className="fe__srs-results-grid">
                                    <CostOverview data={result} />
                                    <PhasesCard phases={result.phases} />
                                    <TeamCard team={result.teamComposition} />
                                    <TechStackCard techStack={result.techStack} />
                                    <TimelineCard timeline={result.timeline} />
                                    <RisksCard risks={result.risks} />
                                    <RecommendationsCard recommendations={result.recommendations} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FindExpertPage;
