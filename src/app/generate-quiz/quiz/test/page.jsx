"use client";
import { addQuizToUser, getQuizzes } from "@/app/functions/quizzes";
import React, { useEffect, useState, useContext } from "react";
import { ClockCircleOutlined, StepForwardOutlined } from "@ant-design/icons";
import { FlagCircleOutlined } from "@mui/icons-material";
import { Input } from "@nextui-org/react";
import ButtonComponent from "@/app/utils/Button";
import { ExamContext } from "../../_context";
import { Image } from "antd";

function Page() {
  const [exams, setExams] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [exam, setExam] = useContext(ExamContext);
  const [time, setTime] = useState(60);
  const [answersQuiz, setAnswersQuiz] = useState([]);
  const [userAnswers, setUserAnswers] = useState("");
  const [flags, setFlags] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  useEffect(() => {
    setExams(exam.questions || []);
    setTime(Number(exam?.questions?.length) * 60);
  }, []);

  useEffect(() => {
    if (shuffledAnswers.length < 1) {
      shuffleArray(exams[index]?.answers || []);
    }
  }, [shuffledAnswers]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const nextBtn = (x) => {
    if (!checkAnswer()) setShowAns(true);
    setIndex((num) => (num < exams.length ? num + 1 : num));
    shuffleArray(exams[x]?.answers || []);
  };

  const checkAnswer = (answerUser, correctAnswer) =>
    answerUser === correctAnswer;

  const handleChange = (e) => setUserAnswers(e.target.value);

  const shuffleArray = (array) =>
    exams.length > index &&
    setShuffledAnswers(array.sort(() => Math.random() - 0.5));
  const addFlag = (i) =>
    setFlags((prevFlags) =>
      prevFlags.includes(i)
        ? prevFlags.filter((item) => item !== i)
        : [...prevFlags, i]
    );

  const ansFun = (e, quizId, i) => {
    const isCorrect = checkAnswer(userAnswers, exams[i].correct);
    if (isCorrect) {
      setAnswersQuiz({ ...answersQuiz, [quizId]: true });
      setCorrect((prevCorrect) => prevCorrect + 1);
      nextBtn();
    } else {
      setAnswersQuiz({ ...answersQuiz, [quizId]: false });
      setShowAns(true);
      if (e.target.innerHTML === "Understod") {
        nextBtn();
        setShowAns(false);
      }
    }
  };
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (seconds == 0 && minutes == 0) {
      handleSubmit();
      setIndex(exams.length);
    }
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const handleSubmit = async () => {
    const data = await addQuizToUser(answersQuiz);
    console.log(data);
  };
  return (
    <div className="quiz min-h-screen flex items-center justify-center">
      <div className="container">
        {index < exam.questions.length ? (
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
                {exams.map((exam, i) => (
                  <span
                    key={i}
                    onClick={() => {
                      setIndex(i);
                      shuffleArray(exams[i]?.answers || []);
                    }}
                    className={`flex items-center justify-between cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors dark:hover:bg-gray-800 ${
                      flags.includes(i)
                        ? "bg-amber-300 hover:bg-amber-200"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span>{i + 1}</span>
                    {i === index && (
                      <span className="rounded-full bg-gray-200 px-2 py-1 text-xs font-medium dark:bg-gray-700">
                        Current
                      </span>
                    )}
                  </span>
                ))}
              </nav>
            </div>
            {exams && (
              <div className="rounded-lg border bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">
                    Question {index + 1}
                  </h3>
                  <div className="flex items-center space-x-4">
                    {(exam && exam.mode === "exam") ||
                      (exam.time && (
                        <div className="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                          <ClockCircleOutlined className="h-4 w-4" />
                          <span>{formatTime(time)}</span>
                        </div>
                      ))}
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
                {exams[index]?.image && (
                  <div className="image">
                    <Image
                      alt="image"
                      src={`${process.env.NEXT_PUBLIC_API}/public/images/${exams[index].image}`}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  {exams[index]?.answers.sort().map((ans, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <label
                        htmlFor={`${ans}_${i}`}
                        className="flex items-center cursor-pointer w-1/2 text-left"
                      >
                        <input
                          id={`${ans}_${i}`}
                          name={`answer_${index}`}
                          style={{ width: "50px" }}
                          onChange={handleChange}
                          value={ans}
                          type="radio"
                        />
                        <span
                          className={`ml-2 text-left ${
                            exams[index].correct === ans && showAns
                              ? "text-green-500"
                              : ""
                          }`}
                        >
                          {ans}
                        </span>
                      </label>
                    </div>
                  ))}
                  <div className="flex mt-4 items-center gap-5">
                    <ButtonComponent
                      onClick={(e) => ansFun(e, exams[index]._id, index)}
                      title={
                        index < exams.length - 1
                          ? showAns
                            ? "Understod"
                            : "Next Question"
                          : showAns
                          ? "Understod"
                          : "Submit"
                      }
                    />
                    {index < exams.length - 1 && (
                      <span
                        className="font-bold cursor-pointer hover:text-gray-500 transition-colors"
                        onClick={() => nextBtn(index + 1)}
                      >
                        Skip
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-[300px_1fr] gap-8 p-8">
            <div className="rounded-lg border bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
              <h1>Score</h1>
              <div className="score">
                <h2>{/* {getScore()} / {exams?.length} */}</h2>
                <ButtonComponent title="Ok" onClick={handleSubmit} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
