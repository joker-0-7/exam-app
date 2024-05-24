"use client";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
const ExamContext = createContext();

const ExamProvider = ({ children }) => {
  const router = useRouter();
  const [exam, setExam] = useState({
    mode: "",
    subjects: [],
    sources: [],
    questions: [],
    adv: false,
    count: 0,
    time: false,
  });
  // useEffect(() => {
  //   if (!exam.mode) router.push("/generate-quiz");
  // }, []);
  return (
    <ExamContext.Provider value={[exam, setExam]}>
      {children}
    </ExamContext.Provider>
  );
};

export { ExamContext, ExamProvider };
