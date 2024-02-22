import { right, wrong } from '../ScoreIcon';
import { useQuiz } from '../contexts/QuizContext';

const QuizOption = ({ option }: string) => {
  const { dispatch, answer, quizObj, index } = useQuiz();
  const question = quizObj[index];
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
