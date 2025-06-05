import React from 'react';

const CardLive = ({ ...props }) => {
    return (
        <svg
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g filter="url(#filter0_f_2001_8)">
                <circle cx="5" cy="5" r="2.5" fill="#21FF63" />
            </g>
            <circle cx="5" cy="5" r="2.5" fill="#1F5830" />
            <circle cx="5" cy="5" r="1.5" fill="#21FF63" />
            <defs>
                <filter
                    id="filter0_f_2001_8"
                    x="0.5"
                    y="0.5"
                    width="9"
                    height="9"
                    filterUnits="userSpaceOnUse"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation="1"
                        result="effect1_foregroundBlur_2001_8"
                    />
                </filter>
            </defs>
        </svg>
    );
};

export default CardLive;
