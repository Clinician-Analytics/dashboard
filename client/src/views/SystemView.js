import React, { useState } from "react";
import CalendarHeatmap from "../components/visualizations/system/CalendarHeatmap";
import CallVolumeByUnit from "../components/visualizations/system/CallVolumeByUnit";
import RequestedByPie from "../components/visualizations/system/RequestedByPie";
import axios from "axios";
import { Button } from "@material-ui/core";

export default function SystemView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true)
    setTimeout(() => {
      
    setLoading(false)
   }, 3000);
  }

  const handleGetData = async () => {
    handleLoading()
    const res = await axios.post("/reports/annual-reports");
    setData(res.data);
    console.log(data)
  };

  return (
    <div>
      <h1>Sytem View</h1>
      <Button variant="contained" color="secondary" onClick={handleGetData}>Get Annual Reports</Button>
      <span>{loading}</span>
      {data ? 
      <>
      <h3>Total Call Volume by Day</h3>
      <CalendarHeatmap calendarData={data.heatmapData} />
      <h3>Total Call Volume by Unit</h3>
      <CallVolumeByUnit callVolumeByUnit={data.callVolumeByUnitData} />
      <h3>Who Called?</h3>
      <RequestedByPie requestedBy={data.requestedByData} />
      </>
      : null }
    </div>
  );
}
