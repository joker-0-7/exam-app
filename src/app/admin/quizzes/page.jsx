"use client";
import { getQuizzes } from "@/app/functions/quizzes";
import React, { useEffect, useState } from "react";
import Heading from "../_components/Heading";
import TableComponent from "@/app/components/Table";
import EmptyPage from "../_components/EmptyPage";

function Page() {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizzes = await getQuizzes();
        setQuizzes(quizzes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="quizzes max-h-screen">
      <div className="container mx-auto h-screen flex justify-around flex-col">
        <div className="header">
          <Heading btnValue="Add Quizzes" link="quizzes" title="Quizzes" />
        </div>
        {quizzes.length > 0 ? (
          <TableComponent
            data={quizzes}
            page="admin"
            link="/admin/quizzes/add"
          />
        ) : (
          <EmptyPage link="/admin/quizzes/add" />
        )}
      </div>
    </div>
  );
}

export default Page;
