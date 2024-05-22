import React, { Component, createRef, RefObject } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';
import { setLanguage, setTheme } from '../redux/actions';
import ThemeSelector from "./ThemeSelector";
import axios from 'axios';
import "./Learn.css";

interface Language {
    id: number;
    name: string;
}

interface Theme {
    id: number;
    name: string;
}

interface Flashcard {
    question: string;
    answer: string;
}

interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}

interface LearnProps {
    selectedLanguage: string;
    selectedTheme: string;
    setLanguage: (language: string) => void;
    setTheme: (theme: string) => void;
}

interface LearnState {
    languages: Language[];
    themes: Theme[];
    flashcards: Flashcard[];
    currentFlashcardIndex: number;
    isFlipped: boolean;
    quizMode: boolean;
    quizQuestions: QuizQuestion[];
    currentQuizQuestionIndex: number;
    userAnswers: string;
    correctAnswers: number;
}

class Learn extends Component<LearnProps, LearnState> {
    cardRef: RefObject<HTMLDivElement>;

    state: LearnState = {
        languages: [],
        themes: [],
        flashcards: [],
        currentFlashcardIndex: 0,
        isFlipped: false,
        quizMode: false,
        quizQuestions: [],
        currentQuizQuestionIndex: 0,
        userAnswers: '',
        correctAnswers: 0,
    };

    constructor(props: LearnProps) {
        super(props);
        this.cardRef = createRef();
    }

    componentDidMount() {
        this.fetchLanguages();
    }

