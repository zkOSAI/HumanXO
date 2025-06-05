import React from 'react';

const Login = ({ ...props }) => {
    return (
        <svg
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M4.5 8.5V9.5C4.5 10.6046 5.39543 11.5 6.5 11.5H9C10.1046 11.5 11 10.6046 11 9.5V3.5C11 2.39543 10.1046 1.5 9 1.5H6.5C5.39543 1.5 4.5 2.39543 4.5 3.5V4.5"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeLinecap="round"
            />
            <path
                d="M7 8L8.14645 6.85355C8.34171 6.65829 8.34171 6.34171 8.14645 6.14645L7 5"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeLinecap="round"
            />
            <path
                d="M8 6.5L2 6.5"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default Login;
