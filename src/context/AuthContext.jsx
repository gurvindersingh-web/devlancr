import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { userAPI } from '../services/api';

// ── Split contexts to prevent unnecessary re-renders ──
// AuthStatus: rarely changes (login/logout only)
// UserProfile: changes on profile update
// AuthActions: stable references, never triggers re-render
const AuthStatusContext = createContext(null);
const UserProfileContext = createContext(null);
const AuthActionsContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    const loadUser = useCallback(async () => {
        try {
            const res = await userAPI.getMe();
            setUser(res.data);
        } catch {
            // Token invalid — clear everything
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (token) {
            loadUser();
        } else {
            setLoading(false);
        }
    }, [token, loadUser]);

    // ── Actions — stable references via useCallback ──
    const login = useCallback((authData) => {
        localStorage.setItem('token', authData.token);
        setToken(authData.token);
        setUser({
            id: authData.userId,
            email: authData.email,
            firstName: authData.firstName,
            lastName: authData.lastName,
            roles: authData.roles,
        });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    }, []);

    const hasRole = useCallback((role) => {
        return user?.roles?.includes(`ROLE_${role.toUpperCase()}`);
    }, [user?.roles]);

    // ── Memoized values to prevent re-renders ──
    const isAuthenticated = !!user;

    const statusValue = useMemo(() => ({
        isAuthenticated,
        loading,
        hasRole,
        token,
    }), [isAuthenticated, loading, hasRole, token]);

    const profileValue = useMemo(() => ({
        user,
    }), [user]);

    const actionsValue = useMemo(() => ({
        login,
        logout,
        loadUser,
    }), [login, logout, loadUser]);

    return (
        <AuthStatusContext.Provider value={statusValue}>
            <UserProfileContext.Provider value={profileValue}>
                <AuthActionsContext.Provider value={actionsValue}>
                    {children}
                </AuthActionsContext.Provider>
            </UserProfileContext.Provider>
        </AuthStatusContext.Provider>
    );
}

// ── Granular hooks: use these for optimal re-render performance ──

/** Use when you only need to check login status / roles */
// eslint-disable-next-line react-refresh/only-export-components
export function useAuthStatus() {
    const context = useContext(AuthStatusContext);
    if (!context) throw new Error('useAuthStatus must be used within AuthProvider');
    return context;
}

/** Use when you need the user profile object */
// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
    const context = useContext(UserProfileContext);
    if (!context) throw new Error('useUser must be used within AuthProvider');
    return context;
}

/** Use when you need login/logout actions (never re-renders consuming component) */
// eslint-disable-next-line react-refresh/only-export-components
export function useAuthActions() {
    const context = useContext(AuthActionsContext);
    if (!context) throw new Error('useAuthActions must be used within AuthProvider');
    return context;
}

/**
 * Backward-compatible hook — combines all three contexts.
 * Components using this will still re-render on any auth change.
 * Prefer the granular hooks (useAuthStatus, useUser, useAuthActions) for new code.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const { isAuthenticated, loading, hasRole, token } = useAuthStatus();
    const { user } = useUser();
    const { login, logout, loadUser } = useAuthActions();

    return { user, token, loading, login, logout, hasRole, loadUser, isAuthenticated };
}