    fetchLanguages = async () => {
        try {
            const response = await axios.get('http://localhost:3002/languages');
            this.setState({ languages: response.data });
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    };

    handleLanguageSelect = async (selectedLanguage: string) => {
        this.props.setLanguage(selectedLanguage);
        try {
            const response = await axios.get(`http://localhost:3002/themes/${selectedLanguage}`);
            this.setState({ themes: response.data });
        } catch (error) {
            console.error('Error fetching themes:', error);
        }
    };

    handleThemeSelect = async (selectedTheme: string) => {
        this.props.setTheme(selectedTheme);
        this.setState({
            currentFlashcardIndex: 0,
            currentQuizQuestionIndex: 0,
            isFlipped: false,
            quizMode: false,
        });
        try {
            const response = await axios.get(`http://localhost:3002/words/${this.props.selectedLanguage}/${selectedTheme}`);
            this.setState({ flashcards: response.data });
        } catch (error) {
            console.error('Error fetching flashcards:', error);
        }
    };

    handleCardClick = () => {
        this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
    };

    handleNextCard = () => {
        const { flashcards, currentFlashcardIndex, quizMode, currentQuizQuestionIndex, quizQuestions } = this.state;
        if (!quizMode) {
            this.setState({
                currentFlashcardIndex: (currentFlashcardIndex + 1) % flashcards.length,
                isFlipped: false,
                userAnswers: ''
            });
        } else {
            this.setState({
                currentQuizQuestionIndex: (currentQuizQuestionIndex + 1) % quizQuestions.length,
                isFlipped: false,
                userAnswers: ''
            });
        }
    };

    handlePreviousCard = () => {
        const { flashcards, currentFlashcardIndex, quizMode, currentQuizQuestionIndex, quizQuestions } = this.state;
        if (!quizMode) {
            this.setState({
                currentFlashcardIndex: (currentFlashcardIndex - 1 + flashcards.length) % flashcards.length,
                isFlipped: false
            });
        } else {
            this.setState({
                currentQuizQuestionIndex: (currentQuizQuestionIndex - 1 + quizQuestions.length) % quizQuestions.length,
                isFlipped: false
            });
        }
    };

    handleTakeQuiz = () => {
        const { flashcards } = this.state;
        const { selectedLanguage, selectedTheme } = this.props;
        if (!selectedLanguage || !selectedTheme) {
            alert('Please select a language and a theme to take the quiz.');
            return;
        }
        const quizQuestions = flashcards.map((card: Flashcard) => {
            const correctAnswer = card.answer;
            const options = this.shuffleArray(flashcards.map((flashcard: Flashcard) => flashcard.answer));
            return { question: card.question, options, correctAnswer };
        });
        this.setState({ quizQuestions, userAnswers: '', correctAnswers: 0, quizMode: true });
    };

    handleAnswerSelect = (selectedAnswer: string) => {
        this.setState({ userAnswers: selectedAnswer });
    };

    handleSubmitQuiz = () => {
        const { quizQuestions, currentQuizQuestionIndex, userAnswers, correctAnswers } = this.state;
        const correctAnswer = quizQuestions[currentQuizQuestionIndex].correctAnswer;
        if (userAnswers === correctAnswer) {
            this.setState({ correctAnswers: correctAnswers + 1 });
        }
    };

    shuffleArray = (array: string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    render() {
        const { languages, themes, flashcards, currentFlashcardIndex, isFlipped, quizMode, quizQuestions, currentQuizQuestionIndex, userAnswers, correctAnswers } = this.state;
        const { selectedLanguage, selectedTheme } = this.props;
        return (
            <div className="section">
                <div className="language-selector">
                    <h3>Languages</h3>
                    <ul>
                        {languages.map((language) => (
                            <li key={language.id} onClick={() => this.handleLanguageSelect(language.name)}>
                                {language.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {selectedLanguage && (
                    <div className="theme-container">
                        <h3>Themes for {selectedLanguage}</h3>
                        <ThemeSelector
                            themes={themes}
                            onThemeSelect={this.handleThemeSelect}
                            language={selectedLanguage}
                        />
                    </div>
                )}

                {selectedTheme && (
                    <div className="quiz-container">
                        {quizMode ? (
                            <>
                                <h3 className="quiz-title">Quiz: {selectedTheme}</h3>
                                <div className="quiz-question">
                                    <p>{quizQuestions[currentQuizQuestionIndex].question}</p>
                                </div>
                                <div className="quiz-options">
                                    {quizQuestions[currentQuizQuestionIndex].options.map((option: string, idx: number) => (
                                        <div
                                            key={idx}
                                            className={`quiz-option ${userAnswers === option ? 'selected-option' : ''}`}
                                            onClick={() => this.handleAnswerSelect(option)}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                                <button className="submit-button" onClick={this.handleSubmitQuiz}>Submit Quiz</button>
                                <p>Correct Answers: {correctAnswers}</p>
                            </>
                        ) : (
                            <div ref={this.cardRef} className={`card__inner ${isFlipped ? 'is-flipped' : ''}`} onClick={this.handleCardClick}>
                                {flashcards.length > 0 ? (
                                    <>
                                        <div id="question" className={`question ${isFlipped ? 'hidden' : ''}`}>
                                            {flashcards[currentFlashcardIndex]?.question}
                                        </div>
                                        <div id="answer" className={`answer ${isFlipped ? '' : 'hidden'}`}>
                                            {flashcards[currentFlashcardIndex]?.answer}
                                        </div>
                                    </>
                                ) : (
                                    <p>Loading flashcards...</p>
                                )}
                            </div>
                        )}
                        <div className="button-container">
                            {!quizMode && <button onClick={this.handleTakeQuiz}>Take a Quiz</button>}
                            <button onClick={this.handlePreviousCard}>Previous</button>
                            <button onClick={this.handleNextCard}>Next</button>
                        </div>
                    </div>
                )}

                {!selectedLanguage && (
                    <div className="instruction-container">
                        <p className="instruction">Choose a language to start learning.</p>
                        <img src="5.png" alt="Placeholder" className="instruction-image" />
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    selectedLanguage: state.selectedLanguage,
    selectedTheme: state.selectedTheme,
});

const mapDispatchToProps = {
    setLanguage,
    setTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(Learn);

