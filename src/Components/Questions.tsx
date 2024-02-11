import Button from './Button';
import Timer from './Timer';
import QuizOption from './QuizOption';
import { QuizData } from '../App';
import { Dispatch } from 'react';
import { Action } from '../App';

interface IQuestionsProps {
  question: QuizData;
  dispatch: Dispatch<Action>;
  answer: string | null;
  quizHasEnded: boolean;
  time: number;
}

const Questions = ({
  question,
  dispatch,
  answer,
  quizHasEnded,
  time,
}: IQuestionsProps) => {
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
  return (
    <div className="quiz-container">
      <h3 className="quiz-question">{question.question}</h3>

      <div className="quiz-options">
        {question.options.map((option) => (
          <QuizOption
            key={option}
            option={option}
            dispatch={dispatch}
            question={question}
            answer={answer}
          />
        ))}
      </div>

      <div className="buttons">
        <Timer time={time} dispatch={dispatch} />
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
