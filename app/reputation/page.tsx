"use client";

import React, { useState } from "react";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

import TabContent from "@/shared/components/TabContent";

import styles from "../page.module.css";

import {
    ArrowLeft,
    ArrowRightCircle,
    Congratulations,
    Crown,
    Flag,
    Live,
} from "@/shared/icons";
import Popup from "@/shared/components/Popup";
import { RedWalletOptions } from "../component/RedWalletOptions";

const questions = [
    {
        question: "Which gas is the lightest?",
        answers: ["Oxygen", "Hydrogen ", "Nitrogen", "Carbon dioxide"],
    },
    {
        question: "What planet is known as the Red Planet?",
        answers: ["Jupiter", "Venus", "Mars "],
    },
];

const Reputation = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{
        [key: number]: string;
    }>({});
    const percent = ((currentStep + 1) / (questions.length + 1)) * 100;
    const isFinished = currentStep >= questions.length;

    const currentQuestion = questions[currentStep];
    const selectedAnswer = selectedAnswers[currentStep];

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setCurrentStep(0);
        setSelectedAnswers({});
        setShowPopup(false);
    };

    const handleBack = () => {
        if (currentStep == 0) {
            return handleClosePopup();
        }

        setCurrentStep((prev) => prev - 1);
    };

    const handleAnswer = (answer: string) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [currentStep]: prev[currentStep] === answer ? "" : answer,
        }));
    };

    const handleNext = () => {
        if (!isFinished) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    return (
        <>
            <div className={styles.contentArea}>
                <div className={styles.contentAreaWrapper}>
                    <div className={styles.contentAreaTop}>
                        <RedWalletOptions />
                    </div>
                    <div className={styles.dashboard}>


                        <div className={styles.dashboardWrapper}>
                            <div
                                className={cn(
                                    styles.reputationBlock,
                                    styles.reputationBlockRewards
                                )}
                            >
                                <Image src="/img/rewards.png" alt="bg" fill />

                                <div className={styles.reputationBlockContent}>
                                    <p className={styles.reputationBlockTitle}>
                                        750 ZKOS
                                    </p>
                                    <p className={styles.reputationBlockText}>
                                        Total{" "}
                                        <span className={styles.reputationBold}>
                                            Rewards Distributed
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className={styles.reputationBlock}>
                                <Image src="/img/burned.png" alt="bg" fill />

                                <div className={styles.reputationBlockContent}>
                                    <p className={styles.reputationBlockTitle}>
                                        750 ZKOS
                                    </p>
                                    <p className={styles.reputationBlockText}>
                                        Total{" "}
                                        <span className={styles.reputationBold}>
                                            Burned Tokens
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.reputationTabsWrapper}>
                            <Link
                                href="#"
                                className={cn(
                                    styles.reputationLeaderboard,
                                    styles.item
                                )}
                            >
                                <Crown width={18} />
                                Leaderboard
                            </Link>

                            <div className={styles.reputationTabs}>
                                <button
                                    onClick={() => setActiveIndex(0)}
                                    className={cn(
                                        styles.item,
                                        styles.reputationTab,
                                        {
                                            [styles.reputationTabActive]:
                                                activeIndex == 0,
                                        }
                                    )}
                                >
                                    <Live width={18} />
                                    Live
                                </button>

                                <button
                                    onClick={() => setActiveIndex(1)}
                                    className={cn(
                                        styles.item,
                                        styles.reputationTab,
                                        {
                                            [styles.reputationTabActive]:
                                                activeIndex == 1,
                                        }
                                    )}
                                >
                                    <Flag width={18} />
                                    Finished
                                </button>
                            </div>
                        </div>
                        {activeIndex == 0 ? (
                            <TabContent handleOpenPopup={handleOpenPopup} />
                        ) : (
                            <p>No data</p>
                        )}
                    </div>
                </div>
            </div>

            <Popup isOpen={showPopup} onClose={handleClosePopup}>
                <div className={styles.quizPopup}>
                    <div className={styles.quizPopupHead}>
                        <button
                            onClick={handleBack}
                            className={cn(styles.quizPopupBack, styles.item)}
                        >
                            <ArrowLeft width={36} />
                        </button>
                        <div className={styles.quizPopupSteps}>
                            <span className={styles.quizPopupStepsHighlited}>
                                0{currentStep + 1}
                            </span>
                            /
                            <span className={styles.quizPopupStepsMax}>
                                0{questions.length + 1}
                            </span>
                        </div>
                    </div>
                    <div className={styles.quizPopupBar}>
                        <div
                            className={styles.quizPopupBarValue}
                            style={{ width: `${percent}%` }}
                        ></div>
                    </div>
                    <div className={styles.quizPopupContent}>
                        {isFinished ? (
                            <>
                                <p className={styles.quizPopupTitle}>
                                    Congratulations! {currentStep + 1}/
                                    {questions.length + 1}
                                </p>
                                <Congratulations width={122} />
                                <button
                                    onClick={handleClosePopup}
                                    className={cn(
                                        styles.quizPopupBtn,
                                        styles.item
                                    )}
                                >
                                    Back to Home
                                    <ArrowRightCircle width={24} />
                                </button>
                            </>
                        ) : (
                            <>
                                <p className={styles.quizPopupTitle}>
                                    {currentQuestion.question}
                                </p>
                                <div className={styles.quizPopupChoices}>
                                    {currentQuestion.answers.map((answer) => (
                                        <button
                                            key={answer}
                                            onClick={() => handleAnswer(answer)}
                                            className={cn(
                                                styles.quizPopupChoice,
                                                {
                                                    [styles.quizPopupChoiceActive]:
                                                        selectedAnswer ==
                                                        answer,
                                                }
                                            )}
                                        >
                                            <span
                                                className={
                                                    styles.quizPopupChoiceWord
                                                }
                                            >
                                                A
                                            </span>
                                            {answer}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={handleNext}
                                    disabled={!selectedAnswer}
                                    className={cn(
                                        styles.quizPopupBtn,
                                        styles.item
                                    )}
                                >
                                    Submit Answer
                                    <ArrowRightCircle width={24} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default Reputation;
