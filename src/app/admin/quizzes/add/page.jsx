"use client";
import React, { useState } from "react";
import QuizComponent from "../_components/quiz/QuizComponent";
import ButtonComponent from "@/app/utils/Button";
import { Button } from "antd";
import { AppstoreAddOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { addQuizzes } from "@/app/functions/quizzes";

function Page() {
  const [quizzes, setQuizzes] = useState([
    {
      sources: [],
      question: "",
      answers: [],
      correct: "",
      image: "",
      description: "",
      subjects: [],
    },
  ]);
  const addQuiz = () => {
    const newQuiz = {
      sources: [],
      question: "",
      answers: [],
      correct: "",
      image: "",
      description: "",
      subjects: [],
    };
    setQuizzes((prevQuizzes) => prevQuizzes.concat(newQuiz));
  };
  const handleChangeAnswer = (e, index, answerIndex) => {
    const { value } = e.target;
    setQuizzes((prevQuizzes) => {
      const updatedQuizzes = [...prevQuizzes];
      updatedQuizzes[index].answers[answerIndex] = value;
      return updatedQuizzes;
    });
  };
  const handleSubmit = async (e) => {
    const data = await addQuizzes(quizzes);
  };
  return (
    <div className="quizzes h-screen overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="quiz-box max-h-screen overflow-y-scroll">
            {quizzes.map((quiz, i) => {
              return (
                <div key={i}>
                  <QuizComponent
                    quizzes={quizzes}
                    quiz={quiz}
                    setQuizzes={setQuizzes}
                    handleChangeAnswer={handleChangeAnswer}
                    index={i}
                  />
                </div>
              );
            })}
          </div>
          <div className="footer flex justify-around items-center w-full">
            <ButtonComponent title="Submit" onClick={handleSubmit} />
            <Button
              onClick={addQuiz}
              shape="circle"
              type="primary"
              icon={<AppstoreAddOutlined style={{ fontSize: "18px" }} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
