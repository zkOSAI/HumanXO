"use client";

import React, { useState } from "react";
import cn from "classnames";

import { Card, CardType, Status } from "../../types/card";
import CardItem from "../CardItem";

import styles from "./index.module.css";
import { useQuizs } from "@/app/queries/useQuizs";

interface Props {
  handleOpenPopup: (quizData: any) => void; // Updated to accept quiz data
}

const TabContent: React.FC<Props> = ({ handleOpenPopup }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { rookie, pro, master, isLoading, error } = useQuizs();
  // console.log("🚀 ~ rookie:", rookie)
  // console.log("🚀 ~ master:", master)
  // console.log("🚀 ~ pro:", pro)

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading quizzes</p>;

  // Convert backend quizzes into Card format and include original quiz data
  const mapToCard = (quiz: any, type: CardType, index: number): Card & { originalQuiz: any } => ({
    id: quiz._id,
    type,
    name: `${type} Level Quiz ${index}`,
    status:
      quiz.status === "active"
        ? Status.Live
        : quiz.status === "finished"
          ? Status.Finished
          : Status.Date,
    percent: quiz.currentUser == 0 ? 0 : quiz.winners / quiz.currentUser * 100,
    maxUser: quiz.maxUser,
    currentUser: quiz.currentUser,
    winner: quiz.winners,
    loser: quiz.loser,
    level: quiz.level,
    originalQuiz: quiz, // Store the original quiz data
  });

  const rookieCards = rookie.map((quiz: any, i: number) =>
    mapToCard(quiz, CardType.Rookie, i + 1)
  );
  const proCards = pro.map((quiz: any, i: number) =>
    mapToCard(quiz, CardType.Pro, i + 1)
  );
  const masterCards = master.map((quiz: any, i: number) =>
    mapToCard(quiz, CardType.Master, i + 1)
  );

  const allCards = [...rookieCards, ...proCards, ...masterCards];

  // Create a wrapper function that passes the quiz data
  const handleCardOpenPopup = (card: Card & { originalQuiz: any }) => {
    handleOpenPopup(card.originalQuiz);
  };

  const renderCards = (cards: (Card & { originalQuiz: any })[]) => (
    <div className={styles.reputationCards}>
      {cards.map((card) => (
        <CardItem
          key={card.id}
          card={card}
          handleOpenPopup={() => handleCardOpenPopup(card)}
        />
      ))}
    </div>
  );

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

      {activeIndex === 0 && renderCards(allCards)}
      {activeIndex === 1 && renderCards(rookieCards)}
      {activeIndex === 2 && renderCards(proCards)}
      {activeIndex === 3 && renderCards(masterCards)}
    </>
  );
};

export default TabContent;