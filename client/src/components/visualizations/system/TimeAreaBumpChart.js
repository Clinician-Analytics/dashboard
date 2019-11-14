import React from "react";
import { ResponsiveAreaBump } from "@nivo/bump";
import { timebumpData } from "../../../formData/timebumpData";

export default function TimeAreaBumpChart() {
  return (
    <div style={{ height: "500px" }}>
      <ResponsiveAreaBump
        data={timebumpData}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        spacing={10}
        colors={{ scheme: "category10" }}
        blendMode="multiply"
        startLabel="id"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -36
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: 32
        }}
      />
    </div>
  );
}
