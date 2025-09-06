"use client";
import useQuiz, { Quiz } from "@/app/hooks/useQuiz";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { useEffect, useState } from "react";

export interface ICard {
  quiz?: Quiz;
  flipped: boolean;
}

export default function Flashcard() {
  const { data, error, isLoading } = useQuiz();
  const [currentCard, setCurrentCard] = useState<ICard | undefined>();
  const [answer, setAnswer] = useState("");
  const [currentIdx, setCurrentIdx] = useState<number>(1);

  const findAnswer = () => {
    let answerIndex = 0;
    if (currentCard && currentCard.quiz) {
  const correctList = currentCard.quiz.correct_answers;

    if (correctList && correctList.length > 0) {
      setAnswer(correctList[0]); // or show all
    }
  }
  };

  useEffect(() => {
    if (data.length > 0) {
      const card = {
        quiz: data[0],
        flipped: false,
      };
      setCurrentCard(card);
    }
  }, [data]);

  useEffect(() => {
    findAnswer();
  }, [currentCard]);

  const handleOnPrevious = () => {
    if (currentIdx > 1) {
      setCurrentIdx(currentIdx - 1);
      const card = {
        quiz: data[currentIdx - 2],
        flipped: false,
      };
      setCurrentCard(card);
    }
  };

  const handleOnNext = () => {
    if (currentIdx < data.length) {
      setCurrentIdx(currentIdx + 1);
      const card = {
        quiz: data[currentIdx],
        flipped: false,
      };
      setCurrentCard(card);
    }
  };
  

  return (
    <>
      {currentCard && (
        <div className="flex flex-col w-80 h-96 rounded-lg justify-center items-center [perspective:1000px]">
          <div
            className={
              "relative w-full h-full transition-all rounded-lg shadow-lg bg-orange-200 duration-500 [transform-style:preserve-3d] [backface-visibility:hidden] hover:[transform:rotateY(180deg)]"
            }
          >
            {/*card content on front side*/}
            <div className="absolute inset-0 overflow-y-auto">
              {currentCard && currentCard.quiz ? (
                <div className="px-6 py-4">
                  <p className="text-gray-700 text-base font-bold text-xl">
                    {currentCard.quiz.question}
                  </p>
                  <br />
                </div>
              ) : (
                <div className="px-6 py-4">
                  <p className="text-gray-700 text-base font-bold text-xl">
                    No quiz available!
                  </p>
                </div>
              )}
            </div>
            {/*card content on back side*/}
            <div className="absolute inset-0 rounded-lg shadow-lg bg-orange-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              {currentCard ? (
                <div className="px-6 py-4">
                  <p className="text-gray-700 text-base font-bold text-xl">
                    <ul className="list-disc pl-6 text-xl">
                    {Object.values(currentCard.quiz.correctAnswers).map(
                      (value, index) => value && <li key={index}>{value}</li>,
                    )}
                  </ul>
                  </p>
                </div>
              ) : (
                <div className="px-6 py-4">
                  <p className="text-gray-700 text-base font-bold text-xl">
                    No quiz available!
                  </p>
                </div>
              )}
            </div>
          </div>
            <div className="mt-4 flex">
            <button className="text-3xl" onClick={handleOnPrevious}>
              <GrFormPreviousLink />
            </button>
            <button className="text-3xl" onClick={handleOnNext}>
              <GrFormNextLink />
            </button>
          </div>
        </div>

        
      )}
    </>
  );
}