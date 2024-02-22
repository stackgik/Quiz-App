import Button from './Button';
import { wrong, right } from '../ScoreIcon';
import { useQuiz } from '../contexts/QuizContext';

const CompletionScreen = () => {
  const { dispatch, quizObj, rightAnswer, wrongAnswer, answeredQuestion } =
    useQuiz();

  const quest = quizObj.length;
  const happy = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 20 20"
    >
      <path
        fill="#ffe066"
        d="M10 20a10 10 0 1 1 0-20a10 10 0 0 1 0 20M6.5 9a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m7 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m2.16 3H4.34a6 6 0 0 0 11.32 0"
      />
    </svg>
  );

  const ques = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="ques-icon"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
      />
    </svg>
  );

  return (
    <div className="complete">
      <div className="completionDetails">
        <figure>
          <img src="trophy.png" alt="" className="image" />
        </figure>
        <h3 className="congrats">Congratulations!</h3>
        <p className="quiz-msg">
          You've completed the quiz successfully {happy}
        </p>
        <div className="user-quiz-stats">
          <div className="box">
            <span className="ques top-box">
              {ques} {`${answeredQuestion}/${quest}`}
            </span>
            <span className="content">Questions</span>
          </div>
          <div className="box">
            <span className="right top-box right-icon">
              {right} {rightAnswer}
            </span>
            <span className="content">Correct</span>
          </div>
          <div className="box">
            <span className="wrong top-box wrong-icon">
              {wrong}
              {wrongAnswer + rightAnswer === quest
                ? wrongAnswer
                : quest - rightAnswer}
              {/* {completedQuestions === 0 ? quest : wrongAnswer} */}
            </span>
            <span className="content">Wrong</span>
          </div>
        </div>
      </div>
      <Button
        classy={'btn btn--restart'}
        onHit={() => dispatch({ type: 'restart' })}
      >
        Restart Quiz
      </Button>
    </div>
  );
};

export default CompletionScreen;
