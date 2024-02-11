import { useEffect, useRef } from 'react';
import Circle from './Circle';

interface IStepProps {
  currentQuestion: number;
  circles: number;
}

function Step({ currentQuestion, circles }: IStepProps) {
  const targetEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (targetEl.current) {
      currentQuestion < circles
        ? (targetEl.current.style.width = `${
            ((currentQuestion - 1) / (circles - 1)) * 100
          }%`)
        : (targetEl.current.style.width = '100%');
    }
  }, [currentQuestion, circles]);

  return (
    <>
      <div className="step-container">
        <div className="step">
          {Array.from({ length: circles }, (_, index) => {
            const position: number = index + 1;
            return (
              <Circle
                key={index}
                num={position}
                isActive={
                  position <= currentQuestion && position !== currentQuestion
                }
                current={position === currentQuestion}
              />
            );
          })}

          <div className="progress-bar">
            <div className="indicator" ref={targetEl}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Step;
