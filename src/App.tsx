import Questions from "./components/Questions";
import { useEffect, useState } from "react";

type QuestionType = {
  question: string;
  options: string[];
  correct_answer_index: number;
};

function App() {
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("./questions.json");
        if (!res.ok) {
          throw new Error("Failed to get questions");
        }
        const data = await res.json();
        const quizData = data.quiz;
        // Randomly select 10 questions
        const randomQuestions: QuestionType[] = [];
        for (let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(Math.random() * quizData.length);
          randomQuestions.push(quizData[randomIndex]);
        }
        setQuestions(randomQuestions);        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []); 

  const handleSubmit = () => {
    alert(`You have scored ${score}`);
    window.location.reload()
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!questions || questions.length === 0) {
    return <div>No questions available.</div>; 
  }

  return (
    <div className="max-w-[90vw] mx-auto py-10">
      <div className="flex flex-row justify-between items-center w-full">
        <h1>Welcome to Quiz App</h1>
        <span>Score: {score}</span>
      </div>
      <div className="flex flex-col gap-5 w-full m-auto items-center p-10 mt-10 text-white">
        {questions.map((ques, index) => (
          <Questions
            question={ques.question}
            options={ques.options}
            correctIndex={ques.correct_answer_index}
            key={index}
            score={score}
            changeScore={setScore}
          />
        ))}
      </div>
      <div className="w-full flex flex-row justify-center">
        <button
          className="w-[10vw] text-white bg-blue-600 p-3 rounded-lg hover:bg-green-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
