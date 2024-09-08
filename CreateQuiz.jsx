import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from './firebaseConfig';  
import { collection, addDoc } from "firebase/firestore";  
import "./CreateQuiz.css";

const CreateQuiz = () => {
    const [quizName, setQuizName] = useState("");
    const [questions, setQuestions] = useState([
        {
            questionText: "",
            options: ["", "", "", ""],
            correctAnswer: ""
        }
    ]);

    const navigate = useNavigate();

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(newQuestions);
    };

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].questionText = value;
        setQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].correctAnswer = value;
        setQuestions(newQuestions);
    };

    const addNewQuestion = () => {
        setQuestions([
            ...questions,
            {
                questionText: "",
                options: ["", "", "", ""],
                correctAnswer: ""
            }
        ]);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            const form = e.target.form;
            const index = [...form].indexOf(e.target);
            form.elements[index + 1]?.focus();  
            e.preventDefault();  
        }
    };

    const handleSaveQuiz = async () => {
        if (!quizName.trim()) {
            alert("Quiz name is required.");
            return;
        }

        for (const q of questions) {
            if (!q.questionText.trim()) {
                alert("All questions must have text.");
                return;
            }
            for (const option of q.options) {
                if (!option.trim()) {
                    alert("All options must be filled.");
                    return;
                }
            }
            if (!q.correctAnswer.trim()) {
                alert("All correct answers must be filled.");
                return;
            }
        }

        try {
            await addDoc(collection(db, "quizzes"), {
                quizName: quizName,
                questions: questions
            });
            console.log("Quiz successfully added!");
            navigate("/");  
        } catch (error) {
            console.error("Error adding quiz: ", error);
        }
    };

    return (
        <div className="create-quiz-container">
            <h1>Create New Quiz</h1>
            <form>
                <input
                    type="text"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                    placeholder="Quiz Name"
                    onKeyDown={handleKeyDown}  
                />

                {questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="question-container">
                        <input
                            type="text"
                            value={question.questionText}
                            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                            placeholder={`Question ${questionIndex + 1}`}
                            onKeyDown={handleKeyDown}  
                        />
                        {question.options.map((option, optionIndex) => (
                            <input
                                key={optionIndex}
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                                placeholder={`Option ${optionIndex + 1}`}
                                onKeyDown={handleKeyDown}  
                            />
                        ))}
                        <input
                            type="text"
                            value={question.correctAnswer}
                            onChange={(e) => handleCorrectAnswerChange(questionIndex, e.target.value)}
                            placeholder="Correct Answer"
                            onKeyDown={handleKeyDown}  
                        />
                    </div>
                ))}

                <div className="add-question-container">
                    <button className="add-question-btn" type="button" onClick={addNewQuestion}>
                        +
                    </button>
                </div>

                <button type="button" onClick={handleSaveQuiz}>Save Quiz</button>
            </form>
        </div>
    );
};

export default CreateQuiz;
