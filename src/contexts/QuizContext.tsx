import React, {
  useContext,
  createContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';

// Literal type
type SEC_PER_QUES = 60 | 1;

const quesSec: SEC_PER_QUES = 60;

// Action interface cannot be generic, especially since different actions expect different payload types. It's better to use a union of specific action types, where each action type has a payload that is appropriately typed.
export type Action =
  | { type: 'loading' }
  | { type: 'dataReceived'; payload: QuizData[] }
  | { type: 'expectedTime'; payload: number }
  | { type: 'updateTime' }
  | { type: 'startQuiz' }
  | { type: 'next' }
  | { type: 'error'; payload: string }
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
  answeredQuestion: number;
  errorMsg: string | null;
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
  answeredQuestion: 0,
  errorMsg: null,
};

// The reducer function that updates state
function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'loading':
      return { ...state, status: 'loading' };

    case 'error':
      return { ...state, status: 'error', errorMsg: action.payload };

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
        answeredQuestion: state.answeredQuestion + 1,
      };

    case 'optionChosen':
      return { ...state, answer: action.payload };

    case 'finished':
      return {
        ...state,
        status: 'finished',
        wrongAnswer:
          state.answer !== state.quizObj[state.index].correctAnswer
            ? state.wrongAnswer + 1
            : state.wrongAnswer,
        rightAnswer:
          state.answer === state.quizObj[state.index].correctAnswer
            ? state.rightAnswer + 1
            : state.rightAnswer,
        answeredQuestion: state.answeredQuestion + 1,
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

// const QuizContext = createContext();
const QuizContext = createContext<IQuizContextType | undefined>(undefined);

interface IQuizProviderProps {
  children: ReactNode;
}

// Using the ReactNode type on the children dirrectly inside the prop is not the correct way to globalThis, it must be defined outside like this and then used appropriately
// This function return type is a 'JSX Element' which is automatically inferred.
function QuizProvider({ children }: IQuizProviderProps) {
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
      answeredQuestion,
      errorMsg,
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
      } catch (err: unknown) {
        err instanceof Error &&
          dispatch({ type: 'error', payload: err.message });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        quizObj,
        status,
        index,
        circles,
        currentQuestion,
        answer,
        wrongAnswer,
        rightAnswer,
        remainingTime,
        answeredQuestion,
        errorMsg,
        quizHasEnded,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

interface IQuizContextType {
  remainingTime: number;
  dispatch: React.Dispatch<Action>; //anotating React dispatch function without importing Dispatch from React
  status: string;
  quizObj: QuizData[];
  answer: string | null;
  index: number;
  circles: number;
  currentQuestion: number;
  wrongAnswer: number;
  rightAnswer: number;
  answeredQuestion: number;
  errorMsg: string | null;
  quizHasEnded: boolean;
}

// A return type for the broadcasted values must be defined, and this must also the type on the created context.
function useQuiz(): IQuizContextType {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside of AuthProvider');
  return context;
}

export { QuizProvider, useQuiz };
