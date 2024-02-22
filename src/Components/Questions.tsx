import Button from './Button';
import Timer from './Timer';
import QuizOption from './QuizOption';
import { useQuiz } from '../contexts/QuizContext';
import { useEffect, useState } from 'react';

import { shuffleArray } from '../hooks/shuffleArray';

const Questions = () => {
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const { quizObj, dispatch, quizHasEnded, index } = useQuiz();
  const question = quizObj[index];

  const nextArr = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M16.15 13H5q-.425 0-.712-.288T4 12q0-.425.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z"
      />
    </svg>
  );

  useEffect(() => {
    if (question && question.options) {
      setShuffledOptions(shuffleArray([...question.options]));
    }
  }, [index, question]);

  return (
    <div className="quiz-container">
      <h3 className="quiz-question">{question.question}</h3>

      <div className="quiz-options">
        {shuffledOptions.map((option) => (
          <QuizOption key={option} option={option} />
        ))}
      </div>

      <div className="buttons">
        <Timer />
        {!quizHasEnded ? (
          <Button classy={'btn'} onHit={() => dispatch({ type: 'next' })}>
            Next question {nextArr}
          </Button>
        ) : (
          <Button classy={'btn'} onHit={() => dispatch({ type: 'finished' })}>
            Finish
          </Button>
        )}
      </div>
    </div>
  );
};

export default Questions;
