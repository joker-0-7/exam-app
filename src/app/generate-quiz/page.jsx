"use client";
import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Switch";
import { TextField } from "@mui/material";
import BasicTabs from "../components/Tabs";
import ButtonComponent from "../utils/Button";
import { useRouter } from "next/navigation";
import { ExamContext } from "./_context";
import { addQuizUser } from "../functions/quizzes";

function Page() {
  const [mode, setMode] = useState("Tutor");
  const [exam, setExam] = useContext(ExamContext);
  const router = useRouter();
  const handleModeChange = (e) => {
    setExam({ ...exam, mode: e.target.value });
  };
  const generate = async () => {
    console.log(exam);
    await addQuizUser(exam)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    console.log(exam);
  }, [exam]);
  return (
    <div className="generate-quiz mt-20">
      <div className="container mx-auto">
        <div className="test-mode">
          <div className="heading">
            <div className="bg-tertiary text-dark py-6 text-center text-2xl font-bold">
              <h1>Test Mode</h1>
            </div>
            <div className="info text-center text-xl mt-6">
              <h3>
                The default Mode is{" "}
                <span className="text-red-800">Tutor Mode</span> You can change
                it if You want to take the test in{" "}
                <span className="text-red-800">Exam Mode</span>
              </h3>
            </div>
            <div className="switch mt-5">
              <Button mode={exam.mode} handleModeChange={handleModeChange} />
            </div>
            <div className="bg-tertiary text-dark py-6 text-center text-2xl font-bold my-5">
              <h1>Quiz Title</h1>
            </div>
            <div className="quiz-title">
              <TextField
                fullWidth
                disabled
                label="Quiz Title"
                id="quizTitle"
                value={Date.now()}
              />
            </div>
            <div className="tabs mt-5">
              <BasicTabs />
            </div>
          </div>
          <ButtonComponent title="Generate Quiz" onClick={generate} />
        </div>
      </div>
    </div>
  );
}

export default Page;
