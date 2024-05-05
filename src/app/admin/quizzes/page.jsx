"use client";
import { getQuizzes } from "@/app/functions/quizzes";
import React, { useEffect, useState } from "react";
import EmptyPage from "../_components/EmptyPage";
import Heading from "../_components/Heading";

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
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 overflow-y-scroll py-5">
          {quizzes && quizzes.length >= 1 ? (
            quizzes.map((quiz, i) => {
              return (
                <div
                  className="box bg-red p-2 h-36 rounded-lg text-center"
                  key={i}
                >
                  <div className="header">
                    <h1>{quiz.question}</h1>
                  </div>
                  <div className="body"></div>
                </div>
              );
            })
          ) : (
            <EmptyPage link="/admin/quizzes/add" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
