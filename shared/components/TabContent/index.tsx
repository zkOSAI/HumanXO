"use client";

import React, { useState } from "react";
import cn from "classnames";

import { Card, CardType, Status } from "../../types/card";

import CardItem from "../CardItem";

import styles from "./index.module.css";
import { useQuizs } from "@/app/queries/useQuizs";

const cards: Card[] = [
    {
        id: 1,
        type: CardType.Master,
        name: "Master Level Card 1",
        status: Status.Date,
        date: "19.02.2023",
        percent: 87,
        info: {
            title: "Conditions for participation",
            text: "You have to hold 750ZKOS to participate."
        }
    },
    {
        id: 2,
        type: CardType.Pro,
        name: "Pro Level Card 2",
        status: Status.Date,
        date: "19.02.2023",
        percent: 0,
    },
    {
        id: 3,
        type: CardType.Rokie,
        name: "Rookie Level Card 3",
        status: Status.Live,
        date: "19.02.2023",
        percent: 29,
    },
    {
        id: 4,
        type: CardType.Pro,
        name: "Master Level Card 4",
        status: Status.Finished,
        date: "19.02.2023",
        percent: 70,
    },
    {
        id: 5,
        type: CardType.Master,
        name: "Master Level Card 5",
        status: Status.Finished,
        date: "19.02.2023",
        percent: 56,
    },
    {
        id: 6,
        type: CardType.Rokie,
        name: "Rookie Level Card 6",
        status: Status.Live,
        date: "20.02.2023",
        percent: 12,
    },
    {
        id: 7,
        type: CardType.Pro,
        name: "Pro Level Card 7",
        status: Status.Date,
        date: "21.02.2023",
        percent: 0,
    },
    {
        id: 8,
        type: CardType.Master,
        name: "Master Level Card 8",
        status: Status.Live,
        date: "22.02.2023",
        percent: 92,
    },
    {
        id: 9,
        type: CardType.Rokie,
        name: "Rookie Level Card 9",
        status: Status.Finished,
        date: "23.02.2023",
        percent: 100,
    },
    {
        id: 10,
        type: CardType.Pro,
        name: "Pro Level Card 10",
        status: Status.Finished,
        date: "24.02.2023",
        percent: 63,
    },
    {
        id: 11,
        type: CardType.Master,
        name: "Master Level Card 11",
        status: Status.Date,
        date: "25.02.2023",
        percent: 0,
    },
    {
        id: 12,
        type: CardType.Rokie,
        name: "Rookie Level Card 12",
        status: Status.Live,
        date: "26.02.2023",
        percent: 44,
    },
];

interface Props {
    handleOpenPopup: () => void;
}

const TabContent: React.FC<Props> = ({ handleOpenPopup }) => {
    const [activeIndex, setActiveIndex] = useState(0);
   const { rookie,pro, master, isLoading, error } = useQuizs();
   console.log("rookie level:::",rookie);
   console.log("pro level:::",pro);
   console.log("master level:::",master);



    return (
        <>
            <div className={styles.reputationSubTabs}>
                <button
                    onClick={() => setActiveIndex(0)}
                    className={cn(styles.reputationSubTab, {
                        [styles.reputationSubTabActive]: activeIndex == 0,
                    })}
                >
                    All
                </button>
                <button
                    onClick={() => setActiveIndex(1)}
                    className={cn(styles.reputationSubTab, {
                        [styles.reputationSubTabActive]: activeIndex == 1,
                    })}
                >
                    Rookie Round
                </button>
                <button
                    onClick={() => setActiveIndex(2)}
                    className={cn(styles.reputationSubTab, {
                        [styles.reputationSubTabActive]: activeIndex == 2,
                    })}
                >
                    Pro Round
                </button>
                <button
                    onClick={() => setActiveIndex(3)}
                    className={cn(styles.reputationSubTab, {
                        [styles.reputationSubTabActive]: activeIndex == 3,
                    })}
                >
                    Master Round
                </button>
            </div>

            {activeIndex == 0 && (
                <div className={styles.reputationCards}>
                    {cards.map((card) => (
                        <CardItem
                            key={card.id}
                            card={card}
                            handleOpenPopup={handleOpenPopup}
                        />
                    ))}
                </div>
            )}

            {activeIndex == 1 && (
                <div className={styles.reputationCards}>
                    {cards.slice(0, 4).map((card) => (
                        <CardItem
                            key={card.id}
                            card={card}
                            handleOpenPopup={handleOpenPopup}
                        />
                    ))}
                </div>
            )}

            {activeIndex == 2 && (
                <div className={styles.reputationCards}>
                    {cards.slice(4, 8).map((card) => (
                        <CardItem
                            key={card.id}
                            card={card}
                            handleOpenPopup={handleOpenPopup}
                        />
                    ))}
                </div>
            )}

            {activeIndex == 3 && (
                <div className={styles.reputationCards}>
                    {cards.slice(8, 12).map((card) => (
                        <CardItem
                            key={card.id}
                            card={card}
                            handleOpenPopup={handleOpenPopup}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default TabContent;
