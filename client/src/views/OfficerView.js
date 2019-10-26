import React from "react";
import FileUploadForm from "../components/forms/FileUploadForm";
import CalendarHeatmap from "../components/visualizations/clinician/CalendarHeatmap";

export default function OfficerView() {
  return (
    <div>
      <h1>Officer View</h1>
      <FileUploadForm />
      <CalendarHeatmap />
    </div>
  );
}
