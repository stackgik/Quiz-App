import { useEffect } from 'react';
import Button from './Button';
import { useQuiz } from '../contexts/QuizContext';

function Timer() {
  const { remainingTime, dispatch } = useQuiz();
  const min = Math.floor(remainingTime / 60);
  const secs = remainingTime % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'updateTime' });
    }, 1000);

    return function () {
      clearInterval(id);
    };
  }, [dispatch]);

  return <Button classy={'btn timer'}>{`${min}:${secs}`}</Button>;
}

export default Timer;
