import React from "react";

export const CheckBoxItem = props => {


    return (
        <div className="relative overflow-hidden px-5">
            <div className="rounded-t-xl overflow-hidden bg-gradient-to-r from-light-purple-50 to-purple-100 py-3">
                <div className="p-4 max-w-xs mx-auto bg-violet-100 rounded-xl border border-gray-600">
                    <label className="flex items-center space-x-3 ">
                        <input type="checkbox" defaultChecked={props.fanfiction.checked} onChange={props.changeHandler} name="checked-demo" id={props.index}
                               className="form-tick appearance-none h-6 w-6 border border-gray-900 rounded-md checked:bg-purple-500 checked:border-transparent focus:outline-none"/>
                        <span className="text-gray-900 font-medium">{props.fanfiction.name}</span>
                    </label>
                </div>
            </div>

        </div>
    )
}