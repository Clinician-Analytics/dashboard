import React from "react";
import CalendarHeatmap from "../components/visualizations/clinician/CalendarHeatmap";
import CallVolumeByUnit from "../components/visualizations/system/CallVolumeByUnit";

export default function SystemView() {
  return (
    <div>
      <h1>System View</h1>
      <h3>Total Call Volume</h3>
      <CalendarHeatmap />
      <h3>Total Call Volume</h3>
      <CallVolumeByUnit />
    </div>
  );
}
