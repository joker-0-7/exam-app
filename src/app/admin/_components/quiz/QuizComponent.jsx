"use client";
import ButtonComponent from "@/app/utils/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function QuizComponent({ setQuizzes, handleChangeAnswer, quiz, uploadFile }) {
  const addAnswers = () => {
    setQuizzes({ ...quiz, answers: [...quiz.answers, " "] });
  };
  return (
    <div className="box mx-auto container">
      <div className="heading">
        <div className="sources"></div>
        <div className="subjects"></div>
      </div>
      <div className="content">
        <div className="input">
          <Input
            size="large"
            placeholder="Question"
            className="mb-5"
            value={quiz.question}
            onChange={(e) => {
              setQuizzes((prevQuizzes) => {
                const updatedQuizzes = { ...prevQuizzes };
                updatedQuizzes.question = e.target.value;
                return updatedQuizzes;
              });
            }}
          />
        </div>
        <div className="chose">
          <div className="inputs grid grid-cols-1 gap-3">
            <Input
              type="text"
              placeholder="Correct Answer"
              onChange={(e) => {
                handleChangeAnswer(e, 0);
                setQuizzes((prevQuizzes) => {
                  const updatedQuizzes = { ...prevQuizzes };
                  updatedQuizzes.correct = e.target.value;
                  return updatedQuizzes;
                });
              }}
            />
            {quiz &&
              quiz.answers &&
              quiz.answers.map((ans, i) => {
                return (
                  <Input
                    key={i}
                    type="text"
                    placeholder="answer"
                    onChange={(e) => handleChangeAnswer(e, i)}
                  />
                );
              })}
            <div className="explanation">
              <Textarea
                rows={4}
                placeholder="Explanation"
                onChange={(e) =>
                  setQuizzes({ ...quiz, explanation: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input type="file" onChange={uploadFile} accept="image/*" />
              <ButtonComponent title="Add Answer" onClick={addAnswers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizComponent;
