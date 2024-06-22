"use client";
import React, { useContext, useEffect, useState } from "react";
import { getQuizzesUser } from "../functions/quizzes";
import TableComponent from "../components/Table";
import { UserContext } from "../context/User";

function Page() {
  const [data, setData] = useState([]);
  const [state] = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      const token = state?.token;
      try {
        const quizzes = await getQuizzesUser(token);
        if (quizzes && quizzes[0]?.question) {
          const filteredQuestions = quizzes[0]?.question.filter(
            (question) => question.questionId !== null
          );
          setData(filteredQuestions.length > 0 ? filteredQuestions : []);
        }
        console.log(quizzes[0]?.question);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="container mx-auto">
        {data.length > 0 ? (
          <TableComponent page="client" data={data} link="/generate-quiz" />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Page;
