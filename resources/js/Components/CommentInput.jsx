import React, { useState, forwardRef, useRef, useEffect } from 'react';
import Button from './Button';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, onSubmit, ...props }, ref) {
    const [inputValue, setInputValue] = useState('');
    const [isLocked, setIsLocked] = useState(false);

    const input = ref ? ref : useRef();
    const maxCharLimit = 300;

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    const handleSubmit = () => {
        if (onSubmit && !isLocked && inputValue != "") {
            
            onSubmit(inputValue);
            setInputValue('');
            setIsLocked(true);
            setTimeout(() => setIsLocked(false), 5000);
        }
    };

    const handleChange = (event) => {
        if (!isLocked) {
            setInputValue(event.target.value);
        }
    };

    return (
        <div className='flex flex-col text-right'>

            <div className='text-xs mb-0.5'>{`${inputValue.length}/${maxCharLimit}`}</div>

            <div className='flex flex-row'>
                <input
                    {...props}
                    type={type}
                    value={inputValue}
                    onChange={handleChange}
                    className={
                        'w-full mr-2.5 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                        className
                    }
                    ref={input}
                    disabled={isLocked || inputValue.length >= maxCharLimit}
                    placeholder='Enter Comment'
                    maxLength={maxCharLimit}
                />
                <div className='mb-0.5'>
                    <Button text='Submit' color='bg-black' action={handleSubmit} />
                </div>
            </div>
        </div>
    );
});