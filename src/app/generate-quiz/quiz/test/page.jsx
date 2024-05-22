"use client";
import React, { useEffect, useState, useContext } from "react";
import { addQuizToUser } from "@/app/functions/quizzes";
import { ClockCircleOutlined } from "@ant-design/icons";
import { ExamContext } from "../../_context";
import ButtonComponent from "@/app/utils/Button";
import QuestionNavigation from "@/app/components/quiz-components/QuestionNavigation";
import QuestionDisplay from "@/app/components/quiz-components/QuestionDisplay";
import { useTimer } from "@/app/utils/useTimer";

function Page() {
  const [exams, setExams] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [exam, setExam] = useContext(ExamContext);
  const [answersQuiz, setAnswersQuiz] = useState([]);
  const [exclude, setExclude] = useState(false);
  const [excludesAns, setExcludesAns] = useState([]);
  const [handleAns, setHandleAns] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [flags, setFlags] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const time = useTimer(Number(exam?.questions?.length) * 60);

  useEffect(() => {
    setExams(exam.questions || []);
  }, [exam]);

  useEffect(() => {
    setShowAns(false);
  }, [index]);

  const nextBtn = () => {
    setIndex((num) => (num < exams.length - 1 ? num + 1 : num));
  };
  const handleExcludes = (e) => {
    if (excludesAns.includes(e)) {
      setExcludesAns(excludesAns.filter((item) => item !== e));
    } else {
      setExcludesAns([...excludesAns, e]);
    }
  };
  const checkAnswer = (answerUser, correctAnswer) =>
    answerUser === correctAnswer;

  const handleChange = (e) =>
    setUserAnswers({ ...userAnswers, [exams[index]._id]: e.target.value });

  const addFlag = (i) => {
    setFlags((prevFlags) =>
      prevFlags.includes(i)
        ? prevFlags.filter((item) => item !== i)
        : [...prevFlags, i]
    );
  };

  const ansFun = (e, quizId, i) => {
    const isCorrect = checkAnswer(userAnswers, exams[i].correct);
    if (isCorrect) {
      setAnswersQuiz({ ...answersQuiz, [quizId]: true });
      setCorrect((prevCorrect) => prevCorrect + 1);
      if (exam.mode === "tutor") return setShowAns(true);
      nextBtn();
    } else {
      setAnswersQuiz({ ...answersQuiz, [quizId]: false });
      setShowAns(true);
      if (e.target.innerHTML === "Next Question") {
        nextBtn();
        setShowAns(false);
      }
    }
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (seconds === 0 && minutes === 0) {
      handleSubmit();
      setIndex(exams.length);
    }
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSubmit = async () => {
    const data = await addQuizToUser(answersQuiz);
    console.log(data);
  };
  const checkedAns = (questionId) => {
    const checkedAnsBefore = handleAns.filter((e) => e.quizId === questionId);
    if (checkedAnsBefore.length > 0) {
      return checkedAnsBefore[0].userAnswer;
    } else return null;
  };
  return (
    <div className="quiz min-h-screen ">
      <div className="min-h-screen">
        {index < exams.length ? (
          <div
            className="lg:grid lg:grid-cols-[100px_1fr] gap-8 p-8 sm:flex sm:flex-col"
            style={{ minHeight: "inherit" }}
          >
            <QuestionNavigation
              exams={exams}
              flags={flags}
              setIndex={setIndex}
              addFlag={addFlag}
              index={index}
            />
            <QuestionDisplay
              exam={exams[index]}
              setIndex={setIndex}
              handleExcludes={handleExcludes}
              index={index}
              excludesAns={excludesAns}
              setExclude={setExclude}
              exams={exams}
              checkedAns={checkedAns}
              flags={flags}
              userAnswers={userAnswers}
              handleAns={handleAns}
              handleChange={handleChange}
              ansFun={ansFun}
              showAns={showAns}
              addFlag={addFlag}
              formatTime={formatTime}
              time={time}
            />
          </div>
        ) : (
          <div className="grid grid-cols-[300px_1fr] gap-8 p-8">
            <div className="rounded-lg border bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
              <h1>Score</h1>
              <div className="score">
                <h2>
                  {correct} / {exams.length}
                </h2>
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
