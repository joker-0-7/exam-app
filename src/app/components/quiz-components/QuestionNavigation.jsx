// import { FlagCircleOutlined, StepForwardOutlined } from "@mui/icons-material";

import { BookOpenIcon } from "@/app/generate-quiz/IconsSVG";
import { StepForwardOutlined } from "@ant-design/icons";

const QuestionNavigation = ({ exams, flags, setIndex, addFlag, index }) => (
  <div className="rounded-lg border bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold">Quiz Questions</h3>
      <div className="flex items-center space-x-4">
        <span className="cursor-pointer" onClick={() => setIndex(index + 1)}>
          <StepForwardOutlined className="h-5 w-5" />
          <span className="sr-only">Skip question</span>
        </span>
      </div>
    </div>
    <nav className="space-y-2">
      {exams.map((exam, i) => (
        <span
          key={i}
          onClick={() => setIndex(i)}
          className={`flex items-center justify-between cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors dark:hover:bg-gray-800 ${
            flags.includes(i)
              ? "bg-amber-300 hover:bg-amber-200"
              : "hover:bg-gray-100"
          }`}
        >
          <span>{i + 1}</span>
          {i === index && (
            <span className="rounded-full bg-gray-200 px-2 py-1 text-xs font-medium dark:bg-gray-700">
              Current
            </span>
          )}
        </span>
      ))}
    </nav>
  </div>
);

export default QuestionNavigation;
