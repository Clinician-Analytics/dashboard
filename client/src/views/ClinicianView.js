import React, { useState } from "react";
import { Button } from "@material-ui/core";
import CalendarHeatmapClinician from "../components/visualizations/clinician/CalendarHeatmapClinician";
import axios from "axios";

export default function ClinicianView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleGetData = async () => {
    handleLoading();
    const res = await axios.post("/reports/clinician-reports/");
    setData(res.data);
    console.log(data);
  };

  return (
    <div className="div-a">
      <h1>Clinician Analytics</h1>
      {/* <TextField id="pNumber" name="pNumber" onChange={handleChange} /> */}
      <Button variant="contained" color="secondary" onClick={handleGetData}>
        Get Annual Reports
      </Button>
      <span>{loading ? "Loading Data..." : null}</span>
      {data ? (
        <>
          <h2>Total Call Volume by Day</h2>
          <CalendarHeatmapClinician calendarData={data.heatmapData_all} />
          <h2>Total Call Volume by Day 2018</h2>
          <CalendarHeatmapClinician calendarData={data.heatmapData_2018} />
          <h2>Total Call Volume by Day 2019</h2>
          <CalendarHeatmapClinician calendarData={data.heatmapData_2019} />
        </>
      ) : null}
    </div>
  );
}
