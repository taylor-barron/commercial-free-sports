import React from 'react';

const Button = ({ text, color, opacity = 1, action }) => {
    return (
        <button 
            style={{ opacity: opacity }}
            className={`${color} hover:bg-${color}-700 opacity-${opacity} text-white font-bold py-2 px-4 rounded`} 
            onClick={action}
        >
            {text}
        </button>
    );
}

export default Button;