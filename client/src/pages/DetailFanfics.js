import React from 'react'
import {useAuth} from "../hooks/auth.hook";
import {Loader} from "../components/Loader";
import DetailMyFanfic from "../components/DetailFanfic";

export const DetailFanfic = () => {

    const {ready} = useAuth()

    return (
        <DetailMyFanfic/>
    )
}