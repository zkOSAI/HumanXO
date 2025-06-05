import React from 'react';

const CardKey = ({ ...props }) => {
    return (
        <svg
            viewBox="0 0 10 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect
                x="0.833344"
                y="1.33331"
                width="8.33333"
                height="8.33333"
                rx="2.08333"
                stroke="currentColor"
                strokeWidth="0.625"
            />
            <path
                d="M7.29167 5.70831L4.375 5.70831"
                stroke="currentColor"
                strokeWidth="0.625"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.29166 4.87498L7.29166 5.70831"
                stroke="currentColor"
                strokeWidth="0.625"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.25 4.87498L6.25 5.70831"
                stroke="currentColor"
                strokeWidth="0.625"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle
                cx="0.833333"
                cy="0.833333"
                r="0.833333"
                transform="matrix(-1 0 0 1 4.375 4.875)"
                stroke="currentColor"
                strokeWidth="0.625"
            />
        </svg>
    );
};

export default CardKey;
