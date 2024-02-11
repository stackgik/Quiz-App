import { useEffect, useReducer } from 'react';

import './index.css';
import Header from './Components/Header';
import Main from './Components/Main';
import StartScreen from './Components/StartScreen';
import Step from './Components/Step';
import ScoreTracker from './Components/ScoreTracker';
import Questions from './Components/Questions';
import Loader from './Components/Loader';
import CompletionScreen from './Components/CompletionScreen';

// Literal type
type SEC_PER_QUES = 60 | 1;

const quesSec: SEC_PER_QUES = 1;

interface AppState {
  quizObj: QuizData[];
  status: string;
  index: number;
  currentQuestion: number;
  circles: number;
  answer: string | null;
  wrongAnswer: number;
  rightAnswer: number;
  remainingTime: number;
}

// Action interface cannot be generic, especially since different actions expect different payload types. It's better to use a union of specific action types, where each action type has a payload that is appropriately typed.
export type Action =
  | { type: 'loading' }
  | { type: 'dataReceived'; payload: QuizData[] }
  | { type: 'expectedTime'; payload: number }
  | { type: 'updateTime' }
  | { type: 'startQuiz' }
  | { type: 'next' }
  | { type: 'optionChosen'; payload: string }
  | { type: 'finished' }
  | { type: 'restart' };

// This will be exported in a default way, afterall it is just an interface
export interface QuizData {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];
}

interface IData {
  category: string;
  correctAnswer: string;
  dificulty: string;
  id: string;
  incorrectAnswers: string[];
  isNice: boolean;
  question: { text: string };
  region: string[];
  tags: string[];
  type: string;
}

const initialState: AppState = {
  quizObj: [],
  status: 'loading',
  currentQuestion: 1,
  circles: 10,
  index: 0,
  answer: null,
  wrongAnswer: 0,
  rightAnswer: 0,
  remainingTime: 0,
};

// The reducer function that updates state
function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'loading':
      return { ...state, status: 'loading' };

    case 'dataReceived':
      return {
        ...state,
        quizObj: action.payload,
        status: 'ready',
      };

    case 'expectedTime':
      return { ...state, remainingTime: action.payload * quesSec };

    case 'updateTime':
      return {
        ...state,
        remainingTime: state.remainingTime - 1,
        status: state.remainingTime === 0 ? 'finished' : state.status,
      };

    case 'startQuiz':
      return { ...state, status: 'active' };

    case 'next':
      return {
        ...state,
        currentQuestion:
          state.currentQuestion <= state.circles
            ? state.currentQuestion + 1
            : state.currentQuestion,
        index: state.index + 1,
        wrongAnswer:
          state.answer !== state.quizObj[state.index].correctAnswer
            ? state.wrongAnswer + 1
            : state.wrongAnswer,
        rightAnswer:
          state.answer === state.quizObj[state.index].correctAnswer
            ? state.rightAnswer + 1
            : state.rightAnswer,
        answer: null,
      };

    case 'optionChosen':
      return { ...state, answer: action.payload };

    case 'finished':
      return {
        ...state,
        status: 'finished',
        wrongAnswer:
          state.answer !== state.quizObj[state.index].correctAnswer
            ? state.wrongAnswer++
            : state.wrongAnswer,
        rightAnswer:
          state.answer === state.quizObj[state.index].correctAnswer
            ? state.rightAnswer++
            : state.rightAnswer,
      };

    case 'restart':
      return {
        ...initialState,
        quizObj: state.quizObj,
        status: 'ready',
        remainingTime: state.quizObj.length * quesSec,
      };

    default:
      throw new Error('working on it bruv');
  }
}

function App() {
  const [
    {
      quizObj,
      status,
      index,
      circles,
      currentQuestion,
      answer,
      wrongAnswer,
      rightAnswer,
      remainingTime,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Derived state
  const quizHasEnded = index === quizObj.length - 1;

  useEffect(() => {
    async function fetchQuestions() {
      try {
        dispatch({ type: 'loading' });
        const res = await fetch('https://the-trivia-api.com/v2/questions');
        if (!res.ok) throw new Error(`something happened!`);

        const data: IData[] = await res.json();

        const newData: QuizData[] = data.map((data) => {
          return {
            id: data.id,
            question: data.question.text,
            correctAnswer: data.correctAnswer,
            options: [...data.incorrectAnswers, data.correctAnswer],
          };
        });

        dispatch({ type: 'dataReceived', payload: newData });
        dispatch({ type: 'expectedTime', payload: newData.length });
      } catch (err) {
        console.error(err);
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'ready' && <StartScreen dispatch={dispatch} />}
        {status === 'active' && (
          <>
            <Step currentQuestion={currentQuestion} circles={circles} />
            <ScoreTracker rightAnswer={rightAnswer} wrongAnswer={wrongAnswer} />
            <Questions
              question={quizObj[index]}
              dispatch={dispatch}
              answer={answer}
              quizHasEnded={quizHasEnded}
              time={remainingTime}
            />
          </>
        )}
        {status === 'finished' && (
          <CompletionScreen
            dispatch={dispatch}
            rightAnswer={rightAnswer}
            wrongAnswer={wrongAnswer}
            quest={quizObj.length}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
