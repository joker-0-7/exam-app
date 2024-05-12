import { getSubjects } from "@/app/functions/users";
import React, { useEffect, useState } from "react";

const Subjects = ({ quiz, setQuizzes }) => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleCheckboxChange = (option) => {
    const isSelected = quiz.subjects.includes(option);
    if (isSelected) {
      setQuizzes(quiz.subjects.filter((item) => item !== option));
    } else {
      setQuizzes({ ...quiz, subjects: [...quiz.subjects, option] });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectsData = await getSubjects();
        setData(subjectsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="dropdown-checkbox">
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        Select Subjects
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {data.map((option, index) => (
            <div key={index}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={quiz.subjects.includes(option.name)}
                  onChange={() => handleCheckboxChange(option.name)}
                />
                {option.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subjects;
