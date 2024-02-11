import { right, wrong } from '../ScoreIcon';
import { Dispatch } from 'react';
import { Action } from '../App';

interface QuizData {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];
}

interface IQuizOptionProps {
  option: string;
  // This line means that the dispatch property in IQuizOptionProps interface is a function that takes an action object as its argument. The action object is expected to have two properties:
  dispatch: Dispatch<Action>;
  question: QuizData;
  answer: string | null;
}

const QuizOption = ({
  option,
  dispatch,
  question,
  answer,
}: IQuizOptionProps) => {
  const hasAnswered = answer !== null;

  return (
    <button
      className={`quiz-option ${
        option === answer &&
        (option === question.correctAnswer ? 'correct-answer' : 'wrong-answer')
      } ${
        hasAnswered && option === question.correctAnswer ? 'correct-answer' : ''
      }`}
      onClick={() => dispatch({ type: 'optionChosen', payload: option })}
      disabled={hasAnswered} //checking if there is any answer at all...
    >
      <span className="option">{option}</span>

      {hasAnswered &&
        option === answer &&
        (option === question.correctAnswer ? (
          <span className="right-icon">{right}</span>
        ) : (
          <span className="wrong-icon">{wrong}</span>
        ))}

      {hasAnswered &&
        !(option === answer) &&
        option === question.correctAnswer && (
          <span className="right-icon">{right}</span>
        )}
    </button>
  );
};

export default QuizOption;
