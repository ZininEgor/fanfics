import React from "react";
import {CheckBoxItem} from "./CheckBoxItem";

export const CheckBoxList = props => (
    <div className="grid">
        {props.fanfictions.map((fanfinction, index ) => {
            return (
                <CheckBoxItem
                    key={index}
                    index={index}
                    changeHandler={props.changeHandler}
                    fanfiction={fanfinction}
                />
            )
        })}
    </div>
)