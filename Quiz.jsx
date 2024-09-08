import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from './firebaseConfig';
import "./Quiz.css";

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "quizzes"));
                const quizzesArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setQuizzes(quizzesArray);
            } catch (error) {
                console.error("Error fetching quizzes: ", error);
            }
        };

        fetchQuizzes();
    }, []);

    const handleDeleteQuiz = async (quizId) => {
        try {
            await deleteDoc(doc(db, "quizzes", quizId));
            setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
            console.log("Quiz deleted successfully");
        } catch (error) {
            console.error("Error deleting quiz: ", error);
        }
    };

    return (
        <div className="container">
            <h1>Quiz App</h1>
            <div className="quizzes-container">
                {quizzes.length === 0 ? (
                    <p>No Quiz Here</p>
                ) : (
                    quizzes.map((quiz) => (
                        <div key={quiz.id} className="quiz-item">
                            <h2>{quiz.quizName}</h2> 
                            <button className="view-btn" onClick={() => navigate(`/quiz/${quiz.id}`)}>
                                View
                            </button>
                            <button onClick={() => handleDeleteQuiz(quiz.id)} className="delete-btn">
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
            <div className="add-quiz-container">
                <button className="add-quiz-btn" onClick={() => navigate("/create-quiz")}>
                    +
                </button>
            </div>
        </div>
    );
};

export default Quiz;
