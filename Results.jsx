import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Results.css';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };

    return (
        <div className="results-container">
            <h1>Quiz Results</h1>
            <p>Your Score: {score} / {totalQuestions}</p>
            <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
    );
};

export default Results;
