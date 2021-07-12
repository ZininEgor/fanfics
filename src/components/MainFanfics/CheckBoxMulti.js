import {CheckBoxList} from './CheckBoxList'

const CheckBoxMulti = props => (
    <>
        <div className=" grid justify-center">
        <h2 className="pb-4 m-0 text-lime-600 dark:text-lime-400 text-sm sm:text-base lg:text-base xl:text-base font-semibold uppercase">
            Фильтрация по категориям
        </h2>
        </div>
        <CheckBoxList
            changeHandler={props.changeHandler}
            fanfictions={props.fanfictions}
        />
    </>
)

export default CheckBoxMulti