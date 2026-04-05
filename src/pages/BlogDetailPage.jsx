import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import blogPosts from '../data/blogPosts';
import './Blog.css';

function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.id === slug);
  const relatedPosts = blogPosts.filter((p) => p.id !== slug).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="blog-detail">
        <Navbar showSearch={false} />
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: '80vh', gap: '1rem', paddingTop: '100px',
        }}>
          <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>Post Not Found</h1>
          <p style={{ color: 'var(--text-secondary)' }}>The article you're looking for doesn't exist.</p>
          <button
            className="blog-detail__cta-btn"
            onClick={() => navigate('/blog')}
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const renderSection = (section, idx) => {
    switch (section.type) {
      case 'intro':
        return (
          <div key={idx} className="blog-detail__intro">
            {section.content.split('\n\n').map((para, i) => (
              <p key={i} style={i > 0 ? { marginTop: '1.2rem' } : undefined}>{para}</p>
            ))}
          </div>
        );

      case 'heading':
        return (
          <h2 key={idx} className="blog-detail__heading">
            {section.content}
          </h2>
        );

      case 'subheading':
        return (
          <h3 key={idx} className="blog-detail__subheading">
            {section.content}
          </h3>
        );

      case 'paragraph':
        return (
          <div key={idx}>
            {section.content.split('\n\n').map((para, i) => (
              <p key={i} className="blog-detail__paragraph">{para}</p>
            ))}
          </div>
        );

      case 'list':
        return (
          <ul key={idx} className="blog-detail__list">
            {section.items.map((item, i) => (
              <li key={i} className="blog-detail__list-item">
                <span className="blog-detail__list-bullet" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

  return (
    <div className="blog-detail">
      <Navbar showSearch={false} />

      {/* ── Hero Banner ── */}
      <div className="blog-detail__hero">
        <div className="blog-detail__hero-bg" style={{ background: post.heroGradient }}>
          <div className="blog-detail__orb blog-detail__orb--1" />
          <div className="blog-detail__orb blog-detail__orb--2" />
          <div className="blog-detail__orb blog-detail__orb--3" />
        </div>

        <div className="blog-detail__hero-content">
          <button className="blog-detail__back" onClick={() => navigate('/blog')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            All Articles
          </button>

          <span className="blog-detail__hero-category">{post.category}</span>
          <h1 className="blog-detail__hero-title">{post.title}</h1>
          <p className="blog-detail__hero-subtitle">{post.subtitle}</p>

          <div className="blog-detail__hero-meta">
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {post.author}
            </span>
            <div className="blog-detail__hero-meta-divider" />
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {post.date}
            </span>
            <div className="blog-detail__hero-meta-divider" />
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {post.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* ── Article Body ── */}
      <article className="blog-detail__body">
        {post.sections.map(renderSection)}

        {/* Published badge */}
        <div className="blog-detail__published">
          <svg className="blog-detail__published-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          Published on Verilancer | Empowering Student Freelancers
        </div>

        {/* CTA */}
        <div className="blog-detail__cta">
          <div className="blog-detail__cta-label">Ready to Start?</div>
          <h3 className="blog-detail__cta-title">
            Begin Your Freelance Journey Today
          </h3>
          <p className="blog-detail__cta-desc">
            Join Verilancer and connect with real clients, build your portfolio, and earn while you learn.
          </p>
          <button
            className="blog-detail__cta-btn"
            onClick={() => navigate('/register')}
          >
            Get Started
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </article>

      {/* ── Related Posts ── */}
      {relatedPosts.length > 0 && (
        <section className="blog-detail__related">
          <h2 className="blog-detail__related-title">
            More from the <span className="gradient-text">Blog</span>
          </h2>
          <div className="blog-detail__related-grid">
            {relatedPosts.map((related) => (
              <article
                key={related.id}
                className="blog-card"
                onClick={() => navigate(`/blog/${related.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/blog/${related.id}`)}
              >
                <div className="blog-card__inner">
                  <div className="blog-card__hero" style={{ background: related.heroGradient, minHeight: '160px' }}>
                    <div className="blog-card__hero-decor blog-card__hero-decor--1" />
                    <div className="blog-card__hero-decor blog-card__hero-decor--2" />
                    <span className="blog-card__category">{related.category}</span>
                  </div>
                  <div className="blog-card__body">
                    <h3 className="blog-card__title" style={{ fontSize: 'var(--text-base)' }}>{related.title}</h3>
                    <p className="blog-card__excerpt">{related.subtitle}</p>
                    <div className="blog-card__meta">
                      <span className="blog-card__read-time">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {related.readTime}
                      </span>
                      <div className="blog-card__arrow">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default BlogDetailPage;
