import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import MarketplacePage from './pages/MarketplacePage';
import FindExpertPage from './pages/FindExpertPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClientDashboardPage from './pages/ClientDashboardPage';
import FreelancerDashboardPage from './pages/FreelancerDashboardPage';
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailPage2 from './pages/ProjectDetailPage2';
import PostProjectPage from './pages/PostProjectPage';
import ChatPage from './pages/ChatPage';
import WalletPage from './pages/WalletPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import PremiumPricing from './pages/PremiumPricing';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      {/* Accessibility: skip link — first focusable element */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <main id="main-content">
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/find-expert" element={<FindExpertPage />} />
          <Route path="/service/:serviceName" element={<ServiceDetailPage />} />
          <Route path="/premium" element={<PremiumPricing />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/projects" element={<ProjectListPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage2 />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />

          {/* Client Protected */}
          <Route path="/client-dashboard" element={
            <ProtectedRoute role="CLIENT"><ClientDashboardPage /></ProtectedRoute>
          } />
          <Route path="/post-project" element={
            <ProtectedRoute role="CLIENT"><PostProjectPage /></ProtectedRoute>
          } />

          {/* Freelancer Protected */}
          <Route path="/freelancer-dashboard" element={
            <ProtectedRoute role="FREELANCER"><FreelancerDashboardPage /></ProtectedRoute>
          } />

          {/* Auth Protected (any role) */}
          <Route path="/chat/:contractId" element={
            <ProtectedRoute><ChatPage /></ProtectedRoute>
          } />
          <Route path="/wallet" element={
            <ProtectedRoute><WalletPage /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><ProfilePage /></ProtectedRoute>
          } />

          {/* Admin Protected */}
          <Route path="/admin" element={
            <ProtectedRoute role="ADMIN"><AdminPage /></ProtectedRoute>
          } />

          {/* 404 — redirect all unknown routes back to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
