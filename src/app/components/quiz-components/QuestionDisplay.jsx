import { Image } from "antd";
import ButtonComponent from "@/app/utils/Button";
import { ClockCircleOutlined } from "@ant-design/icons";
import { FlagCircleOutlined } from "@mui/icons-material";

const QuestionDisplay = ({
  exam,
  index,
  userAnswers,
  handleAns,
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
    <div className="flex justify-between">
      <h3 className="text-lg font-semibold">Question {index + 1}</h3>
      <div className="flex items-center space-x-4">
        {((exam && exam.mode === "exam") || exam.time) && (
          <div className="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            <ClockCircleOutlined className="h-4 w-4" />
            <span>{formatTime(time)}</span>
          </div>
        )}
        <span
          className={`cursor-pointer h-9 w-9 flex items-center justify-center transition-all ${
            flags.includes(index) && "bg-amber-300 rounded-full"
          }`}
          onClick={() => addFlag(index)}
        >
          <FlagCircleOutlined className="h-5 w-5" />
          <span className="sr-only">Flag question</span>
        </span>
      </div>
    </div>
    <p className="mb-6 text-gray-500 dark:text-gray-400">{exam.question}</p>
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
        <div key={i} className="flex items-center space-x-2">
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
      <div className="flex mt-4 items-center gap-5">
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

        {index < exams.length - 1 && (
          <span
            className="font-bold cursor-pointer hover:text-gray-500 transition-colors"
            onClick={() => setIndex(index + 1)}
          >
            Skip
          </span>
        )}
      </div>
      {showAns ||
        (handleAns.filter((e) => e.quizId === exam._id).length > 0 && (
          <div className="explanation">
            <h1>Explanation</h1>
            {exam.explanation}
          </div>
        ))}
    </div>
  </div>
);

export default QuestionDisplay;
