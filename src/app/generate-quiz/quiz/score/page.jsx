import { Button } from "@/components/ui/button";
import React from "react";

function Page() {
  return (
    <div className="score">
      <div className="min-h-screen flex justify-center items-center">
        <div className="container mx-auto flex flex-col justify-between items-center">
          <div className="heading">
            <h1 className="text-lg font-bold">Score</h1>
          </div>
          <div className="component bg-gray-100 w-1/2 min-h-96 rounded-sm shadow-sm px-3 py-2">
            <ul className="flex gap-3 flex-wrap">
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                1
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                2
              </li>
              <li className="bg-red-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                3
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                4
              </li>
              <li className="bg-red-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                5
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                6
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                7
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                8
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                9
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                10
              </li>
              <li className="bg-red-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                11
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                12
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                13
              </li>
              <li className="bg-red-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                14
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                15
              </li>
              <li className="bg-red-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                16
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                17
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                18
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                19
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                20
              </li>
              <li className="bg-red-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                21
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                22
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                23
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                24
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                25
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                26
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                27
              </li>
              <li className="bg-red-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                28
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                29
              </li>
              <li className="bg-green-500 w-8 text-sm flex justify-center items-center h-8 rounded-full">
                30
              </li>
            </ul>
          </div>
          <Button className="mt-5">Ok</Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
