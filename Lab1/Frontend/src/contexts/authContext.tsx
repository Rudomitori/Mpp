import React, {useState, useEffect, createContext, useContext, useCallback} from 'react';
import UsersApi from "../api/UsersApi";
import {IApiUser} from "../api/models/ApiUser";

interface AuthProviderProps {
}

function AuthProvider(props: AuthProviderProps) {
    const [user, setUser] = useState<IApiUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const result = await UsersApi.getCurrent();
                setUser(result);
                
            } catch (e) {
                
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const signIn = useCallback(async (login: string, password: string) => {
        const result = await UsersApi.login({login, password});
        setUser(result);
        return result;
    }, []);

    const signOut = useCallback(async () => {
        await UsersApi.logout();
        setUser(null);
    }, []);
    
    const signUp = useCallback(async (login: string, password: string) => {
        await UsersApi.create({login, password});
        const user = await UsersApi.login({login, password});
        setUser(user);
        return user;
    }, [])

    return (
        <AuthContext.Provider value={{
            user: user,
            signIn,
            signUp,
            signOut,
            loading
        }} {...props}/>
    );
}

interface AuthContextState {
    user: IApiUser | null,
    signIn: (login: string, password: string) => Promise<IApiUser>,
    signUp: (login: string, password: string) => Promise<IApiUser>,
    signOut: () => void,
    loading: boolean
}

const AuthContext = createContext<AuthContextState | undefined>(undefined);
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("AuthContext is not provided")
    return context
};

export {AuthProvider, useAuth}
