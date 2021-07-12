import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {Profile} from "../components/Profile";

export const ProfilePage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [profile, setProfile] = useState(null)
    const [uprofile, setUprofile] = useState(null)
    const [fan, setFan] = useState(null)

    const getFanfiction = useCallback(async () => {
        try {
            const fetched = await request('/api/fanfictions', 'GET', null)
            setFan([...fetched.items])
        } catch (e) {
        }
    }, [request])

    const getProfile = useCallback(async () => {
        try {
            const fetched = await request('/api/profile', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setProfile(fetched)
        } catch (e) {
        }
    }, [token, request])


    const putProfile = useCallback(async (name, preferences) => {
        try {
            const fetched = await request('/api/profile', 'PUT', {
                    name: name,
                    preferences: [...preferences],
                },
                {
                    Authorization: `Bearer ${token}`
                })
            setProfile({email: fetched.email, name: fetched.name, preferences: fetched.preferences})
            setProfile(fetched)
            getProfile()
        } catch (e) {
        }
    }, [request])


    useEffect(() => {
        getProfile()
    }, [getProfile])


    useEffect(() => {
        getFanfiction()
    }, [getFanfiction])

    return (
        <>
            {!loading && profile && fan &&
            <Profile fan={fan} token={token} getProfile={getProfile} putProfile={putProfile} profile={profile}/>}
        </>
    )
}