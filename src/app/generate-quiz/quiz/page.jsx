"use client";
import { useContext, useEffect, useState } from "react";
import { ExamContext } from "../_context";
import { Button, Checkbox, InputNumber, Switch } from "antd";
import { getSources, getSubjects } from "@/app/functions/users";
import {
  addQuizUser,
  getPastPaper,
  getPastPapers,
} from "@/app/functions/quizzes";
import { useRouter } from "next/navigation";
import PastPapersChose from "@/app/components/quiz-components/PastPapersChose";

export default function Component() {
  const [exam, setExam] = useContext(ExamContext);
  const [pastPaperId, setPastPaperId] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [pastPapers, setPastPapers] = useState([]);
  const [sources, setSources] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const router = useRouter();
  const mode = exam?.mode;

  const quizDescription = mode ? `with ${mode} Mode` : "";
  useEffect(() => {
    getSources()
      .then((sources) => {
        setSources(sources);
      })
      .catch((error) => {
        console.error("Error fetching sources:", error);
      });
  }, []);
  useEffect(() => {
    getSubjects()
      .then((subjects) => {
        setSubjects(subjects);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });
  }, []);
  useEffect(() => {
    getPastPaper()
      .then((pastPapers) => {
        setPastPapers(pastPapers);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });
  }, []);
  const onChange = (e, change) => {
    const selectedSource = e;
    if (!exam[change].includes(selectedSource)) {
      setExam({ ...exam, [change]: [...exam[change], selectedSource] });
    } else {
      setExam({
        ...exam,
        [change]: exam[change].filter((subject) => subject !== selectedSource),
      });
    }
  };
  const generate = async () => {
    setDisabled(true);
    await addQuizUser(exam)
      .then((res) => {
        console.log(res);
        setExam({ ...exam, questions: res.exam });
        router.push("/generate-quiz/quiz/test");
      })
      .catch((err) => console.log(err));
    setDisabled(true);
  };
  const generatePastPapers = async () => {
    setDisabled(true);
    const data = await getPastPapers(pastPaperId).then((res) => {
      setExam({ ...exam, questions: res.data });
      router.push("/generate-quiz/quiz/test");
    });
    setDisabled(true);
  };
  return (
    <main className="w-full max-w-4xl mx-auto py-12 md:py-16 px-4 md:px-6 min-h-screen flex justify-center items-center">
      <div className="space-y-4 md:space-y-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 capitalize">
            Create Your Customized Quiz {quizDescription}
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Select your preferred subjects, sources, and advanced options to
            generate a personalized quiz.
          </p>
        </div>
        <form className="space-y-6">
          {exam && exam.mode === "quiz" ? (
            <div>
              <label
                className="font-medium text-gray-900 dark:text-gray-50 flex justify-between"
                htmlFor="subjects"
              >
                <span>Name</span>
              </label>
              <div className="mt-2 grid gap-2">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {pastPapers.map((s, i) => (
                    <PastPapersChose
                      key={i}
                      data={s}
                      checked={s._id === pastPaperId}
                      onChange={() => setPastPaperId(s._id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div>
                <label
                  className="font-medium text-gray-900 dark:text-gray-50 flex justify-between"
                  htmlFor="subjects"
                >
                  <span>Subjects</span>
                  <span>
                    <Checkbox
                      name="subjects"
                      label="Select All"
                      onChange={(e) => {
                        let arr = [];
                        exam.subjects.length > 0
                          ? setExam({ ...exam, subjects: [] })
                          : subjects.map((s) => arr.push(s.name));
                        setExam({ ...exam, subjects: [].concat(arr) });
                      }}
                      checked={exam.subjects.length === subjects.length}
                    >
                      Select All
                    </Checkbox>
                  </span>
                </label>
                <div className="mt-2 grid gap-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    {subjects.map((s, i) => {
                      return (
                        <div className="flex items-center space-x-2" key={i}>
                          <Checkbox
                            id={s?.name}
                            name="subjects"
                            onChange={(e) => {
                              onChange(s.name, "subjects");
                            }}
                            checked={
                              exam.subjects.includes(s?.name) ? true : false
                            }
                          />
                          <label
                            className="text-sm font-normal text-gray-900 dark:text-gray-50"
                            htmlFor={s?.name}
                          >
                            {s?.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div>
                <label
                  className="flex justify-between font-medium text-gray-900 dark:text-gray-50"
                  htmlFor="sources"
                >
                  <span>Sources</span>
                  <span>
                    <Checkbox
                      name="sources"
                      label="Select All"
                      onChange={(e) => {
                        let arr = [];
                        exam.sources.length > 0
                          ? setExam({ ...exam, sources: [] })
                          : sources.map((s) => arr.push(s.name));
                        setExam({ ...exam, sources: [].concat(arr) });
                      }}
                      checked={exam.sources.length === sources.length}
                    >
                      Select All
                    </Checkbox>
                  </span>
                </label>
                <div className="mt-2 grid gap-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    {sources.map((s, i) => {
                      return (
                        <div className="flex items-center space-x-2" key={i}>
                          <Checkbox
                            id={s?.name}
                            name="sources"
                            onChange={(e) => {
                              onChange(s.name, "sources");
                            }}
                            checked={
                              exam.sources.includes(s?.name) ? true : false
                            }
                          />
                          <label
                            className="text-sm font-normal text-gray-900 dark:text-gray-50"
                            htmlFor={s?.name}
                          >
                            {s?.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
          <div>
            <label
              className="block font-medium text-gray-900 dark:text-gray-50"
              htmlFor="advanced"
            >
              Advanced Options
            </label>
            <div className="mt-2 grid gap-2">
              <div className="flex items-center justify-between">
                {exam.mode && exam.mode === "quiz" ? (
                  <div className="flex items-center space-x-2">
                    <Switch
                      aria-label="Generate Past Papers with time"
                      id="time"
                      defaultChecked={exam.time}
                      onChange={() => {
                        setExam({
                          ...exam,
                          time: !exam.time,
                        });
                      }}
                    />
                    <label
                      className="text-sm font-normal text-gray-900 dark:text-gray-50"
                      htmlFor="time"
                    >
                      Generate Past Papers with time
                    </label>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-2">
                      <Switch
                        aria-label="Include Previously Answered Questions"
                        id="answered"
                        defaultChecked={exam.adv}
                        onChange={() => {
                          setExam({
                            ...exam,
                            adv: !exam.adv,
                          });
                        }}
                      />
                      <label
                        className="text-sm font-normal text-gray-900 dark:text-gray-50"
                        htmlFor="answered"
                      >
                        Include Previously Answered Questions
                      </label>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <label
                        htmlFor="count"
                        className="text-sm font-normal text-gray-900 dark:text-gray-50"
                      >
                        Count Questions
                      </label>
                      <InputNumber
                        max={400}
                        id="count"
                        onChange={(e) => {
                          setExam({ ...exam, count: e });
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            {disabled ? (
              <Button
                className="w-full max-w-[200px] bg-blue-500 hover:bg-blue-600 text-white cursor-auto"
                type="primary"
                onClick={false}
                loading
              >
                Loading
              </Button>
            ) : (
              <Button
                className="w-full max-w-[200px] bg-blue-500 hover:bg-blue-600 text-white"
                type="primary"
                disabled={!exam.sources.length > 0 || !exam.subjects.length > 0}
                onClick={() => {
                  exam.mode !== "quiz" ? generate() : generatePastPapers();
                }}
              >
                Generate Quiz
              </Button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
