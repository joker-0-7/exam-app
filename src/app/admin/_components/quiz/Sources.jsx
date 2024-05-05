import { getSources } from "@/app/functions/users";
import React, { useEffect, useState } from "react";

const MultiSelect = () => {
  const [data, setData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (e) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sourcesData = await getSources();
        setData(sourcesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h2>Chose Sources</h2>
      <select
        multiple
        value={selectedOptions}
        onChange={handleSelectChange}
        className="w-full"
      >
        {data.map((s, i) => (
          <option value={s.name} key={i} id={s.name}>
            {s.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultiSelect;
