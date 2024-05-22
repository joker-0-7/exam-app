import { Image } from "antd";
import ButtonComponent from "@/app/utils/Button";
import { ClockCircleOutlined } from "@ant-design/icons";
import { FlagCircleOutlined } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { EyeClose, EyeOpen } from "../../../../public/assets";

const QuestionDisplay = ({
  exam,
  index,
  setIndex,
  handleAns,
  excludesAns,
  handleExcludes,
  handleChange,
  flags,
  ansFun,
  showAns,
  addFlag,
  formatTime,
  time,
  exams,
  checkedAns,
}) => (
  <div className="rounded-lg border bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
    <div className="flex justify-between pb-2 items-center">
      <div className="flex items-center">
        <h3 className="text-lg font-semibold mr-8 ">Question {index + 1}</h3>
        <span
          className={`cursor-pointer h-9 w-fit flex items-center justify-center transition-all ${
            flags.includes(index) && "bg-amber-300 rounded-full"
          }`}
          onClick={() => addFlag(index)}
        >
          <Button>
            <FlagCircleOutlined className="h-5 w-5" />
            Add Flags
          </Button>
          <span className="sr-only">Flag question</span>
        </span>
      </div>
      <div>
        <Button variant="destructive">End Exam</Button>
        <div className="flex items-center space-x-4">
          {((exam && exam.mode === "exam") || exam.time) && (
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              <ClockCircleOutlined className="h-4 w-4" />
              <span>{formatTime(time)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
    <hr />
    <div className="flex flex-col justify-between h-5/6">
      <div>
        <p className="mb-6 text-gray-500 dark:text-gray-400 pt-2">
          {exam.question}
        </p>
        {exam.image && (
          <div className="image">
            <Image
              alt="image"
              src={`${process.env.NEXT_PUBLIC_API}/public/images/${exam.image}`}
            />
          </div>
        )}
        <div className="space-y-2">
          {exam.answers.sort().map((ans, i) => (
            <div
              key={i}
              className={`flex items-center space-x-2 mb-3 border-1 border-gray-700 px-1 py-2 rounded-sm relative ${
                excludesAns.includes(ans) && "bg-red-400"
              }`}
            >
              <div className="icon absolute right-1">
                {excludesAns.includes(ans) ? (
                  <span
                    className="cursor-pointer"
                    onClick={() => handleExcludes(ans)}
                  >
                    <EyeClose />
                  </span>
                ) : (
                  <span
                    className="cursor-pointer"
                    onClick={() => handleExcludes(ans)}
                  >
                    <EyeOpen />
                  </span>
                )}
              </div>
              <label
                htmlFor={`${ans}_${i}`}
                className="flex items-center cursor-pointer w-1/2 text-left"
              >
                <input
                  id={`${ans}_${i}`}
                  name={`answer_${index}`}
                  style={{ width: "50px" }}
                  onChange={handleChange}
                  checked={
                    checkedAns(exam._id)
                      ? checkedAns(exam._id) === ans
                        ? true
                        : false
                      : null
                  }
                  value={ans}
                  disabled={
                    showAns ||
                    handleAns.filter((e) => e.quizId === exam._id).length > 0
                  }
                  type="radio"
                />
                <span
                  className={`ml-2 text-left ${
                    (showAns || checkedAns(exam._id)) && exam.correct === ans
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  {ans}
                </span>
              </label>
            </div>
          ))}

          {showAns ||
            (handleAns.filter((e) => e.quizId === exam._id).length > 0 && (
              <div className="explanation">
                <h1>Explanation</h1>
                {exam.explanation}
              </div>
            ))}
        </div>
      </div>
      <div className="flex mt-4 items-center justify-between gap-5">
        <div>
          <Button
            disabled={index <= 0}
            className="bg-gray-900 me-6"
            onClick={() => (index > 0 ? setIndex(index - 1) : false)}
          >
            Previous
          </Button>
        </div>
        <div>
          {index < exams.length - 1 && (
            <span
              className="font-bold cursor-pointer hover:text-gray-500 transition-colors mr-5"
              onClick={() => setIndex(index + 1)}
            >
              Skip
            </span>
          )}
          <ButtonComponent
            onClick={(e) => ansFun(e, exam._id, index)}
            title={
              index < exams.length - 1
                ? showAns
                  ? "Next Question"
                  : "Next"
                : showAns
                ? "Next Question"
                : "Submit"
            }
          />
        </div>
      </div>
    </div>
  </div>
);

export default QuestionDisplay;
