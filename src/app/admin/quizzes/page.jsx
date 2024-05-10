"use client";
import { getQuizzes } from "@/app/functions/quizzes";
import React, { useEffect, useState } from "react";
import EmptyPage from "../_components/EmptyPage";
import Heading from "../_components/Heading";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DeleteIcon, TrashIcon } from "@/app/generate-quiz/IconsSVG";

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
        <div className="border rounded-lg w-full">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead className="w-[100px]">Delete</TableHead>
                  <TableHead className="w-[100px]">Edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quizzes && quizzes.length >= 1 ? (
                  quizzes.map((quiz, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>{quiz.question}</TableCell>
                        <TableCell>
                          <Button size="icon" variant="destructive">
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button size="icon" variant="outline">
                            <DeleteIcon className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <EmptyPage link="/admin/quizzes/add" />
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
