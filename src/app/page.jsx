"use client";
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { UserContext } from "./context/User";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { CardContent } from "@mui/material";
import { getQuizzesUser } from "./functions/quizzes";
// import CardComponent from "./components/CardComponent";
const CardComponent = dynamic(() => import("./components/CardComponent"));
const icons = {
  BarChart: dynamic(() =>
    import("./generate-quiz/IconsSVG").then((mod) => mod.BarChart)
  ),
  BookIcon: dynamic(() =>
    import("./generate-quiz/IconsSVG").then((mod) => mod.BookIcon)
  ),
  CheckIcon: dynamic(() =>
    import("./generate-quiz/IconsSVG").then((mod) => mod.CheckIcon)
  ),
  LineChart: dynamic(() =>
    import("./generate-quiz/IconsSVG").then((mod) => mod.LineChart)
  ),
  PieChart: dynamic(() =>
    import("./generate-quiz/IconsSVG").then((mod) => mod.PieChart)
  ),
};

export default function Home() {
  const [state] = useContext(UserContext);
  const [count, setCount] = useState(0);
  const [success, setSuccess] = useState(0);
  const [recallsSuccess, setRecallsSuccess] = useState(0);
  const [recallsFaild, setRecallsFaild] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizzes = await getQuizzesUser(state?.token).then((res) => res);
        console.log(quizzes);
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
        const recallsQuestionsSuccess = quizzes[0]?.question.filter(
          (question) =>
            question?.questionId?.sources[0] == "Recalls" &&
            question.value == "true"
        );
        setRecallsSuccess(
          recallsQuestionsSuccess ? recallsQuestionsSuccess.length : 0
        );
        const recallsQuestionsFaild = quizzes[0]?.question.filter(
          (question) =>
            question?.questionId?.sources[0] == "Recalls" &&
            question.value == "false"
        );
        setRecallsFaild(
          recallsQuestionsFaild ? recallsQuestionsFaild.length : 0
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
      value: recallsSuccess,
      color: "hsl(124, 70%, 50%)",
    },
    {
      id: "faild",
      label: "faild",
      value: recallsFaild,
      color: "hsl(43, 70%, 50%)",
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
            title="Total Exams"
            value={count}
            Icon={icons.BookIcon}
            description="Exams scheduled this semester"
          />
          <CardComponent
            title="Success Exams"
            value={success}
            Icon={icons.CheckIcon}
            description="Exams completed so far"
          />
          <CardComponent
            title="Faild Exams"
            value={count - success}
            Icon={icons.BookIcon}
            description="Exams completed so far"
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
          {/* <Card>
            <CardHeader>
              <CardBody>Grade Trends Over Time</CardBody>
            </CardHeader>
            <CardContent>
              <icons.LineChart className="aspect-[4/3]" />
            </CardContent>
          </Card> */}
          {/* <Card>
            <CardHeader>
              <CardBody>Performance by Subject</CardBody>
            </CardHeader>
            <CardContent>
              <icons.BarChart className="aspect-[4/3]" />
            </CardContent>
          </Card> */}
        </section>
      </main>
    </div>
  );
}
