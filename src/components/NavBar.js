import {Fragment, useContext} from 'react'
import {Popover, Transition} from '@headlessui/react'
import {
    BookmarkAltIcon,
    CalendarIcon,
    MenuIcon,
    ShieldCheckIcon,
    SupportIcon,
    XIcon,
} from '@heroicons/react/outline'
import {ChevronDownIcon} from '@heroicons/react/solid'
import {useHistory, NavLink} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";


const resources = [
    {
        name: 'Help Center',
        description: 'Get all of your questions answered in our forums or contact support.',
        href: '#',
        icon: SupportIcon,
    },
    {
        name: 'Guides',
        description: 'Learn how to maximize our platform to get the most out of it.',
        href: '#',
        icon: BookmarkAltIcon,
    },
    {
        name: 'Events',
        description: 'See what meet-ups and other events we might be planning near you.',
        href: '#',
        icon: CalendarIcon,
    },
    {
        name: 'Security',
        description: 'Understand how we take your privacy seriously.',
        href: '#', icon: ShieldCheckIcon
    },
]
const recentPosts = [
    {id: 1, name: 'Boost your conversion rate', href: '#'},
    {id: 2, name: 'How to use search engine optimization to drive traffic to your site', href: '#'},
    {id: 3, name: 'Improve your customer experience', href: '#'},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar() {

    const history = useHistory()
    const auth = useContext(AuthContext)


    const darkMode = () => {
        localStorage.theme = 'dark'
        // localStorage.theme = 'light'
    }

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')

    }

    return (
        <Popover className="relative bg-white dark:bg-black">
            {({open}) => (
                <>
                    <div className="max-w-11xl mx-auto px-4 sm:px-6">
                        <div
                            className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                            <div className="flex justify-start lg:w-0 lg:flex-1">
                                <NavLink to="/">
                                    <span className="sr-only">Workflow</span>
                                    <p
                                        className="text-4xl font-black leading-none text-gray-900 select-none logo"
                                        bis_skin_checked={1}
                                    >
                                        Fan-Fics<span className="text-indigo-600">.</span>
                                    </p>
                                </NavLink>
                                <NavLink
                                    to="/"
                                    className="pl-8 pt-2 text-base font-medium text-gray-500 hover:text-gray-900"
                                    onClick={darkMode}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                </NavLink>
                            </div>
                            <div className="-mr-2 -my-2 md:hidden">
                                <Popover.Button
                                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">Open menu</span>
                                    <MenuIcon className="h-6 w-6" aria-hidden="true"/>
                                </Popover.Button>
                            </div>
                            <Popover.Group as="nav" className="hidden md:flex space-x-10">

                                <NavLink to="/about"
                                         className="text-base font-medium text-gray-500 hover:text-gray-900">
                                    ?? ??????
                                </NavLink>

                                {
                                    auth.isAuthenticated &&
                                    <NavLink to="/my-fanfics"
                                             className="text-base font-medium text-gray-500 hover:text-gray-900">
                                        ?????? ??????????????
                                    </NavLink>
                                }

                                <Popover className="relative">
                                    {({open}) => (
                                        <>
                                            <Popover.Button
                                                className={classNames(
                                                    open ? 'text-gray-900' : 'text-gray-500',
                                                    'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                                )}
                                            >
                                                <span>??????????????????</span>
                                                <ChevronDownIcon
                                                    className={classNames(
                                                        open ? 'text-gray-600' : 'text-gray-400',
                                                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </Popover.Button>

                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="opacity-0 translate-y-1"
                                                enterTo="opacity-100 translate-y-0"
                                                leave="transition ease-in duration-150"
                                                leaveFrom="opacity-100 translate-y-0"
                                                leaveTo="opacity-0 translate-y-1"
                                            >
                                                <Popover.Panel
                                                    static
                                                    className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0"
                                                >
                                                    <div
                                                        className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                        <div
                                                            className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                            {resources.map((item) => (
                                                                <a
                                                                    key={item.name}
                                                                    href={item.href}
                                                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                                                >
                                                                    <item.icon
                                                                        className="flex-shrink-0 h-6 w-6 text-indigo-600"
                                                                        aria-hidden="true"/>
                                                                    <div className="ml-4">
                                                                        <p className="text-base font-medium text-gray-900">{item.name}</p>
                                                                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                                    </div>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Popover>
                                <Popover className="relative">
                                    {({open}) => (
                                        <>
                                            <Popover.Button
                                                className={classNames(
                                                    open ? 'text-gray-900' : 'text-gray-500',
                                                    'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                                )}
                                            >
                                                <span>????????????????????</span>
                                                <ChevronDownIcon
                                                    className={classNames(
                                                        open ? 'text-gray-600' : 'text-gray-400',
                                                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </Popover.Button>

                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="opacity-0 translate-y-1"
                                                enterTo="opacity-100 translate-y-0"
                                                leave="transition ease-in duration-150"
                                                leaveFrom="opacity-100 translate-y-0"
                                                leaveTo="opacity-0 translate-y-1"
                                            >
                                                <Popover.Panel
                                                    static
                                                    className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0"
                                                >
                                                    <div
                                                        className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                        <div
                                                            className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                            {resources.map((item) => (
                                                                <a
                                                                    key={item.name}
                                                                    href={item.href}
                                                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                                                >
                                                                    <item.icon
                                                                        className="flex-shrink-0 h-6 w-6 text-indigo-600"
                                                                        aria-hidden="true"/>
                                                                    <div className="ml-4">
                                                                        <p className="text-base font-medium text-gray-900">{item.name}</p>
                                                                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                                    </div>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Popover>
                            </Popover.Group>
                            {
                                !auth.isAuthenticated &&
                                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                                    <NavLink
                                        to="/"
                                        className="text-gray-500 hover:text-gray-900"
                                        onClick={darkMode}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                        </svg>
                                    </NavLink>
                                    <NavLink
                                        to="/sign-in"
                                        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        ??????????
                                    </NavLink>
                                    <NavLink
                                        to="/sign-up"
                                        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        ????????????????????????????????????
                                    </NavLink>
                                </div>
                            }
                            {
                                auth.isAuthenticated &&
                                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                                    <NavLink
                                        to="/"
                                        className="text-gray-500 hover:text-gray-900"
                                        onClick={darkMode}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                        </svg>
                                    </NavLink>
                                    <NavLink
                                        to="/profile"
                                        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        ??????????????
                                    </NavLink>
                                    <NavLink
                                        to="/"
                                        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                        onClick={logoutHandler}
                                    >
                                        ??????????
                                    </NavLink>
                                </div>
                            }

                        </div>
                    </div>

                    <Transition
                        show={open}
                        as={Fragment}
                        enter="duration-200 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Popover.Panel
                            focus
                            static
                            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                        >
                            <div
                                className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                                <div className="pt-5 pb-6 px-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <img
                                                className="h-8 w-auto"
                                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                                alt="Workflow"
                                            />
                                        </div>
                                        <div className="-mr-2">
                                            <Popover.Button
                                                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                <span className="sr-only">Close menu</span>
                                                <XIcon className="h-6 w-6" aria-hidden="true"/>
                                            </Popover.Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-6 px-5 space-y-6">
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                        <a className="text-base font-medium text-gray-900 hover:text-gray-700">
                                            Pricing
                                        </a>

                                        <a className="text-base font-medium text-gray-900 hover:text-gray-700">
                                            Docs
                                        </a>
                                        {resources.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="text-base font-medium text-gray-900 hover:text-gray-700"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    <div>
                                        <a

                                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            ????????????????????????????????????
                                        </a>
                                        <p className="mt-6 text-center text-base font-medium text-gray-500">
                                            Existing customer?{' '}
                                            <a className="text-indigo-600 hover:text-indigo-500">
                                                ??????????
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}