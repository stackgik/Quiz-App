import Button from './Button';
import { Dispatch } from 'react';
import { Action } from '../App';

interface IStartScreenProps {
  dispatch: Dispatch<Action>;
}

const StartScreen = ({ dispatch }: IStartScreenProps) => {
  return (
    <>
      <p className="quiz-instructions">
        This quiz contains <strong>20 questions</strong>. You should ensure to
        select an option, as not choosing one automatically marks the question
        worng. You must also know that once the 'next question' button is
        clicked, you can not go back to the previous question. Goodluck...
      </p>

      <Button
        classy={'btn btn--start-quiz'}
        onHit={() => dispatch({ type: 'startQuiz' })}
      >
        Start Quiz
      </Button>
    </>
  );
};

export default StartScreen;
