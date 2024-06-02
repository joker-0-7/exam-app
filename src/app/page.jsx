"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/User";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { CardContent } from "@mui/material";
import {
  BarChart,
  BookIcon,
  CheckIcon,
  LineChart,
  PieChart,
} from "./generate-quiz/IconsSVG";
import { getQuizzesUser } from "./functions/quizzes";
export default function Home() {
  const [state] = useContext(UserContext);
  const [count, setCount] = useState(0);
  const [success, setSuccess] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizzes = await getQuizzesUser();

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const data = [
    {
      id: "python",
      label: "python",
      value: 588,
      color: "hsl(124, 70%, 50%)",
    },
    {
      id: "make",
      label: "make",
      value: 3,
      color: "hsl(43, 70%, 50%)",
    },
    {
      id: "php",
      label: "php",
      value: 230,
      color: "hsl(190, 70%, 50%)",
    },
    {
      id: "ruby",
      label: "ruby",
      value: 376,
      color: "hsl(352, 70%, 50%)",
    },
    {
      id: "scala",
      label: "scala",
      value: 318,
      color: "hsl(190, 70%, 50%)",
    },
  ];
  return (
    <div className="min-h-screen flex items-end">
      <main
        className="flex flex-col gap-8 p-6 md:p-10 w-full"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">
            Welcome, {state?.user?.firstName}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Explore your academic progress and stay informed.
          </p>
        </header>
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardBody>Total Exams</CardBody>
              <BookIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{count}</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Exams scheduled this semester
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardBody>Success Exams</CardBody>
              <CheckIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{success}</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Exams completed so far
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardBody>Faild Exams</CardBody>
              <CheckIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{count - success}</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Exams completed so far
              </p>
            </CardContent>
          </Card>
        </section>
        <h1 className="block text-2xl font-bold">Important Statistics</h1>
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardBody>Test Score Distribution</CardBody>
            </CardHeader>
            <CardContent>
              <div className="aspect-[4/3]">
                <PieChart data={data} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardBody>Grade Trends Over Time</CardBody>
            </CardHeader>
            <CardContent>
              <LineChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardBody>Performance by Subject</CardBody>
            </CardHeader>
            <CardContent>
              <BarChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
