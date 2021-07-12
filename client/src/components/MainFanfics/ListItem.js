export default function ListItem(props) {
    return (
        <article className="p-4 flex space-x-4">
            <img src={props.fanfic.url_photo} alt="" className="flex-none w-16 h-16 rounded-lg object-cover bg-gray-100"
                 width="144" height="144"/>
            <div onClick={() => props.detailFanfic(props.fanfic._id)}
                 className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                <h2 className="text-lg font-semibold text-black mb-0.5">
                    {props.fanfic.title}
                </h2>
                <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
                    <div>
                        <dt className="sr-only">Servings</dt>
                        <dd> {
                            props.fanfictions.map( (element) => {
                                if (element._id === props.fanfic.fanfiction){
                                    return element.name
                                }
                            } )
                        }</dd>
                    </div>
                    <div className="flex-none w-full mt-0.5 font-normal">
                        <dt className="inline">By</dt>
                        {' '}
                        <dd className="inline text-black">{props.fanfic.user_name}</dd>
                    </div>
                    <div
                        class="absolute top-0 right-0 rounded-full bg-amber-50 text-amber-900 px-2 py-0.5 hidden sm:flex lg:hidden xl:flex items-center space-x-1">
                        <label className="block text-sm font-medium flex text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="h-6 w-6 hover:text-green-800" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                            </svg>
                            <p
                                id="first-name"
                                className="text-lime-600 px-4 dark:text-lime-400 text-sm sm:text-base lg:text-sm xl:text-base font-semibold uppercase"
                            >
                                {props.fanfic.liked.length}
                            </p>
                        </label>
                        <label className="block text-sm font-medium flex text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="h-6 w-6 hover:text-red-800" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"/>
                            </svg>
                            <p
                                id="first-name"
                                className="text-lime-600 px-4 dark:text-lime-400 text-sm sm:text-base lg:text-sm xl:text-base font-semibold uppercase"
                            >
                                {props.fanfic.dis_liked.length}
                            </p>
                        </label>
                    </div>
                </dl>
            </div>
        </article>
    )
}