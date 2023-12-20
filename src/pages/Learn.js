import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThemeSelector from "./ThemeSelector.js";
import "./Learn.css";

const Learn = () => {
    const [theme, setTheme] = useState('');
    const [flashcards, setFlashcards] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {

        const fetchFlashcards = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/flashcards/${theme}`);
                setFlashcards(response.data);
            } catch (error) {
                console.error('Error fetching flashcards:', error);
            }
        };

        if (theme) {
            fetchFlashcards();
        }
    }, [theme]);

    const handleThemeSelect = (selectedTheme) => {
        setTheme(selectedTheme);
        setCurrentQuestion(0);
        setIsFlipped(false);
    };

    const handleCardClick = () => {

        setIsFlipped(!isFlipped);
    };

    const handleNextCard = () => {

        if (currentQuestion < flashcards.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {

            setCurrentQuestion(0);
        }

        setIsFlipped(false);
    };

    return (
        <div className="section">
            <ThemeSelector onThemeSelect={handleThemeSelect} />

            <div className={`card__inner ${isFlipped ? 'is-flipped' : ''}`} onClick={handleCardClick}>
                {flashcards.length > 0 ? (
                    <>
                        <div
                            id="question"
                            className={`question ${isFlipped ? 'hidden' : ''}`}
                        >
                            {flashcards[currentQuestion]?.question}
                        </div>
                        <div
                            id="answer"
                            className={`answer ${isFlipped ? '' : 'hidden'}`}
                        >
                            {flashcards[currentQuestion]?.answer}
                        </div>
                    </>
                ) : (
                    <p>Loading flashcards...</p>
                )}
            </div>
            <button onClick={handleNextCard}>Next Card</button>
        </div>
    );
};

export default Learn;
