const API_BASE = 'http://localhost:8080/api';

function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(endpoint, options = {}) {
    const { method = 'GET', body, headers = {} } = options;

    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
            ...headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, config);

    // Handle DELETE or 204 No Content with no body
    let data = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        data = await response.json();
    }

    if (!response.ok) {
        throw new Error(data?.message || `HTTP ${response.status}: Something went wrong`);
    }

    return { data };

}

// Auth
export const authAPI = {
    register: (data) => request('/auth/register', { method: 'POST', body: data }),
    login: (data) => request('/auth/login', { method: 'POST', body: data }),
};

// Users
export const userAPI = {
    getMe: () => request('/users/me'),
    getUser: (id) => request(`/users/${id}`),
    updateFreelancerProfile: (data) => request('/users/freelancer/profile', { method: 'PUT', body: data }),
};

// Projects
export const projectAPI = {
    getAll: (params = '') => request(`/projects${params ? '?' + params : ''}`),
    getById: (id) => request(`/projects/${id}`),
    create: (data) => request('/projects', { method: 'POST', body: data }),
    update: (id, data) => request(`/projects/${id}`, { method: 'PUT', body: data }),
    delete: (id) => request(`/projects/${id}`, { method: 'DELETE' }),
    getMyProjects: () => request('/projects/my-projects'),
};

// Proposals
export const proposalAPI = {
    submit: (data) => request('/proposals', { method: 'POST', body: data }),
    getForProject: (projectId) => request(`/proposals/project/${projectId}`),
    getMyProposals: () => request('/proposals/my-proposals'),
    accept: (id) => request(`/proposals/${id}/accept`, { method: 'POST' }),
};

// Milestones
export const milestoneAPI = {
    create: (data) => request('/milestones', { method: 'POST', body: data }),
    getForContract: (contractId) => request(`/milestones/contract/${contractId}`),
    fund: (id) => request(`/milestones/${id}/fund`, { method: 'POST' }),
    release: (id) => request(`/milestones/${id}/release`, { method: 'POST' }),
};

// Wallet
export const walletAPI = {
    getWallet: () => request('/wallet'),
    deposit: (data) => request('/wallet/deposit', { method: 'POST', body: data }),
    getTransactions: () => request('/wallet/transactions'),
};

// Messages
export const messageAPI = {
    send: (data) => request('/messages', { method: 'POST', body: data }),
    getForContract: (contractId) => request(`/messages/contract/${contractId}`),
};

// Reviews
export const reviewAPI = {
    create: (data) => request('/reviews', { method: 'POST', body: data }),
    getForUser: (userId) => request(`/reviews/user/${userId}`),
};

// Notifications
export const notificationAPI = {
    getAll: () => request('/notifications'),
    getUnreadCount: () => request('/notifications/unread-count'),
    markAllRead: () => request('/notifications/mark-all-read', { method: 'POST' }),
    markRead: (id) => request(`/notifications/${id}/mark-read`, { method: 'POST' }),
};

// Search
export const searchAPI = {
    projects: (params) => request(`/search/projects?${params}`),
    freelancers: (params) => request(`/search/freelancers?${params}`),
    skills: () => request('/search/skills'),
};

// Admin
export const adminAPI = {
    getAnalytics: () => request('/admin/analytics'),
    getUsers: () => request('/admin/users'),
    toggleUserStatus: (id) => request(`/admin/users/${id}/toggle-status`, { method: 'POST' }),
    getDisputes: () => request('/admin/disputes'),
    resolveDispute: (id, resolution) => request(`/admin/disputes/${id}/resolve?resolution=${encodeURIComponent(resolution)}`, { method: 'POST' }),
};
