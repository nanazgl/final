// src/types.ts

export type Language = {
    id: number;
    name: string;
};

export type Theme = {
    id: number;
    name: string;
};

export type Flashcard = {
    id: number;
    question: string;
    answer: string;
};

export type QuizQuestion = {
    question: string;
    options: string[];
    correctAnswer: string;
};
