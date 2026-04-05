import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import blogPosts from '../data/blogPosts';
import './Blog.css';

function BlogListPage() {
  const navigate = useNavigate();

  return (
    <div className="blog-page">
      <Navbar showSearch={false} />

      <div className="blog-page__container">
        {/* Header */}
        <header className="blog-page__header">
          <div className="blog-page__badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            Insights &amp; Stories
          </div>
          <h1 className="blog-page__title">
            The Verilancer <span className="gradient-text">Blog</span>
          </h1>
          <p className="blog-page__subtitle">
            Insights, strategies, and stories for student freelancers building real careers — one project at a time.
          </p>
        </header>

        {/* Blog Cards Grid */}
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="blog-card"
              onClick={() => navigate(`/blog/${post.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/blog/${post.id}`)}
            >
              <div className="blog-card__inner">
                {/* Hero gradient */}
                <div className="blog-card__hero" style={{ background: post.heroGradient }}>
                  <div className="blog-card__hero-decor blog-card__hero-decor--1" />
                  <div className="blog-card__hero-decor blog-card__hero-decor--2" />
                  <div className="blog-card__hero-decor blog-card__hero-decor--3" />
                  <span className="blog-card__category">{post.category}</span>
                </div>

                {/* Body */}
                <div className="blog-card__body">
                  <h2 className="blog-card__title">{post.title}</h2>
                  <p className="blog-card__excerpt">{post.subtitle}</p>

                  <div className="blog-card__meta">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span className="blog-card__date">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {post.date}
                      </span>
                      <span className="blog-card__read-time">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {post.readTime}
                      </span>
                    </div>

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
      </div>

      <Footer />
    </div>
  );
}

export default BlogListPage;
