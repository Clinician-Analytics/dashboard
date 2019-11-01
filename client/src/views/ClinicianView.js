import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import CalendarHeatmap from "../components/visualizations/system/CalendarHeatmap";
import axios from "axios";

export default function ClinicianView() {
  const [data, setData] = useState(null);
  const [inputs, setInputs] = useState({
    pNumber: ""
  });
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleChange = e => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleGetData = async () => {
    handleLoading();
    const res = await axios.post(
      "/reports/clinician-reports/" + inputs.pNumber
    );
    setData(res.data);
    console.log(data);
  };

  return (
    <div className="div-a">
      <h1>Clinician View</h1>
      <TextField id="pNumber" name="pNumber" onChange={handleChange} />
      <Button variant="contained" color="secondary" onClick={handleGetData}>
        Get Annual Reports
      </Button>
      <span>{loading ? "Loading Data..." : null}</span>
      {data ? (
        <>
          <h2>Total Call Volume by Day</h2>
          <CalendarHeatmap calendarData={data.heatmapData} />
        </>
      ) : null}
    </div>
  );
}
