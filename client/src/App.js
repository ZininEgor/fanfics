import React from "react";
import {BrowserRouter as Router} from "react-router-dom"
import {AuthContext} from './context/AuthContext'
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import NavBar from "./components/NavBar";
import {Loader} from "./components/Loader";
import {Footer} from "./components/footer";


function App() {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)


    if (!ready) {
        return <Loader/>
    }

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Router>
                <div className="min-h-screen">
                    <NavBar/>
                    {routes}
                    <Footer/>
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App;
