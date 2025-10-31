
import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import api from "../AxiosInstance";
import { RefreshInstance } from "../AxiosInstance";

interface AuthContextType {
    user: any;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    initialize: () => Promise<void>;
    refreshToken: () => Promise<void>;
    loading: boolean;
    register: (username: string, password: string, re_password: string) => Promise<void>;
    googleLogin: (id_token: string) => Promise<void>;
    resetPassword: (username: string) => Promise<void>;
    resetPasswordConfirm: (
        uid: string,
        token: string,
        new_password: string,
        re_new_password: string
    ) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const initialize = async () => {
        try {
            const response = await api.get("/accounts/users/me/");
            setUser(response.data);
        } catch (err) {
            console.error("Failed to initialize user", err);
            setUser(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        initialize();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            await api.post("/accounts/login", { username, password });
            await initialize();
            return true;
        } catch (err) {
            console.error("Login failed", err);
            return false;
        }
    };

    const logout = async () => {
        try {
            await api.post("/accounts/logout");
            setUser(null);
        } catch (e) {
            console.error(`Logout failed ${e}`);
        }
    };

    const refreshToken = async () => {
        try {
            await api.post("/accounts/refresh");
            await initialize();
            console.log("Token refreshed");
        } catch (err) {
            console.error("Token refresh failed", err);
        }
    };

    const register = async (username: string, password: string, re_password: string) => {
        try {
            await api.post("/accounts/users/", { username, password, re_password });
            console.log("Registered successfully");
        } catch (err) {
            console.error("Registration failed", err);
        }
    };

    const googleLogin = async (code: string) => {
        try {
            await api.post("/accounts/google", { code });
            await initialize();
            console.log("Google login successful");
        } catch (err) {
            console.error("Google login failed", err);
        }
    };

    const resetPassword = async (username: string) => {
        try {
            await api.post("/accounts/users/reset_password/", { username });
            console.log("Password reset email sent");
        } catch (err) {
            console.error("Password reset failed", err);
        }
    };

    const resetPasswordConfirm = async (
        uid: string,
        token: string,
        new_password: string,
        re_new_password: string
    ) => {
        try {
            await api.post("/accounts/users/reset_password_confirm/", {
                uid,
                token,
                new_password,
                re_new_password,
            });
            console.log("Password reset confirmed");
        } catch (err) {
            console.error("Password reset confirmation failed", err);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                initialize,
                refreshToken,
                loading,
                register,
                googleLogin,
                resetPassword,
                resetPasswordConfirm,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
