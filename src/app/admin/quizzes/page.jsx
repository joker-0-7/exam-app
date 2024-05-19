"use client";
import {
  deleteQuestion,
  getQuestionsCount,
  getQuizzes,
} from "@/app/functions/quizzes";
import React, { useEffect, useState } from "react";
import Heading from "../_components/Heading";
import TableComponent from "@/app/components/Table";
import EmptyPage from "../_components/EmptyPage";
import { useRouter } from "next/navigation";
import PaginationComp from "@/app/components/PaginationComp";

function Page() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);
  const fetchData = async () => {
    try {
      const quizzes = await getQuizzes(current);
      setQuizzes(quizzes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const countData = async () => {
    try {
      const questionsCount = await getQuestionsCount();
      setCount(questionsCount);
      console.log(questionsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [current]);
  useEffect(() => {
    countData();
  }, []);

  const onChange = (page) => {
    setCurrent(+page);
  };
  const handleDelete = async (e) => {
    const data = await deleteQuestion(e).then((res) => fetchData());
  };
  const handleUpdate = async (e) => {
    router.push(`/admin/quizzes/edit/${e}`);
  };
  return (
    <div className="quizzes max-h-screen">
      <div className="container mx-auto h-screen flex justify-around flex-col">
        <div className="header">
          <Heading btnValue="Add Question" link="quizzes" title="Questions" />
        </div>
        {quizzes.length > 0 ? (
          <>
            <TableComponent
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              data={quizzes}
              page="admin"
              link="/admin/quizzes/add"
            />
            <PaginationComp
              current={current}
              count={count}
              onChange={onChange}
            />
          </>
        ) : (
          <EmptyPage link="/admin/quizzes/add" />
        )}
      </div>
    </div>
  );
}

export default Page;
