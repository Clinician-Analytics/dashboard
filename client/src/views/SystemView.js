import React, { useState } from "react";
import CalendarHeatmap from "../components/visualizations/system/CalendarHeatmap";
import CallVolumeByUnit from "../components/visualizations/system/CallVolumeByUnit";
// import RequestedByPie from "../components/visualizations/system/RequestedByPie";
// import CallTypeRadar from "../components/visualizations/clinician/CallTypeRadar";
import axios from "axios";
import { Button } from "@material-ui/core";

export default function SystemView() {
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
    const res = await axios.post("/reports/annual-reports");
    setData(res.data);
    console.log(data);
  };

  return (
    <div className="div-a">
      <h1>Orange County EMS Analytics</h1>

      <Button variant="contained" color="secondary" onClick={handleGetData}>
        Get Annual Reports
      </Button>
      <span>{loading ? "Loading Data..." : null}</span>
      {data ? (
        <>
          <h2>Total Call Volume by Day</h2>
          <CalendarHeatmap calendarData={data.heatmapData_all} />
          {/* <h2>Total Call Volume by Day 2018</h2> */}
          {/* <CalendarHeatmap calendarData={data.heatmapData_2018} />
          <h2>Total Call Volume by Day 2019</h2>
          <CalendarHeatmap calendarData={data.heatmapData_2019} /> */}
          <h2>Total Call Volume by Unit</h2>
          <CallVolumeByUnit callVolumeByUnit={data.callVolumeByUnitData_all} />
          <h2>Total Call Volume by Unit 2018</h2>
          <CallVolumeByUnit callVolumeByUnit={data.callVolumeByUnitData_2018} />
          <h2>Total Call Volume by Unit 2019</h2>
          <CallVolumeByUnit callVolumeByUnit={data.callVolumeByUnitData_2019} />
          {/* <h3>Who Called?</h3>
          <RequestedByPie requestedBy={data.requestedByData} /> */}
        </>
      ) : null}
    </div>
  );
}
