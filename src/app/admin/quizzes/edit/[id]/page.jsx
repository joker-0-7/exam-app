"use client";
import React, { useEffect, useState } from "react";
import QuizComponent from "../../../_components/quiz/QuizComponent";
import ButtonComponent from "@/app/utils/Button";
import { getQuestion, updateQuestion } from "@/app/functions/quizzes";
import { useRouter } from "next/navigation";

function Page({ params }) {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState({
    sources: [],
    question: "",
    answers: [" ", " "],
    correct: "",
    image: "",
    explanation: "",
    subjects: [],
  });
  const fetchData = async () => {
    try {
      const question = await getQuestion(params.id);
      setQuizzes(question);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [image, setImage] = useState("");
  const handleChangeAnswer = (e, answerIndex) => {
    const { value } = e.target;
    setQuizzes((prevQuizzes) => {
      const updatedQuizzes = { ...prevQuizzes };
      updatedQuizzes.answers[answerIndex] = value;
      console.log(answerIndex);
      console.log(updatedQuizzes.answers);
      return updatedQuizzes;
    });
  };
  const uploadFile = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    let formdata = new FormData();
    formdata.append("img", image);
    formdata.append("sources", JSON.stringify(quizzes.sources));
    formdata.append("question", quizzes.question);
    formdata.append("answers", JSON.stringify(quizzes.answers));
    formdata.append("correct", quizzes.correct);
    formdata.append("explanation", quizzes.explanation);
    formdata.append("subjects", JSON.stringify(quizzes.subjects));
    const data = await updateQuestion(params.id, formdata).then((res) =>
      router.push("/admin/quizzes")
    );
  };
  return (
    <div className="quizzes min-h-screen overflow-hidden">
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
