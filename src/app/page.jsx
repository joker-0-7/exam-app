"use client";
import { useContext } from "react";
import { UserContext } from "./context/User";
import { PieChart } from "@mui/x-charts/PieChart";
export default function Home() {
  const [state, setState] = useContext(UserContext);
  return (
    <main className="container mx-auto h-full flex flex-col align-middle justify-around">
      <div className="exam-user-info">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-dark h-48 rounded-lg text-2xl flex justify-center items-center text-gray-50 flex-col">
            {state && state.user.totalExams ? state.user.totalExams : "0"}
            <span className="text-gray-50 block">Total Exam</span>
          </div>
          <div className="bg-dark h-48 rounded-lg text-2xl flex justify-center items-center text-gray-50 flex-col">
            {state && state.user.compeleteExams
              ? state.user.compeleteExams
              : "0"}
            <span className="text-gray-50 block">Completed</span>
          </div>
        </div>
      </div>
      <div className="grid bg-tertiary bg-opacity-40 w-fit rounded-lg py-20 px-5">
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value:
                    state && state.user.totalExam ? state.user.totalExam : 0,
                  label: "Total Exams",
                },
                {
                  id: 1,
                  value:
                    state && state.user.compeleteExams
                      ? state.user.compeleteExams
                      : 0,
                  label: "Complete Exams",
                },
                {
                  id: 2,
                  value:
                    state && state.user.faildExams ? state.user.faildExams : 0,
                  label: "Faild Exams",
                },
              ],
            },
          ]}
          width={550}
          height={200}
        />
      </div>
    </main>
  );
}
