"use client";
import { getSubjects } from "@/app/functions/users";
import React from "react";
import { useEffect, useState } from "react";
function Subject() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getSubjects()
      .then((subjects) => {
        setData(subjects);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });
  }, []);
  return (
    <div className="subject">
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-4">
        {data.length > 1 &&
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
                    className="size-4 rounded border-gray-300"
                    id={s?.name + i}
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
export default Subject;
