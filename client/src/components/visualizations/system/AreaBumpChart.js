import React from "react";
import { ResponsiveAreaBump } from "@nivo/bump";
import { bumpData } from "../../../formData/bumpData";

const lineSettings = {
  theme: {
    fontSize: "14px",
    textColor: "black",
    fontWeight: "1200"
  }
};

export default function AreaBumpChart() {
  return (
    <div style={{ height: "400px" }}>
      <ResponsiveAreaBump
        data={bumpData}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        spacing={10}
        colors={{ scheme: "category10" }}
        blendMode="multiply"
        theme={lineSettings.theme}
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
