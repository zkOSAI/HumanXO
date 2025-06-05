"use client";

import { useQuery } from "@tanstack/react-query";
import { getQuizs } from "../api/getAllQuizs";

export const useQuizs = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["quizzes"],
    queryFn: getQuizs,
    refetchInterval: 4000,
  });

  const rookie = data
    ?.filter((quiz: any) => quiz.level === "rookie")
    .map((quiz: any, index: number) => ({
      ...quiz,
      index: index + 1, // 1-based index
    })) || [];

  const pro = data
    ?.filter((quiz: any) => quiz.level === "pro")
    .map((quiz: any, index: number) => ({
      ...quiz,
      index: index + 1,
    })) || [];

  const master = data
    ?.filter((quiz: any) => quiz.level === "master")
    .map((quiz: any, index: number) => ({
      ...quiz,
      index: index + 1,
    })) || [];

  return { rookie, pro, master, isLoading, error };
};
