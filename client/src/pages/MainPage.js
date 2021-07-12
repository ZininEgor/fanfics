import {AuthContext} from "../context/AuthContext";
import {useContext} from "react";
import {NavLink} from "react-router-dom";

export const MainPage = () => {

    const auth = useContext(AuthContext)


    return (
        <>
            {
                !auth.isAuthenticated &&
                <section className="py-8 leading-5 text-gray-900 bg-white sm:py-10 md:py-10 lg:py-10">
                    <div
                        className="max-w-6xl px-4 px-10 mx-auto border-solid lg:px-12"

                    >
                        <div
                            className="flex flex-col items-start leading-7 text-gray-900 border-0 border-gray-200 lg:items-center lg:flex-row"

                        >
                            <div
                                className="box-border flex-1 text-center border-solid sm:text-left"

                            >
                                <h2 className="m-0 text-4xl font-semibold leading-tight tracking-tight text-left text-black border-0 border-gray-200 sm:text-5xl">
                                    Авторизуйся и получи больше
                                </h2>
                                <p className="mt-2 text-xl text-left text-gray-900 border-0 border-gray-200 sm:text-1xl">
                                    Оценивать и писать комментарии могут только авторизованные пользователи
                                </p>
                            </div>
                            <NavLink
                                to="/sign-up"
                                className="inline-flex items-center justify-center w-full px-5 py-4 mt-6 ml-0 font-sans text-base leading-none text-white no-underline border-solid cursor-pointer md:w-auto lg:mt-0 bg-indigo-600 hover:bg-indigo-700 hover:text-white focus-within:bg-purple-800 focus-within:border-purple-800 focus-within:text-white sm:text-lg lg:ml-6 md:text-xl rounded-none rounded-lg"

                            >
                                Чего же мы ждем?
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 ml-2"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1={5} y1={12} x2={19} y2={12}/>
                                    <polyline points="12 5 19 12 12 19"/>
                                </svg>
                            </NavLink>
                        </div>
                    </div>
                </section>
            }

            <section className="py-20 bg-gradient-to-b from-white to-gray-100">
                <div
                    className="container items-center max-w-6xl px-4 px-10 mx-auto sm:px-20 md:px-32 lg:px-16"

                >
                    <div className="flex flex-wrap items-center -mx-3">
                        <div
                            className="order-1 w-full px-3 lg:w-1/2 lg:order-0"

                        >
                            <div className="w-full lg:max-w-md">
                                <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl font-heading">
                                    Добро пожаловать
                                </h2>
                                <p className="mb-4 font-medium tracking-tight text-gray-400 xl:mb-6">
                                    Тут вы можете писать и читать фанфики по категориям
                                </p>
                                <ul>
                                    <li className="flex items-center py-2 space-x-4 xl:py-3">
                                        <svg
                                            className="w-8 h-8 text-pink-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                                            />
                                        </svg>
                                        <span className="font-medium text-gray-500">
                  Создай свой фанфик в два клика
                </span>
                                    </li>
                                    <li className="flex items-center py-2 space-x-4 xl:py-3">
                                        <svg
                                            className="w-8 h-8 text-yellow-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                            />
                                        </svg>
                                        <span className="font-medium text-gray-500">
                  Делай подборку на базе твоих препочтений
                </span>
                                    </li>
                                    <li className="flex items-center py-2 space-x-4 xl:py-3">
                                        <svg
                                            className="w-8 h-8 text-green-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                        <span className="font-medium text-gray-500">
                  Все произведения проходят защиту на копирайтинг
                </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="w-full px-3 mb-12 lg:w-1/2 order-0 lg:order-1 lg:mb-0"

                        >
                            <img
                                className="mx-auto sm:max-w-sm lg:max-w-full"
                                src="https://cdn.devdojo.com/images/november2020/feature-graphic.png"
                                alt="feature image"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-100">
                <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-2xl md:text-3xl xl:text-4xl">
                        Стань частью нашего обширного комьюнити
                    </h2>
                    <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Кликай по ссылкам и погружайся в любимые миры
                    </p>
                    <div className="flex justify-center mt-8 space-x-3">
                        <NavLink
                            to="/fanfics"
                            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-indigo-700 border border-transparent rounded-md shadow hover:bg-indigo-800"
                        >
                            Фанфики
                        </NavLink>
                        <NavLink
                            to="/about"
                            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-indigo-800 bg-indigo-200 border border-transparent rounded-md hover:bg-indigo-300"
                        >
                            О нас
                        </NavLink>
                    </div>
                </div>
            </section>

            <section className="relative w-full bg-white">
                <div
                    className="absolute w-full h-32 bg-gradient-to-b from-gray-100 to-white"

                />
                <div
                    className="relative w-full px-5 py-10 mx-auto sm:py-12 md:py-16 md:px-10 max-w-7xl"

                >
                    <h1 className="mb-1 text-4xl font-extrabold leading-none text-gray-900 lg:text-5xl xl:text-6xl sm:mb-3">
                        <p>
                            Популярные категории
                        </p>

                    </h1>
                    <p className="text-lg font-medium text-gray-500 sm:text-2xl">
                        Лучшее из каждых миров
                    </p>
                    <div
                        className="flex grid h-full grid-cols-12 gap-10 pb-10 mt-8 sm:mt-16"

                    >
                        <div
                            className="relative flex flex-col items-start justify-end h-full col-span-12 overflow-hidden rounded-xl group md:col-span-6 xl:col-span-4"

                        >
                            <NavLink
                                to="/"
                                className="block w-full transition duration-300 ease-in-out transform bg-center bg-cover h-96 hover:scale-110"
                                style={{
                                    backgroundImage:
                                        'url("https://firebasestorage.googleapis.com/v0/b/fanfics-ac485.appspot.com/o/akame.jpeg?alt=media&token=7735911c-0d49-431d-90c9-c1105d299aee")'
                                }}
                            />
                            <div
                                className="relative z-20 w-full h-auto py-8 text-white bg-red-500 border-t-0 border-yellow-200 px-7"

                            >
                                <a
                                    href="#_"
                                    className="inline-block text-xs font-semibold absolute top-0 -mt-3.5 rounded-full px-4 py-2 uppercase text-purple-500 bg-white"

                                >
                                    Аниме / Манга
                                </a>
                                <h2 className="mb-5 text-4xl font-bold">
                                    <a href="#_">
                                        Убийца акаме
                                    </a>
                                </h2>
                                <p className="mb-2 text-lg font-normal text-purple-100 opacity-100">
                                    Мечник Тацуми, простой парнишка из сельской местности отправляется в столицу, чтобы
                                    заработать денег для своей голодающей деревни.
                                </p>
                            </div>
                        </div>
                        <div
                            className="relative flex flex-col items-start justify-end h-full col-span-12 overflow-hidden rounded-xl group md:col-span-6 xl:col-span-4"

                        >
                            <NavLink
                                to="/"
                                className="block w-full transition duration-300 ease-in-out transform bg-center bg-cover h-96 hover:scale-110"
                                style={{
                                    backgroundImage:
                                        'url("https://firebasestorage.googleapis.com/v0/b/fanfics-ac485.appspot.com/o/lavkraft.jpeg?alt=media&token=a58f14d9-7603-4660-829b-26d4001e7d3b")'
                                }}

                            />
                            <div
                                className="relative z-20 w-full h-auto py-8 text-white bg-gray-400 border-t-0 border-yellow-200 px-7"

                            >
                                <NavLink
                                    to="/"
                                    className="inline-block text-xs font-semibold absolute top-0 -mt-3.5 rounded-full px-4 py-2 uppercase text-blue-500 bg-white"

                                >
                                    Книги
                                </NavLink>
                                <h2 className="mb-5 text-4xl font-bold">
                                    <a href="#_">
                                        H. P. Lovecraft
                                    </a>
                                </h2>
                                <p className="mb-2 text-lg font-normal text-blue-100 opacity-100">
                                    Говард Филлипс Лавкрафт, не опубликовавший при жизни ни одной книги, стал маяком и
                                    ориентиром жанра
                                </p>
                            </div>
                        </div>
                        <div
                            className="relative flex flex-col items-start justify-end h-full col-span-12 overflow-hidden rounded-xl group sm:col-span-12 xl:col-span-4 sm:flex-row xl:flex-col"

                        >
                            <NavLink
                                to="/"
                                className="block w-full transition duration-300 ease-in-out transform bg-center bg-cover h-96 hover:scale-110"
                                style={{
                                    backgroundImage:
                                        'url("https://firebasestorage.googleapis.com/v0/b/fanfics-ac485.appspot.com/o/rick.jpeg?alt=media&token=f1911908-d551-48f0-aa19-0444b3f18354")'
                                }}

                            />
                            <div
                                className="relative z-20 flex flex-col items-start justify-center w-full h-auto py-8 text-white bg-yellow-400 border-t-0 border-yellow-200 sm:h-full xl:h-auto px-7"

                            >
                                <a
                                    href="#_"
                                    className="inline-block text-xs font-semibold absolute sm:mb-5 xl:mb-0 sm:relative xl:absolute top-0 -mt-3.5 rounded-full px-4 py-2 uppercase text-yellow-400 bg-white"

                                >
                                    TV
                                </a>
                                <h2 className="mb-5 text-4xl font-bold">
                                    <a href="#_" className>
                                        Рик и Морти
                                    </a>
                                </h2>
                                <p className="mb-2 text-lg font-normal opacity-100 text-yellow-50">
                                    В центре сюжета - школьник по имени Морти и его дедушка Рик. Морти - самый обычный
                                    мальчик, а вот его дедуля ...
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}