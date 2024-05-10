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
// "use client";
// import { useContext } from "react";
// import { UserContext } from "./context/User";
// import { PieChart } from "@mui/x-charts/PieChart";
// import { Card, CardBody, CardHeader } from "@nextui-org/react";
// import { CardContent } from "@mui/material";
// import { Button } from "antd";
// import {
//   BarChart,
//   BookIcon,
//   CalendarIcon,
//   CheckIcon,
// } from "./generate-quiz/IconsSVG";
// export default function Home() {
//   const [state, setState] = useContext(UserContext);
//   return (
//     <main className="flex flex-col gap-8 p-6 md:p-10">
//       <header className="flex flex-col gap-2">
//         <h1 className="text-3xl font-bold">Welcome, Student!</h1>
//         <p className="text-gray-500 dark:text-gray-400">
//           Explore your academic progress and stay informed.
//         </p>
//       </header>
//       <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
//         <Card>
//           <CardHeader className="flex items-center justify-between">
//             <CardBody>Total Exams</CardBody>
//             <BookIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-4xl font-bold">45</div>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Exams scheduled this semester
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex items-center justify-between">
//             <CardBody>Completed Exams</CardBody>
//             <CheckIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-4xl font-bold">38</div>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Exams completed so far
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex items-center justify-between">
//             <CardBody>Upcoming Events</CardBody>
//             <CalendarIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h4 className="font-medium">Midterm Exam</h4>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     April 15, 2023
//                   </p>
//                 </div>
//                 <Button size="sm" variant="ghost">
//                   Prepare
//                 </Button>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h4 className="font-medium">Parent-Teacher Meeting</h4>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     May 1, 2023
//                   </p>
//                 </div>
//                 <Button size="sm" variant="ghost">
//                   Attend
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </section>
//       <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         <Card>
//           <CardHeader>
//             <CardBody>Test Score Distribution</CardBody>
//           </CardHeader>
//           <CardContent>
//             <BarChart className="aspect-[4/3]" />
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardBody>Grade Trends Over Time</CardBody>
//           </CardHeader>
//           <CardContent>
//             {/* <LineChart className="aspect-[4/3]" /> */}
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardBody>Performance by Subject</CardBody>
//           </CardHeader>
//           <CardContent>
//             <BarChart className="aspect-[4/3]" />
//           </CardContent>
//         </Card>
//       </section>
//     </main>
//   );
// }
