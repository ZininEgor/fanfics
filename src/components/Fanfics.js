import React, {useState, useCallback, useContext, useEffect} from 'react'
import Nav from './MainFanfics/Nav.js'
import NavItem from './MainFanfics/NavItem.js'
import List from './MainFanfics/List.js'
import ListItem from './MainFanfics/ListItem.js'
import {AuthContext} from "../context/AuthContext";
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/solid'
import {useHttp} from "../hooks/http.hook";
import {Loader} from "./Loader";
import {useHistory} from "react-router-dom";

export default function Fanfics() {

    const {request, loading} = useHttp()
    const [pageNumber, setPageNumber] = useState(0)
    const [fanfics, setFanfics] = useState(null)
    const [search, setSearch] = useState(null)
    const [fanfictions, setFanfictions] = useState(null)
    const [currentFanfiction, setCurrentFanfiction] = useState("fanfiction")
    const history = useHistory()
    const detailFanfic = (id) => {
        history.push(`/fanfics/detail/${id}`)
    }

    const getFanfic = useCallback(async (page = 0, filter = "fanfiction") => {
        try {
            const fetched = await request(`/api/fanfics?page=${page}&filter=${filter}`, 'GET', null)
            setFanfics([...fetched])
        } catch (e) {
        }
    }, [request])

    const Search = useCallback(async (search = "") => {
        try {
            const fetched = await request(`/api/fanfics/search?search=${search}`, 'GET', null)
            setFanfics([...fetched])
        } catch (e) {
        }
    }, [request])

    const getFanfiction = useCallback(async () => {
        try {
            const fetched = await request('/api/fanfictions', 'GET', null)
            setFanfictions([...fetched.items])
        } catch (e) {
        }
    }, [request])

    const NextPage = () => {
        console.log(fanfics.length)
        if (fanfics.length === 7) {
            setPageNumber(pageNumber + 1)
            getFanfic(pageNumber + 1, currentFanfiction)
        }
    }
    const PrevPage = () => {

        if (pageNumber !== 0) {
            setPageNumber(pageNumber - 1)
            getFanfic(pageNumber - 1, currentFanfiction)
        }

    }

    useEffect(() => {
        getFanfiction()
    }, [getFanfiction])

    useEffect(() => {
        getFanfic(pageNumber)
    }, [getFanfic])

    // if (loading) {
    //     return <Loader/>
    // }

    const selectFanfiction = (event) => {
        setCurrentFanfiction(event.currentTarget.id)
        getFanfic(pageNumber, event.currentTarget.id)
    }
    const makeSearchString = (event) => {
        setSearch(event.currentTarget.value)
    }

    return (
        <div className="bg-gray-50">
            {fanfics && fanfictions &&
            <div className="grid grid-rows-6 grid-flow-col gap-4">
                {console.log(search)}
                <div className="row-span-6 h-screen hidden lg:block my-4 ml-4 shadow-lg relative w-120">
                    <div className="bg-white h-full rounded-2xl dark:bg-gray-700">
                        <div
                            className="flex items-center text-lime-600 dark:text-lime-400 text-sm sm:text-base lg:text-sm xl:text-base font-semibold uppercase justify-center pt-6"> Фильтрация
                        </div>
                        <nav className="mt-6">
                            <div>
                                <div
                                    onClick={selectFanfiction}
                                    id="fanfiction"
                                    className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500"
                                >
                                      <span className="text-left">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="h-6 w-6 text-base font-medium text-green-500 hover:text-gray-900"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                                        </svg>
                                      </span>
                                    <span className="mx-4 text-sm font-normal">Все категории</span>
                                </div>
                                {

                                    fanfictions.map((fanfiction) => {
                                        if (currentFanfiction === fanfiction._id) {
                                            return <div
                                                className="w-full font-thin  uppercase text-green-500 flex items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r from-white to-green-100 border-r-4 border-green-500 dark:from-gray-700 dark:to-gray-800 border-r-4 border-green-500">
                                      <span className="text-left">

                                          <svg xmlns="http://www.w3.org/2000/svg"
                                               className="h-6 w-6 text-base font-medium text-green-500 hover:text-gray-900"
                                               fill="none"
                                               viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                                        </svg>


                                      </span>
                                                <span className="mx-4 text-sm font-normal">{fanfiction.name}</span>
                                            </div>
                                        }
                                        return <a
                                            onClick={selectFanfiction}
                                            id={fanfiction._id}
                                            className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500">
                                            <span className="text-left">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="h-6 w-6 text-base font-medium text-yellow-500 hover:text-gray-900"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                                        </svg>
                                      </span>
                                            <span className="mx-4 text-sm font-normal">{fanfiction.name}</span>
                                        </a>
                                    })
                                }
                            </div>
                        </nav>
                    </div>
                </div>
                <div
                    className="col-span-2 shadow mt-4 pl-5 sm:rounded-md sm:overflow-hidden bg-white justify-items:center items-center"
                    style={{
                        backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/fanfics-ac485.appspot.com/o/bc.svg?alt=media&token=e562e4f1-9783-43f6-9135-4fcb3b230f3a)`,
                        backgroundRepeat: 'no-repeat',
                    }}>
                    <div
                        className="text-center font-light flex items-center pt-10 justify-center">
                        <form className="flex w-full max-w-sm space-x-3">
                            <div
                                className="relative text-black flex items-center w-full lg:w-82 h-full group">
                                <div
                                    className="absolute z-50 flex items-center justify-center bg-white block w-auto h-10 p-3 pr-2 text-sm text-black uppercase cursor-pointer sm:hidden">
                                    <svg
                                        fill="none"
                                        className="relative w-5 h-5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                                    </svg>
                                </div>
                                <svg
                                    className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-black pointer-events-none fill-current group-hover:text-black sm:block"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                                </svg>
                                <input
                                    type="text"
                                    onChange={makeSearchString}
                                    className="block w-full py-1.5 pl-10 pr-4 text-black leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black ring-opacity-90 bg-gray-100 dark:bg-black text-blacl aa-input"
                                    placeholder="Найдется все.."
                                />
                                <div
                                    onClick={() => Search(search)}
                                    className="absolute right-0 hidden h-auto px-2 py-1 mr-2 text-xs text-black border border-black rounded-2xl md:block">
                                    +
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div
                    className="row-span-5 col-span-2 shadow sm:rounded-md bg-white sm:overflow-hidden">
                    <List>
                        {fanfics.map((fanfic) => (
                            <ListItem key={fanfic.id} fanfictions={fanfictions} detailFanfic={detailFanfic}
                                      fanfic={fanfic}/>
                        ))}
                    </List>
                    <div
                        className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Previous
                            </a>
                            <a
                                href="#"
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Next
                            </a>
                        </div>
                        <div
                            className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing page<span className="font-medium"> {pageNumber}</span> <span
                                    className="font-medium"/>
                                    <span className="font-medium"/>
                                </p>
                            </div>
                            <div>
                                <nav
                                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                    aria-label="Pagination">
                                    <div
                                        onClick={PrevPage}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeftIcon className="h-5 w-5"
                                                         aria-hidden="true"/>
                                    </div>
                                    <div
                                        onClick={NextPage}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Next</span>
                                        <ChevronRightIcon className="h-5 w-5"
                                                          aria-hidden="true"/>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}