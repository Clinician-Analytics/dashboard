import React from "react";
import { ResponsiveBump } from "@nivo/bump";
import { bumpData } from "../../../formData/bumpData";
const lineSettings = {
  theme: {
    fontSize: "14px",
    textColor: "black",
    fontWeight: "1200"
  }
};

export default function BumpChart() {
  return (
    <div style={{ height: "400px" }}>
      <ResponsiveBump
        data={bumpData}
        margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
        spacing={10}
        colors={{ scheme: "category10" }}
        lineWidth={3}
        activeLineWidth={6}
        inactiveLineWidth={3}
        inactiveOpacity={0.15}
        pointSize={10}
        activePointSize={16}
        inactivePointSize={0}
        pointColor={{ theme: "background" }}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{ from: "serie.color" }}
        theme={lineSettings.theme}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -36
        }}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "ranking",
          legendPosition: "middle",
          legendOffset: -40
        }}
        tooltip={function(e) {
          return e.x + ": " + e.y;
        }}
      />
    </div>
  );
}
