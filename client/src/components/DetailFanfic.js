import React, {useState, useCallback, useEffect, useContext} from 'react'
import 'react-markdown-editor-lite/lib/index.css';
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "./Loader";
import {useHistory} from 'react-router-dom'
import {useParams} from 'react-router-dom'

export default function DetailMyFanfic() {


    const {token} = useContext(AuthContext)
    const id = useParams().id
    const {request, loading} = useHttp()
    const [fanfictions, setFanfictions] = useState()
    const [fanfick, setFanfick] = useState()
    const [text, setText] = useState()
    const [title, setTitle] = useState(null)
    const [currentFanfiction, setCurrentFanfiction] = useState(null)
    const history = useHistory()

    const getFanfic = useCallback(async () => {
        try {
            const fetched = await request(`/api/my-fanfiction/${id}`, 'GET', null,{
                Authorization: `Bearer ${token}`
            })
            setTitle(fetched.fanfic.title)
            setText(fetched.fanfic.body)
            setCurrentFanfiction(fetched.fanfic.fanfiction)
        } catch (e) {
        }
    }, [request])

    const updateFanfic = useCallback(async (_title, body, fanfiction) => {
        try {
            const fetched = await request('/api/my-fanfiction', 'PUT', {
                    title: _title,
                    body: body,
                    id_fanfic: id,
                    fanfiction: fanfiction,
                },
                {
                    Authorization: `Bearer ${token}`
                })
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


    useEffect(() => {
        getFanfic()
    }, [getFanfic])

    useEffect(() => {
        getFanfiction()
    }, [getFanfiction])



    const mdParser = new MarkdownIt()

    function handleEditorChange({html, text}) {
        setText(text)
    }

    const selectFanfiction = (value) => {
        setCurrentFanfiction(value)
    }

    const changeTitleHandler = (event) => {
        setTitle(event.target.value)
    }


    const save = () => {
        updateFanfic(title, text, currentFanfiction)
    }
    return (
        <>
            {fanfictions &&
            <div className="mt-10 pt-10 mx-10 justify-center sm:mt-0">
                {console.log(title)}
                {console.log(text)}
                {console.log(currentFanfiction)}
                <div className="md:grid  justify-center md:gap-6">
                    <div className="mt-5 md:mt-0 ">
                        <form action="#" method="POST">
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="block text-sm font-medium text-gray-700">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                defaultValue={title}
                                                onChange={changeTitleHandler}
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="country"
                                                   className="block text-sm font-medium text-gray-700">
                                                Fanfictions
                                            </label>
                                            <select
                                                id="country"
                                                name="country"
                                                onChange={e => selectFanfiction(e.target.value)}
                                                autoComplete="country"
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                {
                                                    fanfictions.map(function (f, index) {
                                                        if (f._id === currentFanfiction){
                                                            return <option key={index} selected="selected" value={f._id}>{f.name}</option>
                                                        }
                                                        return <option key={index} value={f._id}>{f.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="col-span-6">
                                            <MdEditor style={{height: '500px'}} defaultValue={text}
                                                      renderHTML={text => mdParser.render(text)}
                                                      onChange={handleEditorChange}/>
                                        </div>
                                    </div>

                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        onClick={save}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Обновить
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            }
        </>
    )
}