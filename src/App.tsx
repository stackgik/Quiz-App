import './index.css';
import Header from './Components/Header';
import QuizApp from './Components/QuizApp';

import { QuizProvider } from './contexts/QuizContext';

function App() {
  return (
    <div className="app">
      <QuizProvider>
        <Header />
        <QuizApp />
      </QuizProvider>
    </div>
  );
}

export default App;
