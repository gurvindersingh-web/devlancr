import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { userAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // ✅ FIX: Wrapped in useCallback so it can be safely listed in dep array
    const loadUser = useCallback(async () => {
        try {
            const res = await userAPI.getMe();
            setUser(res.data);
        } catch {
            logout();
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        if (token) {
            loadUser();
        } else {
            setLoading(false);
        }
    }, [token, loadUser]); // ✅ FIX: loadUser in deps, no stale closure

    function login(authData) {
        localStorage.setItem('token', authData.token);
        setToken(authData.token);
        setUser({
            id: authData.userId,
            email: authData.email,
            firstName: authData.firstName,
            lastName: authData.lastName,
            roles: authData.roles,
        });
    }

    function logout() {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    }

    function hasRole(role) {
        return user?.roles?.includes(`ROLE_${role.toUpperCase()}`);
    }

    // ✅ NEW: convenient helper used across the app
    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, hasRole, loadUser, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
