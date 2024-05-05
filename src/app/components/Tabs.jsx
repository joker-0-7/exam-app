"use client";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Subject from "./quiz-components/subject";
import Sources from "./quiz-components/Sources";
import { FormControlLabel, Switch } from "@mui/material";
import { useContext } from "react";
import { ExamContext } from "../generate-quiz/_context";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [exam, setExam] = useContext(ExamContext);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onChange = (e, c) => {
    setExam({ ...exam, [c]: c.push(e.target.value) });
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Subjects" {...a11yProps(0)} />
          <Tab label="Sources" {...a11yProps(1)} />
          <Tab label="Advanced" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Subject subjects={exam.subjects} onChange={onChange} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Sources />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <FormControlLabel
          value="top"
          control={<Switch color="primary" />}
          label="old quizzes"
          labelPlacement="top"
        />
      </CustomTabPanel>
    </Box>
  );
}
