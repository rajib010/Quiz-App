import { useRef, useState } from "react";

type QuestionsProps = {
    question: string;
    options: string[];
    correctIndex: number;
    score: number;
    changeScore: (newScore: number) => void;
};



function Questions({ question, options, score, correctIndex, changeScore }: QuestionsProps) {

    const buttonRef = useRef<(HTMLButtonElement | null)[]>([]);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    const handleSelection = (index: number) => {
        if (isAnswered) return;
        setIsAnswered(true)
        if (index === correctIndex) {
            changeScore(score + 1);
            if (buttonRef.current[index]) {
                buttonRef.current[index]!.style.backgroundColor = 'green'
            }
        } else {
            if (buttonRef.current[index]) {
                buttonRef.current[index]!.style.backgroundColor = 'red'
            }
        }
        buttonRef.current.forEach(button => {
            if (button) {
                button.disabled = true
            }
        })
    };

    return (
        <div className=" max-w-md flex flex-col  gap-3 border-2 rounded-lg bg-slate-600  p-6">
            <p className="text-3xl text-start w-full">{question}</p>
            <div className="flex flex-row flex-wrap w-full gap-5">
                {options.map((ans, index) => (
                    <button
                        ref={(el) => (buttonRef.current[index] = el)}
                        className={`w-[10rem] p-2 rounded-full bg-blue-500`}
                        key={index}
                        onClick={() => handleSelection(index)}
                    >
                        {ans}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Questions;
