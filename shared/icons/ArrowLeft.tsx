import React from 'react';

const Key = ({ ...props }) => {
    return (
        <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12.3333 11.3333L7.25672 16.4099C6.65466 17.0119 6.65466 17.9881 7.25672 18.5901L12.3333 23.6667M7.70826 17.5L29.2916 17.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default Key;
