import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import api from "./frontend/auth-boilerplate/src/AxiosInstance";

interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    initialize: () => Promise<void>;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState(null);

    // loading logic is important
    const [loading, setLoading] = useState(true);

    const initialize = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const userResponse = await api.get("/auth/users/me", {
                    headers: {
                        "Authorization": `Token ${token}`
                    }
                });
                setUser(userResponse.data);
            } catch (err) {
                console.error("Failed to initialize user", err);
                localStorage.removeItem("token");
                setUser(null);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        initialize();
    }, []);

    const logout = async () => {
        try {
            await api.post('/auth/token/logout', {}, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });

            localStorage.removeItem('token');
            setUser(null);

        } catch (e) {
            console.error(`Logout failed ${e}`);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post("/auth/token/login", {
                email,
                password,
            });

            const { auth_token } = response.data;

            if (auth_token) {
                localStorage.setItem("token", auth_token);

                const userResponse = await api.get("/auth/users/me", {
                    headers: {
                        "Authorization": `Token ${auth_token}`
                    }
                });

                setUser(userResponse.data);
                return true;
            }

            return false;
        } catch (err) {
            console.error("Login failed", err);
            return false;
        }
    };


    return (
        <AuthContext.Provider value={{ user, login, logout, initialize, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
