import React, { useState } from 'react'

export const AuthContext = React.createContext({
    isAuth: false,
    login: () => { }
})

const AuthContextProvider = props => {
    const [isAuthentication, setIsAuthenticated] = useState(false)

    const loginHanlder = () => {
        setIsAuthenticated(true)
    }

    return (
        <AuthContext.Provider value={{ login: loginHanlder, isAuth: isAuthentication }}>
            {props.children}
        </AuthContext.Provider >
    )
}

export default AuthContextProvider