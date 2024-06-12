import React from 'react';

const Toggle = ({ checkedText, uncheckedText, checkedColor, uncheckedColor, isChecked, handleCheckboxChange, name }) => {
    return (
        <label className={`autoSaverSwitch relative inline-flex cursor-pointer select-none items-center`}>

            <span className='label flex items-center pr-6 text-gray-900 dark:text-gray-100 lg:block hidden'>
                {isChecked ? checkedText : uncheckedText}
            </span>
            
            <input
                type='checkbox'
                name={name}
                className='sr-only'
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <span
                className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
                isChecked ? `${checkedColor}` : `${uncheckedColor}`
                }`}
            >
                <span
                    className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                        isChecked ? 'translate-x-6' : ''
                    }`}
                ></span>
            </span>
        </label>
    );
}

export default Toggle;