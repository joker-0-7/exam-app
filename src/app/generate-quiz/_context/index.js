"use client";
import { createContext, useState } from "react";
const ExamContext = createContext();

const ExamProvider = ({ children }) => {
  const [exam, setExam] = useState({
    mode: "",
    subjects: [],
    sources: [],
  });

  return (
    <ExamContext.Provider value={[exam, setExam]}>
      {children}
    </ExamContext.Provider>
  );
};

export { ExamContext, ExamProvider };
