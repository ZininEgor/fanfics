import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage";
import {MainPage} from "./pages/MainPage";
import {SignUp} from "./pages/SignUpPage";
import {About} from "./pages/AboutUs"
import {MyFanFics} from "./pages/MyFanficsPage"
import {ProfilePage} from "./pages/ProfilePage";
import {WriteFanfic} from "./pages/WriteFanfics";
import {DetailFanfic} from "./pages/DetailFanfics";
import {MainFanficPage} from "./pages/MainFanficPage";
import {ReadFanficPage} from "./pages/ReadFanficPage";
import {ConfirmEmailPage} from "./pages/ConfirmEmailPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <MainPage/>
                </Route>
                <Route path="/profile" exact>
                    <ProfilePage/>
                </Route>
                <Route path="/about" exact>
                    <About/>
                </Route>
                <Route path="/my-fanfiction/detail/:id">
                    <DetailFanfic/>
                </Route>
                <Route path="/my-fanfics" exact>
                    <MyFanFics/>
                </Route>
                <Route path="/write-fanfic" exact>
                    <WriteFanfic/>
                </Route>
                <Route path="/fanfics" exact>
                    <MainFanficPage/>
                </Route>
                <Route path="/fanfics/detail/:id" exact>
                    <ReadFanficPage/>
                </Route>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/sign-in" exact>
                <AuthPage/>
            </Route>
            <Route path="/fanfics" exact>
                <MainFanficPage/>
            </Route>
            <Route path="/activate/:token" exact>
                <ConfirmEmailPage/>
            </Route>
            <Route path="/fanfics/detail/:id" exact>
                <ReadFanficPage/>
            </Route>
            <Route path="/sign-up" exact>
                <SignUp/>
            </Route>
            <Route path="/" exact>
                <MainPage/>
            </Route>
        </Switch>
    )
}