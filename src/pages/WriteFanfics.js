import React from 'react'
import WriteMyFanfic from "../components/WriteFanfics";
import {Loader} from "../components/Loader";
import {useHttp} from "../hooks/http.hook";

export const WriteFanfic = () => {

    return (
        <div>
            <WriteMyFanfic/>
        </div>
    )
}