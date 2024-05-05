"use client";
import Sources from "./Sources";
import Subject from "./Subjects";
import { Input } from "antd";
function QuizComponent({ data, setQuizzes, handleChangeAnswer, index, quiz }) {
  return (
    <div className="box mx-auto container">
      <div className="content p-5">
        <div className="header w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full pb-5">
            <Subject />
            <Sources />
          </div>
        </div>
        <div className="quizes">
          <div className="input grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="input">
              <Input
                size="larg"
                placeholder="Question"
                className="h-9"
                value={quiz.question}
                onChange={(e) => {
                  setQuizzes((prevQuizzes) => {
                    const updatedQuizzes = [...prevQuizzes];
                    updatedQuizzes[index].question = e.target.value;
                    return updatedQuizzes;
                  });
                }}
              />
            </div>
            <div className="chose">
              <div className="inputs grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  size="larg"
                  placeholder="Correct Answer"
                  onChange={(e) => {
                    handleChangeAnswer(e, index, 0);
                    setQuizzes((prevQuizzes) => {
                      const updatedQuizzes = [...prevQuizzes];
                      updatedQuizzes[index].correct = e.target.value;
                      return updatedQuizzes;
                    });
                  }}
                />
                <Input
                  size="large"
                  onChange={(e) => handleChangeAnswer(e, index, 1)}
                />

                <Input
                  size="large"
                  onChange={(e) => handleChangeAnswer(e, index, 2)}
                />

                <Input
                  size="large"
                  onChange={(e) => handleChangeAnswer(e, index, 3)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="upload-img">
            <label htmlFor="file" className="btn btn-primary">
              <span>upload file</span>
              <input type="file" accept="image/*" hidden id="file" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizComponent;
