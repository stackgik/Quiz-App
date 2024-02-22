import StartScreen from './StartScreen';
import Main from './Main';
import Step from './Step';
import ScoreTracker from './ScoreTracker';
import Questions from './Questions';
import Loader from './Loader';
import CompletionScreen from './CompletionScreen';
import ErrorMsg from './ErrorMsg';

import { useQuiz } from '../contexts/QuizContext';

function QuizApp() {
  const { status } = useQuiz();
  return (
    <Main>
      {status === 'loading' && <Loader />}
      {status === 'error' && <ErrorMsg />}
      {status === 'ready' && <StartScreen />}
      {status === 'active' && (
        <>
          <Step />
          <ScoreTracker />
          <Questions />
        </>
      )}
      {status === 'finished' && <CompletionScreen />}
    </Main>
  );
}

export default QuizApp;
