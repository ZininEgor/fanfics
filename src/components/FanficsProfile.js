import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {NavLink} from "react-router-dom";
import {Loader} from "./Loader";
import {EmptyFanFics} from "./EmptyMyFanfics";

export const FanficsProfile = () => {

    const [pageNumber, setPageNumber] = useState(0)
    const [currentFanfiction, setCurrentFanfiction] = useState("fanfiction")
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [fanfictions, setFanfictions] = useState(null)
    const [fanfics, setFanfics] = useState(null)
    const getMyFanfics = useCallback(async (page_number, filter = "fanfiction") => {
        try {
            const fetched = await request(`/api/my-fanfiction?page=${page_number}&filter=${filter}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setFanfics(fetched)
        } catch (e) {
        }
    }, [token, request])

    const deleteFanfic = useCallback(async (id) => {
        try {
            const fetched = await request(`/api/my-fanfiction`, 'DELETE', {
                id_fanfic: id,
            }, {
                Authorization: `Bearer ${token}`
            })
            getMyFanfics(pageNumber, currentFanfiction)
        } catch (e) {
        }
    }, [token, request])

    const getFanfiction = useCallback(async () => {
        try {
            const fetched = await request('/api/fanfictions', 'GET', null)
            setFanfictions([...fetched.items])
        } catch (e) {
        }
    }, [request])

    useEffect(() => {
        getFanfiction()
    }, [getFanfiction])

    useEffect(() => {
        getMyFanfics(pageNumber)
    }, [getMyFanfics])

    useEffect(() => {
        getMyFanfics(pageNumber)
    }, [deleteFanfic])

    // if (loading || fanfictions === null) {
    //     return <Loader/>
    // }

    const selectFanfiction = (value) => {
        setCurrentFanfiction(value)
        getMyFanfics(pageNumber, value)
    }

    // if (!loading && fanfics === null || fanfics.length === 0) {
    //     if (fanfics !== null) {
    //         console.log(fanfics.length === 0)
    //     }
    //     return <EmptyFanFics/>
    // }

    const DeleteFanfics = (event) => {
        deleteFanfic(event.currentTarget.id)
    }

    const NextPage = () => {
        if (fanfics.length === 10) {
            setPageNumber(pageNumber + 1)
            getMyFanfics(pageNumber + 1)
        }
    }
    const PrevPage = () => {

        if (pageNumber !== 0) {
            setPageNumber(pageNumber - 1)
            getMyFanfics(pageNumber - 1)
        }

    }

    return (
        <>
            {fanfics && fanfictions &&
            <div className="bg-gray-50">
                <div className="py-4">
                    <div className="mx-auto container bg-white dark:bg-gray-800 shadow rounded">
                        <div
                            className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
                            <div
                                className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                                <div
                                    className="flex items-center lg:border-l lg:border-r border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:px-8">
                                    <label htmlFor="country"
                                           className="block text-sm font-medium px-6 text-gray-700">
                                        Fanfictions
                                    </label>
                                    <select
                                        id="country"
                                        name="country"
                                        onChange={e => selectFanfiction(e.target.value)}
                                        autoComplete="country"
                                        className="block w-full px-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        {
                                            fanfictions.map(function (f, index) {
                                                if (f._id === currentFanfiction) {
                                                    return <option key={index} selected="selected"
                                                                   value={f._id}>{f.name}</option>
                                                }
                                                return <option key={index} value={f._id}>{f.name}</option>
                                            })
                                        }
                                        <option key={62} value={"fanfiction"}>All</option>
                                    </select>
                                </div>
                                <div
                                    className="flex items-center lg:border-l lg:border-r border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:px-6">
                                    <p className="text-base text-gray-600 dark:text-gray-400" id="page-view">
                                        Viewing {pageNumber}0 - {pageNumber + 1}0
                                    </p>
                                    <a className="text-gray-600 dark:text-gray-400 ml-2 border-transparent border cursor-pointer rounded"
                                       onClick={PrevPage}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="icon icon-tabler icon-tabler-chevron-left" width={20}
                                             height={20}
                                             viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                                             strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z"/>
                                            <polyline points="15 6 9 12 15 18"/>
                                        </svg>
                                    </a>
                                    <a className="text-gray-600 dark:text-gray-400 border-transparent border rounded focus:outline-none cursor-pointer"
                                       onClick={NextPage}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="icon icon-tabler icon-tabler-chevron-right" width={20}
                                             height={20}
                                             viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                                             strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z"/>
                                            <polyline points="9 6 15 12 9 18"/>
                                        </svg>
                                    </a>
                                </div>
                                <div className="lg:ml-6 flex items-center">
                                    <NavLink to="/write-fanfic"
                                             className="text-white ml-4 cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 w-8 h-8 rounded flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="icon icon-tabler icon-tabler-plus" width={28} height={28}
                                             viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                                             strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z"/>
                                            <line x1={12} y1={5} x2={12} y2={19}/>
                                            <line x1={5} y1={12} x2={19} y2={12}/>
                                        </svg>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
                            <table className="min-w-full bg-white dark:bg-gray-800">
                                <thead>
                                <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
                                    <th className="text-gray-600 pl-5 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Автор
                                    </th>
                                    <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Название</th>
                                    <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                                        </svg>
                                    </th>
                                    <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"/>
                                        </svg>
                                    </th>
                                    <td className="text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">Категория
                                    </td>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    fanfics.map(function (f) {
                                        return <tr className="h-24 border-gray-300 dark:border-gray-200 border-b">

                                            <td className="text-sm pr-6 pl-5 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">Я</td>
                                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{f.title}</td>
                                            <td className="pr-6 whitespace-no-wrap">
                                                <p className="ml-2 text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-sm">{f.liked.length}</p>
                                            </td>
                                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                                <p className="ml-2 text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-sm">{f.dis_liked.length}</p>
                                            </td>
                                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{fanfictions.find((fan) => {
                                                return f.fanfiction === fan["_id"]
                                            }).name}</td>
                                            <td className="pr-6">
                                                <div className="w-2 h-2 rounded-full bg-indigo-400"/>
                                            </td>
                                            <td className="pr-8 relative">
                                                <NavLink to={`/my-fanfiction/detail/${f._id}`}
                                                         className="text-gray-500 rounded cursor-pointer border border-transparent focus:outline-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                                         fill="none"
                                                         viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2}
                                                              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                                                    </svg>
                                                </NavLink>
                                            </td>
                                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                                <button
                                                    id={f._id}
                                                    onClick={DeleteFanfics}
                                                    className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 bg-indigo-600 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-md">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}