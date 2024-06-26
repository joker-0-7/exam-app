"use client";
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { UserContext } from "./context/User";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { CardContent } from "@mui/material";
import { getQuestionsCount, getQuizzesUser } from "./functions/quizzes";
const CardComponent = dynamic(() => import("./components/CardComponent"));
const icons = {
  BookIcon: dynamic(() =>
    import("./generate-quiz/IconsSVG").then((mod) => mod.BookIcon)
  ),
  CheckIcon: dynamic(() =>
    import("./generate-quiz/IconsSVG").then((mod) => mod.CheckIcon)
  ),
  PieChart: dynamic(() =>
    import("./generate-quiz/IconsSVG").then((mod) => mod.PieChart)
  ),
};

export default function Home() {
  const [state] = useContext(UserContext);
  const [count, setCount] = useState(0);
  const [success, setSuccess] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizzes = await getQuizzesUser(state?.token).then((res) => res);
        const filteredAllQuestions = quizzes[0]?.question.filter(
          (question) => question.questionId !== null
        );
        setCount(filteredAllQuestions ? filteredAllQuestions.length : 0);
        const filteredSuccessQuestions = quizzes[0]?.question.filter(
          (question) => question.value == "true"
        );
        setSuccess(
          filteredSuccessQuestions ? filteredSuccessQuestions.length : 0
        );
        const res = await getQuestionsCount().then((res) =>
          setQuestionsCount(res)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const data = [
    {
      id: "success",
      label: "success",
      value: success,
      color: "hsl(124, 70%, 50%)",
    },
    {
      id: "faild",
      label: "faild",
      value: count - success,
      color: "#333",
    },
  ];
  const questions = [
    {
      id: "total question",
      label: "Total Questions",
      value: questionsCount,
      color: "hsl(43, 70%, 50%)",
    },
    {
      id: "answered questions",
      label: "Answered Questions",
      value: count,
      color: "hsla(209, 100%, 50%, 1)",
    },
  ];
  return (
    <div className="min-h-screen flex items-end">
      <main
        className="flex flex-col gap-8 p-6 md:p-10 w-full"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <header className="flex flex-col gap-2">
          {state?.user && (
            <h1 className="text-3xl font-bold">
              Welcome, {state?.user?.firstName}
            </h1>
          )}
          <p className="text-gray-500 dark:text-gray-400">
            Explore your academic progress and stay informed.
          </p>
        </header>
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <CardComponent
            title="Total Questions"
            value={count}
            Icon={icons.BookIcon}
            description="Questions scheduled this semester"
          />
          <CardComponent
            title="Success Questions"
            value={success}
            Icon={icons.CheckIcon}
            description="Questions completed so far"
          />
          <CardComponent
            title="Faild Questions"
            value={count - success}
            Icon={icons.BookIcon}
            description="Questions completed so far"
          />
        </section>
        <h1 className="block text-2xl font-bold">Important Statistics</h1>
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardBody>Test Score Distribution</CardBody>
            </CardHeader>
            <CardContent>
              <div className="aspect-[4/3]">
                <icons.PieChart data={data} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardBody>Test Score Distribution</CardBody>
            </CardHeader>
            <CardContent>
              <div className="aspect-[4/3]">
                <icons.PieChart data={questions} />
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
