"use client";
import React, { useEffect, useState } from "react";
import { getQuizzesUser } from "../functions/quizzes";
import TableComponent from "../components/Table";

function Page() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizzes = await getQuizzesUser();
        setData(quizzes[0].question);
        console.log(quizzes);
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
