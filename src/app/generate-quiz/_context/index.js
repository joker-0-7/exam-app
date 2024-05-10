"use client";
import { createContext, useState } from "react";
const ExamContext = createContext();

const ExamProvider = ({ children }) => {
  const [exam, setExam] = useState({
    mode: "",
    subjects: [],
    sources: [],
    questions: [],
    adv: false,
    count: 0,
  });

  return (
    <ExamContext.Provider value={[exam, setExam]}>
      {children}
    </ExamContext.Provider>
  );
};

export { ExamContext, ExamProvider };
