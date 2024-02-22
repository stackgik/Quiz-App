import { useQuiz } from '../contexts/QuizContext';
function ErrorMsg() {
  const { errorMsg } = useQuiz();

  return <p className="error-msg">{errorMsg}</p>;
}

export default ErrorMsg;
