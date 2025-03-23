import React, { createContext, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const {
        isAuthenticated,
        user,
        loginWithRedirect,
        logout: auth0Logout,
        isLoading,
        getAccessTokenSilently
    } = useAuth0();

    const login = () => {
        return loginWithRedirect();
    };

    const register = () => {
        return loginWithRedirect({
            screen_hint: 'signup',
        });
    };

    const logout = () => {
        return auth0Logout({
            returnTo: window.location.origin
        });
    };

    const getToken = async () => {
        try {
            return await getAccessTokenSilently();
        } catch (error) {
            console.error('Error al obtener el token:', error);
            return null;
        }
    };

    return (
        <AuthContext.Provider 
            value={{
                isAuthenticated,
                user,
                loading: isLoading,
                login,
                logout,
                register,
                getToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
}; 