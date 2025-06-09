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
import { useQuizs } from "@/app/queries/useQuizs";

interface Props {
    card: Card;
    handleOpenPopup: () => void;
}

const rewardByLevel: Record<string, number> = {
  rookie: 20,
  pro: 40,
  master: 100,
};

const XpByLevel: Record<string, number> = {
  rookie: 10,
  pro: 20,
  master: 50,
};

const typeIcons = {
    rookie: <CardType1 width={18} />,
    pro: <CardType2 width={12} />,
    master: <CardType3 width={12} />,
};

const typePaths = {
    rookie: "/img/type1.png",
    pro: "/img/type2.png",
    master: "/img/type3.png",
};

const CardItem: React.FC<Props> = ({ card, handleOpenPopup }) => {
    const { id, name, percent, status, type, info, maxUser, currentUser ,winner, level} = card || {};

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
                        {currentUser}/{maxUser} Participants
                    </p>

                    <div className={styles.reputationCardStatsDiagram}>
                        <div
                            className={styles.reputationCardStatsValue}
                            style={{ width: `${winner/currentUser*100}%` }}
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
                        {rewardByLevel[type] ?? 0} ZKOS
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
                        <CardKey width={12} color={"#FF4D00"} />{XpByLevel[type]  ?? 0} ZKOS
                    </div>

                    <div
                        className={cn(
                            styles.reputationCardItem,
                            pageStyles.item
                        )}
                    >
                        <Star width={12} color={"#FF4D00"} />{XpByLevel[type] ?? 0}
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
    console.log("🚀 ~ 100:", 100)

export default CardItem;
