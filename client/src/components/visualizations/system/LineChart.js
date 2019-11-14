import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { lineData } from "../../../formData/lineData";

const lineSettings = {
  theme: {
    fontSize: "14px",
    textColor: "black",
    fontWeight: "1200"
  }
};

export default function LineChart() {
  return (
    <div style={{ height: "400px" }}>
      <ResponsiveLine
        data={lineData}
        margin={{ top: 25, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", stacked: false, min: "0", max: "auto" }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Time (Quarters by Year)",
          legendOffset: 36,
          legendPosition: "middle"
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Call Volume",
          legendOffset: -40,
          legendPosition: "middle"
        }}
        colors={{ scheme: "set1" }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
        enableArea={true}
        areaBaselineValue={50}
        areaOpacity={0.05}
        enableSlices="x"
        useMesh={true}
        theme={lineSettings.theme}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
}
