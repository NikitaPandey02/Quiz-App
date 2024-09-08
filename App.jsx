import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Quiz from './Components/Quiz/Quiz';
import CreateQuiz from './Components/Quiz/CreateQuiz';
import QuizDetail from './Components/Quiz/QuizDetail';
import Results from './Components/Quiz/Results';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/quiz/:quizId" element={<QuizDetail />} /> 
        <Route path="/results" element={<Results />} /> 
      </Routes>
    </Router>
  );
};

export default App;
