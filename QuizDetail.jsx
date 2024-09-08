import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; 
import "./QuizDetail.css"; 

const QuizDetail = () => {
    const { quizId } = useParams(); 
    const navigate = useNavigate(); 
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const fetchQuiz = async () => {
            const quizDoc = doc(db, "quizzes", quizId);
            const quizSnapshot = await getDoc(quizDoc);
            if (quizSnapshot.exists()) {
                setQuiz(quizSnapshot.data());
            } else {
                console.log("No such document!");
            }
        };
        fetchQuiz();
    }, [quizId]);

    const handleOptionChange = (questionIndex, optionValue) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionIndex]: optionValue
        }));
    };

    const handleSubmit = () => {
        let score = 0;
        if (quiz) {
            quiz.questions.forEach((question, index) => {
                if (answers[index] === question.correctAnswer) {
                    score++;
                }
            });

            navigate('/results', {
                state: {
                    score: score,
                    totalQuestions: quiz.questions.length
                }
            });
        }
    };

    if (!quiz) return <div className="loader">Loading...</div>;

    return (
        <div className="quiz-detail-container">
            <h1>{quiz.quizName}</h1>
            {quiz.questions.map((question, index) => (
                <div key={index} className="question-container">
                    <p>{question.questionText}</p>
                    <div className="option-container">
                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex}>
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={option}
                                    onChange={() => handleOptionChange(index, option)}
                                />
                                <label>{option}</label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default QuizDetail;
