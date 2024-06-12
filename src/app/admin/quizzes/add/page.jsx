"use client";
import React, { useState } from "react";
import QuizComponent from "../../_components/quiz/QuizComponent";
import { addQuizzes } from "@/app/functions/quizzes";
import { useRouter } from "next/navigation";
import { Button } from "antd";

function Page() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState({
    sources: [""],
    question: "",
    answers: ["", ""],
    correct: "",
    image: "",
    explanation: "",
    subjects: [""],
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
    let formData = new FormData();
    formData.append("img", image);
    formData.append("sources", JSON.stringify(quizzes.sources));
    formData.append("question", quizzes.question);
    formData.append("answers", JSON.stringify(quizzes.answers));
    formData.append("correct", quizzes.correct);
    formData.append("explanation", quizzes.explanation);
    formData.append("subjects", JSON.stringify(quizzes.subjects));
    await addQuizzes(formData).then((res) => {
      router.push("/admin/quizzes");
      //   setQuizzes({
      //     sources: [""],
      //     question: "",
      //     correct: "",
      //     image: "",
      //     explanation: "",
      //     answers: ["", ""],
      //     subjects: [""],
      //   });
    });
  };
  return (
    <div className="quizzes max-h-screen overflow-y-auto">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="quiz-box min-h-screen w-full sm:w-1/2 flex flex-col justify-evenly">
            <div className="">
              <QuizComponent
                quiz={quizzes}
                setQuizzes={setQuizzes}
                handleChangeAnswer={handleChangeAnswer}
                uploadFile={uploadFile}
              />
            </div>
            <div className="footer w-full mt-5 py-4">
              <Button
                type="primary"
                onClick={handleSubmit}
                className="w-full"
                disabled={
                  quizzes.sources.length < 1 || quizzes.subjects.length < 1
                }
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
