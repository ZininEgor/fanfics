import {CheckBoxList} from './CheckBoxList'

const CheckBoxMulti = props => (
    <>
        <h3 className="-m-3 p-3">
            Кликай на интрересующие тебя темы
        </h3>

        <CheckBoxList
            changeHandler={props.changeHandler}
            fanfictions={props.fanfictions}
        />
    </>
)

export default CheckBoxMulti