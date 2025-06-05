"use client";

import React from "react";
import Image from "next/image";
import cn from "classnames";

import { Card, Status } from "../../types/card";

import styles from "./index.module.css";
import pageStyles from "@/app/page.module.css";

import {
    CardKey,
    CardLive,
    CardType1,
    CardType2,
    CardType3,
    Flag,
    Gift,
    Info,
    Login,
    Star,
} from "@/shared/icons";

interface Props {
    card: Card;
    handleOpenPopup: () => void;
}

const typeIcons = {
    rokie: <CardType1 width={18} />,
    pro: <CardType2 width={12} />,
    master: <CardType3 width={12} />,
};

const typePaths = {
    rokie: "/img/type1.png",
    pro: "/img/type2.png",
    master: "/img/type3.png",
};

const CardItem: React.FC<Props> = ({ card, handleOpenPopup }) => {
    const { name, percent, status, date, type, info } = card || {};
    const { title, text } = info || {};

    return (
        <div className={cn(styles.reputationCard, styles[type])}>
            <div className={styles.reputationCardHeader}>
                <Image src={typePaths[type]} alt="bg" fill />

                {info && <div className={styles.reputationCardInfo}>
                    <Info />

                    <div className={styles.reputationCardTooltip}>
                        <p className={styles.reputationCardTooltipTitle}>{title}</p>
                        <p className={styles.reputationCardTooltipText}>{text}</p>
                    </div>
                </div>}

                <span
                    className={cn(
                        styles.reputationCardLabel,
                        styles[status],
                        pageStyles.item
                    )}
                >
                    {status == Status.Live && (
                        <>
                            <CardLive width={12} />
                            Live Now
                        </>
                    )}
                    {status == Status.Date && <>{date}</>}
                    {status == Status.Finished && (
                        <>
                            <Flag width={12} />
                            Finished
                        </>
                    )}
                </span>

                <p className={cn(styles.reputationCardTitle, pageStyles.item)}>
                    {typeIcons[type]}
                    {name}
                </p>
            </div>

            {status != Status.Live && (
                <div className={styles.reputationCardStats}>
                    <p className={styles.reputationCardStatsInfo}>
                        32/50 Participants
                    </p>

                    <div className={styles.reputationCardStatsDiagram}>
                        <div
                            className={styles.reputationCardStatsValue}
                            style={{ width: `${percent}%` }}
                        ></div>
                    </div>

                    <div className={styles.reputationCardStatsBottom}>
                        <div
                            className={styles.reputationCardStatsHighlitedText}
                        >
                            Rewarded
                        </div>
                        Burned
                    </div>
                </div>
            )}

            <div className={styles.reputationCardContent}>
                <div className={styles.reputationCardGroup}>
                    <div
                        className={cn(
                            styles.reputationCardItem,
                            pageStyles.item
                        )}
                    >
                        <Gift width={12} color={"#FF4D00"} />
                        500 ZKOS
                    </div>

                    <div
                        className={cn(
                            styles.reputationCardItem,
                            pageStyles.item
                        )}
                    >
                        <Login width={12} color={"#FF4D00"} />
                        50
                    </div>
                </div>

                <div className={styles.reputationCardGroup}>
                    <div
                        className={cn(
                            styles.reputationCardItem,
                            pageStyles.item
                        )}
                    >
                        <CardKey width={12} color={"#FF4D00"} />5 ZKOS
                    </div>

                    <div
                        className={cn(
                            styles.reputationCardItem,
                            pageStyles.item
                        )}
                    >
                        <Star width={12} color={"#FF4D00"} />5
                    </div>
                </div>
            </div>

            {status == Status.Live && (
                <button
                    onClick={handleOpenPopup}
                    className={cn(styles.reputationCardBtn, pageStyles.item)}
                >
                    Start Now
                </button>
            )}
        </div>
    );
};

export default CardItem;
