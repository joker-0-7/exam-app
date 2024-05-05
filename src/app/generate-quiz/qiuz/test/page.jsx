"use client";
import { addQuizToUser, getQuizzes } from "@/app/functions/quizzes";
import React, { useEffect, useState, useContext } from "react";
import { ClockCircleOutlined, StepForwardOutlined } from "@ant-design/icons";
import { FlagCircleOutlined } from "@mui/icons-material";
import { Input } from "@nextui-org/react";
import ButtonComponent from "@/app/utils/Button";
import { ExamContext } from "../../_context";

function Page() {
  const [exams, setExams] = useState([]);
  const [exam, setExam] = useContext(ExamContext);
  const [time, setTime] = useState(exams.length * 1);
  const [answersQuiz, setAnswersQuiz] = useState([]);
  const [userAnswers, setUserAnswers] = useState("");
  const [flags, setFlags] = useState([]);
  const [index, setIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const quizes = await getQuizzes();
        setExams(quizes);
        shuffleArray(quizes[index]?.answers || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchSubject();
  }, []);

  const nextBtn = () => {
    if (index < exams.length - 1) {
      setIndex((num) => num + 1);
    } else return false;
  };

  const handleChange = (e, answerIndex) => {
    const { value } = e.target;
    setUserAnswers(value);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setShuffledAnswers(array);
  };

  const addFlag = (i) => {
    if (flags.includes(i)) {
      setFlags(flags.filter((item) => item !== i));
    } else {
      setFlags([...flags, i]);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalId);
          return prevTime;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    shuffleArray(exams[index]?.answers || []);
    setTime(60);
  }, [index]);

  const ansFun = (e, quizId, i) => {
    const status = userAnswers === exams[i].correct;
    console.log(status);
    setAnswersQuiz({ ...answersQuiz, [quizId]: status });
    console.log(answersQuiz);
    nextBtn();
  };

  const handleSubmit = async () => {
    const data = await addQuizToUser(answersQuiz);
    console.log(data);
  };

  return (
    <div className="quiz min-h-screen flex items-center justify-center">
      <div className="container">
        <div className="grid grid-cols-[300px_1fr] gap-8 p-8">
          <div className="rounded-lg border bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Quiz Questions</h3>
              <div className="flex items-center space-x-4">
                <span className="cursor-pointer">
                  <FlagCircleOutlined className="h-5 w-5" />
                  <span className="sr-only">Flag question</span>
                </span>
                <span className="cursor-pointer" onClick={nextBtn}>
                  <StepForwardOutlined className="h-5 w-5" />
                  <span className="sr-only">Skip question</span>
                </span>
              </div>
            </div>
            <nav className="space-y-2">
              {exams.map((exam, i) => {
                return (
                  <span
                    onClick={() => {
                      setIndex(i);
                    }}
                    className={`flex items-center justify-between cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors dark:hover:bg-gray-800 ${
                      flags.includes(i)
                        ? "bg-amber-300 hover:bg-amber-200"
                        : "hover:bg-gray-100"
                    }`}
                    key={i}
                  >
                    <span>{i + 1}</span>
                    {i === index && (
                      <span className="rounded-full bg-gray-200 px-2 py-1 text-xs font-medium dark:bg-gray-700">
                        Current
                      </span>
                    )}
                  </span>
                );
              })}
            </nav>
          </div>
          {exams && (
            <div className="rounded-lg border bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Question {index + 1}</h3>
                <div className="flex items-center space-x-4">
                  {exam && exam.mode === "Exam" && (
                    <div className="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      <ClockCircleOutlined className="h-4 w-4" />
                      <span>
                        {time}:{time < 10 ? "0" : ""}0
                      </span>
                    </div>
                  )}
                  <span
                    className={`cursor-pointer h-9 w-9 flex items-center justify-center transition-all ${
                      flags.includes(index) && "bg-amber-300 rounded-full"
                    }`}
                    onClick={() => {
                      addFlag(index);
                    }}
                  >
                    <FlagCircleOutlined className="h-5 w-5" />
                    <span className="sr-only">Flag question</span>
                  </span>
                </div>
              </div>
              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {exams[index]?.question}
              </p>
              <div className="space-y-2">
                {shuffledAnswers.map((ans, i) => {
                  return (
                    <div className="flex items-center space-x-2" key={i}>
                      <label
                        className="flex items-center cursor-pointer w-1/2 text-left"
                        htmlFor={`${ans}_${i}`}
                      >
                        <input
                          id={`${ans}_${i}`}
                          name={`answer_${index}`}
                          style={{ width: "50px" }}
                          onChange={handleChange}
                          value={exams[index].answers[0]}
                          type="radio"
                        />
                        <span className="ml-2 text-left">{ans}</span>
                      </label>
                    </div>
                  );
                })}
                <div className="flex mt-4 items-center gap-5">
                  <ButtonComponent
                    onClick={(e) => {
                      index < exams.length - 1
                        ? ansFun(e, exams[index]._id, index)
                        : handleSubmit();
                    }}
                    title={
                      index < exams.length - 1 ? "Next Question" : "Submit"
                    }
                  />
                  {index < exams.length - 1 && (
                    <span
                      className="font-bold cursor-pointer hover:text-gray-500 transition-colors"
                      onClick={nextBtn}
                    >
                      Skip
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
