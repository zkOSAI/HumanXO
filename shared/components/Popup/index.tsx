import React, { ReactNode, useEffect, useRef } from "react";
import cn from "classnames";

import styles from "./index.module.css";

interface Props {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Popup: React.FC<Props> = ({ children, isOpen, onClose }) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    return (
        <div
            className={cn(styles.popup, {
                [styles.popupActive]: isOpen,
            })}
            onClick={handleOverlayClick}
        >
            <div className={styles.popupContainer}>
                <div className={styles.popupInner} ref={popupRef}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Popup;
