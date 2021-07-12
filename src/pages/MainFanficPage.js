import {AuthContext} from "../context/AuthContext";
import {useContext} from "react";
import {NavLink} from "react-router-dom";
import Fanfics from "../components/Fanfics"

export const MainFanficPage = () => {
    return (
        <h1>
            <Fanfics/>
        </h1>
    )
}