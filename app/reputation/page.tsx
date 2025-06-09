"use client";

import React, { useEffect, useState } from "react";
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
import { useUsers } from "../queries/useUsers";
import { joinQuiz } from "../api/join";
import { useAccount, useWalletClient, useWriteContract } from "wagmi";
import { depositTokens } from "../utils/deposit";
import { submitAnswer } from "../api/submitAnswer";
import { claimReputation } from "../api/claim";
import { BrowserProvider, JsonRpcSigner } from "ethers";
function useEthersSigner() {
    const { data: walletClient } = useWalletClient();

    return React.useMemo(() => {
        if (!walletClient) return null;

        const provider = new BrowserProvider(walletClient.transport);
        return provider.getSigner();
    }, [walletClient]);
}

const Reputation = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const { isConnected, address } = useAccount();
    const [selectedAnswers, setSelectedAnswers] = useState<{
        [key: number]: string;
    }>({});
    const data = useUsers();
    //console.log("🚀 ~ Reputation ~ data:", data)
    // Add state to store selected quiz data
    const [selectedQuiz, setSelectedQuiz] = useState<any>(null);

    // Since you have only 1 question per quiz, create a simple array with 1 question
    const questions = selectedQuiz ? [
        {
            questionText: selectedQuiz.questionText,
            options: selectedQuiz.options
        }
    ] : [];

    // Now questions.length will be 1, so you'll have 2 total steps (question + completion)
    const percent = questions.length > 0 ? ((currentStep + 1) / (questions.length + 1)) * 100 : 0;
    const isFinished = currentStep >= questions.length;

    const currentQuestion = questions[currentStep]; // Get the current question object
    const selectedAnswer = selectedAnswers[currentStep];
    const signer = useEthersSigner();
    const [ethersSigner, setEthersSigner] = React.useState<JsonRpcSigner | null>(null);
    React.useEffect(() => {
        if (signer) {
            signer.then(setEthersSigner).catch(console.error);
        } else {
            setEthersSigner(null);
        }
    }, [signer]);

    // Update handleOpenPopup to accept quiz data
    const handleOpenPopup = async (quizData: any) => {

        const deposited = await depositTokens(quizData.level, address, quizData._id);
        console.log(quizData)

        if (deposited.success) {
            setSelectedQuiz(quizData);
            setCurrentStep(0);
            setSelectedAnswers({});
            setShowPopup(true);
            console.log("starting quiz...")
        }

    };

    const handleClosePopup = () => {
        setCurrentStep(0);
        setSelectedAnswers({});
        setSelectedQuiz(null);
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

    const handleNext = async () => {
        if (!isFinished && selectedAnswer) {
            // Log question and answer when submitting
            console.log("=== QUIZ SUBMISSION ===");
            console.log("Question:", currentQuestion?.questionText);
            console.log("Selected Answer:", selectedAnswer);
            console.log("All Question Data:", currentQuestion);
            console.log("=====================");
            await claimReputation(address, currentQuestion?.questionText, selectedAnswer, process.env.NEXT_PUBLIC_CLAIM_CONTRACT!, ethersSigner!)
        }

        if (!isFinished) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    useEffect(() => {
        if (selectedQuiz) {
            console.log("✅ selectedQuiz was updated:", selectedQuiz);
        }
    }, [selectedQuiz]);

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
                                        {data?.earned} ZKOS
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
                                        {data?.burned} ZKOS
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
                        </div>

                        <TabContent handleOpenPopup={handleOpenPopup} />
                    </div>
                </div>
            </div>

            <Popup isOpen={showPopup} onClose={handleClosePopup}>
                <div className={styles.quizPopup}>
                    <div className={styles.quizPopupHead}>
                        {/* <button
                            onClick={handleBack}
                            className={cn(styles.quizPopupBack, styles.item)}
                        >
                            <ArrowLeft width={36} />
                        </button> */}
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
                        {!selectedQuiz ? (
                            <p className={styles.quizPopupTitle}> </p>
                        ) : isFinished ? (
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
                                    {currentQuestion?.questionText || "Loading question..."}
                                </p>
                                <div className={styles.quizPopupChoices}>
                                    {(currentQuestion?.options || [])?.map((option: any, index: number) => {
                                        // Extract text from option - handle both object and string formats
                                        const optionText = typeof option === 'string' ? option :
                                            (option?.text || option?.value || option?.answer || option?.option || option?.title || 'Unknown option');

                                        return (
                                            <button
                                                key={`${index}-${optionText}`}
                                                onClick={() => handleAnswer(optionText)}
                                                className={cn(
                                                    styles.quizPopupChoice,
                                                    {
                                                        [styles.quizPopupChoiceActive]:
                                                            selectedAnswer === optionText,
                                                    }
                                                )}
                                            >
                                                <span
                                                    className={
                                                        styles.quizPopupChoiceWord
                                                    }
                                                >
                                                    {String.fromCharCode(65 + index)}
                                                </span>
                                                {optionText}
                                            </button>
                                        );
                                    })}
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