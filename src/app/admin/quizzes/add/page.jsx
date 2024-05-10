"use client";
import React, { useState } from "react";
import QuizComponent from "../../_components/quiz/QuizComponent";
import ButtonComponent from "@/app/utils/Button";
import { addQuizzes } from "@/app/functions/quizzes";

function Page() {
  const [quizzes, setQuizzes] = useState({
    sources: [],
    question: "",
    answers: [" ", " "],
    correct: "",
    image: "",
    explanation: "",
    subjects: [],
  });
  const [image, setImage] = useState("");
  const handleChangeAnswer = (e, answerIndex) => {
    const { value } = e.target;
    setQuizzes((prevQuizzes) => {
      const updatedQuizzes = { ...prevQuizzes };
      updatedQuizzes.answers[answerIndex] = value;
      return updatedQuizzes;
    });
  };
  const uploadFile = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    let formdata = new FormData();
    formdata.append("img", image);
    formdata.append("sources", quizzes.sources);
    formdata.append("answers", quizzes.answers);
    formdata.append("correct", quizzes.correct);
    formdata.append("explanation", quizzes.explanation);
    formdata.append("subjects", quizzes.subjects);
    const data = await addQuizzes(formdata);
  };
  return (
    <div className="quizzes h-screen overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="quiz-box max-h-screen w-full sm:w-1/2 ">
            <div>
              <QuizComponent
                quiz={quizzes}
                setQuizzes={setQuizzes}
                handleChangeAnswer={handleChangeAnswer}
                uploadFile={uploadFile}
              />
            </div>
            <div className="footer w-full mt-5">
              <ButtonComponent
                title="Submit"
                onClick={handleSubmit}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
