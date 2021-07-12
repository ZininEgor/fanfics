import React, {useState, useEffect} from "react"
import {LockClosedIcon} from "@heroicons/react/solid";
import {useHttp} from "../hooks/http.hook";
import {NavLink} from "react-router-dom";

export const SignUp = () => {
    const {loading, error, request} = useHttp()
    const [form, setForm] = useState({
        email: '', nickname: '', password1: '', password2: ''
    })

    let [message, setMessage] = useState('')

    function makeMessage(text) {
        setMessage(message = text)
    }

    useEffect(() => {
        makeMessage(error)
    }, [error])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST', {...form})
            makeMessage(data.message)
        } catch (e) {
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <NavLink to="/"  className="md-2 text-center">
                        <span className="sr-only">Workflow</span>
                        <p
                            className="text-4xl font-black leading-none text-gray-900 select-none logo"
                            bis_skin_checked={1}
                        >
                            Fan-Fics<span className="text-indigo-600">.</span>
                        </p>
                    </NavLink>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Создайте свой аккаунт</h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email адрес"
                                onChange={changeHandler}
                            />
                        </div>
                        <div>
                            <label htmlFor="nickname" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="nickname"
                                name="nickname"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Никнейм для сайта"
                                onChange={changeHandler}
                            />
                        </div>
                        <div>
                            <label htmlFor="password1" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password1"
                                name="password1"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Пароль"
                                onChange={changeHandler}
                            />
                        </div>
                        <div>
                            <label htmlFor="password2" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password2"
                                name="password2"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Подтвердите пароль"
                                onChange={changeHandler}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <p className="font-medium text-red-600">
                                {message}
                            </p>
                        </div>
                        <div className="text-sm">
                            <a href="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Уже зарегистрированы ?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={loginHandler}
                            disabled={loading}
                        >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
              </span>
                            Зарегистрироваться
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}