import React from 'react';

const Key = ({ ...props }) => {
    return (
        <svg
            viewBox="0 0 23 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M10.2 14.2L12.9109 11.6828C13.3369 11.2872 13.3369 10.6128 12.9109 10.2172L10.2 7.7M11.5 21C17.0228 21 21.5 16.5228 21.5 11C21.5 5.47715 17.0228 1 11.5 1C5.97715 1 1.5 5.47715 1.5 11C1.5 16.5228 5.97715 21 11.5 21Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default Key;
