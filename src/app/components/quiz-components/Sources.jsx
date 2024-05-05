"use client";
import { getSources } from "@/app/functions/users";
import { ExamContext } from "@/app/generate-quiz/_context";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
function Sources() {
  const [data, setData] = useState([]);
  const [exam, setExam] = useContext(ExamContext);
  useEffect(() => {
    getSources()
      .then((sources) => {
        setData(sources);
      })
      .catch((error) => {
        console.error("Error fetching sources:", error);
      });
  }, []);
  const onChange = (e) => {
    const selectedSource = e.target.value;
    if (!exam.sources.includes(selectedSource)) {
      setExam({ ...exam, sources: [...exam.sources, selectedSource] });
    } else {
      // If unchecked, remove the selected source from exam.sources
      setExam({
        ...exam,
        sources: exam.sources.filter((source) => source !== selectedSource),
      });
    }
  };
  return (
    <div className="subject">
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-4">
        {data.length >= 1 &&
          data.map((s, i) => {
            return (
              <label
                key={i}
                htmlFor={s?.name + i}
                className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
              >
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    value={s?.name}
                    className="size-4 rounded border-gray-300"
                    id={s?.name + i}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <strong className="text-pretty font-medium text-gray-900">
                    {s?.name}
                  </strong>
                  <p className="mt-1 text-pretty text-sm text-gray-700">
                    {s?.descriprion}
                  </p>
                </div>
              </label>
            );
          })}
      </div>
    </div>
  );
}
export default Sources;
