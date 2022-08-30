import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);
    const [token, setToken] = useState(null);
    return <AuthContext.Provider value={{auth, setAuth, token, setToken}}>
        {children}
    </AuthContext.Provider>
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error("useAuthDispatch must be used within a AuthProvider");
    }
    return context;
}

export {AuthContext, useAuth};


export default AuthProvider;