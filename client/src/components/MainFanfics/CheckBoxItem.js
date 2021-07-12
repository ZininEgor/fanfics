import React from "react";

export const CheckBoxItem = props => {


    return (
        <div className="relative overflow-hidden">
            <div >
                <div className="pt-1 mb-2 pl-5 mx-auto bg-violet-100">
                    <label className="flex items-center space-x-3 ">
                        <span className="text-lime-600 dark:text-lime-400 text-sm sm:text-base lg:text-sm xl:text-base font-semibold uppercase">{props.fanfiction.name}</span>
                        <input type="checkbox" defaultChecked={props.fanfiction.checked} onChange={props.changeHandler} name="checked-demo" id={props.index}
                               className="form-tick appearance-none h-6 w-6 border border-gray-900 rounded-md checked:bg-purple-500 checked:border-transparent focus:outline-none"/>
                    </label>
                </div>
            </div>

        </div>
    )
}