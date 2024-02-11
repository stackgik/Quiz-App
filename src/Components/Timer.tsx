import { useEffect } from 'react';
import Button from './Button';

interface ITimerProps {
  time: number;
  dispatch(action: { type: string }): void;
}

function Timer({ time, dispatch }: ITimerProps) {
  const min = Math.floor(time / 60);
  const secs = time % 60;

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
