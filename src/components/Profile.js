import React, {useState} from 'react'
import CheckBoxMulti from './CheckBoxMulti'
import axios from "axios";

export const Profile = props => {


    const [profile, setProfile] = useState(props.profile)
    const [name, setName] = useState(props.profile.name,)
    const [fan, setFan] = useState(props.fan.forEach((item) => {
        item.checked = props.profile.preferences.includes(item._id);
    }))
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(props.profile.photo_url)

    const [fanfictions, setFanfictions] = useState([
        ...props.fan
    ])

    const handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0]
        setImagePreview(image_as_base64)
        setImage(image_as_files)
    }

    const handleSubmitFile = () => {

        if (image !== null) {

            let formData = new FormData();
            formData.append('file', image);

            axios.post(
                "api/profile/upload",
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${props.token}`,
                        "Content-type": "multipart/form-data",
                    },
                }
            )
                .then(res => {
                    props.getProfile()
                    console.log(`Success` + res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const changeHandler = event => {
        const oldFanfictions = fanfictions
        oldFanfictions[event.currentTarget.id].checked = event.currentTarget.checked
        setFanfictions(oldFanfictions)
    }

    const saveHandler = () => {
        const pref = [
            ...props.fan.filter(function (prefer) {
                if (prefer.checked) {
                    return prefer._id
                }
            })
        ]
        props.putProfile(name, pref.map(function (prefer) {
            return prefer._id
        }))

    }

    const changeName = event => {
        setName(event.currentTarget.value)
    }

    return (
        <>
            <div className="min-h-screen flex items-top justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div>
                    <div>
                        <form>
                            <div className="shadow sm:rounded-md bg-white sm:overflow-hidden">
                                <div className="px-4 py-5 bg-violet-500 space-y-6 sm:p-6 ">
                                    <div className="px-4 sm:px-6 lg:px-8">
                                        <label
                                            className="text-sm flex-col font-medium text-gray-700">Photo</label>
                                        <div className="mt-3 flex flex-nowrap gap-4 justify-items:center items-center">
                                            <span
                                                className="h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                                                <img src={props.profile.photo_url}
                                                     className="h-full w-full text-gray-300" fill="currentColor"
                                                     viewBox="0 0 30 30"/>
                                            </span>
                                            <label
                                                htmlFor="file-upload"
                                                className="relative justify-center cursor-pointer pl-10 bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" onChange={handleImagePreview} name="file-upload"
                                                       type="file"
                                                       className="sr-only"/>
                                            </label>
                                            <button
                                                type="button"
                                                onClick={handleSubmitFile}
                                                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Change
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="first-name"
                                                id="first-name"
                                                defaultValue={props.profile.email}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name"
                                                   className="block text-sm font-medium text-gray-700">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                defaultValue={name}
                                                onChange={changeName}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="px-4 sm:px-6 lg:px-8">
                                        <CheckBoxMulti
                                            changeHandler={changeHandler}
                                            fanfictions={fanfictions}
                                        />
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="button"
                                        onClick={saveHandler}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200"/>
                </div>
            </div>

        </>
    )

}