import { getSources } from "@/app/functions/users";
import React, { useEffect, useState } from "react";

const Sources = ({ setQuizzes, quiz }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sourcesData = await getSources();
        setData(sourcesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleCheckboxChange = (option) => {
    const isSelected = quiz.sources.includes(option);
    if (isSelected) {
      setQuizzes(quiz.sources.filter((item) => item !== option));
    } else {
      setQuizzes({ ...quiz, sources: [...quiz.sources, option] });
    }
  };
  return (
    <div className="dropdown-checkbox">
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        Select Sources
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {data.map((option, index) => (
            <div key={index} className="">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={quiz.sources.includes(option.name)}
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

export default Sources;
