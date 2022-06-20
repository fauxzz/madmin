import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);
    return <AuthContext.Provider value={{auth, setAuth}}>
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


// import React, { createContext, useContext, useState } from 'react'

// const AuthContext = createContext();

// const AuthProvider = ({children}) => {
//     const [dataUser, setDataUser] = useState(null);

//     return <AuthContext.Provider value={[dataUser, setDataUser]}>
//         {children}
//     </AuthContext.Provider>
// }
// export const useAuth = () => useContext(AuthContext);
// export {
//     AuthContext
// }

// export default AuthProvider;