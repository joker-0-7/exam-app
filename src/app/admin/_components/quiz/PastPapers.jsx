import { getPastPaper } from "@/app/functions/quizzes";
import React, { useEffect, useState } from "react";

const PastPapers = ({ quiz, setQuizzes }) => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleCheckboxChange = (option) => {
    const isSelected = quiz.subjects.includes(option);
    if (isSelected) {
      setQuizzes({
        ...quiz,
        subjects: quiz.subjects.filter((item) => item !== option),
      });
    } else {
      setQuizzes({ ...quiz, subjects: [...quiz.subjects, option] });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pastPapers = await getPastPaper();
        console.log(pastPapers);
        setData(pastPapers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="dropdown-checkbox">
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        Select Past Papers
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {data.map((option, index) => (
            <div key={index}>
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="past-papers"
                  checked={quiz.pastPapers == option.quizName}
                  onChange={() => handleCheckboxChange(option.quizName)}
                />
                {option.quizName}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PastPapers;
